/**
 * Performance optimization utilities
 */

import { useCallback, useRef, useEffect, useMemo, useState } from 'react';

/**
 * Debounce function to limit function calls
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(null, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Custom hook for debounced values
 */
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Custom hook for throttled callbacks
 */
export const useThrottledCallback = (callback, delay) => {
    const throttledFn = useRef(throttle(callback, delay));
    
    useEffect(() => {
        throttledFn.current = throttle(callback, delay);
    }, [callback, delay]);

    return useCallback((...args) => {
        return throttledFn.current(...args);
    }, []);
};

/**
 * Custom hook for intersection observer
 */
export const useIntersectionObserver = (
    elementRef,
    options = {}
) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, options]);

    return isIntersecting;
};

/**
 * Custom hook for performance monitoring
 */
export const usePerformanceMonitor = (componentName) => {
    const renderCount = useRef(0);
    const startTime = useRef(performance.now());

    useEffect(() => {
        renderCount.current += 1;
        const endTime = performance.now();
        const renderTime = endTime - startTime.current;
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`${componentName} render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);
        }
        
        startTime.current = performance.now();
    });

    return renderCount.current;
};

/**
 * Memoized heavy computation wrapper
 */
export const useMemoizedComputation = (computeFn, deps) => {
    return useMemo(() => {
        const start = performance.now();
        const result = computeFn();
        const end = performance.now();
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`Computation took ${(end - start).toFixed(2)}ms`);
        }
        
        return result;
    }, deps);
};

/**
 * Optimized localStorage hook with debouncing
 */
export const useDebouncedLocalStorage = (key, initialValue, delay = 500) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const debouncedSetValue = useCallback(
        debounce((value) => {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        }, delay),
        [key, delay]
    );

    const setValue = useCallback((value) => {
        setStoredValue(value);
        debouncedSetValue(value);
    }, [debouncedSetValue]);

    return [storedValue, setValue];
};

/**
 * Batch DOM updates using requestAnimationFrame
 */
export const batchDOMUpdates = (callback) => {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            callback();
            resolve();
        });
    });
};

/**
 * Memory efficient array chunking
 */
export const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

/**
 * Preload resources
 */
export const preloadResources = (resources) => {
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.type || 'fetch';
        if (resource.crossorigin) {
            link.crossOrigin = resource.crossorigin;
        }
        document.head.appendChild(link);
    });
};

/**
 * Critical CSS injection
 */
export const injectCriticalCSS = (css) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
};

export default {
    debounce,
    throttle,
    useDebounce,
    useThrottledCallback,
    useIntersectionObserver,
    usePerformanceMonitor,
    useMemoizedComputation,
    useDebouncedLocalStorage,
    batchDOMUpdates,
    chunkArray,
    preloadResources,
    injectCriticalCSS
};