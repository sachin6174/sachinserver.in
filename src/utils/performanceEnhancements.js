/**
 * Advanced Performance Enhancement Utilities
 * Production-ready optimizations for Core Web Vitals and runtime performance
 */

/**
 * Advanced image optimization with WebP support and lazy loading
 */
export class ImageOptimizer {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = new Set();
    this.observer = null;
    this.initIntersectionObserver();
  }

  initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );
    }
  }

  /**
   * Create optimized image component with WebP support
   */
  createOptimizedImage = ({
    src,
    webpSrc,
    alt,
    width,
    height,
    className = '',
    lazy = true,
    priority = false
  }) => {
    return {
      src: this.getBestFormat(src, webpSrc),
      alt,
      width,
      height,
      className: `${className} optimized-image`,
      loading: priority ? 'eager' : 'lazy',
      decoding: 'async',
      style: {
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }
    };
  };

  getBestFormat(src, webpSrc) {
    if (webpSrc && this.supportsWebP()) {
      return webpSrc;
    }
    return src;
  }

  supportsWebP() {
    if (this.cache.has('webp-support')) {
      return this.cache.get('webp-support');
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    const supported = canvas.toDataURL('image/webp').indexOf('webp') !== -1;
    this.cache.set('webp-support', supported);
    
    return supported;
  }

  loadImage(img) {
    const src = img.dataset.src || img.src;
    if (src && img.src !== src) {
      img.src = src;
      img.classList.add('loaded');
    }
  }

  preloadCriticalImages(urls) {
    urls.forEach(url => {
      if (!this.preloadQueue.has(url)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
        this.preloadQueue.add(url);
      }
    });
  }
}

/**
 * Critical Resource Prioritization
 */
export class ResourcePrioritizer {
  constructor() {
    this.criticalResources = new Set();
    this.deferredResources = new Set();
  }

  preloadCriticalResources(resources) {
    resources.forEach(({ href, as, type }) => {
      if (!this.criticalResources.has(href)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        this.criticalResources.add(href);
      }
    });
  }

  deferNonCriticalResources(resources) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.loadDeferredResources(resources);
      });
    } else {
      this.loadDeferredResources(resources);
    }
  }

  loadDeferredResources(resources) {
    requestIdleCallback(() => {
      resources.forEach(({ href, as, type }) => {
        if (!this.deferredResources.has(href)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = href;
          link.as = as;
          if (type) link.type = type;
          document.head.appendChild(link);
          this.deferredResources.add(href);
        }
      });
    }, { timeout: 2000 });
  }
}

/**
 * Advanced Bundle Optimization
 */
export class BundleOptimizer {
  constructor() {
    this.chunkLoadCache = new Map();
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  /**
   * Enhanced chunk loading with intelligent retry and caching
   */
  loadChunkWithRetry = async (chunkId, importFn) => {
    const cacheKey = `chunk-${chunkId}`;
    
    if (this.chunkLoadCache.has(cacheKey)) {
      return this.chunkLoadCache.get(cacheKey);
    }

    let attempts = 0;
    
    const loadChunk = async () => {
      try {
        const result = await importFn();
        this.chunkLoadCache.set(cacheKey, result);
        return result;
      } catch (error) {
        attempts++;
        
        if (error.name === 'ChunkLoadError' && attempts < this.retryAttempts) {
          // Clear browser cache if chunk load fails
          if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'CLEAR_CHUNK_CACHE',
              chunkId
            });
          }
          
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempts));
          return loadChunk();
        }
        
        throw error;
      }
    };

    return loadChunk();
  };
}

/**
 * Core Web Vitals Optimization
 */
export class CoreWebVitalsOptimizer {
  constructor() {
    this.vitalsData = {};
    this.observers = [];
    this.init();
  }

  init() {
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
  }

  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.vitalsData.LCP = lastEntry.startTime;
        this.reportVital('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.vitalsData.FID = entry.processingStart - entry.startTime;
          this.reportVital('FID', this.vitalsData.FID);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.vitalsData.CLS = clsValue;
        this.reportVital('CLS', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            this.vitalsData.FCP = entry.startTime;
            this.reportVital('FCP', entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.responseStart > 0) {
            this.vitalsData.TTFB = entry.responseStart - entry.requestStart;
            this.reportVital('TTFB', this.vitalsData.TTFB);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  reportVital(name, value) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${Math.round(value)}ms`);
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', name, {
        value: Math.round(value),
        metric_id: `${name}-${Date.now()}`
      });
    }
  }

  getVitalsReport() {
    return { ...this.vitalsData };
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Memory Management Enhancement
 */
export class MemoryManager {
  constructor() {
    this.memoryThreshold = 50; // MB
    this.monitoringInterval = null;
    this.cleanupCallbacks = new Set();
  }

  startMonitoring() {
    if ('performance' in window && 'memory' in performance) {
      this.monitoringInterval = setInterval(() => {
        const memory = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        
        if (memory > this.memoryThreshold) {
          this.triggerCleanup();
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Memory usage: ${memory}MB`);
        }
      }, 5000);
    }
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  addCleanupCallback(callback) {
    this.cleanupCallbacks.add(callback);
  }

  removeCleanupCallback(callback) {
    this.cleanupCallbacks.delete(callback);
  }

  triggerCleanup() {
    this.cleanupCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Cleanup callback failed:', error);
      }
    });
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
}

// Initialize global instances
export const imageOptimizer = new ImageOptimizer();
export const resourcePrioritizer = new ResourcePrioritizer();
export const bundleOptimizer = new BundleOptimizer();
export const coreWebVitalsOptimizer = new CoreWebVitalsOptimizer();
export const memoryManager = new MemoryManager();

// Production optimizations
if (process.env.NODE_ENV === 'production') {
  // Remove console statements
  ['log', 'warn', 'error', 'debug', 'info', 'trace'].forEach(method => {
    if (method !== 'error' && method !== 'warn') {
      console[method] = () => {};
    }
  });

  // Start memory monitoring
  memoryManager.startMonitoring();
}

export default {
  imageOptimizer,
  resourcePrioritizer,
  bundleOptimizer,
  coreWebVitalsOptimizer,
  memoryManager
};