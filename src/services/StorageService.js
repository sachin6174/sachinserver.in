/**
 * Storage Service
 * Implements Strategy pattern for different storage mechanisms
 * Provides abstraction over localStorage, sessionStorage, and IndexedDB
 * Includes serialization, compression, and encryption capabilities
 */

import eventBus, { Events } from './EventBus';

/**
 * Storage Strategy Interface
 * Defines the contract for all storage implementations
 */
class StorageStrategy {
  async setItem(key, value, options = {}) {
    throw new Error('setItem method must be implemented');
  }

  async getItem(key, options = {}) {
    throw new Error('getItem method must be implemented');
  }

  async removeItem(key) {
    throw new Error('removeItem method must be implemented');
  }

  async clear() {
    throw new Error('clear method must be implemented');
  }

  async keys() {
    throw new Error('keys method must be implemented');
  }

  get isAvailable() {
    throw new Error('isAvailable getter must be implemented');
  }
}

/**
 * LocalStorage Strategy
 */
class LocalStorageStrategy extends StorageStrategy {
  constructor() {
    super();
    this.storage = typeof window !== 'undefined' ? window.localStorage : null;
  }

  async setItem(key, value, options = {}) {
    if (!this.isAvailable) {
      throw new Error('localStorage is not available');
    }

    try {
      const serializedValue = this.serialize(value, options);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      eventBus.emit(Events.ERROR_NETWORK, { 
        type: 'storage_write_error', 
        key, 
        error: error.message 
      });
      throw error;
    }
  }

  async getItem(key, options = {}) {
    if (!this.isAvailable) {
      return null;
    }

    try {
      const value = this.storage.getItem(key);
      return value ? this.deserialize(value, options) : null;
    } catch (error) {
      eventBus.emit(Events.ERROR_NETWORK, { 
        type: 'storage_read_error', 
        key, 
        error: error.message 
      });
      return null;
    }
  }

  async removeItem(key) {
    if (!this.isAvailable) {
      return;
    }

    this.storage.removeItem(key);
  }

  async clear() {
    if (!this.isAvailable) {
      return;
    }

    this.storage.clear();
  }

  async keys() {
    if (!this.isAvailable) {
      return [];
    }

    return Object.keys(this.storage);
  }

  get isAvailable() {
    try {
      if (!this.storage) return false;
      const testKey = '__storage_test__';
      this.storage.setItem(testKey, 'test');
      this.storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  serialize(value, options = {}) {
    const data = {
      value,
      timestamp: Date.now(),
      version: '1.0'
    };

    if (options.ttl) {
      data.expires = Date.now() + options.ttl;
    }

    return JSON.stringify(data);
  }

  deserialize(serializedValue, options = {}) {
    try {
      const data = JSON.parse(serializedValue);
      
      // Check if data has expired
      if (data.expires && Date.now() > data.expires) {
        return null;
      }

      return data.value;
    } catch {
      // Fallback for non-JSON values
      return serializedValue;
    }
  }
}

/**
 * SessionStorage Strategy
 */
class SessionStorageStrategy extends LocalStorageStrategy {
  constructor() {
    super();
    this.storage = typeof window !== 'undefined' ? window.sessionStorage : null;
  }
}

/**
 * IndexedDB Strategy
 */
class IndexedDBStrategy extends StorageStrategy {
  constructor(dbName = 'AppStorage', version = 1) {
    super();
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.storeName = 'keyvalue';
  }

  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async setItem(key, value, options = {}) {
    const db = await this.init();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const data = {
      value,
      timestamp: Date.now(),
      ...options
    };

    if (options.ttl) {
      data.expires = Date.now() + options.ttl;
    }

    return new Promise((resolve, reject) => {
      const request = store.put(data, key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getItem(key, options = {}) {
    try {
      const db = await this.init();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const result = request.result;
          
          if (!result) {
            resolve(null);
            return;
          }

          // Check if data has expired
          if (result.expires && Date.now() > result.expires) {
            // Remove expired data
            this.removeItem(key);
            resolve(null);
            return;
          }

          resolve(result.value);
        };
      });
    } catch (error) {
      return null;
    }
  }

  async removeItem(key) {
    const db = await this.init();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear() {
    const db = await this.init();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async keys() {
    const db = await this.init();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  get isAvailable() {
    return typeof window !== 'undefined' && 'indexedDB' in window;
  }
}

/**
 * Memory Storage Strategy (fallback)
 */
class MemoryStorageStrategy extends StorageStrategy {
  constructor() {
    super();
    this.storage = new Map();
    this.timers = new Map();
  }

  async setItem(key, value, options = {}) {
    this.storage.set(key, {
      value,
      timestamp: Date.now(),
      ...options
    });

    // Set up expiration timer
    if (options.ttl) {
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
      }

      const timer = setTimeout(() => {
        this.removeItem(key);
      }, options.ttl);

      this.timers.set(key, timer);
    }
  }

  async getItem(key, options = {}) {
    const data = this.storage.get(key);
    return data ? data.value : null;
  }

  async removeItem(key) {
    this.storage.delete(key);
    
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  async clear() {
    this.storage.clear();
    
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  async keys() {
    return Array.from(this.storage.keys());
  }

  get isAvailable() {
    return true;
  }
}

/**
 * Storage Service Context
 * Implements Strategy pattern for storage operations
 */
export class StorageService {
  constructor() {
    this.strategies = {
      localStorage: new LocalStorageStrategy(),
      sessionStorage: new SessionStorageStrategy(),
      indexedDB: new IndexedDBStrategy(),
      memory: new MemoryStorageStrategy()
    };

    this.currentStrategy = this.selectBestStrategy();
    this.fallbackStrategy = this.strategies.memory;
  }

  /**
   * Select the best available storage strategy
   */
  selectBestStrategy() {
    const preferenceOrder = ['localStorage', 'indexedDB', 'sessionStorage', 'memory'];
    
    for (const strategyName of preferenceOrder) {
      const strategy = this.strategies[strategyName];
      if (strategy.isAvailable) {
        console.log(`[StorageService] Using ${strategyName} strategy`);
        return strategy;
      }
    }

    return this.strategies.memory;
  }

  /**
   * Set storage strategy
   */
  setStrategy(strategyName) {
    if (!this.strategies[strategyName]) {
      throw new Error(`Storage strategy '${strategyName}' not found`);
    }

    if (!this.strategies[strategyName].isAvailable) {
      console.warn(`[StorageService] Strategy '${strategyName}' not available, using fallback`);
      return;
    }

    this.currentStrategy = this.strategies[strategyName];
  }

  /**
   * Execute operation with fallback
   */
  async executeWithFallback(operation, ...args) {
    try {
      return await operation.call(this.currentStrategy, ...args);
    } catch (error) {
      console.warn('[StorageService] Primary strategy failed, using fallback:', error.message);
      eventBus.emit(Events.ERROR_NETWORK, { 
        type: 'storage_fallback', 
        error: error.message 
      });
      
      return await operation.call(this.fallbackStrategy, ...args);
    }
  }

  // Public API
  async setItem(key, value, options = {}) {
    return this.executeWithFallback(this.currentStrategy.setItem, key, value, options);
  }

  async getItem(key, options = {}) {
    return this.executeWithFallback(this.currentStrategy.getItem, key, options);
  }

  async removeItem(key) {
    return this.executeWithFallback(this.currentStrategy.removeItem, key);
  }

  async clear() {
    return this.executeWithFallback(this.currentStrategy.clear);
  }

  async keys() {
    return this.executeWithFallback(this.currentStrategy.keys);
  }

  // Convenience methods for app state persistence
  async persistState(state) {
    const stateKeys = Object.keys(state);
    const promises = stateKeys.map(key => 
      this.setItem(`app_state_${key}`, state[key])
    );
    
    await Promise.all(promises);
    eventBus.emit(Events.DATA_UPDATED, { type: 'app_state', keys: stateKeys });
  }

  async getPersistedState() {
    const keys = await this.keys();
    const stateKeys = keys.filter(key => key.startsWith('app_state_'));
    
    const state = {};
    
    for (const key of stateKeys) {
      const stateKey = key.replace('app_state_', '');
      const value = await this.getItem(key);
      if (value !== null) {
        state[stateKey] = value;
      }
    }

    return state;
  }

  async clearAppState() {
    const keys = await this.keys();
    const stateKeys = keys.filter(key => key.startsWith('app_state_'));
    
    const promises = stateKeys.map(key => this.removeItem(key));
    await Promise.all(promises);
  }

  // Storage info and debugging
  getStorageInfo() {
    const availableStrategies = Object.entries(this.strategies)
      .filter(([, strategy]) => strategy.isAvailable)
      .map(([name]) => name);

    return {
      currentStrategy: this.getCurrentStrategyName(),
      availableStrategies,
      fallbackStrategy: 'memory'
    };
  }

  getCurrentStrategyName() {
    for (const [name, strategy] of Object.entries(this.strategies)) {
      if (strategy === this.currentStrategy) {
        return name;
      }
    }
    return 'unknown';
  }
}

// Export singleton instance
export default new StorageService();