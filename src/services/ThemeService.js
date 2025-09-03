/**
 * Theme Service
 * Implements Strategy pattern for theme management
 * Handles theme switching, persistence, and system preference detection
 * Provides CSS custom property management and theme transitions
 */

import eventBus, { Events } from './EventBus';
import StorageService from './StorageService';

/**
 * Theme Strategy Interface
 */
class ThemeStrategy {
  apply() {
    throw new Error('apply method must be implemented');
  }

  getName() {
    throw new Error('getName method must be implemented');
  }

  getProperties() {
    throw new Error('getProperties method must be implemented');
  }
}

/**
 * Light Theme Strategy
 */
class LightThemeStrategy extends ThemeStrategy {
  apply() {
    // Only manage theme classes; tokens drive colors via CSS.
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }

  getName() {
    return 'light';
  }

  getProperties() {
    // Tokens live in CSS; we expose empty properties for compatibility.
    return {};
  }
}

/**
 * Dark Theme Strategy
 */
class DarkThemeStrategy extends ThemeStrategy {
  apply() {
    // Only manage theme classes; tokens drive colors via CSS.
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }

  getName() {
    return 'dark';
  }

  getProperties() {
    return {};
  }
}

/**
 * Auto Theme Strategy - follows system preference
 */
class AutoThemeStrategy extends ThemeStrategy {
  constructor() {
    super();
    this.lightStrategy = new LightThemeStrategy();
    this.darkStrategy = new DarkThemeStrategy();
  }

  apply() {
    const isDarkMode = this.getSystemPreference();
    const strategy = isDarkMode ? this.darkStrategy : this.lightStrategy;
    strategy.apply();
    return isDarkMode;
  }

  getName() {
    return 'auto';
  }

  getProperties() {
    const isDarkMode = this.getSystemPreference();
    const strategy = isDarkMode ? this.darkStrategy : this.lightStrategy;
    return strategy.getProperties();
  }

  getSystemPreference() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }
}

/**
 * High Contrast Theme Strategy
 */
class HighContrastThemeStrategy extends ThemeStrategy {
  apply() {
    // Only manage theme classes; tokens drive colors via CSS.
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add('high-contrast-mode');
  }

  getName() {
    return 'high-contrast';
  }

  getProperties() {
    return {};
  }
}

/**
 * Theme Service
 * Manages theme switching and persistence using Strategy pattern
 */
export class ThemeService {
  constructor() {
    this.strategies = {
      light: new LightThemeStrategy(),
      dark: new DarkThemeStrategy(),
      auto: new AutoThemeStrategy(),
      'high-contrast': new HighContrastThemeStrategy()
    };

    this.currentTheme = 'light';
    this.systemThemeListener = null;
    this.transitionClass = 'theme-transition';
    
    this.initializeThemeTransitions();
  }

  /**
   * Initialize smooth theme transitions
   */
  initializeThemeTransitions() {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      .theme-transition * {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease, 
                    box-shadow 0.3s ease !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Apply theme with transition effect
   */
  applyTheme(themeName, enableTransition = true) {
    if (!this.strategies[themeName]) {
      console.warn(`[ThemeService] Theme '${themeName}' not found, using light theme`);
      themeName = 'light';
    }

    const previousTheme = this.currentTheme;
    this.currentTheme = themeName;

    if (enableTransition && typeof document !== 'undefined') {
      document.body.classList.add(this.transitionClass);
    }

    const strategy = this.strategies[themeName];
    const result = strategy.apply();

    // For auto theme, get the actual theme applied
    const actualTheme = themeName === 'auto' ? (result ? 'dark' : 'light') : themeName;

    if (enableTransition && typeof document !== 'undefined') {
      setTimeout(() => {
        document.body.classList.remove(this.transitionClass);
      }, 300);
    }

    // Emit theme change event
    eventBus.emit(Events.THEME_CHANGED, {
      theme: actualTheme,
      previousTheme,
      timestamp: Date.now()
    });

    // Persist theme preference
    this.persistTheme(themeName);

    return actualTheme;
  }

  /**
   * Get current theme name
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get available themes
   */
  getAvailableThemes() {
    return Object.keys(this.strategies);
  }

  /**
   * Check if theme exists
   */
  hasTheme(themeName) {
    return this.strategies.hasOwnProperty(themeName);
  }

  /**
   * Get theme properties
   */
  getThemeProperties(themeName = this.currentTheme) {
    const strategy = this.strategies[themeName];
    return strategy ? strategy.getProperties() : {};
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    return this.applyTheme(newTheme);
  }

  /**
   * Get system theme preference
   */
  getSystemPreference() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Listen for system theme changes
   */
  listenForSystemChanges() {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    if (this.systemThemeListener) {
      this.stopListeningForSystemChanges();
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.systemThemeListener = (e) => {
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }
      
      eventBus.emit(Events.THEME_SYSTEM_CHANGED, {
        systemTheme: e.matches ? 'dark' : 'light',
        timestamp: Date.now()
      });
    };

    mediaQuery.addEventListener('change', this.systemThemeListener);
  }

  /**
   * Stop listening for system theme changes
   */
  stopListeningForSystemChanges() {
    if (typeof window === 'undefined' || !window.matchMedia || !this.systemThemeListener) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.removeEventListener('change', this.systemThemeListener);
    this.systemThemeListener = null;
  }

  /**
   * Get initial theme from storage or system preference
   */
  async getInitialTheme() {
    try {
      const storedTheme = await StorageService.getItem('app_theme');
      
      if (storedTheme && this.hasTheme(storedTheme)) {
        return storedTheme;
      }

      // Check for system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersAuto = await StorageService.getItem('app_theme_auto');
        if (prefersAuto !== false) {
          return 'auto';
        }
        
        return this.getSystemPreference();
      }

      return 'light';
    } catch (error) {
      console.warn('[ThemeService] Failed to get initial theme:', error);
      return 'light';
    }
  }

  /**
   * Persist theme preference
   */
  async persistTheme(themeName) {
    try {
      await StorageService.setItem('app_theme', themeName);
      
      if (themeName === 'auto') {
        await StorageService.setItem('app_theme_auto', true);
      }
    } catch (error) {
      console.warn('[ThemeService] Failed to persist theme:', error);
    }
  }

  /**
   * Initialize theme service
   */
  async initialize() {
    const initialTheme = await this.getInitialTheme();
    this.applyTheme(initialTheme, false);
    this.listenForSystemChanges();
    
    console.log(`[ThemeService] Initialized with theme: ${initialTheme}`);
    return initialTheme;
  }

  /**
   * Cleanup theme service
   */
  cleanup() {
    this.stopListeningForSystemChanges();
  }

  /**
   * Get CSS for current theme (for server-side rendering)
   */
  getCSSVariables(themeName = this.currentTheme) {
    const properties = this.getThemeProperties(themeName);
    
    return Object.entries(properties)
      .map(([property, value]) => `${property}: ${value};`)
      .join(' ');
  }

  /**
   * Register a custom theme strategy
   */
  registerTheme(name, strategy) {
    if (!(strategy instanceof ThemeStrategy)) {
      throw new Error('Theme strategy must extend ThemeStrategy class');
    }

    this.strategies[name] = strategy;
    console.log(`[ThemeService] Registered custom theme: ${name}`);
  }

  /**
   * Unregister a theme strategy
   */
  unregisterTheme(name) {
    if (name === 'light' || name === 'dark') {
      throw new Error('Cannot unregister built-in themes');
    }

    delete this.strategies[name];
  }
}

// Export singleton instance
const themeService = new ThemeService();

// Convenience methods
export const applyTheme = (theme) => themeService.applyTheme(theme);
export const getCurrentTheme = () => themeService.getCurrentTheme();
export const toggleTheme = () => themeService.toggleTheme();
export const getInitialTheme = () => themeService.getInitialTheme();

export default themeService;
