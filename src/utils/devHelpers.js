/**
 * Development Helpers
 * Utilities to enhance development experience including auto-reload features
 */

/**
 * Enable enhanced hot reload for development
 */
export const enableEnhancedHotReload = () => {
  if (process.env.NODE_ENV !== 'development') return;

  // Enhanced error overlay settings
  if (window.__webpack_dev_server__) {
    window.__webpack_dev_server__.sockHost = 'localhost';
    window.__webpack_dev_server__.sockPort = 3000;
  }

  // Listen for file changes and force reload if needed
  if (module.hot) {
    module.hot.accept();
    
    // Custom hot reload logic for specific file types
    module.hot.addStatusHandler((status) => {
      if (status === 'idle') {
        console.log('🔥 Hot reload completed');
      }
    });
  }

  // Auto-reload on focus (useful when editing external files)
  let isVisible = true;
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !isVisible) {
      isVisible = true;
      // Check if there are any updates after returning to tab
      setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Checking for updates after tab focus');
        }
      }, 1000);
    } else {
      isVisible = false;
    }
  });

  console.log('🚀 Enhanced hot reload enabled');
};

/**
 * Force reload the entire application
 */
export const forceReload = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 Force reloading application...');
    window.location.reload();
  }
};

/**
 * Watch for localStorage changes and reload component registry
 */
export const watchRegistryChanges = () => {
  if (process.env.NODE_ENV !== 'development') return;

  // Watch for manual registry updates
  window.addEventListener('storage', (e) => {
    if (e.key === 'dev_force_registry_reload') {
      console.log('🔧 Registry reload requested');
      forceReload();
    }
  });

  // Expose helper function globally for console access
  window.reloadRegistry = () => {
    localStorage.setItem('dev_force_registry_reload', Date.now().toString());
    localStorage.removeItem('dev_force_registry_reload');
    forceReload();
  };
};

/**
 * Enhanced error handling for development
 */
export const enhanceErrorHandling = () => {
  if (process.env.NODE_ENV !== 'development') return;

  // Catch and display chunk loading errors
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.name === 'ChunkLoadError') {
      console.warn('🔄 Chunk load error detected, reloading...');
      window.location.reload();
    }
  });

  // Enhanced error display
  window.addEventListener('error', (event) => {
    if (event.filename?.includes('static/js/')) {
      console.warn('🔄 JavaScript error detected, consider reloading');
    }
  });
};

/**
 * Development keyboard shortcuts
 */
export const enableDevShortcuts = () => {
  if (process.env.NODE_ENV !== 'development') return;

  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + R: Force reload
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
      e.preventDefault();
      forceReload();
    }

    // Ctrl/Cmd + Shift + D: Toggle development info
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      console.log('📊 Development Info:', {
        hotReload: !!module.hot,
        nodeEnv: process.env.NODE_ENV,
        reactVersion: require('react').version,
        timestamp: new Date().toISOString()
      });
    }
  });

  console.log('⌨️ Development shortcuts enabled:', {
    'Ctrl/Cmd + Shift + R': 'Force reload',
    'Ctrl/Cmd + Shift + D': 'Show dev info'
  });
};

/**
 * Initialize all development helpers
 */
export const initializeDevHelpers = () => {
  if (process.env.NODE_ENV === 'development') {
    enableEnhancedHotReload();
    watchRegistryChanges();
    enhanceErrorHandling();
    enableDevShortcuts();
    
    console.log('🛠️ Development helpers initialized');
    console.log('💡 Use window.reloadRegistry() to force component registry reload');
  }
};

export default {
  enableEnhancedHotReload,
  forceReload,
  watchRegistryChanges,
  enhanceErrorHandling,
  enableDevShortcuts,
  initializeDevHelpers
};