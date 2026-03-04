import React, { useEffect } from "react";
import TabSystem from "./TabSystem";
import { PerformanceProvider } from './contexts/PerformanceContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useWebVitals from './hooks/useWebVitals';
import { resourcePrioritizer, memoryManager } from './utils/performanceEnhancements';
// import PerformanceDashboard from './components/PerformanceDashboard/PerformanceDashboard';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Initialize Core Web Vitals monitoring
  const { vitals, performanceScore, suggestions } = useWebVitals({
    reportToAnalytics: !isDevelopment,
    enableOptimizations: true,
    debug: isDevelopment
  });

  // Initialize performance optimizations
  useEffect(() => {
    // Keep preload list local-only to avoid pulling external font stacks.
    resourcePrioritizer.preloadCriticalResources([]);

    // Start memory monitoring in development
    if (isDevelopment) {
      memoryManager.startMonitoring();
    }

    // Log performance metrics in development
    if (isDevelopment && performanceScore !== null) {
      console.group('🚀 Performance Metrics');
      console.log('Performance Score:', performanceScore);
      console.log('Core Web Vitals:', vitals);
      if (suggestions.length > 0) {
        console.log('Optimization Suggestions:', suggestions);
      }
      console.groupEnd();
    }

    return () => {
      if (isDevelopment) {
        memoryManager.stopMonitoring();
      }
    };
  }, [isDevelopment, performanceScore, vitals, suggestions]);
  
  return (
    <ErrorBoundary title="Application Error" message="The application encountered an unexpected error.">
      {isDevelopment ? (
        <PerformanceProvider>
          <div className="App">
            <TabSystem />
            {/* Performance Dashboard disabled for production */}
            {/* <PerformanceDashboard /> */}
          </div>
        </PerformanceProvider>
      ) : (
        <div className="App">
          <TabSystem />
        </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
