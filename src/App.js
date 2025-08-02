import React from "react";
import TabSystem from "./TabSystem";
import { PerformanceProvider } from './contexts/PerformanceContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PerformanceDashboard from './components/PerformanceDashboard/PerformanceDashboard';

function App() {
  return (
    <ErrorBoundary title="Application Error" message="The application encountered an unexpected error.">
      <PerformanceProvider>
        <div className="App">
          <TabSystem />
          <PerformanceDashboard />
        </div>
      </PerformanceProvider>
    </ErrorBoundary>
  );
}

export default App;
