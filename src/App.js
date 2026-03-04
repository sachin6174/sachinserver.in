import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TabSystem from "./TabSystem";
import { PerformanceProvider } from './contexts/PerformanceContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import useWebVitals from './hooks/useWebVitals';
import { resourcePrioritizer, memoryManager } from './utils/performanceEnhancements';

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

  const renderApp = () => (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/leftbrain/about-me" replace />} />
        <Route path="/:tab" element={<TabSystem />} />
        <Route path="/:tab/:item" element={<TabSystem />} />
      </Routes>
    </div>
  );

  return (
    <ErrorBoundary title="Application Error" message="The application encountered an unexpected error.">
      <BrowserRouter>
        {isDevelopment ? (
          <PerformanceProvider>
            {renderApp()}
          </PerformanceProvider>
        ) : renderApp()}
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
