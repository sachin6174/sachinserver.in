/**
 * Memory Management Hook
 * Helps prevent memory leaks and manages component lifecycle cleanup
 */

import { useEffect, useRef, useCallback } from 'react';

export const useMemoryManagement = (componentName = 'Component') => {
  const cleanupFunctions = useRef([]);
  const timersRef = useRef(new Set());
  const observersRef = useRef(new Set());
  const eventListenersRef = useRef([]);

  // Register cleanup function
  const registerCleanup = useCallback((cleanupFn) => {
    cleanupFunctions.current.push(cleanupFn);
  }, []);

  // Timer management
  const setManagedTimeout = useCallback((callback, delay) => {
    const timerId = setTimeout(callback, delay);
    timersRef.current.add(timerId);
    return timerId;
  }, []);

  const setManagedInterval = useCallback((callback, delay) => {
    const intervalId = setInterval(callback, delay);
    timersRef.current.add(intervalId);
    return intervalId;
  }, []);

  const clearManagedTimer = useCallback((timerId) => {
    clearTimeout(timerId);
    clearInterval(timerId);
    timersRef.current.delete(timerId);
  }, []);

  // Observer management
  const registerObserver = useCallback((observer) => {
    observersRef.current.add(observer);
    return observer;
  }, []);

  // Event listener management
  const addManagedEventListener = useCallback((element, event, handler, options) => {
    element.addEventListener(event, handler, options);
    eventListenersRef.current.push({ element, event, handler, options });
  }, []);

  // Cleanup all resources
  const cleanup = useCallback(() => {
    // Clear all timers
    timersRef.current.forEach(timerId => {
      clearTimeout(timerId);
      clearInterval(timerId);
    });
    timersRef.current.clear();

    // Disconnect all observers
    observersRef.current.forEach(observer => {
      if (observer.disconnect) observer.disconnect();
      if (observer.unobserve) observer.unobserve();
    });
    observersRef.current.clear();

    // Remove all event listeners
    eventListenersRef.current.forEach(({ element, event, handler, options }) => {
      try {
        element.removeEventListener(event, handler, options);
      } catch (error) {
        console.warn(`Failed to remove event listener for ${componentName}:`, error);
      }
    });
    eventListenersRef.current = [];

    // Run custom cleanup functions
    cleanupFunctions.current.forEach(cleanupFn => {
      try {
        cleanupFn();
      } catch (error) {
        console.warn(`Cleanup function failed for ${componentName}:`, error);
      }
    });
    cleanupFunctions.current = [];

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Memory Management] Cleaned up resources for ${componentName}`);
    }
  }, [componentName]);

  // Auto-cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    registerCleanup,
    setManagedTimeout,
    setManagedInterval,
    clearManagedTimer,
    registerObserver,
    addManagedEventListener,
    cleanup
  };
};

export default useMemoryManagement;