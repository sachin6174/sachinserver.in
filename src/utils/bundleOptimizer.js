/**
 * Bundle Optimization Utilities
 * Production optimizations for reducing bundle size and improving load times
 */

/**
 * Production Console Logger - removes console statements in production
 */
export const optimizeConsoleLogging = () => {
  if (process.env.NODE_ENV === 'production') {
    // Preserve only error and warn for debugging critical issues
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console methods to no-op in production
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.trace = () => {};
    console.table = () => {};
    console.group = () => {};
    console.groupEnd = () => {};
    
    // Keep error and warn but make them less verbose
    console.error = (...args) => {
      // Only log errors with proper error objects or critical messages
      if (args.some(arg => arg instanceof Error || (typeof arg === 'string' && arg.includes('Error')))) {
        originalError.apply(console, args);
      }
    };
    
    console.warn = (...args) => {
      // Only log warnings for performance or security issues
      if (args.some(arg => typeof arg === 'string' && (
        arg.includes('performance') ||
        arg.includes('security') ||
        arg.includes('deprecated') ||
        arg.includes('chunk')
      ))) {
        originalWarn.apply(console, args);
      }
    };
  }
};

/**
 * Tree Shaking Helper - Mark unused exports for elimination
 */
export const createTreeShakeableExport = (obj, usedKeys = []) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, only return the used keys
    const optimized = {};
    usedKeys.forEach(key => {
      if (key in obj) {
        optimized[key] = obj[key];
      }
    });
    return optimized;
  }
  
  // In development, return full object for flexibility
  return obj;
};

/**
 * Dynamic Import Optimizer - Intelligent chunk loading
 */
export class ChunkLoadOptimizer {
  constructor() {
    this.chunkCache = new Map();
    this.loadingChunks = new Map();
    this.failedChunks = new Set();
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  /**
   * Optimized dynamic import with retry logic and caching
   */
  async importWithOptimization(importFn, chunkName) {
    // Check if already cached
    if (this.chunkCache.has(chunkName)) {
      return this.chunkCache.get(chunkName);
    }

    // Check if currently loading
    if (this.loadingChunks.has(chunkName)) {
      return this.loadingChunks.get(chunkName);
    }

    // Create loading promise
    const loadingPromise = this.loadChunkWithRetry(importFn, chunkName);
    this.loadingChunks.set(chunkName, loadingPromise);

    try {
      const result = await loadingPromise;
      this.chunkCache.set(chunkName, result);
      this.loadingChunks.delete(chunkName);
      return result;
    } catch (error) {
      this.loadingChunks.delete(chunkName);
      this.failedChunks.add(chunkName);
      throw error;
    }
  }

  async loadChunkWithRetry(importFn, chunkName) {
    let attempts = 0;
    
    while (attempts < this.retryAttempts) {
      try {
        return await importFn();
      } catch (error) {
        attempts++;
        
        if (error.name === 'ChunkLoadError' && attempts < this.retryAttempts) {
          console.warn(`Chunk load failed for ${chunkName}, attempt ${attempts}/${this.retryAttempts}`);
          
          // Clear any stale cache
          if ('caches' in window) {
            try {
              const cache = await caches.open('sachinserver-dynamic-v1.2.0');
              const keys = await cache.keys();
              for (const key of keys) {
                if (key.url.includes(chunkName)) {
                  await cache.delete(key);
                }
              }
            } catch (cacheError) {
              console.warn('Failed to clear chunk cache:', cacheError);
            }
          }
          
          // Wait before retrying with exponential backoff
          await new Promise(resolve => 
            setTimeout(resolve, this.retryDelay * Math.pow(2, attempts - 1))
          );
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Preload chunks based on user interaction patterns
   */
  preloadChunks(chunkImports) {
    // Use requestIdleCallback for non-blocking preloading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        chunkImports.forEach(({ importFn, chunkName, priority = 'low' }) => {
          if (!this.chunkCache.has(chunkName) && !this.failedChunks.has(chunkName)) {
            if (priority === 'high') {
              // High priority - load immediately
              this.importWithOptimization(importFn, chunkName).catch(() => {
                // Silent fail for preloading
              });
            } else {
              // Low priority - add to preload queue
              setTimeout(() => {
                this.importWithOptimization(importFn, chunkName).catch(() => {
                  // Silent fail for preloading
                });
              }, 2000);
            }
          }
        });
      }, { timeout: 5000 });
    }
  }

  getCacheStatus() {
    return {
      cached: this.chunkCache.size,
      loading: this.loadingChunks.size,
      failed: this.failedChunks.size
    };
  }
}

/**
 * CSS Optimization - Critical CSS extraction and lazy loading
 */
export class CSSOptimizer {
  constructor() {
    this.criticalCSS = new Set();
    this.loadedCSS = new Set();
  }

  /**
   * Inline critical CSS for above-the-fold content
   */
  inlineCriticalCSS(css) {
    if (this.criticalCSS.has(css)) return;
    
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
    this.criticalCSS.add(css);
  }

  /**
   * Lazy load non-critical CSS
   */
  loadCSS(href, media = 'all') {
    if (this.loadedCSS.has(href)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print'; // Load as print first to avoid render blocking
      link.onload = () => {
        link.media = media; // Switch to actual media query
        this.loadedCSS.add(href);
        resolve();
      };
      link.onerror = reject;
      
      document.head.appendChild(link);
    });
  }

  /**
   * Preload CSS with low priority
   */
  preloadCSS(href) {
    if (this.loadedCSS.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      // Convert preload to actual stylesheet
      link.rel = 'stylesheet';
      this.loadedCSS.add(href);
    };
    
    document.head.appendChild(link);
  }
}

/**
 * Font Loading Optimization
 */
export class FontOptimizer {
  constructor() {
    this.loadedFonts = new Set();
    this.fontDisplayStrategy = 'swap'; // Better perceived performance
  }

  /**
   * Optimize font loading with proper display strategy
   */
  optimizeFontLoading() {
    // Add font-display: swap to all font-face declarations
    const fontCSS = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        /* ... other properties ... */
      }
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
        /* ... other properties ... */
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = fontCSS;
    document.head.appendChild(style);
  }

  /**
   * Preload critical fonts
   */
  preloadCriticalFonts(fonts) {
    fonts.forEach(({ href, type = 'font/woff2' }) => {
      if (this.loadedFonts.has(href)) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = type;
      link.href = href;
      link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
      this.loadedFonts.add(href);
    });
  }
}

/**
 * Resource Hints Optimizer
 */
export class ResourceHintsOptimizer {
  constructor() {
    this.preconnectedOrigins = new Set();
    this.prefetchedResources = new Set();
  }

  /**
   * Add DNS prefetch for external domains
   */
  addDNSPrefetch(domains) {
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  /**
   * Add preconnect for critical external resources
   */
  addPreconnect(origins) {
    origins.forEach(origin => {
      if (this.preconnectedOrigins.has(origin)) return;

      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
      this.preconnectedOrigins.add(origin);
    });
  }

  /**
   * Prefetch resources likely to be needed
   */
  prefetchResources(resources) {
    requestIdleCallback(() => {
      resources.forEach(resource => {
        if (this.prefetchedResources.has(resource)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        
        document.head.appendChild(link);
        this.prefetchedResources.add(resource);
      });
    });
  }
}

// Initialize optimizers
export const chunkLoadOptimizer = new ChunkLoadOptimizer();
export const cssOptimizer = new CSSOptimizer();
export const fontOptimizer = new FontOptimizer();
export const resourceHintsOptimizer = new ResourceHintsOptimizer();

// Auto-initialize production optimizations
if (process.env.NODE_ENV === 'production') {
  optimizeConsoleLogging();
  fontOptimizer.optimizeFontLoading();
  
  // Add DNS prefetch for external domains
  resourceHintsOptimizer.addDNSPrefetch([
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ]);
  
  // Add preconnect for critical resources
  resourceHintsOptimizer.addPreconnect([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]);
}

export default {
  optimizeConsoleLogging,
  createTreeShakeableExport,
  chunkLoadOptimizer,
  cssOptimizer,
  fontOptimizer,
  resourceHintsOptimizer
};