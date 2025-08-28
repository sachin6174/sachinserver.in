/**
 * Performance optimization utilities for React components
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Debounce hook for expensive operations
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

/**
 * Throttle hook for frequent events
 */
export const useThrottle = (callback, limit) => {
  const inThrottle = useRef(false);

  return useCallback(
    (...args) => {
      if (!inThrottle.current) {
        callback(...args);
        inThrottle.current = true;
        setTimeout(() => (inThrottle.current = false), limit);
      }
    },
    [callback, limit]
  );
};

/**
 * Optimized localStorage with batch updates
 */
class LocalStorageManager {
  constructor() {
    this.queue = new Map();
    this.isProcessing = false;
  }

  set(key, value) {
    this.queue.set(key, value);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  get(key) {
    // Check queue first for latest value
    if (this.queue.has(key)) {
      return this.queue.get(key);
    }
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn(`Failed to get localStorage item: ${key}`, e);
      return null;
    }
  }

  processQueue() {
    this.isProcessing = true;
    
    requestAnimationFrame(() => {
      this.queue.forEach((value, key) => {
        try {
          localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        } catch (e) {
          console.warn(`Failed to set localStorage item: ${key}`, e);
        }
      });
      
      this.queue.clear();
      this.isProcessing = false;
    });
  }
}

export const optimizedStorage = new LocalStorageManager();

/**
 * Image preloader for better performance
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    }))
  );
};

/**
 * Simple performance tracker for development
 */
export const usePerformanceTracker = (componentName) => {
  const renderCount = useRef(0);
  const lastRender = useRef(performance.now());
  
  useEffect(() => {
    renderCount.current += 1;
    const now = performance.now();
    const timeSinceLastRender = now - lastRender.current;
    lastRender.current = now;
    
    if (process.env.NODE_ENV === 'development' && renderCount.current > 1) {
      if (timeSinceLastRender < 16.67) { // Less than 60fps
        console.warn(`${componentName}: Fast re-render (${timeSinceLastRender.toFixed(2)}ms)`);
      }
    }
  });
  
  return { renderCount: renderCount.current };
};

/**
 * Intersection observer hook for lazy loading
 */
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);
  
  return isIntersecting;
};

export default {
  useDebounce,
  useThrottle,
  optimizedStorage,
  preloadImages,
  usePerformanceTracker,
  useIntersectionObserver
};