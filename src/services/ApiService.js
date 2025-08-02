/**
 * API Service
 * Abstract service layer for external API calls
 * Implements Repository pattern for data access
 * Provides caching, error handling, and retry logic
 */

import eventBus, { Events } from './EventBus';

/**
 * HTTP Client with built-in error handling and retry logic
 */
class HttpClient {
  constructor(baseURL = '', options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    };
  }

  /**
   * Make HTTP request with retry logic
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  async request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    const requestOptions = { ...this.defaultOptions, ...options };
    const { retries, retryDelay, timeout, ...fetchOptions } = requestOptions;

    let lastError;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(fullUrl, {
          ...fetchOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        lastError = error;
        
        if (attempt === retries) {
          eventBus.emit(Events.ERROR_NETWORK, {
            url: fullUrl,
            error: error.message,
            attempts: attempt + 1
          });
          break;
        }

        // Don't retry on certain errors
        if (error.name === 'AbortError' || 
            (error.message.includes('400') || error.message.includes('404'))) {
          break;
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
      }
    }

    throw lastError;
  }

  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

/**
 * Cache implementation for API responses
 */
class ApiCache {
  constructor(maxSize = 100, defaultTTL = 300000) { // 5 minutes default TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  generateKey(url, options = {}) {
    const keyData = { url, method: options.method || 'GET', body: options.body };
    return btoa(JSON.stringify(keyData));
  }

  set(key, data, ttl = this.defaultTTL) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

/**
 * Main API Service class
 */
class ApiService {
  constructor() {
    this.httpClient = new HttpClient();
    this.cache = new ApiCache();
    this.requestQueue = new Map();
  }

  /**
   * Make cached API request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response data
   */
  async request(url, options = {}) {
    const cacheKey = this.cache.generateKey(url, options);
    const useCache = options.cache !== false;
    
    // Return cached data if available
    if (useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Prevent duplicate requests
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey);
    }

    const requestPromise = this.executeRequest(url, options, cacheKey, useCache);
    this.requestQueue.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      this.requestQueue.delete(cacheKey);
      return result;
    } catch (error) {
      this.requestQueue.delete(cacheKey);
      throw error;
    }
  }

  async executeRequest(url, options, cacheKey, useCache) {
    try {
      const response = await this.httpClient.request(url, options);
      const data = await this.parseResponse(response);

      if (useCache && response.status === 200) {
        this.cache.set(cacheKey, data, options.cacheTTL);
      }

      eventBus.emit(Events.DATA_LOADED, { url, data });
      return data;
    } catch (error) {
      eventBus.emit(Events.DATA_ERROR, { url, error: error.message });
      throw error;
    }
  }

  async parseResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else if (contentType && contentType.includes('text/')) {
      return response.text();
    } else {
      return response.blob();
    }
  }

  // Convenience methods
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  // Cache management
  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size();
  }
}

/**
 * Specific API service implementations
 */

// IP Service
export class IpService extends ApiService {
  async getPublicIP() {
    return this.get('https://api.ipify.org?format=json', {
      cacheTTL: 600000 // Cache for 10 minutes
    });
  }

  async getLocationData(ip) {
    return this.get(`https://ipapi.co/${ip}/json/`, {
      cacheTTL: 3600000 // Cache for 1 hour
    });
  }
}

// Quote Service
export class QuoteService extends ApiService {
  async getRandomQuote() {
    return this.get('https://api.quotable.io/random', {
      cache: false // Always fetch fresh quotes
    });
  }

  async getQuotesByAuthor(author) {
    return this.get(`https://api.quotable.io/quotes?author=${encodeURIComponent(author)}`, {
      cacheTTL: 3600000 // Cache for 1 hour
    });
  }
}

// Weather Service
export class WeatherService extends ApiService {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async getCurrentWeather(lat, lon) {
    if (!this.apiKey) {
      throw new Error('Weather API key not configured');
    }

    return this.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
      { cacheTTL: 600000 } // Cache for 10 minutes
    );
  }
}

// GitHub Service
export class GitHubService extends ApiService {
  async getUserProfile(username) {
    return this.get(`https://api.github.com/users/${username}`, {
      cacheTTL: 3600000 // Cache for 1 hour
    });
  }

  async getUserRepos(username) {
    return this.get(`https://api.github.com/users/${username}/repos`, {
      cacheTTL: 1800000 // Cache for 30 minutes
    });
  }

  async getContributions(username) {
    // Note: This would require GitHub GraphQL API or a proxy service
    // Implementing a placeholder for contribution data
    return this.get(`https://api.github.com/users/${username}/events/public`, {
      cacheTTL: 1800000
    });
  }
}

// News Service
export class NewsService extends ApiService {
  async getTopHeadlines(category = 'technology') {
    return this.get(`https://api.quotable.io/random`, { // Placeholder endpoint
      cacheTTL: 1800000 // Cache for 30 minutes
    });
  }
}

// Service Factory for managing service instances
export class ServiceFactory {
  constructor() {
    this.services = new Map();
  }

  register(name, serviceClass, ...args) {
    this.services.set(name, new serviceClass(...args));
  }

  get(name) {
    return this.services.get(name);
  }

  has(name) {
    return this.services.has(name);
  }
}

// Create service factory instance and register services
export const serviceFactory = new ServiceFactory();

// Register default services
serviceFactory.register('ip', IpService);
serviceFactory.register('quote', QuoteService);
serviceFactory.register('github', GitHubService);
serviceFactory.register('news', NewsService);

// Export default API service instance
export default new ApiService();