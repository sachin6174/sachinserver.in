/**
 * App State Context - Central state management for the portfolio application
 * Implements Flux architecture pattern with Context API
 * Follows Single Responsibility Principle for state management
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { StorageService } from '../services/StorageService';
import { ThemeService } from '../services/ThemeService';

// Action Types (Enum-like pattern)
export const ActionTypes = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_SELECTED_NAV_ITEM: 'SET_SELECTED_NAV_ITEM',
  SET_DARK_MODE: 'SET_DARK_MODE',
  SET_LEFT_NAV_VISIBLE: 'SET_LEFT_NAV_VISIBLE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LAST_SELECTED_ITEMS: 'SET_LAST_SELECTED_ITEMS',
  HYDRATE_STATE: 'HYDRATE_STATE'
};

// Initial State
const initialState = {
  activeTab: 'leftbrain',
  selectedNavItem: 'about-me',
  isDarkMode: false,
  isLeftNavVisible: true,
  lastSelectedItems: {
    leftbrain: 'about-me',
    rightbrain: 'drawing',
    'developer-tools': 'ai-tools-channels',
    'qa-tools': 'macos-app-catalog',
    'general-tools': 'info-tool'
  },
  loading: false,
  error: null
};

// Reducer following Flux pattern
const appStateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
        selectedNavItem: state.lastSelectedItems[action.payload] || getDefaultItemForTab(action.payload)
      };

    case ActionTypes.SET_SELECTED_NAV_ITEM:
      return {
        ...state,
        selectedNavItem: action.payload,
        lastSelectedItems: {
          ...state.lastSelectedItems,
          [state.activeTab]: action.payload
        }
      };

    case ActionTypes.SET_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload
      };

    case ActionTypes.SET_LEFT_NAV_VISIBLE:
      return {
        ...state,
        isLeftNavVisible: action.payload
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ActionTypes.SET_LAST_SELECTED_ITEMS:
      return {
        ...state,
        lastSelectedItems: action.payload
      };

    case ActionTypes.HYDRATE_STATE:
      return {
        ...state,
        ...action.payload
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Helper function
const getDefaultItemForTab = (tab) => {
  const defaults = {
    'developer-tools': 'ai-tools-channels',
    'qa-tools': 'macos-app-catalog',
    'general-tools': 'info-tool',
    'rightbrain': 'drawing',
    'leftbrain': 'about-me'
  };
  return defaults[tab] || 'about-me';
};

// Context
const AppStateContext = createContext();

// Provider Component
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // Initialize state from storage
  useEffect(() => {
    const initializeState = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });

        // Load persisted state
        const persistedState = await StorageService.getPersistedState();
        
        // Initialize theme
        const initialTheme = ThemeService.getInitialTheme();
        
        const hydratedState = {
          ...persistedState,
          isDarkMode: initialTheme
        };

        dispatch({ type: ActionTypes.HYDRATE_STATE, payload: hydratedState });
        
        // Apply theme
        ThemeService.applyTheme(initialTheme);
        
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to initialize application state' });
      }
    };

    initializeState();
  }, []);

  // Persist state changes
  useEffect(() => {
    if (!state.loading) {
      StorageService.persistState({
        activeTab: state.activeTab,
        selectedNavItem: state.selectedNavItem,
        isDarkMode: state.isDarkMode,
        isLeftNavVisible: state.isLeftNavVisible,
        lastSelectedItems: state.lastSelectedItems
      });
    }
  }, [state.activeTab, state.selectedNavItem, state.isDarkMode, state.isLeftNavVisible, state.lastSelectedItems, state.loading]);

  // Action creators (Command pattern)
  const actions = {
    setActiveTab: (tab) => {
      dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: tab });
    },

    setSelectedNavItem: (item) => {
      dispatch({ type: ActionTypes.SET_SELECTED_NAV_ITEM, payload: item });
    },

    setDarkMode: (isDark) => {
      dispatch({ type: ActionTypes.SET_DARK_MODE, payload: isDark });
      ThemeService.applyTheme(isDark);
    },

    toggleDarkMode: () => {
      const newMode = !state.isDarkMode;
      dispatch({ type: ActionTypes.SET_DARK_MODE, payload: newMode });
      ThemeService.applyTheme(newMode);
    },

    setLeftNavVisible: (isVisible) => {
      dispatch({ type: ActionTypes.SET_LEFT_NAV_VISIBLE, payload: isVisible });
    },

    toggleLeftNav: () => {
      dispatch({ type: ActionTypes.SET_LEFT_NAV_VISIBLE, payload: !state.isLeftNavVisible });
    },

    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    }
  };

  const value = {
    state,
    actions
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook for consuming context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export default AppStateContext;