/**
 * Event Bus Service
 * Implements Observer pattern for application-wide event management
 * Provides decoupled communication between components
 * Follows Single Responsibility Principle for event handling
 */

/**
 * Event Bus Implementation using Observer Pattern
 * Singleton pattern ensures single event bus instance across application
 */
class EventBus {
  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }

    this.events = new Map();
    this.onceEvents = new Map();
    this.debugMode = process.env.NODE_ENV === 'development';
    EventBus.instance = this;
  }

  /**
   * Subscribe to an event
   * @param {string} eventName - Name of the event
   * @param {Function} callback - Callback function to execute
   * @param {Object} options - Subscription options
   * @returns {Function} Unsubscribe function
   */
  on(eventName, callback, options = {}) {
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('EventBus.on: eventName must be a string and callback must be a function');
    }

    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    const subscription = {
      callback,
      priority: options.priority || 0,
      context: options.context,
      once: false,
      id: this.generateSubscriptionId()
    };

    this.events.get(eventName).add(subscription);

    if (this.debugMode) {
      console.log(`[EventBus] Subscribed to '${eventName}' with ID: ${subscription.id}`);
    }

    // Return unsubscribe function
    return () => this.off(eventName, subscription.id);
  }

  /**
   * Subscribe to an event that will only be triggered once
   * @param {string} eventName - Name of the event
   * @param {Function} callback - Callback function to execute
   * @param {Object} options - Subscription options
   * @returns {Function} Unsubscribe function
   */
  once(eventName, callback, options = {}) {
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('EventBus.once: eventName must be a string and callback must be a function');
    }

    const unsubscribe = this.on(eventName, (...args) => {
      callback(...args);
      unsubscribe();
    }, { ...options, once: true });

    return unsubscribe;
  }

  /**
   * Unsubscribe from an event
   * @param {string} eventName - Name of the event
   * @param {string|Function} callbackOrId - Callback function or subscription ID
   */
  off(eventName, callbackOrId) {
    if (!this.events.has(eventName)) {
      return;
    }

    const subscriptions = this.events.get(eventName);
    
    if (typeof callbackOrId === 'string') {
      // Remove by subscription ID
      for (const subscription of subscriptions) {
        if (subscription.id === callbackOrId) {
          subscriptions.delete(subscription);
          if (this.debugMode) {
            console.log(`[EventBus] Unsubscribed from '${eventName}' with ID: ${callbackOrId}`);
          }
          break;
        }
      }
    } else if (typeof callbackOrId === 'function') {
      // Remove by callback function
      for (const subscription of subscriptions) {
        if (subscription.callback === callbackOrId) {
          subscriptions.delete(subscription);
          if (this.debugMode) {
            console.log(`[EventBus] Unsubscribed from '${eventName}' by callback`);
          }
          break;
        }
      }
    }

    // Clean up empty event sets
    if (subscriptions.size === 0) {
      this.events.delete(eventName);
    }
  }

  /**
   * Emit an event to all subscribers
   * @param {string} eventName - Name of the event
   * @param {...any} args - Arguments to pass to callbacks
   * @returns {boolean} True if event had listeners
   */
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      if (this.debugMode) {
        console.log(`[EventBus] No listeners for event '${eventName}'`);
      }
      return false;
    }

    const subscriptions = Array.from(this.events.get(eventName));
    
    // Sort by priority (higher priority first)
    subscriptions.sort((a, b) => b.priority - a.priority);

    if (this.debugMode) {
      console.log(`[EventBus] Emitting '${eventName}' to ${subscriptions.length} listeners`);
    }

    let hasListeners = false;

    for (const subscription of subscriptions) {
      try {
        hasListeners = true;
        
        // Call with context if provided
        if (subscription.context) {
          subscription.callback.call(subscription.context, ...args);
        } else {
          subscription.callback(...args);
        }
        
      } catch (error) {
        console.error(`[EventBus] Error in event handler for '${eventName}':`, error);
        
        // Emit error event for error handling
        this.emitError(eventName, error, subscription);
      }
    }

    return hasListeners;
  }

  /**
   * Emit an event asynchronously
   * @param {string} eventName - Name of the event
   * @param {...any} args - Arguments to pass to callbacks
   * @returns {Promise<boolean>} Promise that resolves to true if event had listeners
   */
  async emitAsync(eventName, ...args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hasListeners = this.emit(eventName, ...args);
        resolve(hasListeners);
      }, 0);
    });
  }

  /**
   * Wait for an event to be emitted
   * @param {string} eventName - Name of the event to wait for
   * @param {number} timeout - Timeout in milliseconds (optional)
   * @returns {Promise} Promise that resolves with event data
   */
  waitFor(eventName, timeout) {
    return new Promise((resolve, reject) => {
      let timeoutId;
      
      const unsubscribe = this.once(eventName, (...args) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(args.length === 1 ? args[0] : args);
      });

      if (timeout) {
        timeoutId = setTimeout(() => {
          unsubscribe();
          reject(new Error(`Timeout waiting for event '${eventName}'`));
        }, timeout);
      }
    });
  }

  /**
   * Get all event names with active listeners
   * @returns {Array<string>} Array of event names
   */
  getEventNames() {
    return Array.from(this.events.keys());
  }

  /**
   * Get number of listeners for an event
   * @param {string} eventName - Name of the event
   * @returns {number} Number of listeners
   */
  getListenerCount(eventName) {
    return this.events.has(eventName) ? this.events.get(eventName).size : 0;
  }

  /**
   * Remove all listeners for an event or all events
   * @param {string} eventName - Name of the event (optional)
   */
  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
      if (this.debugMode) {
        console.log(`[EventBus] Removed all listeners for '${eventName}'`);
      }
    } else {
      this.events.clear();
      if (this.debugMode) {
        console.log('[EventBus] Removed all event listeners');
      }
    }
  }

  /**
   * Check if there are listeners for an event
   * @param {string} eventName - Name of the event
   * @returns {boolean} True if there are listeners
   */
  hasListeners(eventName) {
    return this.events.has(eventName) && this.events.get(eventName).size > 0;
  }

  /**
   * Enable or disable debug mode
   * @param {boolean} enabled - Whether to enable debug mode
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * Generate unique subscription ID
   * @returns {string} Unique ID
   */
  generateSubscriptionId() {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Emit error event for error handling
   * @param {string} originalEvent - Original event name
   * @param {Error} error - Error that occurred
   * @param {Object} subscription - Subscription that caused error
   */
  emitError(originalEvent, error, subscription) {
    // Don't emit error events for error events to prevent loops
    if (originalEvent === 'eventbus:error') {
      return;
    }

    setTimeout(() => {
      this.emit('eventbus:error', {
        originalEvent,
        error,
        subscription: {
          id: subscription.id,
          priority: subscription.priority
        },
        timestamp: new Date().toISOString()
      });
    }, 0);
  }

  /**
   * Get debug information about the event bus
   * @returns {Object} Debug information
   */
  getDebugInfo() {
    const eventInfo = {};
    
    for (const [eventName, subscriptions] of this.events) {
      eventInfo[eventName] = {
        listenerCount: subscriptions.size,
        listeners: Array.from(subscriptions).map(sub => ({
          id: sub.id,
          priority: sub.priority,
          once: sub.once
        }))
      };
    }

    return {
      totalEvents: this.events.size,
      totalListeners: Array.from(this.events.values()).reduce((sum, subs) => sum + subs.size, 0),
      debugMode: this.debugMode,
      events: eventInfo
    };
  }
}

// Create singleton instance
const eventBus = new EventBus();

// Common event names (enum-like pattern)
export const Events = {
  // Navigation events
  TAB_CHANGED: 'navigation:tab-changed',
  NAV_ITEM_CHANGED: 'navigation:nav-item-changed',
  NAV_VISIBILITY_CHANGED: 'navigation:visibility-changed',
  
  // Theme events
  THEME_CHANGED: 'theme:changed',
  THEME_SYSTEM_CHANGED: 'theme:system-changed',
  
  // App state events
  APP_INITIALIZED: 'app:initialized',
  APP_ERROR: 'app:error',
  APP_LOADING: 'app:loading',
  
  // Component events
  COMPONENT_MOUNTED: 'component:mounted',
  COMPONENT_UNMOUNTED: 'component:unmounted',
  COMPONENT_ERROR: 'component:error',
  
  // Data events
  DATA_LOADED: 'data:loaded',
  DATA_ERROR: 'data:error',
  DATA_UPDATED: 'data:updated',
  
  // User interaction events
  USER_INTERACTION: 'user:interaction',
  USER_IDLE: 'user:idle',
  USER_ACTIVE: 'user:active',
  
  // Performance events
  PERFORMANCE_MARK: 'performance:mark',
  PERFORMANCE_MEASURE: 'performance:measure',
  
  // Error events
  ERROR_BOUNDARY: 'error:boundary',
  ERROR_NETWORK: 'error:network',
  ERROR_CHUNK_LOAD: 'error:chunk-load'
};

// Convenience methods for common events
export const emitTabChanged = (newTab, oldTab) => 
  eventBus.emit(Events.TAB_CHANGED, { newTab, oldTab, timestamp: Date.now() });

export const emitThemeChanged = (theme) => 
  eventBus.emit(Events.THEME_CHANGED, { theme, timestamp: Date.now() });

export const emitAppError = (error, context = {}) => 
  eventBus.emit(Events.APP_ERROR, { error, context, timestamp: Date.now() });

export const emitComponentMounted = (componentName, props = {}) => 
  eventBus.emit(Events.COMPONENT_MOUNTED, { componentName, props, timestamp: Date.now() });

export const emitPerformanceMark = (name, details = {}) => 
  eventBus.emit(Events.PERFORMANCE_MARK, { name, details, timestamp: Date.now() });

// Export singleton instance
export default eventBus;