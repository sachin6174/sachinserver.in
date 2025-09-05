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
    // Preload critical resources
    resourcePrioritizer.preloadCriticalResources([
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap', as: 'style', type: 'text/css' },
      { href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap', as: 'style', type: 'text/css' }
    ]);

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
