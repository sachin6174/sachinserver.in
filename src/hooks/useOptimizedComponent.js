/**
 * Optimized Component Hook
 * Combines performance monitoring, memory management, and optimization patterns
 */

import { useEffect, useRef, useCallback } from 'react';
import { usePerformance } from '../contexts/PerformanceContext';
import useMemoryManagement from './useMemoryManagement';

export const useOptimizedComponent = (componentName) => {
  const { recordComponentMount, recordRenderTime } = usePerformance();
  const memoryManagement = useMemoryManagement(componentName);
  const mountTimeRef = useRef(null);
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(null);

  // Track component mount
  useEffect(() => {
    mountTimeRef.current = Date.now();
    
    // Record mount in performance context
    recordComponentMount(componentName, mountTimeRef.current);
    
    const mountDuration = Date.now() - mountTimeRef.current;
    
    // Log slow mounts in development
    if (process.env.NODE_ENV === 'development' && mountDuration > 100) {
      console.warn(`[Performance] Slow mount detected for ${componentName}: ${mountDuration}ms`);
    }
  }, [componentName, recordComponentMount]);

  // Track renders
  useEffect(() => {
    const renderStartTime = Date.now();
    renderCountRef.current += 1;

    // Use RAF to measure actual render time
    const rafId = requestAnimationFrame(() => {
      const renderDuration = Date.now() - renderStartTime;
      lastRenderTimeRef.current = renderDuration;
      
      recordRenderTime(componentName, renderDuration);
      
      // Log slow renders in development
      if (process.env.NODE_ENV === 'development' && renderDuration > 16) {
        console.warn(`[Performance] Slow render detected for ${componentName}: ${renderDuration}ms (render #${renderCountRef.current})`);
      }
    });

    return () => cancelAnimationFrame(rafId);
  });

  // Performance helpers
  const measureOperation = useCallback(async (operationName, operation) => {
    const startTime = Date.now();
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      
      if (process.env.NODE_ENV === 'development' && duration > 100) {
        console.warn(`[Performance] Slow operation "${operationName}" in ${componentName}: ${duration}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[Performance] Operation "${operationName}" failed in ${componentName} after ${duration}ms:`, error);
      throw error;
    }
  }, [componentName]);

  // Throttle function for expensive operations
  const createThrottledFunction = useCallback((fn, delay = 100) => {
    let timeoutId = null;
    let lastExecuted = 0;

    const throttledFn = (...args) => {
      const now = Date.now();
      
      if (now - lastExecuted > delay) {
        lastExecuted = now;
        return fn(...args);
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        timeoutId = memoryManagement.setManagedTimeout(() => {
          lastExecuted = Date.now();
          fn(...args);
        }, delay - (now - lastExecuted));
      }
    };

    return throttledFn;
  }, [memoryManagement]);

  // Debounce function for user input
  const createDebouncedFunction = useCallback((fn, delay = 300) => {
    let timeoutId = null;

    const debouncedFn = (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = memoryManagement.setManagedTimeout(() => {
        fn(...args);
      }, delay);
    };

    return debouncedFn;
  }, [memoryManagement]);

  // Intersection Observer for lazy content
  const createIntersectionObserver = useCallback((callback, options = {}) => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    memoryManagement.registerObserver(observer);
    return observer;
  }, [memoryManagement]);

  // Performance metrics
  const getComponentMetrics = useCallback(() => ({
    componentName,
    mountTime: mountTimeRef.current,
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current,
    lifetime: mountTimeRef.current ? Date.now() - mountTimeRef.current : 0
  }), [componentName]);

  return {
    // Memory management
    ...memoryManagement,
    
    // Performance helpers
    measureOperation,
    createThrottledFunction,
    createDebouncedFunction,
    createIntersectionObserver,
    getComponentMetrics,
    
    // Component info
    componentName,
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current
  };
};

export default useOptimizedComponent;