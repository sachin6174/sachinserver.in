/**
 * Development Status Component
 * Shows development server status and auto-reload information
 * Only visible in development mode
 */

import React, { useState, useEffect } from 'react';
import './DevStatus.css';

const DevStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState({
    hotReload: false,
    lastReload: null,
    serverStatus: 'checking'
  });

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    setStatus({
      hotReload: !!module.hot,
      lastReload: new Date(),
      serverStatus: 'connected'
    });

    // Listen for hot reload updates
    if (module.hot) {
      module.hot.addStatusHandler((status) => {
        setStatus(prev => ({
          ...prev,
          lastReload: status === 'idle' ? new Date() : prev.lastReload,
          serverStatus: status === 'idle' ? 'connected' : 'updating'
        }));
      });
    }

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => setIsVisible(false), 3000);
    setIsVisible(true);

    return () => clearTimeout(timer);
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') return null;

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {/* Dev Status Indicator */}
      <div 
        className={`dev-status-indicator ${isVisible ? 'visible' : 'hidden'}`}
        onClick={toggleVisibility}
      >
        <div className="dev-status-header">
          <span className={`status-dot ${status.serverStatus}`}></span>
          <span>Dev Server</span>
        </div>
        
        {isVisible && (
          <div className="dev-status-details">
            <div className="status-item">
              <span>Hot Reload:</span> 
              <span className={status.hotReload ? 'enabled' : 'disabled'}>
                {status.hotReload ? '✅ Enabled' : '❌ Disabled'}
              </span>
            </div>
            
            <div className="status-item">
              <span>Last Update:</span> 
              <span>{status.lastReload?.toLocaleTimeString() || 'Never'}</span>
            </div>
            
            <div className="status-item">
              <span>Server:</span> 
              <span className={`server-status ${status.serverStatus}`}>
                {status.serverStatus}
              </span>
            </div>

            <div className="dev-actions">
              <button onClick={() => window.location.reload()}>
                🔄 Force Reload
              </button>
              <button onClick={() => window.componentRegistry?.refreshRegistry()}>
                🔧 Reload Registry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button (always visible) */}
      <button 
        className="dev-toggle-btn"
        onClick={toggleVisibility}
        title="Toggle dev status"
      >
        🛠️
      </button>
    </>
  );
};

export default DevStatus;