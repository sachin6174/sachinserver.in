/**
 * Custom Hooks for Application State Management
 * Provides convenient access to app state and actions
 * Implements cross-cutting concerns with reusable logic
 */

import { useContext, useEffect, useCallback } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import eventBus, { Events, emitTabChanged } from '../services/EventBus';

/**
 * Hook for accessing app state
 */
export const useAppStateValue = () => {
  const { state } = useAppState();
  return state;
};

/**
 * Hook for accessing app actions
 */
export const useAppActions = () => {
  const { actions } = useAppState();
  return actions;
};

/**
 * Hook for tab management
 */
export const useTabManagement = () => {
  const { state, actions } = useAppState();

  const changeTab = useCallback((newTab) => {
    const oldTab = state.activeTab;
    actions.setActiveTab(newTab);
    emitTabChanged(newTab, oldTab);
  }, [state.activeTab, actions]);

  const isTabActive = useCallback((tab) => {
    return state.activeTab === tab;
  }, [state.activeTab]);

  return {
    activeTab: state.activeTab,
    changeTab,
    isTabActive
  };
};

/**
 * Hook for navigation management
 */
export const useNavigation = () => {
  const { state, actions } = useAppState();

  const selectNavItem = useCallback((itemId) => {
    actions.setSelectedNavItem(itemId);
    eventBus.emit(Events.NAV_ITEM_CHANGED, {
      item: itemId,
      tab: state.activeTab,
      timestamp: Date.now()
    });
  }, [actions, state.activeTab]);

  const isNavItemSelected = useCallback((itemId) => {
    return state.selectedNavItem === itemId;
  }, [state.selectedNavItem]);

  const getLastSelectedItem = useCallback((tab) => {
    return state.lastSelectedItems[tab];
  }, [state.lastSelectedItems]);

  return {
    selectedNavItem: state.selectedNavItem,
    lastSelectedItems: state.lastSelectedItems,
    isLeftNavVisible: state.isLeftNavVisible,
    selectNavItem,
    isNavItemSelected,
    getLastSelectedItem,
    toggleLeftNav: actions.toggleLeftNav,
    setLeftNavVisible: actions.setLeftNavVisible
  };
};

/**
 * Hook for theme management
 */
export const useTheme = () => {
  const { state, actions } = useAppState();

  const toggleTheme = useCallback(() => {
    actions.toggleDarkMode();
    eventBus.emit(Events.THEME_CHANGED, {
      theme: !state.isDarkMode ? 'dark' : 'light',
      timestamp: Date.now()
    });
  }, [state.isDarkMode, actions]);

  const setTheme = useCallback((isDark) => {
    actions.setDarkMode(isDark);
    eventBus.emit(Events.THEME_CHANGED, {
      theme: isDark ? 'dark' : 'light',
      timestamp: Date.now()
    });
  }, [actions]);

  return {
    isDarkMode: state.isDarkMode,
    toggleTheme,
    setTheme
  };
};

/**
 * Hook for loading state management
 */
export const useLoading = () => {
  const { state, actions } = useAppState();

  const setLoading = useCallback((loading, context = {}) => {
    actions.setLoading(loading);
    eventBus.emit(Events.APP_LOADING, {
      loading,
      context,
      timestamp: Date.now()
    });
  }, [actions]);

  return {
    loading: state.loading,
    setLoading
  };
};

/**
 * Hook for error management
 */
export const useError = () => {
  const { state, actions } = useAppState();

  const setError = useCallback((error, context = {}) => {
    actions.setError(error);
    eventBus.emit(Events.APP_ERROR, {
      error,
      context,
      timestamp: Date.now()
    });
  }, [actions]);

  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  return {
    error: state.error,
    setError,
    clearError,
    hasError: !!state.error
  };
};