/**
 * Application Constants
 * Centralized configuration and constant values
 * Follows Single Source of Truth principle
 */

// Tab Configuration
export const TABS = {
  LEFT_BRAIN: 'leftbrain',
  RIGHT_BRAIN: 'rightbrain',
  DEVELOPER_TOOLS: 'developer-tools',
  QA_TOOLS: 'qa-tools',
  GENERAL_TOOLS: 'general-tools'
};

export const TAB_LABELS = {
  [TABS.LEFT_BRAIN]: 'LeftBrain',
  [TABS.RIGHT_BRAIN]: 'RightBrain', 
  [TABS.DEVELOPER_TOOLS]: 'Developer Tools',
  [TABS.QA_TOOLS]: 'QA Tools',
  [TABS.GENERAL_TOOLS]: 'General Tools'
};

export const TAB_ICONS = {
  [TABS.LEFT_BRAIN]: '🧠',
  [TABS.RIGHT_BRAIN]: '🎨',
  [TABS.DEVELOPER_TOOLS]: '💻',
  [TABS.QA_TOOLS]: '🧪',
  [TABS.GENERAL_TOOLS]: '🛠️'
};

export const TAB_DESCRIPTIONS = {
  [TABS.LEFT_BRAIN]: 'Technical skills and logical thinking',
  [TABS.RIGHT_BRAIN]: 'Creative pursuits and artistic expression',
  [TABS.DEVELOPER_TOOLS]: 'Tools for software development',
  [TABS.QA_TOOLS]: 'Quality assurance and testing utilities',
  [TABS.GENERAL_TOOLS]: 'General purpose tools and utilities'
};

// Default Navigation Items
export const DEFAULT_NAV_ITEMS = {
  [TABS.LEFT_BRAIN]: 'about-me',
  [TABS.RIGHT_BRAIN]: 'drawing',
  [TABS.DEVELOPER_TOOLS]: 'ai-tools-channels',
  [TABS.QA_TOOLS]: 'qa-testing-apps',
  [TABS.GENERAL_TOOLS]: 'info-tool'
};

// Storage Keys
export const STORAGE_KEYS = {
  ACTIVE_TAB: 'app_state_activeTab',
  SELECTED_NAV_ITEM: 'app_state_selectedNavItem',
  IS_DARK_MODE: 'app_state_isDarkMode',
  IS_LEFT_NAV_VISIBLE: 'app_state_isLeftNavVisible',
  LAST_SELECTED_ITEMS: 'app_state_lastSelectedItems',
  THEME: 'app_theme',
  THEME_AUTO: 'app_theme_auto'
};

// Performance Constants
export const PERFORMANCE = {
  SLOW_RENDER_THRESHOLD: 16, // 16ms = 60fps
  SLOW_MOUNT_THRESHOLD: 100, // 100ms
  CACHE_TTL_DEFAULT: 300000, // 5 minutes
  CACHE_TTL_SHORT: 60000, // 1 minute
  CACHE_TTL_LONG: 3600000, // 1 hour
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100
};

// API Configuration
export const API = {
  TIMEOUT: 10000,
  RETRIES: 3,
  RETRY_DELAY: 1000,
  CACHE_MAX_SIZE: 100,
  ENDPOINTS: {
    IP_SERVICE: 'https://api.ipify.org?format=json',
    QUOTES: 'https://api.quotable.io/random',
    GITHUB_USER: 'https://api.github.com/users',
    GITHUB_REPOS: 'https://api.github.com/users/{username}/repos'
  }
};

// Theme Constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
  HIGH_CONTRAST: 'high-contrast'
};

// Error Types
export const ERROR_TYPES = {
  NETWORK: 'network',
  COMPONENT: 'component',
  STORAGE: 'storage',
  CHUNK_LOAD: 'chunk_load',
  BOUNDARY: 'boundary'
};

// Event Names (from EventBus but centralized here)
export const EVENT_NAMES = {
  // Navigation
  TAB_CHANGED: 'navigation:tab-changed',
  NAV_ITEM_CHANGED: 'navigation:nav-item-changed',
  NAV_VISIBILITY_CHANGED: 'navigation:visibility-changed',
  
  // Theme
  THEME_CHANGED: 'theme:changed',
  THEME_SYSTEM_CHANGED: 'theme:system-changed',
  
  // App State
  APP_INITIALIZED: 'app:initialized',
  APP_ERROR: 'app:error',
  APP_LOADING: 'app:loading',
  
  // Components
  COMPONENT_MOUNTED: 'component:mounted',
  COMPONENT_UNMOUNTED: 'component:unmounted',
  COMPONENT_ERROR: 'component:error',
  
  // Data
  DATA_LOADED: 'data:loaded',
  DATA_ERROR: 'data:error',
  DATA_UPDATED: 'data:updated',
  
  // Performance
  PERFORMANCE_MARK: 'performance:mark',
  PERFORMANCE_MEASURE: 'performance:measure',
  
  // Errors
  ERROR_BOUNDARY: 'error:boundary',
  ERROR_NETWORK: 'error:network',
  ERROR_CHUNK_LOAD: 'error:chunk-load'
};

// CSS Classes
export const CSS_CLASSES = {
  THEME_TRANSITION: 'theme-transition',
  DARK_MODE: 'dark-mode',
  LIGHT_MODE: 'light-mode',
  HIGH_CONTRAST_MODE: 'high-contrast-mode',
  FADE_IN: 'fade-in',
  FADE_OUT: 'fade-out',
  SLIDE_IN: 'slide-in',
  SLIDE_OUT: 'slide-out'
};

// Validation Rules
export const VALIDATION = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  MAX_TEXT_LENGTH: 10000,
  MIN_TEXT_LENGTH: 1
};

// Feature Flags
export const FEATURES = {
  PERFORMANCE_MONITORING: process.env.NODE_ENV === 'development',
  ERROR_REPORTING: process.env.NODE_ENV === 'production',
  ANALYTICS: process.env.NODE_ENV === 'production',
  SERVICE_WORKER: process.env.NODE_ENV === 'production',
  HOT_RELOAD: process.env.NODE_ENV === 'development'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1440
};

// Z-Index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  MODAL: 2000,
  TOOLTIP: 3000,
  NOTIFICATION: 4000,
  ERROR_OVERLAY: 5000
};

export default {
  TABS,
  TAB_LABELS,
  TAB_ICONS,
  TAB_DESCRIPTIONS,
  DEFAULT_NAV_ITEMS,
  STORAGE_KEYS,
  PERFORMANCE,
  API,
  THEMES,
  ERROR_TYPES,
  EVENT_NAMES,
  CSS_CLASSES,
  VALIDATION,
  FEATURES,
  BREAKPOINTS,
  Z_INDEX
};