/**
 * Enhanced Suspense Wrapper
 * Provides better loading states and error handling for lazy-loaded components
 * Implements progressive loading and timeout handling
 */

import React, { Suspense, useState, useEffect, useRef } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useEventListener } from '../../hooks/useEventBus';
import { Events } from '../../services/EventBus';
import './SuspenseWrapper.css';

/**
 * Progressive Loading Component
 * Shows different states based on loading time
 */
const ProgressiveLoader = ({ 
  text = 'Loading...', 
  showProgress = true,
  timeout = 10000,
  onTimeout 
}) => {
  const [phase, setPhase] = useState('initial'); // initial -> loading -> slow -> timeout
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const timers = [];

    // Phase 1: Show spinner immediately
    timers.push(setTimeout(() => setPhase('loading'), 100));

    // Phase 2: Show slow loading message after 2 seconds
    timers.push(setTimeout(() => setPhase('slow'), 2000));

    // Phase 3: Show timeout after specified time
    if (timeout > 0) {
      timers.push(setTimeout(() => {
        setPhase('timeout');
        if (onTimeout) {
          onTimeout();
        }
      }, timeout));
    }

    // Progress simulation
    if (showProgress) {
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progressPercent = Math.min((elapsed / timeout) * 100, 95);
        setProgress(progressPercent);
      }, 100);
      
      timers.push(progressInterval);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [timeout, onTimeout, showProgress]);

  const getLoadingContent = () => {
    switch (phase) {
      case 'initial':
        return null;
        
      case 'loading':
        return (
          <div className="progressive-loader loading">
            <LoadingSpinner variant="default" />
            <span className="loading-text">{text}</span>
            {showProgress && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        );
        
      case 'slow':
        return (
          <div className="progressive-loader slow">
            <LoadingSpinner variant="pulse" />
            <span className="loading-text">This is taking longer than expected...</span>
            <span className="loading-subtext">Please wait while we load the content</span>
            {showProgress && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        );
        
      case 'timeout':
        return (
          <div className="progressive-loader timeout">
            <div className="timeout-icon">⏱️</div>
            <span className="loading-text">Loading is taking too long</span>
            <span className="loading-subtext">
              The component might be experiencing issues
            </span>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        );
        
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className="progressive-loader-container">
      {getLoadingContent()}
    </div>
  );
};

/**
 * Skeleton Loading Component
 * Shows content placeholders while loading
 */
export const SkeletonLoader = ({ 
  type = 'default',
  lines = 3,
  height = '1rem',
  className = ''
}) => {
  const getSkeletonContent = () => {
    switch (type) {
      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton-header" />
            <div className="skeleton-content">
              {Array.from({ length: lines }, (_, i) => (
                <div 
                  key={i} 
                  className="skeleton-line" 
                  style={{ 
                    height,
                    width: i === lines - 1 ? '60%' : '100%'
                  }} 
                />
              ))}
            </div>
          </div>
        );
        
      case 'list':
        return (
          <div className="skeleton-list">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="skeleton-list-item">
                <div className="skeleton-avatar" />
                <div className="skeleton-content">
                  <div className="skeleton-line" style={{ width: '70%', height }} />
                  <div className="skeleton-line" style={{ width: '40%', height: '0.8rem' }} />
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'grid':
        return (
          <div className="skeleton-grid">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="skeleton-grid-item">
                <div className="skeleton-image" />
                <div className="skeleton-line" style={{ height, margin: '0.5rem 0' }} />
                <div className="skeleton-line" style={{ height: '0.8rem', width: '60%' }} />
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <div className="skeleton-default">
            {Array.from({ length: lines }, (_, i) => (
              <div 
                key={i} 
                className="skeleton-line" 
                style={{ 
                  height,
                  width: i === lines - 1 ? '75%' : '100%',
                  marginBottom: '0.5rem'
                }} 
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`skeleton-loader ${className}`}>
      {getSkeletonContent()}
    </div>
  );
};

/**
 * Enhanced Suspense Wrapper
 */
export const SuspenseWrapper = ({
  children,
  fallback,
  errorFallback,
  loadingType = 'spinner', // 'spinner', 'skeleton', 'progressive'
  loadingProps = {},
  onLoadStart,
  onLoadEnd,
  onError,
  timeout = 15000,
  identifier = 'component'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadStartTime] = useState(Date.now());

  // Listen for chunk load errors
  useEventListener(Events.ERROR_CHUNK_LOAD, (error) => {
    if (error.component === identifier) {
      setHasError(true);
      if (onError) {
        onError(error);
      }
    }
  });

  useEffect(() => {
    if (onLoadStart) {
      onLoadStart();
    }

    return () => {
      if (onLoadEnd) {
        const loadTime = Date.now() - loadStartTime;
        onLoadEnd(loadTime);
      }
    };
  }, [onLoadStart, onLoadEnd, loadStartTime]);

  const handleTimeout = () => {
    console.warn(`[SuspenseWrapper] Loading timeout for ${identifier}`);
    setHasError(true);
  };

  const getLoadingComponent = () => {
    if (fallback) {
      return fallback;
    }

    switch (loadingType) {
      case 'skeleton':
        return <SkeletonLoader {...loadingProps} />;
        
      case 'progressive':
        return (
          <ProgressiveLoader
            {...loadingProps}
            timeout={timeout}
            onTimeout={handleTimeout}
          />
        );
        
      case 'spinner':
      default:
        return <LoadingSpinner {...loadingProps} />;
    }
  };

  const CustomErrorFallback = errorFallback || (({ error, retry }) => (
    <div className="suspense-error-fallback">
      <h3>Failed to load component</h3>
      <p>{error?.message || 'Component could not be loaded'}</p>
      {retry && (
        <button onClick={retry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  ));

  if (hasError) {
    return (
      <CustomErrorFallback 
        error={{ message: `Failed to load ${identifier}` }}
        retry={() => {
          setHasError(false);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <ErrorBoundary
      title={`Error loading ${identifier}`}
      onError={(error) => {
        setHasError(true);
        if (onError) {
          onError(error);
        }
      }}
    >
      <Suspense
        fallback={
          <div className="suspense-fallback">
            {getLoadingComponent()}
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * HOC for wrapping components with suspense
 */
export const withSuspense = (options = {}) => {
  return (WrappedComponent) => {
    const ComponentWithSuspense = (props) => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      
      return (
        <SuspenseWrapper
          identifier={componentName}
          {...options}
        >
          <WrappedComponent {...props} />
        </SuspenseWrapper>
      );
    };

    ComponentWithSuspense.displayName = 
      `withSuspense(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithSuspense;
  };
};

export default SuspenseWrapper;