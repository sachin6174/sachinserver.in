/**
 * Higher-Order Component for Error Handling
 * Provides consistent error handling across components
 * Implements error recovery and reporting mechanisms
 */

import React, { useState, useEffect, forwardRef } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import eventBus, { Events } from '../services/EventBus';

/**
 * HOC for adding error handling capabilities to components
 */
export const withErrorHandling = (options = {}) => {
  return (WrappedComponent) => {
    const ComponentWithErrorHandling = forwardRef((props, ref) => {
      const [hasError, setHasError] = useState(false);
      const [errorInfo, setErrorInfo] = useState(null);
      const [retryCount, setRetryCount] = useState(0);

      const {
        maxRetries = 3,
        retryDelay = 1000,
        onError,
        onRetry,
        onMaxRetriesReached,
        errorFallback: CustomErrorFallback,
        resetOnPropsChange = true,
        logErrors = true
      } = options;

      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

      // Reset error state when props change
      useEffect(() => {
        if (resetOnPropsChange && hasError) {
          setHasError(false);
          setErrorInfo(null);
          setRetryCount(0);
        }
      }, [props, resetOnPropsChange, hasError]);

      const handleError = (error, errorDetails = {}) => {
        const errorEvent = {
          error,
          componentName,
          props: Object.keys(props),
          retryCount,
          ...errorDetails,
          timestamp: Date.now()
        };

        setHasError(true);
        setErrorInfo(errorEvent);

        if (logErrors) {
          console.error(`[Error] in ${componentName}:`, error);
        }

        // Emit error event
        eventBus.emit(Events.COMPONENT_ERROR, errorEvent);

        // Call custom error handler
        if (onError) {
          onError(error, errorEvent);
        }
      };

      const handleRetry = () => {
        if (retryCount < maxRetries) {
          const newRetryCount = retryCount + 1;
          setRetryCount(newRetryCount);

          if (onRetry) {
            onRetry(newRetryCount, errorInfo);
          }

          // Delay retry
          setTimeout(() => {
            setHasError(false);
            setErrorInfo(null);
          }, retryDelay * newRetryCount);

        } else {
          if (onMaxRetriesReached) {
            onMaxRetriesReached(errorInfo);
          }
        }
      };

      const ErrorFallback = CustomErrorFallback || DefaultErrorFallback;

      if (hasError) {
        return (
          <ErrorFallback
            error={errorInfo?.error}
            errorInfo={errorInfo}
            onRetry={retryCount < maxRetries ? handleRetry : null}
            retryCount={retryCount}
            maxRetries={maxRetries}
            componentName={componentName}
          />
        );
      }

      // Enhanced props with error handling
      const enhancedProps = {
        ...props,
        onError: handleError,
        hasError,
        retryCount
      };

      return <WrappedComponent {...enhancedProps} ref={ref} />;
    });

    ComponentWithErrorHandling.displayName = 
      `withErrorHandling(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithErrorHandling;
  };
};

/**
 * Default error fallback component
 */
const DefaultErrorFallback = ({ 
  error, 
  onRetry, 
  retryCount, 
  maxRetries, 
  componentName 
}) => (
  <div className="error-fallback">
    <h3>Something went wrong in {componentName}</h3>
    <p>{error?.message || 'An unexpected error occurred'}</p>
    {onRetry && (
      <button onClick={onRetry} className="retry-button">
        Retry ({retryCount}/{maxRetries})
      </button>
    )}
  </div>
);

/**
 * HOC for wrapping components with error boundary
 */
export const withErrorBoundary = (errorBoundaryProps = {}) => {
  return (WrappedComponent) => {
    const ComponentWithErrorBoundary = (props) => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      
      return (
        <ErrorBoundary
          title={`Error in ${componentName}`}
          {...errorBoundaryProps}
        >
          <WrappedComponent {...props} />
        </ErrorBoundary>
      );
    };

    ComponentWithErrorBoundary.displayName = 
      `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithErrorBoundary;
  };
};

/**
 * HOC for async error handling
 */
export const withAsyncErrorHandling = (options = {}) => {
  return (WrappedComponent) => {
    const ComponentWithAsyncErrorHandling = forwardRef((props, ref) => {
      const [asyncErrors, setAsyncErrors] = useState([]);
      const [isHandlingError, setIsHandlingError] = useState(false);

      const {
        onAsyncError,
        maxAsyncErrors = 5,
        clearErrorsAfter = 10000 // 10 seconds
      } = options;

      const handleAsyncError = (error, context = {}) => {
        const errorEvent = {
          error,
          context,
          timestamp: Date.now(),
          id: Date.now().toString(36) + Math.random().toString(36).substr(2)
        };

        setAsyncErrors(prev => {
          const updated = [errorEvent, ...prev].slice(0, maxAsyncErrors);
          return updated;
        });

        setIsHandlingError(true);

        // Emit async error event
        eventBus.emit(Events.COMPONENT_ERROR, {
          ...errorEvent,
          type: 'async',
          componentName: WrappedComponent.displayName || WrappedComponent.name
        });

        if (onAsyncError) {
          onAsyncError(error, errorEvent);
        }

        // Clear error handling state
        setTimeout(() => {
          setIsHandlingError(false);
        }, 1000);

        // Auto-clear errors after specified time
        setTimeout(() => {
          setAsyncErrors(prev => prev.filter(err => err.id !== errorEvent.id));
        }, clearErrorsAfter);
      };

      const clearAsyncErrors = () => {
        setAsyncErrors([]);
      };

      const enhancedProps = {
        ...props,
        onAsyncError: handleAsyncError,
        asyncErrors,
        clearAsyncErrors,
        isHandlingError
      };

      return <WrappedComponent {...enhancedProps} ref={ref} />;
    });

    ComponentWithAsyncErrorHandling.displayName = 
      `withAsyncErrorHandling(${WrappedComponent.displayName || WrappedComponent.name})`;

    return ComponentWithAsyncErrorHandling;
  };
};

/**
 * Custom hook for error handling in functional components
 */
export const useErrorHandler = (options = {}) => {
  const [error, setError] = useState(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const {
    onError,
    autoRecover = false,
    recoveryDelay = 3000
  } = options;

  const handleError = (err, context = {}) => {
    setError({ error: err, context, timestamp: Date.now() });

    if (onError) {
      onError(err, context);
    }

    eventBus.emit(Events.COMPONENT_ERROR, {
      error: err,
      context,
      timestamp: Date.now()
    });

    if (autoRecover) {
      setIsRecovering(true);
      setTimeout(() => {
        setError(null);
        setIsRecovering(false);
      }, recoveryDelay);
    }
  };

  const clearError = () => {
    setError(null);
    setIsRecovering(false);
  };

  const withErrorHandling = (asyncFn) => {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (err) {
        handleError(err, { function: asyncFn.name, args });
        throw err;
      }
    };
  };

  return {
    error,
    isRecovering,
    handleError,
    clearError,
    withErrorHandling
  };
};

export default withErrorHandling;