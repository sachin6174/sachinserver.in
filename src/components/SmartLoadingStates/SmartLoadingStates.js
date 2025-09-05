import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Alert } from '../../ui';
import './SmartLoadingStates.css';

const SmartLoadingStates = ({ 
  isLoading, 
  error, 
  children, 
  loadingText = 'Loading content...',
  loadingType = 'content',
  retryAction,
  loadingDelay = 200,
  minLoadingTime = 800
}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let delayTimer;
    let minTimeTimer;

    if (isLoading) {
      setStartTime(Date.now());
      
      // Delay showing loading state to avoid flicker
      delayTimer = setTimeout(() => {
        setShowLoading(true);
      }, loadingDelay);
    } else if (showLoading && startTime) {
      // Ensure minimum loading time for smooth UX
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      minTimeTimer = setTimeout(() => {
        setShowLoading(false);
        setStartTime(null);
      }, remainingTime);
    } else {
      setShowLoading(false);
      setStartTime(null);
    }

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(minTimeTimer);
    };
  }, [isLoading, loadingDelay, minLoadingTime, showLoading, startTime]);

  // Error state
  if (error) {
    return (
      <div className="smart-loading-error">
        <Alert 
          variant="error" 
          title="Something went wrong"
          className="error-alert"
        >
          <div className="error-content">
            <p className="error-message">
              {typeof error === 'string' ? error : 'Failed to load content. Please try again.'}
            </p>
            {retryAction && (
              <button 
                className="retry-button"
                onClick={retryAction}
                aria-label="Retry loading content"
              >
                🔄 Try Again
              </button>
            )}
          </div>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (showLoading) {
    return (
      <div className={`smart-loading-container smart-loading-${loadingType}`}>
        {loadingType === 'content' && (
          <div className="content-loading">
            <div className="content-skeleton">
              <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-title"></div>
              </div>
              <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line medium"></div>
              </div>
            </div>
            <div className="loading-indicator">
              <LoadingSpinner 
                size="small" 
                variant="pulse" 
                text={loadingText}
                showText={true}
              />
            </div>
          </div>
        )}

        {loadingType === 'tool' && (
          <div className="tool-loading">
            <div className="tool-skeleton">
              <div className="skeleton-toolbar">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
              </div>
              <div className="skeleton-workspace">
                <div className="skeleton-input-area"></div>
                <div className="skeleton-output-area"></div>
              </div>
            </div>
            <div className="loading-indicator">
              <LoadingSpinner 
                size="medium" 
                variant="bars" 
                text={loadingText}
                showText={true}
              />
            </div>
          </div>
        )}

        {loadingType === 'navigation' && (
          <div className="navigation-loading">
            <div className="nav-skeleton">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="skeleton-nav-item">
                  <div className="skeleton-nav-icon"></div>
                  <div className="skeleton-nav-text"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loadingType === 'simple' && (
          <div className="simple-loading">
            <LoadingSpinner 
              size="medium" 
              variant="default" 
              text={loadingText}
              showText={true}
            />
          </div>
        )}
      </div>
    );
  }

  // Success state - render children
  return <>{children}</>;
};

// Higher-order component for easy integration
export const withSmartLoading = (WrappedComponent, loadingConfig = {}) => {
  const ComponentWithSmartLoading = (props) => {
    const { isLoading, error, ...restProps } = props;
    
    return (
      <SmartLoadingStates 
        isLoading={isLoading}
        error={error}
        {...loadingConfig}
      >
        <WrappedComponent {...restProps} />
      </SmartLoadingStates>
    );
  };

  ComponentWithSmartLoading.displayName = 
    `withSmartLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithSmartLoading;
};

export default SmartLoadingStates;