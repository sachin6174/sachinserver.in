/**
 * Component Factory
 * Implements Factory and Registry patterns for dynamic component loading
 * Provides lazy loading capabilities and component registration
 * Follows Open/Closed Principle - open for extension, closed for modification
 */

import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { Alert, Card } from '../ui';
import { makeAlertFallback } from '../ui/fallbacks';
import SkeletonLoader from '../components/SkeletonLoader/SkeletonLoader';

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
        label: metadata.label || id,
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
      loader: importFn,
      metadata: {
        id,
        type: 'lazy',
        label: metadata.label || id,
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
   * Unregister all components within a category
   * @param {string} category
   */
  unregisterByCategory(category) {
    const ids = this.categories.get(category);
    if (!ids) return;
    Array.from(ids).forEach((id) => this.unregister(id));
    this.categories.delete(category);
  }

  /**
   * Register a batch of components
   * @param {Array} items [{ id, component?, importFn?, metadata? }]
   */
  registerBatch(items = []) {
    items.forEach(({ id, component, importFn, metadata }) => {
      if (importFn) this.registerLazy(id, importFn, metadata);
      else if (component) this.register(id, component, metadata);
      else console.warn(`registerBatch: item '${id}' missing component or importFn`);
    });
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
      withSuspense: optWithSuspense,
      errorFallback,
      loadingFallback = <LoadingSpinner />,
      errorBoundaryProps = {},
      wrapInCard = false,
      cardProps = {},
      loadingSkeleton
    } = options;

    // Base element
    let inner = <Component {...props} />;

    // Error boundary inside the surface so messages respect tokens
    if (withErrorBoundary) {
      const fallbackChoice = errorFallback ?? metadata.errorFallback ?? makeAlertFallback({ title: `Failed to load ${metadata.label || metadata.id}` });
      const boundaryProps = {
        title: `Error in ${metadata.label || metadata.id}`,
        message: `Failed to render ${metadata.label || metadata.id} component.`,
        fallback: fallbackChoice,
        ...errorBoundaryProps
      };
      inner = (
        <ErrorBoundary {...boundaryProps}>
          {inner}
        </ErrorBoundary>
      );
    }

    // Optionally wrap in Card for consistent surface styling (opt-in via options or metadata.surface="card").
    // Default to card surfaces for known page categories when not specified.
    const defaultCardCategories = new Set(['leftbrain', 'rightbrain', 'developer-tools', 'qa-tools', 'general-tools']);
    const shouldWrapInCard = wrapInCard || metadata.surface === 'card' || (metadata.surface == null && defaultCardCategories.has(metadata.category));
    if (shouldWrapInCard) {
      const { title, footer, elevated } = cardProps;
      inner = (
        <Card title={title || metadata.label} footer={footer} elevated={elevated}>
          {inner}
        </Card>
      );
    }

    // Compute suspense fallback (supports metadata-provided fallback or skeletons)
    let fallbackEl = loadingFallback;
    if (metadata.loadingFallback) {
      fallbackEl = typeof metadata.loadingFallback === 'function'
        ? metadata.loadingFallback(props)
        : metadata.loadingFallback;
    }
    // Skeleton support via options or metadata; default by category if unspecified
    let sk = loadingSkeleton ?? metadata.loadingSkeleton;
    if (!sk && metadata.category) {
      if (['developer-tools', 'qa-tools', 'general-tools'].includes(metadata.category)) {
        sk = 'tool';
      } else if (['leftbrain', 'rightbrain'].includes(metadata.category)) {
        sk = 'list';
      }
    }
    if (sk) {
      if (typeof sk === 'string') {
        fallbackEl = <SkeletonLoader type={sk} />;
      } else if (typeof sk === 'object') {
        const { type = 'default', ...skProps } = sk;
        fallbackEl = <SkeletonLoader type={type} {...skProps} />;
      } else {
        fallbackEl = <SkeletonLoader />;
      }
    }
    // If surface is a card, mirror the fallback inside a Card for visual parity
    if (shouldWrapInCard) {
      const { title, footer, elevated } = cardProps;
      fallbackEl = (
        <Card title={title || metadata.label} footer={footer} elevated={elevated} aria-busy="true">
          {fallbackEl}
        </Card>
      );
    }
    else {
      // annotate generic fallback with aria-busy
      fallbackEl = <div aria-busy="true">{fallbackEl}</div>;
    }

    // Decide suspense enablement (option -> metadata -> lazy default)
    const effectiveWithSuspense =
      (metadata.withSuspense != null) ? metadata.withSuspense :
      (optWithSuspense != null) ? optWithSuspense :
      (metadata.type === 'lazy');

    // Wrap with Suspense for lazy components
    if (effectiveWithSuspense) {
      return (
        <Suspense fallback={fallbackEl}>
          {inner}
        </Suspense>
      );
    }

    return inner;
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
      <Alert variant="warning" title="Component Not Found">
        Component '{id}' could not be loaded.
      </Alert>
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
        if (componentData.loader) {
          await componentData.loader();
        } else if (typeof componentData.component.preload === 'function') {
          await componentData.component.preload();
        }
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
export const registerBatch = registry.registerBatch?.bind(registry) || ((items)=>items.forEach(()=>{}));
export const unregisterByCategory = registry.unregisterByCategory?.bind(registry) || ((c)=>c);

export default ComponentFactory;
