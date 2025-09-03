/**
 * Error Boundary Component
 * Implements React Error Boundary pattern for graceful error handling
 * Follows Single Responsibility Principle for error management
 */

import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Store error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Report error to monitoring service in production
    if (process.env.NODE_ENV === 'production' && this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    });
  };

  handleReportIssue = () => {
    const errorReport = {
      error: this.state.error?.message || 'Unknown error',
      stack: this.state.error?.stack || 'No stack trace',
      componentStack: this.state.errorInfo?.componentStack || 'No component stack',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      errorId: this.state.errorId
    };

    // Copy error report to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => {
        alert('Error report copied to clipboard. Please paste it when reporting the issue.');
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = JSON.stringify(errorReport, null, 2);
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Error report copied to clipboard. Please paste it when reporting the issue.');
      });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback support
      if (this.props.fallback) {
        const { error, errorInfo, errorId } = this.state;
        const fallback = this.props.fallback;
        if (typeof fallback === 'function') {
          return fallback({ error, errorInfo, reset: this.handleRetry, errorId });
        }
        return fallback;
      }
      // Custom fallback UI based on error type
      const isChunkLoadError = this.state.error?.name === 'ChunkLoadError';
      const isNetworkError = this.state.error?.message?.includes('fetch') || 
                            this.state.error?.message?.includes('network');

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              {isChunkLoadError || isNetworkError ? '🌐' : '⚠️'}
            </div>
            
            <h2 className="error-title">
              {this.props.title || (isChunkLoadError ? 'Loading Error' : 'Something went wrong')}
            </h2>
            
            <p className="error-message">
              {isChunkLoadError 
                ? 'Failed to load application resources. This usually happens after an update.'
                : isNetworkError 
                ? 'Network connection issue. Please check your internet connection.'
                : this.props.message || 'An unexpected error occurred while rendering this component.'
              }
            </p>

            <div className="error-actions">
              {(isChunkLoadError || isNetworkError) && (
                <button 
                  className="error-button error-button-primary"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              )}
              
              <button 
                className="error-button error-button-secondary"
                onClick={this.handleRetry}
              >
                Try Again
              </button>

              {process.env.NODE_ENV === 'development' && (
                <button 
                  className="error-button error-button-outline"
                  onClick={this.handleReportIssue}
                >
                  Copy Error Details
                </button>
              )}
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <div className="error-stack">
                  <h4>Error:</h4>
                  <pre>{this.state.error.toString()}</pre>
                  
                  <h4>Component Stack:</h4>
                  <pre>{this.state.errorInfo?.componentStack}</pre>
                  
                  <h4>Error Stack:</h4>
                  <pre>{this.state.error.stack}</pre>
                </div>
              </details>
            )}

            <div className="error-id">
              Error ID: {this.state.errorId}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const ComponentWithErrorBoundary = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithErrorBoundary;
};

export default ErrorBoundary;
