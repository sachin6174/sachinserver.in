import React from "react";
import TabSystem from "./TabSystem";
import { PerformanceProvider } from './contexts/PerformanceContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// import PerformanceDashboard from './components/PerformanceDashboard/PerformanceDashboard';

function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
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
