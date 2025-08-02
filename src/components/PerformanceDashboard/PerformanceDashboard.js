/**
 * Performance Dashboard
 * Development tool for monitoring application performance
 */

import React, { useState, useEffect } from 'react';
import { usePerformance } from '../../contexts/PerformanceContext';
import './PerformanceDashboard.css';

const PerformanceDashboard = () => {
  const { getPerformanceReport, clearWarnings, isMonitoring } = usePerformance();
  const [report, setReport] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setReport(getPerformanceReport());
    }, 2000);

    return () => clearInterval(interval);
  }, [getPerformanceReport, isMonitoring]);

  if (!isMonitoring || process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isVisible) {
    return (
      <button 
        className="performance-toggle"
        onClick={() => setIsVisible(true)}
        title="Show Performance Dashboard"
      >
        📊
      </button>
    );
  }

  if (!report) return null;

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    return `${ms.toFixed(2)}ms`;
  };

  return (
    <div className="performance-dashboard">
      <div className="performance-header">
        <h3>Performance Dashboard</h3>
        <div className="performance-controls">
          <button onClick={clearWarnings} className="btn-clear">
            Clear Warnings
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="btn-close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="performance-content">
        {/* Summary Stats */}
        <div className="performance-section">
          <h4>Summary</h4>
          <div className="performance-stats">
            <div className="stat">
              <span className="stat-label">Components</span>
              <span className="stat-value">{report.summary.totalComponents}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Renders</span>
              <span className="stat-value">{report.summary.totalRenders}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Render Time</span>
              <span className="stat-value">{formatTime(report.summary.averageRenderTime)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Memory Used</span>
              <span className="stat-value">{formatBytes(report.summary.currentMemoryUsage)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Load Time</span>
              <span className="stat-value">{formatTime(report.summary.loadTime || 0)}</span>
            </div>
          </div>
        </div>

        {/* Component Performance */}
        <div className="performance-section">
          <h4>Component Performance</h4>
          <div className="component-list">
            {report.componentDetails
              .sort((a, b) => b.averageRenderTime - a.averageRenderTime)
              .slice(0, 10)
              .map((component) => (
                <div key={component.name} className="component-item">
                  <div className="component-name">{component.name}</div>
                  <div className="component-stats">
                    <span>Renders: {component.renderCount}</span>
                    <span>Avg: {formatTime(component.averageRenderTime)}</span>
                    <span>Max: {formatTime(component.maxRenderTime)}</span>
                  </div>
                  {component.averageRenderTime > 16 && (
                    <div className="performance-warning">Slow</div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Memory Trend */}
        <div className="performance-section">
          <h4>Memory Trend</h4>
          <div className="memory-trend">
            {report.memoryTrend.map((memory, index) => (
              <div 
                key={index}
                className="memory-bar"
                style={{ 
                  height: `${(memory.used / memory.total) * 100}%`,
                  backgroundColor: memory.used / memory.total > 0.8 ? '#ff4444' : '#44ff44'
                }}
                title={`${formatBytes(memory.used)} / ${formatBytes(memory.total)}`}
              />
            ))}
          </div>
        </div>

        {/* Warnings */}
        {report.warnings.length > 0 && (
          <div className="performance-section">
            <h4>Warnings ({report.warnings.length})</h4>
            <div className="warnings-list">
              {report.warnings.slice(-5).map((warning, index) => (
                <div key={index} className={`warning warning-${warning.type}`}>
                  <span className="warning-message">{warning.message}</span>
                  <span className="warning-time">
                    {new Date(warning.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tips */}
        <div className="performance-section">
          <h4>Performance Tips</h4>
          <div className="performance-tips">
            <div className="tip">
              ✅ All components are lazy-loaded for better initial load times
            </div>
            <div className="tip">
              ✅ React.memo is used to prevent unnecessary re-renders
            </div>
            <div className="tip">
              ✅ useMemo and useCallback optimize expensive calculations
            </div>
            <div className="tip">
              ✅ Skeleton loaders improve perceived performance
            </div>
            <div className="tip">
              ✅ Error boundaries prevent crashes from propagating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;