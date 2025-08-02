/**
 * Component Factory
 * Implements Factory and Registry patterns for dynamic component loading
 * Provides lazy loading capabilities and component registration
 * Follows Open/Closed Principle - open for extension, closed for modification
 */

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

/**
 * Component Registry - Singleton pattern for component management
 */
class ComponentRegistry {
  constructor() {
    if (ComponentRegistry.instance) {
      return ComponentRegistry.instance;
    }

    this.components = new Map();
    this.lazyComponents = new Map();
    this.categories = new Map();
    ComponentRegistry.instance = this;
  }

  /**
   * Register a regular component
   * @param {string} id - Component identifier
   * @param {React.Component} component - React component
   * @param {Object} metadata - Component metadata
   */
  register(id, component, metadata = {}) {
    if (this.components.has(id)) {
      console.warn(`Component with id '${id}' is already registered. Overwriting.`);
    }

    this.components.set(id, {
      component,
      metadata: {
        id,
        type: 'regular',
        ...metadata
      }
    });

    // Add to category if specified
    if (metadata.category) {
      this.addToCategory(metadata.category, id);
    }
  }

  /**
   * Register a lazy-loaded component
   * @param {string} id - Component identifier
   * @param {Function} importFn - Dynamic import function
   * @param {Object} metadata - Component metadata
   */
  registerLazy(id, importFn, metadata = {}) {
    if (this.lazyComponents.has(id)) {
      console.warn(`Lazy component with id '${id}' is already registered. Overwriting.`);
    }

    const LazyComponent = lazy(importFn);
    
    this.lazyComponents.set(id, {
      component: LazyComponent,
      metadata: {
        id,
        type: 'lazy',
        ...metadata
      }
    });

    // Add to category if specified
    if (metadata.category) {
      this.addToCategory(metadata.category, id);
    }
  }

  /**
   * Add component to category
   * @param {string} category - Category name
   * @param {string} componentId - Component ID
   */
  addToCategory(category, componentId) {
    if (!this.categories.has(category)) {
      this.categories.set(category, new Set());
    }
    this.categories.get(category).add(componentId);
  }

  /**
   * Get component by ID
   * @param {string} id - Component identifier
   * @returns {Object|null} Component object or null
   */
  get(id) {
    return this.components.get(id) || this.lazyComponents.get(id) || null;
  }

  /**
   * Get all components in a category
   * @param {string} category - Category name
   * @returns {Array} Array of component objects
   */
  getByCategory(category) {
    const componentIds = this.categories.get(category) || new Set();
    return Array.from(componentIds).map(id => this.get(id)).filter(Boolean);
  }

  /**
   * Get all registered components
   * @returns {Array} Array of all component objects
   */
  getAll() {
    const regular = Array.from(this.components.values());
    const lazy = Array.from(this.lazyComponents.values());
    return [...regular, ...lazy];
  }

  /**
   * Check if component exists
   * @param {string} id - Component identifier
   * @returns {boolean} True if component exists
   */
  has(id) {
    return this.components.has(id) || this.lazyComponents.has(id);
  }

  /**
   * Remove component from registry
   * @param {string} id - Component identifier
   */
  unregister(id) {
    const component = this.get(id);
    if (component && component.metadata.category) {
      const categorySet = this.categories.get(component.metadata.category);
      if (categorySet) {
        categorySet.delete(id);
        if (categorySet.size === 0) {
          this.categories.delete(component.metadata.category);
        }
      }
    }

    this.components.delete(id);
    this.lazyComponents.delete(id);
  }

  /**
   * Get component metadata
   * @param {string} id - Component identifier
   * @returns {Object|null} Component metadata or null
   */
  getMetadata(id) {
    const component = this.get(id);
    return component ? component.metadata : null;
  }

  /**
   * Get all categories
   * @returns {Array} Array of category names
   */
  getCategories() {
    return Array.from(this.categories.keys());
  }
}

// Singleton instance
const registry = new ComponentRegistry();

/**
 * Component Factory Class
 * Implements Factory pattern for component creation
 */
export class ComponentFactory {
  /**
   * Create component instance with error boundary and suspense
   * @param {string} id - Component identifier
   * @param {Object} props - Component props
   * @param {Object} options - Factory options
   * @returns {React.Element} Wrapped component
   */
  static create(id, props = {}, options = {}) {
    const componentData = registry.get(id);
    
    if (!componentData) {
      console.error(`Component '${id}' not found in registry`);
      return ComponentFactory.createNotFound(id);
    }

    const { component: Component, metadata } = componentData;
    const {
      withErrorBoundary = true,
      withSuspense = metadata.type === 'lazy',
      errorFallback,
      loadingFallback = <LoadingSpinner />,
      errorBoundaryProps = {}
    } = options;

    // Create the base component
    let element = <Component {...props} />;

    // Wrap with Suspense for lazy components
    if (withSuspense) {
      element = (
        <Suspense fallback={loadingFallback}>
          {element}
        </Suspense>
      );
    }

    // Wrap with Error Boundary
    if (withErrorBoundary) {
      const boundaryProps = {
        title: `Error in ${metadata.label || metadata.id}`,
        message: `Failed to render ${metadata.label || metadata.id} component.`,
        ...errorBoundaryProps
      };

      element = (
        <ErrorBoundary {...boundaryProps}>
          {element}
        </ErrorBoundary>
      );
    }

    return element;
  }

  /**
   * Create multiple components
   * @param {Array} componentConfigs - Array of component configurations
   * @returns {Array} Array of wrapped components
   */
  static createMultiple(componentConfigs) {
    return componentConfigs.map(({ id, props, options }) => 
      ComponentFactory.create(id, props, options)
    );
  }

  /**
   * Create components by category
   * @param {string} category - Category name
   * @param {Object} sharedProps - Props to pass to all components
   * @param {Object} sharedOptions - Options to apply to all components
   * @returns {Array} Array of wrapped components
   */
  static createByCategory(category, sharedProps = {}, sharedOptions = {}) {
    const components = registry.getByCategory(category);
    return components.map(({ metadata }) => 
      ComponentFactory.create(metadata.id, sharedProps, sharedOptions)
    );
  }

  /**
   * Create not found component
   * @param {string} id - Missing component ID
   * @returns {React.Element} Not found component
   */
  static createNotFound(id) {
    return (
      <div className="component-not-found">
        <h3>Component Not Found</h3>
        <p>Component '{id}' could not be loaded.</p>
      </div>
    );
  }

  /**
   * Preload lazy component
   * @param {string} id - Component identifier
   * @returns {Promise} Preload promise
   */
  static async preload(id) {
    const componentData = registry.get(id);
    if (componentData && componentData.metadata.type === 'lazy') {
      try {
        await componentData.component.preload();
        console.log(`Preloaded component: ${id}`);
      } catch (error) {
        console.error(`Failed to preload component ${id}:`, error);
      }
    }
  }

  /**
   * Preload multiple components
   * @param {Array} ids - Array of component identifiers
   * @returns {Promise} Promise that resolves when all components are preloaded
   */
  static async preloadMultiple(ids) {
    const preloadPromises = ids.map(id => ComponentFactory.preload(id));
    return Promise.allSettled(preloadPromises);
  }

  /**
   * Preload components by category
   * @param {string} category - Category name
   * @returns {Promise} Promise that resolves when all components are preloaded
   */
  static async preloadByCategory(category) {
    const components = registry.getByCategory(category);
    const ids = components.map(({ metadata }) => metadata.id);
    return ComponentFactory.preloadMultiple(ids);
  }
}

/**
 * Registration utilities
 */
export const registerComponent = registry.register.bind(registry);
export const registerLazyComponent = registry.registerLazy.bind(registry);
export const getComponent = registry.get.bind(registry);
export const hasComponent = registry.has.bind(registry);
export const getComponentMetadata = registry.getMetadata.bind(registry);
export const getComponentsByCategory = registry.getByCategory.bind(registry);
export const getAllComponents = registry.getAll.bind(registry);
export const unregisterComponent = registry.unregister.bind(registry);
export const getCategories = registry.getCategories.bind(registry);

export default ComponentFactory;