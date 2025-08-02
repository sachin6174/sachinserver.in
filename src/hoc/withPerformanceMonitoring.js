/**
 * Higher-Order Component for Performance Monitoring
 * Tracks component mount/unmount times and render performance
 * Implements Observer pattern for performance data collection
 */

import React, { useEffect, useRef, forwardRef } from 'react';
import eventBus, { Events, emitComponentMounted, emitPerformanceMark } from '../services/EventBus';

/**
 * Performance monitoring utilities
 */
class PerformanceMonitor {
  static measurements = new Map();
  static enabled = process.env.NODE_ENV === 'development';

  static mark(name, details = {}) {
    if (!this.enabled) return;

    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name);
    }

    emitPerformanceMark(name, {
      timestamp: Date.now(),
      ...details
    });
  }

  static measure(name, startMark, endMark) {
    if (!this.enabled) return;

    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        
        if (measure) {
          eventBus.emit(Events.PERFORMANCE_MEASURE, {
            name,
            duration: measure.duration,
            startTime: measure.startTime,
            timestamp: Date.now()
          });
        }
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
  }

  static startMeasurement(id) {
    if (!this.enabled) return;

    this.measurements.set(id, {
      startTime: Date.now(),
      startMark: `${id}_start`
    });

    this.mark(`${id}_start`);
  }

  static endMeasurement(id, details = {}) {
    if (!this.enabled) return;

    const measurement = this.measurements.get(id);
    if (!measurement) return;

    const endMark = `${id}_end`;
    const measureName = `${id}_duration`;

    this.mark(endMark);
    this.measure(measureName, measurement.startMark, endMark);

    const duration = Date.now() - measurement.startTime;
    
    eventBus.emit(Events.PERFORMANCE_MEASURE, {
      name: measureName,
      duration,
      startTime: measurement.startTime,
      details,
      timestamp: Date.now()
    });

    this.measurements.delete(id);
    return duration;
  }

  static enable() {
    this.enabled = true;
  }

  static disable() {
    this.enabled = false;
  }

  static getEnabled() {
    return this.enabled;
  }
}

/**
 * HOC for performance monitoring
 */
export const withPerformanceMonitoring = (options = {}) => {
  return (WrappedComponent) => {
    const ComponentWithPerformanceMonitoring = forwardRef((props, ref) => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      const mountTimeRef = useRef(null);
      const renderCountRef = useRef(0);
      const lastRenderTimeRef = useRef(null);

      const {
        trackMountTime = true,
        trackRenderTime = true,
        trackUnmountTime = true,
        trackRenderCount = true,
        slowRenderThreshold = 16, // 16ms = 60fps
        performanceId = componentName,
        logToConsole = process.env.NODE_ENV === 'development'
      } = options;

      // Track component mount
      useEffect(() => {
        const componentId = `${performanceId}_${Date.now()}`;
        
        if (trackMountTime) {
          mountTimeRef.current = Date.now();
          PerformanceMonitor.mark(`${componentId}_mount_start`);
          
          emitComponentMounted(componentName, {
            props: Object.keys(props),
            mountTime: mountTimeRef.current
          });
        }

        // Track mount completion
        const timeoutId = setTimeout(() => {
          if (trackMountTime && mountTimeRef.current) {
            const mountDuration = Date.now() - mountTimeRef.current;
            PerformanceMonitor.mark(`${componentId}_mount_end`);
            
            eventBus.emit(Events.PERFORMANCE_MEASURE, {
              name: `${componentName}_mount`,
              duration: mountDuration,
              componentName,
              type: 'mount',
              timestamp: Date.now()
            });

            if (logToConsole && mountDuration > 100) {
              console.warn(`[Performance] Slow mount detected for ${componentName}: ${mountDuration}ms`);
            }
          }
        }, 0);

        // Track component unmount
        return () => {
          clearTimeout(timeoutId);
          
          if (trackUnmountTime) {
            const unmountTime = Date.now();
            const totalLifetime = mountTimeRef.current ? unmountTime - mountTimeRef.current : 0;
            
            eventBus.emit(Events.COMPONENT_UNMOUNTED, {
              componentName,
              lifetime: totalLifetime,
              renderCount: renderCountRef.current,
              timestamp: unmountTime
            });

            if (logToConsole) {
              console.log(`[Performance] ${componentName} unmounted after ${totalLifetime}ms, ${renderCountRef.current} renders`);
            }
          }
        };
      }, []);

      // Track render performance
      useEffect(() => {
        if (trackRenderTime || trackRenderCount) {
          const renderStartTime = Date.now();
          renderCountRef.current += 1;

          if (trackRenderTime) {
            // Measure render time in next tick
            const timeoutId = setTimeout(() => {
              const renderDuration = Date.now() - renderStartTime;
              lastRenderTimeRef.current = renderDuration;

              eventBus.emit(Events.PERFORMANCE_MEASURE, {
                name: `${componentName}_render`,
                duration: renderDuration,
                componentName,
                type: 'render',
                renderCount: renderCountRef.current,
                timestamp: Date.now()
              });

              if (logToConsole && renderDuration > slowRenderThreshold) {
                console.warn(`[Performance] Slow render detected for ${componentName}: ${renderDuration}ms (render #${renderCountRef.current})`);
              }
            }, 0);

            return () => clearTimeout(timeoutId);
          }
        }
      });

      // Enhanced component with performance data
      const enhancedProps = {
        ...props,
        ...(process.env.NODE_ENV === 'development' && {
          __performanceData: {
            componentName,
            renderCount: renderCountRef.current,
            lastRenderTime: lastRenderTimeRef.current,
            mountTime: mountTimeRef.current
          }
        })
      };

      return <WrappedComponent {...enhancedProps} ref={ref} />;
    });

    ComponentWithPerformanceMonitoring.displayName = 
      `withPerformanceMonitoring(${WrappedComponent.displayName || WrappedComponent.name})`;

    // Copy static methods
    ComponentWithPerformanceMonitoring.WrappedComponent = WrappedComponent;

    return ComponentWithPerformanceMonitoring;
  };
};

/**
 * Hook for manual performance tracking
 */
export const usePerformanceTracking = (name, dependencies = []) => {
  const startTimeRef = useRef(null);

  const startTracking = () => {
    startTimeRef.current = Date.now();
    PerformanceMonitor.startMeasurement(name);
  };

  const endTracking = (details = {}) => {
    if (startTimeRef.current) {
      return PerformanceMonitor.endMeasurement(name, details);
    }
    return 0;
  };

  const trackOperation = async (operation) => {
    startTracking();
    try {
      const result = await operation();
      return result;
    } finally {
      endTracking();
    }
  };

  useEffect(() => {
    startTracking();
    return () => {
      endTracking();
    };
  }, dependencies);

  return {
    startTracking,
    endTracking,
    trackOperation
  };
};

/**
 * Component for performance boundary
 */
export const PerformanceBoundary = ({ 
  children, 
  name = 'PerformanceBoundary',
  threshold = 100,
  onSlowRender 
}) => {
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const timeoutId = setTimeout(() => {
      if (startTimeRef.current) {
        const duration = Date.now() - startTimeRef.current;
        
        if (duration > threshold) {
          const slowRenderEvent = {
            name,
            duration,
            threshold,
            timestamp: Date.now()
          };

          eventBus.emit(Events.PERFORMANCE_MEASURE, slowRenderEvent);
          
          if (onSlowRender) {
            onSlowRender(slowRenderEvent);
          }
        }
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  });

  return children;
};

export { PerformanceMonitor };
export default withPerformanceMonitoring;