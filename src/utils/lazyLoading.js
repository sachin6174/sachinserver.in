/**
 * Lazy Loading Utilities
 * Provides optimized component lazy loading with error boundaries and loading states
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader/SkeletonLoader';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

/**
 * Enhanced lazy loading with built-in error handling and loading states
 */
export const createLazyComponent = (importFunction, options = {}) => {
  const {
    fallback = <SkeletonLoader type="default" />,
    errorFallback = null,
    retryAttempts = 3,
    retryDelay = 1000,
    componentName = 'LazyComponent',
    skeletonType = 'default'
  } = options;

  // Create lazy component with retry logic
  const LazyComponent = lazy(() => {
    let attempts = 0;
    
    const loadWithRetry = async () => {
      try {
        return await importFunction();
      } catch (error) {
        attempts++;
        
        // If it's a chunk load error and we haven't exceeded retry attempts
        if (error.name === 'ChunkLoadError' && attempts < retryAttempts) {
          console.warn(`Chunk load failed for ${componentName}, attempt ${attempts}/${retryAttempts}`);
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
          return loadWithRetry();
        }
        
        throw error;
      }
    };
    
    return loadWithRetry();
  });

  // Return wrapped component with Suspense and ErrorBoundary
  const WrappedLazyComponent = (props) => (
    <ErrorBoundary 
      title={`Failed to load ${componentName}`}
      message="This component failed to load. Please try refreshing the page."
    >
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );

  WrappedLazyComponent.displayName = `Lazy(${componentName})`;
  
  return WrappedLazyComponent;
};

/**
 * Preload a lazy component
 */
export const preloadComponent = (importFunction) => {
  return importFunction();
};

/**
 * Create lazy-loaded navigation items
 */
export const createLazyNavigationItems = (itemsConfig) => {
  return itemsConfig.map(item => ({
    ...item,
    description: item.lazy 
      ? createLazyComponent(
          item.importFunction, 
          { 
            componentName: item.componentName || item.label,
            fallback: <LoadingSpinner size="small" text={`Loading ${item.label}...`} />
          }
        )({}) 
      : item.description
  }));
};

/**
 * Intersection Observer for lazy loading components when they come into view
 */
export const useLazyIntersection = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
};

export default createLazyComponent;