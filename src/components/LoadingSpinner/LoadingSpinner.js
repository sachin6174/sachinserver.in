/**
 * Loading Spinner Component
 * Reusable loading indicator with different variants
 * Implements consistent loading UI across the application
 */

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  variant = 'default', 
  text = 'Loading...', 
  showText = true,
  className = '',
  color,
  inline = false
}) => {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    `loading-spinner--${variant}`,
    inline ? 'loading-spinner--inline' : '',
    className
  ].filter(Boolean).join(' ');

  const spinnerStyle = color ? { '--spinner-color': color } : {};

  if (variant === 'dots') {
    return (
      <div className={spinnerClasses} style={spinnerStyle}>
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
        {showText && <span className="loading-text">{text}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={spinnerClasses} style={spinnerStyle}>
        <div className="loading-pulse"></div>
        {showText && <span className="loading-text">{text}</span>}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={spinnerClasses} style={spinnerStyle}>
        <div className="loading-bars">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
        {showText && <span className="loading-text">{text}</span>}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={spinnerClasses} style={spinnerStyle}>
      <div className="loading-circle">
        <div className="loading-circle-inner"></div>
      </div>
      {showText && <span className="loading-text">{text}</span>}
    </div>
  );
};

// Higher-order component for adding loading state
export const withLoading = (WrappedComponent, loadingProps = {}) => {
  const ComponentWithLoading = ({ isLoading, ...props }) => {
    if (isLoading) {
      return <LoadingSpinner {...loadingProps} />;
    }
    return <WrappedComponent {...props} />;
  };

  ComponentWithLoading.displayName = 
    `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithLoading;
};

// Overlay loading component
export const LoadingOverlay = ({ 
  isVisible, 
  children, 
  spinnerProps = {},
  className = '',
  style = {} 
}) => (
  <div 
    className={`loading-overlay ${className}`} 
    style={{ position: 'relative', ...style }}
  >
    {children}
    {isVisible && (
      <div className="loading-overlay-backdrop">
        <LoadingSpinner {...spinnerProps} />
      </div>
    )}
  </div>
);

export default LoadingSpinner;