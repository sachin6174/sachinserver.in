/**
 * Custom Hooks for Event Bus Integration
 * Provides easy integration with the event system
 * Handles subscription lifecycle and cleanup
 */

import { useEffect, useCallback, useRef } from 'react';
import eventBus from '../services/EventBus';

/**
 * Hook for subscribing to events
 */
export const useEventListener = (eventName, callback, dependencies = []) => {
  const callbackRef = useRef(callback);
  const unsubscribeRef = useRef(null);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Clean up previous subscription
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Create new subscription with stable callback
    const stableCallback = (...args) => {
      callbackRef.current(...args);
    };

    unsubscribeRef.current = eventBus.on(eventName, stableCallback);

    // Cleanup on unmount or dependency change
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [eventName, ...dependencies]);
};

/**
 * Hook for subscribing to one-time events
 */
export const useEventListenerOnce = (eventName, callback, dependencies = []) => {
  useEffect(() => {
    const unsubscribe = eventBus.once(eventName, callback);
    return unsubscribe;
  }, [eventName, ...dependencies]);
};

/**
 * Hook for emitting events
 */
export const useEventEmitter = () => {
  const emit = useCallback((eventName, ...args) => {
    return eventBus.emit(eventName, ...args);
  }, []);

  const emitAsync = useCallback(async (eventName, ...args) => {
    return eventBus.emitAsync(eventName, ...args);
  }, []);

  return { emit, emitAsync };
};

/**
 * Hook for waiting for specific events
 */
export const useEventWaiter = () => {
  const waitFor = useCallback((eventName, timeout) => {
    return eventBus.waitFor(eventName, timeout);
  }, []);

  return { waitFor };
};

/**
 * Hook for multiple event subscriptions
 */
export const useMultipleEventListeners = (eventSubscriptions) => {
  useEffect(() => {
    const unsubscribeFunctions = eventSubscriptions.map(({ eventName, callback, options = {} }) => {
      return eventBus.on(eventName, callback, options);
    });

    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, [eventSubscriptions]);
};

/**
 * Hook for conditional event listening
 */
export const useConditionalEventListener = (eventName, callback, condition, dependencies = []) => {
  useEventListener(
    eventName,
    condition ? callback : () => {},
    [condition, ...dependencies]
  );
};

/**
 * Hook for debounced event emission
 */
export const useDebouncedEventEmitter = (delay = 300) => {
  const timeoutRef = useRef(null);

  const emitDebounced = useCallback((eventName, ...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      eventBus.emit(eventName, ...args);
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { emitDebounced };
};

/**
 * Hook for throttled event emission
 */
export const useThrottledEventEmitter = (delay = 100) => {
  const lastEmitRef = useRef(0);

  const emitThrottled = useCallback((eventName, ...args) => {
    const now = Date.now();
    if (now - lastEmitRef.current >= delay) {
      eventBus.emit(eventName, ...args);
      lastEmitRef.current = now;
    }
  }, [delay]);

  return { emitThrottled };
};