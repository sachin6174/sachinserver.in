/**
 * Performance monitoring utilities for tracking and optimizing app performance
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
        this.isMonitoring = process.env.NODE_ENV === 'development';
    }

    // Track component render times
    trackRender(componentName, renderFn) {
        if (!this.isMonitoring) return renderFn();

        const start = performance.now();
        const result = renderFn();
        const end = performance.now();
        
        this.recordMetric('render', componentName, end - start);
        return result;
    }

    // Track function execution times
    trackFunction(functionName, fn, ...args) {
        if (!this.isMonitoring) return fn(...args);

        const start = performance.now();
        const result = fn(...args);
        const end = performance.now();
        
        this.recordMetric('function', functionName, end - start);
        return result;
    }

    // Record a metric
    recordMetric(type, name, value) {
        const key = `${type}:${name}`;
        
        if (!this.metrics.has(key)) {
            this.metrics.set(key, {
                count: 0,
                total: 0,
                min: Infinity,
                max: 0,
                values: []
            });
        }

        const metric = this.metrics.get(key);
        metric.count++;
        metric.total += value;
        metric.min = Math.min(metric.min, value);
        metric.max = Math.max(metric.max, value);
        metric.values.push(value);

        // Keep only last 100 values to prevent memory issues
        if (metric.values.length > 100) {
            metric.values.shift();
        }

        // Log slow operations
        if (value > 16) { // 16ms threshold for 60fps
            console.warn(`Slow ${type}: ${name} took ${value.toFixed(2)}ms`);
        }
    }

    // Get performance report
    getReport() {
        const report = {};
        
        this.metrics.forEach((metric, key) => {
            const average = metric.total / metric.count;
            report[key] = {
                count: metric.count,
                average: Number(average.toFixed(2)),
                min: Number(metric.min.toFixed(2)),
                max: Number(metric.max.toFixed(2)),
                total: Number(metric.total.toFixed(2))
            };
        });

        return report;
    }

    // Log performance report
    logReport() {
        if (!this.isMonitoring) return;
        
        console.group('🚀 Performance Report');
        console.table(this.getReport());
        console.groupEnd();
    }

    // Clear all metrics
    clear() {
        this.metrics.clear();
    }

    // Monitor Core Web Vitals
    observeWebVitals() {
        if (!this.isMonitoring || typeof PerformanceObserver === 'undefined') return;

        // Largest Contentful Paint
        try {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms');
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        } catch (e) {
            console.warn('LCP observation not supported');
        }

        // First Input Delay
        try {
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime, 'ms');
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        } catch (e) {
            console.warn('FID observation not supported');
        }

        // Cumulative Layout Shift
        try {
            const clsObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        } catch (e) {
            console.warn('CLS observation not supported');
        }
    }

    // Monitor memory usage
    monitorMemory() {
        if (!this.isMonitoring || !performance.memory) return;

        setInterval(() => {
            const memory = performance.memory;
            console.log('Memory:', {
                used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
                total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
                limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
            });
        }, 30000); // Every 30 seconds
    }

    // Cleanup observers
    disconnect() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = (componentName) => {
    if (process.env.NODE_ENV === 'development') {
        const renderStart = performance.now();
        
        const { useEffect } = require('react');
        useEffect(() => {
            const renderEnd = performance.now();
            performanceMonitor.recordMetric('render', componentName, renderEnd - renderStart);
        });
    }

    return {
        trackFunction: (name, fn) => performanceMonitor.trackFunction(name, fn),
        recordMetric: (type, name, value) => performanceMonitor.recordMetric(type, name, value)
    };
};

// Initialize monitoring
if (typeof window !== 'undefined') {
    performanceMonitor.observeWebVitals();
    performanceMonitor.monitorMemory();
    
    // Log report every minute in development
    if (process.env.NODE_ENV === 'development') {
        setInterval(() => {
            performanceMonitor.logReport();
        }, 60000);
    }
}

export default performanceMonitor;