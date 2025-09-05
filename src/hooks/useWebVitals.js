/**
 * Custom Hook for Core Web Vitals Monitoring
 * Provides real-time performance metrics monitoring and optimization
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Web Vitals monitoring hook with automatic optimization suggestions
 */
export const useWebVitals = (options = {}) => {
  const {
    reportToAnalytics = false,
    enableOptimizations = true,
    debug = process.env.NODE_ENV === 'development'
  } = options;

  const [vitals, setVitals] = useState({
    LCP: null,  // Largest Contentful Paint
    FID: null,  // First Input Delay
    CLS: null,  // Cumulative Layout Shift
    FCP: null,  // First Contentful Paint
    TTFB: null, // Time to First Byte
    INP: null   // Interaction to Next Paint
  });

  const [suggestions, setSuggestions] = useState([]);
  const [performanceScore, setPerformanceScore] = useState(null);

  // Report vital to analytics
  const reportVital = useCallback((name, value, id) => {
    if (debug) {
      console.log(`${name}: ${Math.round(value)}ms`);
    }

    if (reportToAnalytics) {
      // Send to Google Analytics 4
      if (window.gtag) {
        window.gtag('event', name, {
          value: Math.round(value),
          metric_id: id,
          custom_parameter_1: 'performance'
        });
      }

      // Send to custom analytics endpoint
      if (window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track('Web Vital', {
          metric: name,
          value: Math.round(value),
          id: id
        });
      }
    }

    // Update local state
    setVitals(prev => ({
      ...prev,
      [name]: Math.round(value)
    }));
  }, [debug, reportToAnalytics]);

  // Calculate performance score
  const calculatePerformanceScore = useCallback((vitalsData) => {
    let score = 100;
    const weights = {
      LCP: 25,  // Weight for LCP
      FID: 25,  // Weight for FID
      CLS: 25,  // Weight for CLS
      FCP: 15,  // Weight for FCP
      TTFB: 10  // Weight for TTFB
    };

    const thresholds = {
      LCP: { good: 2500, needs_improvement: 4000 },
      FID: { good: 100, needs_improvement: 300 },
      CLS: { good: 0.1, needs_improvement: 0.25 },
      FCP: { good: 1800, needs_improvement: 3000 },
      TTFB: { good: 800, needs_improvement: 1800 }
    };

    Object.entries(vitalsData).forEach(([metric, value]) => {
      if (value !== null && thresholds[metric]) {
        const threshold = thresholds[metric];
        const weight = weights[metric] || 0;

        if (value <= threshold.good) {
          // Good - no penalty
        } else if (value <= threshold.needs_improvement) {
          // Needs improvement - 50% penalty
          score -= weight * 0.5;
        } else {
          // Poor - full penalty
          score -= weight;
        }
      }
    });

    return Math.max(0, Math.round(score));
  }, []);

  // Generate optimization suggestions
  const generateSuggestions = useCallback((vitalsData) => {
    const newSuggestions = [];

    // LCP optimization suggestions
    if (vitalsData.LCP > 2500) {
      newSuggestions.push({
        metric: 'LCP',
        severity: vitalsData.LCP > 4000 ? 'high' : 'medium',
        suggestion: 'Optimize Largest Contentful Paint',
        recommendations: [
          'Optimize critical images with WebP format',
          'Implement critical CSS inlining',
          'Use CDN for static assets',
          'Preload critical resources'
        ]
      });
    }

    // FID optimization suggestions
    if (vitalsData.FID > 100) {
      newSuggestions.push({
        metric: 'FID',
        severity: vitalsData.FID > 300 ? 'high' : 'medium',
        suggestion: 'Improve First Input Delay',
        recommendations: [
          'Break up long-running tasks',
          'Use code splitting to reduce bundle size',
          'Implement proper loading states',
          'Optimize third-party scripts'
        ]
      });
    }

    // CLS optimization suggestions
    if (vitalsData.CLS > 0.1) {
      newSuggestions.push({
        metric: 'CLS',
        severity: vitalsData.CLS > 0.25 ? 'high' : 'medium',
        suggestion: 'Reduce Cumulative Layout Shift',
        recommendations: [
          'Set explicit dimensions for images',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use aspect-ratio CSS property'
        ]
      });
    }

    // FCP optimization suggestions
    if (vitalsData.FCP > 1800) {
      newSuggestions.push({
        metric: 'FCP',
        severity: vitalsData.FCP > 3000 ? 'high' : 'medium',
        suggestion: 'Optimize First Contentful Paint',
        recommendations: [
          'Minimize render-blocking resources',
          'Optimize font loading strategy',
          'Reduce server response times',
          'Enable text compression'
        ]
      });
    }

    // TTFB optimization suggestions
    if (vitalsData.TTFB > 800) {
      newSuggestions.push({
        metric: 'TTFB',
        severity: vitalsData.TTFB > 1800 ? 'high' : 'medium',
        suggestion: 'Improve Time to First Byte',
        recommendations: [
          'Optimize server response time',
          'Use CDN for content delivery',
          'Enable server-side caching',
          'Minimize redirects'
        ]
      });
    }

    setSuggestions(newSuggestions);
  }, []);

  // Initialize web vitals monitoring
  useEffect(() => {
    let observers = [];

    // LCP Observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          reportVital('LCP', lastEntry.startTime, lastEntry.id || 'lcp');
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            reportVital('FID', entry.processingStart - entry.startTime, entry.id || 'fid');
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // CLS Observer
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          reportVital('CLS', clsValue, 'cls');
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }

      // FCP Observer
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              reportVital('FCP', entry.startTime, 'fcp');
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Navigation Timing for TTFB
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (entry.responseStart > 0) {
              reportVital('TTFB', entry.responseStart - entry.requestStart, 'ttfb');
            }
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        observers.push(navigationObserver);
      } catch (e) {
        console.warn('Navigation observer failed:', e);
      }

      // INP Observer (if supported)
      try {
        const inpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            reportVital('INP', entry.processingStart - entry.startTime, entry.id || 'inp');
          });
        });
        inpObserver.observe({ entryTypes: ['event'] });
        observers.push(inpObserver);
      } catch (e) {
        // INP is not widely supported yet
        console.log('INP observer not supported');
      }
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [reportVital]);

  // Update performance score and suggestions when vitals change
  useEffect(() => {
    if (Object.values(vitals).some(value => value !== null)) {
      const score = calculatePerformanceScore(vitals);
      setPerformanceScore(score);

      if (enableOptimizations) {
        generateSuggestions(vitals);
      }
    }
  }, [vitals, calculatePerformanceScore, generateSuggestions, enableOptimizations]);

  return {
    vitals,
    suggestions,
    performanceScore,
    isGoodPerformance: performanceScore >= 90,
    needsImprovement: performanceScore < 90 && performanceScore >= 50,
    isPoorPerformance: performanceScore < 50
  };
};

/**
 * Hook for monitoring specific component performance
 */
export const useComponentVitals = (componentName) => {
  const [renderTime, setRenderTime] = useState(null);
  const [mountTime, setMountTime] = useState(null);
  const [rerenderCount, setRerenderCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    setMountTime(startTime);

    return () => {
      const endTime = performance.now();
      setRenderTime(endTime - startTime);
    };
  }, []);

  useEffect(() => {
    setRerenderCount(prev => prev + 1);
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && rerenderCount > 1) {
      const currentTime = performance.now();
      const timeSinceMount = currentTime - mountTime;
      
      if (timeSinceMount < 16.67) { // Less than 60fps
        console.warn(`${componentName}: Fast re-render detected (${timeSinceMount.toFixed(2)}ms)`);
      }
    }
  }, [rerenderCount, mountTime, componentName]);

  return {
    renderTime,
    mountTime,
    rerenderCount,
    componentName
  };
};

export default useWebVitals;