/**
 * Performance Context
 * Global performance monitoring and optimization state management
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

// Performance state
const initialState = {
  isMonitoring: process.env.NODE_ENV === 'development',
  metrics: {
    componentMounts: {},
    renderTimes: {},
    memoryUsage: [],
    bundleSize: null,
    loadTime: null
  },
  settings: {
    enableLazyLoading: true,
    enableMemoization: true,
    enableVirtualization: false,
    maxRenderTime: 16, // 60fps threshold
    maxMemoryUsage: 100 * 1024 * 1024 // 100MB
  },
  warnings: []
};

// Action types
const ACTIONS = {
  SET_MONITORING: 'SET_MONITORING',
  RECORD_COMPONENT_MOUNT: 'RECORD_COMPONENT_MOUNT',
  RECORD_RENDER_TIME: 'RECORD_RENDER_TIME',
  UPDATE_MEMORY_USAGE: 'UPDATE_MEMORY_USAGE',
  SET_BUNDLE_SIZE: 'SET_BUNDLE_SIZE',
  SET_LOAD_TIME: 'SET_LOAD_TIME',
  ADD_WARNING: 'ADD_WARNING',
  CLEAR_WARNINGS: 'CLEAR_WARNINGS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
};

// Reducer
const performanceReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MONITORING:
      return { ...state, isMonitoring: action.payload };

    case ACTIONS.RECORD_COMPONENT_MOUNT:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          componentMounts: {
            ...state.metrics.componentMounts,
            [action.payload.componentName]: {
              count: (state.metrics.componentMounts[action.payload.componentName]?.count || 0) + 1,
              lastMountTime: action.payload.mountTime,
              averageMountTime: action.payload.mountTime
            }
          }
        }
      };

    case ACTIONS.RECORD_RENDER_TIME:
      const { componentName, renderTime } = action.payload;
      const existingRenderData = state.metrics.renderTimes[componentName] || {
        count: 0,
        totalTime: 0,
        maxTime: 0,
        minTime: Infinity
      };

      return {
        ...state,
        metrics: {
          ...state.metrics,
          renderTimes: {
            ...state.metrics.renderTimes,
            [componentName]: {
              count: existingRenderData.count + 1,
              totalTime: existingRenderData.totalTime + renderTime,
              maxTime: Math.max(existingRenderData.maxTime, renderTime),
              minTime: Math.min(existingRenderData.minTime, renderTime),
              averageTime: (existingRenderData.totalTime + renderTime) / (existingRenderData.count + 1),
              lastRenderTime: renderTime
            }
          }
        }
      };

    case ACTIONS.UPDATE_MEMORY_USAGE:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          memoryUsage: [
            ...state.metrics.memoryUsage.slice(-49), // Keep last 50 measurements
            action.payload
          ]
        }
      };

    case ACTIONS.SET_BUNDLE_SIZE:
      return {
        ...state,
        metrics: { ...state.metrics, bundleSize: action.payload }
      };

    case ACTIONS.SET_LOAD_TIME:
      return {
        ...state,
        metrics: { ...state.metrics, loadTime: action.payload }
      };

    case ACTIONS.ADD_WARNING:
      return {
        ...state,
        warnings: [...state.warnings, { ...action.payload, timestamp: Date.now() }]
      };

    case ACTIONS.CLEAR_WARNINGS:
      return { ...state, warnings: [] };

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    default:
      return state;
  }
};

// Context
const PerformanceContext = createContext();

// Provider component
export const PerformanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(performanceReducer, initialState);

  // Performance monitoring functions
  const recordComponentMount = useCallback((componentName, mountTime) => {
    if (!state.isMonitoring) return;
    
    dispatch({
      type: ACTIONS.RECORD_COMPONENT_MOUNT,
      payload: { componentName, mountTime }
    });
  }, [state.isMonitoring]);

  const recordRenderTime = useCallback((componentName, renderTime) => {
    if (!state.isMonitoring) return;
    
    dispatch({
      type: ACTIONS.RECORD_RENDER_TIME,
      payload: { componentName, renderTime }
    });

    // Check for slow renders
    if (renderTime > state.settings.maxRenderTime) {
      dispatch({
        type: ACTIONS.ADD_WARNING,
        payload: {
          type: 'slow_render',
          message: `Slow render detected in ${componentName}: ${renderTime}ms`,
          componentName,
          renderTime
        }
      });
    }
  }, [state.isMonitoring, state.settings.maxRenderTime]);

  const updateMemoryUsage = useCallback(() => {
    if (!state.isMonitoring || !performance.memory) return;

    const memoryInfo = {
      timestamp: Date.now(),
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };

    dispatch({
      type: ACTIONS.UPDATE_MEMORY_USAGE,
      payload: memoryInfo
    });

    // Check for high memory usage
    if (memoryInfo.used > state.settings.maxMemoryUsage) {
      dispatch({
        type: ACTIONS.ADD_WARNING,
        payload: {
          type: 'high_memory',
          message: `High memory usage detected: ${(memoryInfo.used / 1024 / 1024).toFixed(2)}MB`,
          memoryUsage: memoryInfo.used
        }
      });
    }
  }, [state.isMonitoring, state.settings.maxMemoryUsage]);

  const clearWarnings = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_WARNINGS });
  }, []);

  const updateSettings = useCallback((newSettings) => {
    dispatch({
      type: ACTIONS.UPDATE_SETTINGS,
      payload: newSettings
    });
  }, []);

  const getPerformanceReport = useCallback(() => {
    const { metrics } = state;
    
    return {
      summary: {
        totalComponents: Object.keys(metrics.componentMounts).length,
        totalRenders: Object.values(metrics.renderTimes).reduce((sum, data) => sum + data.count, 0),
        averageRenderTime: Object.values(metrics.renderTimes).reduce((sum, data) => sum + data.averageTime, 0) / Object.keys(metrics.renderTimes).length || 0,
        currentMemoryUsage: metrics.memoryUsage[metrics.memoryUsage.length - 1]?.used || 0,
        loadTime: metrics.loadTime
      },
      componentDetails: Object.entries(metrics.renderTimes).map(([name, data]) => ({
        name,
        renderCount: data.count,
        averageRenderTime: data.averageTime,
        maxRenderTime: data.maxTime,
        minRenderTime: data.minTime === Infinity ? 0 : data.minTime
      })),
      memoryTrend: metrics.memoryUsage.slice(-10), // Last 10 measurements
      warnings: state.warnings
    };
  }, [state]);

  // Monitor memory usage periodically
  useEffect(() => {
    if (!state.isMonitoring) return;

    const interval = setInterval(updateMemoryUsage, 5000); // Every 5 seconds
    
    return () => clearInterval(interval);
  }, [state.isMonitoring, updateMemoryUsage]);

  // Record initial load time
  useEffect(() => {
    if (performance.timing && performance.timing.loadEventEnd > 0) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      dispatch({
        type: ACTIONS.SET_LOAD_TIME,
        payload: loadTime
      });
    }
  }, []);

  const contextValue = {
    ...state,
    recordComponentMount,
    recordRenderTime,
    updateMemoryUsage,
    clearWarnings,
    updateSettings,
    getPerformanceReport
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Hook to use performance context
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export default PerformanceContext;