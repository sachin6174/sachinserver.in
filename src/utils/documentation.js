/**
 * Component Documentation System
 * Provides runtime documentation and prop validation
 * Generates component usage examples and API docs
 */

/**
 * Component documentation decorator
 */
export const withDocumentation = (documentation) => {
  return (WrappedComponent) => {
    // Attach documentation in development
    if (process.env.NODE_ENV === 'development') {
      WrappedComponent.__documentation = {
        displayName: WrappedComponent.displayName || WrappedComponent.name,
        description: documentation.description || '',
        version: documentation.version || '1.0.0',
        author: documentation.author || '',
        examples: documentation.examples || [],
        props: documentation.props || {},
        notes: documentation.notes || [],
        category: documentation.category || 'General',
        tags: documentation.tags || [],
        changelog: documentation.changelog || []
      };
    }

    return WrappedComponent;
  };
};

/**
 * Generate component usage examples
 */
export const generateExample = (componentName, props = {}, children = null) => {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      } else if (typeof value === 'function') {
        return `${key}={${value.name || 'function'}}`;
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .join(' ');

  if (children) {
    return `<${componentName}${propsString ? ' ' + propsString : ''}>\n  ${children}\n</${componentName}>`;
  } else {
    return `<${componentName}${propsString ? ' ' + propsString : ''} />`;
  }
};

/**
 * Document API service
 */
export const documentApi = (serviceName, methods) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const documentation = {
    serviceName,
    methods: Object.entries(methods).map(([methodName, config]) => ({
      name: methodName,
      description: config.description || '',
      parameters: config.parameters || [],
      returns: config.returns || 'void',
      examples: config.examples || [],
      throws: config.throws || []
    }))
  };

  console.groupCollapsed(`📋 API Documentation: ${serviceName}`);
  console.table(documentation.methods);
  console.groupEnd();

  return documentation;
};

/**
 * Create component documentation
 */
export const createComponentDocs = (component, overrides = {}) => {
  const componentName = component.displayName || component.name || 'Component';
  const existingDocs = component.__documentation || {};
  
  return {
    name: componentName,
    description: overrides.description || existingDocs.description || '',
    props: {
      ...existingDocs.props,
      ...overrides.props
    },
    examples: [
      ...existingDocs.examples || [],
      ...overrides.examples || []
    ],
    notes: [
      ...existingDocs.notes || [],
      ...overrides.notes || []
    ],
    category: overrides.category || existingDocs.category || 'General',
    version: overrides.version || existingDocs.version || '1.0.0'
  };
};

/**
 * Documentation templates
 */
export const DOCUMENTATION_TEMPLATES = {
  component: {
    description: 'Component description',
    props: {
      children: {
        type: 'ReactNode',
        description: 'Child components to render',
        required: false
      },
      className: {
        type: 'string',
        description: 'Additional CSS classes',
        required: false
      }
    },
    examples: [
      {
        title: 'Basic usage',
        code: generateExample('Component')
      }
    ]
  },
  
  hook: {
    description: 'Custom hook description',
    parameters: [],
    returns: {
      type: 'object',
      description: 'Hook return value'
    },
    examples: [
      {
        title: 'Basic usage',
        code: 'const result = useHook();'
      }
    ]
  },
  
  service: {
    description: 'Service description',
    methods: {},
    examples: [
      {
        title: 'Basic usage',
        code: 'const result = service.method();'
      }
    ]
  }
};

/**
 * Architecture documentation
 */
export const ARCHITECTURE_DOCS = {
  patterns: {
    'Factory Pattern': {
      description: 'Used for dynamic component creation and registration',
      location: 'src/factories/ComponentFactory.js',
      benefits: [
        'Dynamic component loading',
        'Centralized component registry',
        'Lazy loading support',
        'Error boundary integration'
      ],
      example: `
        // Register component
        registerLazyComponent('my-component', 
          () => import('./MyComponent'), 
          { category: 'tools' }
        );
        
        // Create component
        const component = ComponentFactory.create('my-component');
      `
    },
    
    'Observer Pattern': {
      description: 'Event-driven communication between components',
      location: 'src/services/EventBus.js',
      benefits: [
        'Decoupled component communication',
        'Global event management',
        'Performance monitoring',
        'Error tracking'
      ],
      example: `
        // Subscribe to events
        eventBus.on('theme:changed', (data) => {
          console.log('Theme changed:', data.theme);
        });
        
        // Emit events
        eventBus.emit('theme:changed', { theme: 'dark' });
      `
    },
    
    'Strategy Pattern': {
      description: 'Interchangeable algorithms for themes and storage',
      location: 'src/services/ThemeService.js, src/services/StorageService.js',
      benefits: [
        'Multiple implementation strategies',
        'Runtime strategy switching',
        'Easy to extend',
        'Fallback mechanisms'
      ],
      example: `
        // Theme strategies
        themeService.applyTheme('dark'); // Dark strategy
        themeService.applyTheme('auto'); // Auto strategy
        
        // Storage strategies
        storageService.setStrategy('localStorage');
        storageService.setStrategy('indexedDB');
      `
    },
    
    'Context Pattern': {
      description: 'Centralized state management with React Context',
      location: 'src/contexts/AppStateContext.js',
      benefits: [
        'Global state management',
        'Predictable state updates',
        'Performance optimization',
        'Developer tools integration'
      ],
      example: `
        // Use state
        const { state, actions } = useAppState();
        
        // Update state
        actions.setActiveTab('leftbrain');
        actions.toggleDarkMode();
      `
    }
  },
  
  principles: {
    'Single Responsibility': {
      description: 'Each class/component has one reason to change',
      examples: [
        'ErrorBoundary - only handles errors',
        'LoadingSpinner - only shows loading states',
        'ThemeService - only manages themes'
      ]
    },
    
    'Open/Closed': {
      description: 'Open for extension, closed for modification',
      examples: [
        'ComponentFactory - can register new components without modification',
        'EventBus - can add new event types without changing core',
        'ThemeService - can add new themes without breaking existing ones'
      ]
    },
    
    'Dependency Inversion': {
      description: 'Depend on abstractions, not concretions',
      examples: [
        'Storage strategies implement common interface',
        'Theme strategies follow same pattern',
        'API services use abstract HTTP client'
      ]
    }
  },
  
  layerArchitecture: {
    'Presentation Layer': {
      path: 'src/components/',
      responsibility: 'UI components and user interactions',
      patterns: ['Component composition', 'HOCs', 'Render props']
    },
    
    'Business Logic Layer': {
      path: 'src/hooks/, src/contexts/',
      responsibility: 'Application logic and state management',
      patterns: ['Custom hooks', 'Context API', 'Reducer pattern']
    },
    
    'Service Layer': {
      path: 'src/services/',
      responsibility: 'External integrations and business services',
      patterns: ['Repository pattern', 'Service layer', 'Factory pattern']
    },
    
    'Data Layer': {
      path: 'src/factories/, src/utils/',
      responsibility: 'Data access and utilities',
      patterns: ['Factory pattern', 'Strategy pattern', 'Singleton pattern']
    }
  }
};

/**
 * Generate comprehensive documentation
 */
export const generateProjectDocs = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('📚 Project Architecture Documentation');
  
  console.group('🏗️ Design Patterns');
  Object.entries(ARCHITECTURE_DOCS.patterns).forEach(([pattern, docs]) => {
    console.groupCollapsed(`${pattern}`);
    console.log('Description:', docs.description);
    console.log('Location:', docs.location);
    console.log('Benefits:', docs.benefits);
    console.log('Example:', docs.example);
    console.groupEnd();
  });
  console.groupEnd();
  
  console.group('⚖️ SOLID Principles');
  Object.entries(ARCHITECTURE_DOCS.principles).forEach(([principle, docs]) => {
    console.groupCollapsed(`${principle}`);
    console.log('Description:', docs.description);
    console.log('Examples:', docs.examples);
    console.groupEnd();
  });
  console.groupEnd();
  
  console.group('🏛️ Layer Architecture');
  Object.entries(ARCHITECTURE_DOCS.layerArchitecture).forEach(([layer, docs]) => {
    console.groupCollapsed(`${layer}`);
    console.log('Path:', docs.path);
    console.log('Responsibility:', docs.responsibility);
    console.log('Patterns:', docs.patterns);
    console.groupEnd();
  });
  console.groupEnd();
  
  console.groupEnd();
};

/**
 * Performance documentation
 */
export const logPerformanceMetrics = (metrics) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('⚡ Performance Metrics');
  console.table(metrics);
  console.groupEnd();
};

/**
 * Component usage tracker
 */
export const trackComponentUsage = (() => {
  const usage = new Map();
  
  return {
    track: (componentName) => {
      const count = usage.get(componentName) || 0;
      usage.set(componentName, count + 1);
    },
    
    getReport: () => {
      const report = Array.from(usage.entries())
        .map(([name, count]) => ({ component: name, usageCount: count }))
        .sort((a, b) => b.usageCount - a.usageCount);
      
      console.table(report);
      return report;
    },
    
    clear: () => {
      usage.clear();
    }
  };
})();

export default {
  withDocumentation,
  generateExample,
  documentApi,
  createComponentDocs,
  DOCUMENTATION_TEMPLATES,
  ARCHITECTURE_DOCS,
  generateProjectDocs,
  logPerformanceMetrics,
  trackComponentUsage
};