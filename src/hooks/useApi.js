/**
 * Custom Hooks for API Integration
 * Provides data fetching, caching, and state management
 * Implements loading states and error handling
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import ApiService, { serviceFactory } from '../services/ApiService';
import { useError, useLoading } from './useAppState';
import eventBus, { Events } from '../services/EventBus';

/**
 * Hook for making API requests with built-in state management
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const {
    immediate = true,
    dependencies = [],
    onSuccess,
    onError,
    transform,
    ...requestOptions
  } = options;

  const fetchData = useCallback(async (customUrl = url, customOptions = {}) => {
    if (!customUrl) return;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.request(customUrl, {
        ...requestOptions,
        ...customOptions,
        signal: abortControllerRef.current.signal
      });

      let processedData = response;
      
      if (transform && typeof transform === 'function') {
        processedData = transform(response);
      }

      setData(processedData);
      
      if (onSuccess) {
        onSuccess(processedData);
      }

      eventBus.emit(Events.DATA_LOADED, {
        url: customUrl,
        data: processedData,
        timestamp: Date.now()
      });

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred');
        
        if (onError) {
          onError(err);
        }

        eventBus.emit(Events.DATA_ERROR, {
          url: customUrl,
          error: err.message,
          timestamp: Date.now()
        });
      }
    } finally {
      setLoading(false);
    }
  }, [url, requestOptions, transform, onSuccess, onError]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const mutate = useCallback((newData) => {
    setData(newData);
  }, []);

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
    fetchData
  };
};

/**
 * Hook for service-based API calls
 */
export const useServiceApi = (serviceName, method, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const service = serviceFactory.get(serviceName);

  const execute = useCallback(async (...executeArgs) => {
    if (!service || !service[method]) {
      setError(`Service ${serviceName} or method ${method} not found`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await service[method](...(executeArgs.length > 0 ? executeArgs : args));
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, method, args]);

  return {
    data,
    loading,
    error,
    execute
  };
};

/**
 * Hook for paginated API requests
 */
export const usePaginatedApi = (url, options = {}) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    pageSize = 20,
    pageParam = 'page',
    extractItems = (data) => data.items || data.results || data,
    extractHasMore = (data, currentItems) => {
      if (data.hasMore !== undefined) return data.hasMore;
      if (data.totalPages !== undefined) return page < data.totalPages;
      const newItems = extractItems(data);
      return newItems.length === pageSize;
    },
    ...requestOptions
  } = options;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.request(url, {
        ...requestOptions,
        [pageParam]: page
      });

      const newItems = extractItems(response);
      const hasMoreItems = extractHasMore(response, [...items, ...newItems]);

      setItems(prevItems => [...prevItems, ...newItems]);
      setHasMore(hasMoreItems);
      setPage(prevPage => prevPage + 1);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, page, loading, hasMore, items, pageParam, requestOptions, extractItems, extractHasMore]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  useEffect(() => {
    loadMore();
  }, []); // Only run on mount

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  };
};

/**
 * Hook for cached API requests
 */
export const useCachedApi = (url, options = {}) => {
  const { cacheTTL = 300000, cacheKey, ...apiOptions } = options;
  
  return useApi(url, {
    ...apiOptions,
    cacheTTL,
    cache: true
  });
};

/**
 * Hook for real-time API updates
 */
export const useRealtimeApi = (url, interval = 30000, options = {}) => {
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef(null);
  
  const apiResult = useApi(url, {
    ...options,
    immediate: isActive
  });

  const start = useCallback(() => {
    setIsActive(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (isActive) {
        apiResult.refetch();
      }
    }, interval);
  }, [isActive, interval, apiResult]);

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      start();
    }

    return () => {
      stop();
    };
  }, [isActive, start, stop]);

  return {
    ...apiResult,
    isActive,
    start,
    stop
  };
};

/**
 * Hook for batch API requests
 */
export const useBatchApi = (requests = []) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const executeBatch = useCallback(async (customRequests = requests) => {
    setLoading(true);
    setErrors([]);
    setResults([]);

    try {
      const promises = customRequests.map(async ({ url, options = {} }, index) => {
        try {
          const result = await ApiService.request(url, options);
          return { index, result, error: null };
        } catch (error) {
          return { index, result: null, error: error.message };
        }
      });

      const responses = await Promise.allSettled(promises);
      
      const batchResults = [];
      const batchErrors = [];

      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const { result, error } = response.value;
          batchResults[index] = result;
          batchErrors[index] = error;
        } else {
          batchResults[index] = null;
          batchErrors[index] = response.reason?.message || 'Unknown error';
        }
      });

      setResults(batchResults);
      setErrors(batchErrors);

    } catch (error) {
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  }, [requests]);

  return {
    results,
    errors,
    loading,
    executeBatch
  };
};