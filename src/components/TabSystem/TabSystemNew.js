/**
 * Refactored Tab System Component
 * Uses new architectural patterns: Context API, Factory Pattern, HOCs
 * Follows SOLID principles and separation of concerns
 */

import React, { useEffect } from 'react';
import { AppStateProvider } from '../../contexts/AppStateContext';
import { useTabManagement, useTheme, useNavigation } from '../../hooks/useAppState';
import { useEventListener } from '../../hooks/useEventBus';
import { ComponentFactory } from '../../factories/ComponentFactory';
import { initializeComponentRegistry } from '../../config/componentRegistry';
import { withErrorBoundary } from '../../hoc/withErrorHandling';
import { withPerformanceMonitoring } from '../../hoc/withPerformanceMonitoring';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { TABS, TAB_LABELS, TAB_ICONS, EVENT_NAMES } from '../../utils/constants';
import { getComponentsByCategory } from '../../factories/ComponentFactory';
import logo from '../../assets/logo512.png';
import { ReactComponent as ToggleIcon } from '../../assets/svgs/toggle-icon.svg';
import './TabSystem.css';

/**
 * Tab Header Component
 */
const TabHeader = withPerformanceMonitoring()(({ activeTab, onTabChange, onThemeToggle, isDarkMode }) => {
  const tabs = [TABS.LEFT_BRAIN, TABS.RIGHT_BRAIN, TABS.DEVELOPER_TOOLS, TABS.QA_TOOLS, TABS.GENERAL_TOOLS];

  return (
    <div className="tabs">
      <div className="nav-section">
        <img src={logo} alt="Tab Icon" />
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
            role="button"
            tabIndex={0}
            aria-label={`Switch to ${TAB_LABELS[tab]}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTabChange(tab);
              }
            }}
          >
            <span className="tab-icon" aria-hidden="true">
              {TAB_ICONS[tab]}
            </span>
            {TAB_LABELS[tab]}
          </div>
        ))}
      </div>
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? "☀️ Day Mode" : "🌙 Night Mode"}
      </button>
    </div>
  );
});

/**
 * Navigation Component
 */
const Navigation = withPerformanceMonitoring()(({ 
  activeTab, 
  selectedNavItem, 
  onNavItemSelect, 
  isVisible, 
  onToggleVisibility 
}) => {
  const [navigationItems, setNavigationItems] = React.useState([]);

  useEffect(() => {
    // Get components for current tab from factory
    const components = getComponentsByCategory(activeTab);
    const items = components.map(({ metadata }) => ({
      id: metadata.id,
      label: metadata.label,
      icon: metadata.icon
    }));
    setNavigationItems(items);
  }, [activeTab]);

  if (!navigationItems.length) {
    return (
      <div className="left-nav">
        <LoadingSpinner size="small" text="Loading navigation..." />
      </div>
    );
  }

  return (
    <div className={`left-nav ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav-toggle-container">
        <button
          className="nav-toggle-btn"
          onClick={onToggleVisibility}
          aria-label={isVisible ? "Hide navigation" : "Show navigation"}
        >
          <ToggleIcon className="toggle-icon" />
        </button>
      </div>
      {isVisible && (
        <div className="nav-items">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${selectedNavItem === item.id ? "selected" : ""}`}
              onClick={() => onNavItemSelect(item.id)}
              role="button"
              tabIndex={0}
              aria-label={`Navigate to ${item.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavItemSelect(item.id);
                }
              }}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * Main Content Component
 */
const MainContent = withPerformanceMonitoring()(({ 
  activeTab, 
  selectedNavItem, 
  isLeftNavVisible 
}) => {
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const loadComponent = async () => {
      if (!selectedNavItem) return;

      setLoading(true);
      try {
        // Use ComponentFactory to create component with error boundary and suspense
        const component = ComponentFactory.create(selectedNavItem, {}, {
          withErrorBoundary: true,
          withSuspense: true,
          loadingFallback: <LoadingSpinner text={`Loading ${selectedNavItem}...`} />
        });
        setCurrentComponent(component);
      } catch (error) {
        console.error('Failed to load component:', error);
        setCurrentComponent(
          <div className="component-error">
            <h3>Failed to load component</h3>
            <p>Component '{selectedNavItem}' could not be loaded.</p>
          </div>
        );
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [selectedNavItem]);

  const getBreadcrumb = () => {
    const tabInfo = {
      icon: TAB_ICONS[activeTab],
      shortName: TAB_LABELS[activeTab],
      fullName: `${TAB_LABELS[activeTab]}: ${TAB_LABELS[activeTab]}`
    };

    return (
      <nav className="breadcrumb-path" aria-label="Navigation breadcrumb">
        <div className="breadcrumb-item">
          <span className="breadcrumb-icon" aria-hidden="true">{tabInfo.icon}</span>
          <span className="tab-label-mobile">{tabInfo.shortName}</span>
          <span className="tab-label-desktop">{tabInfo.fullName}</span>
        </div>
        {selectedNavItem && (
          <>
            <span className="breadcrumb-separator" aria-hidden="true">›</span>
            <div className="breadcrumb-item breadcrumb-current">
              <span>{selectedNavItem}</span>
            </div>
          </>
        )}
      </nav>
    );
  };

  if (loading) {
    return (
      <div className="tab-content">
        {getBreadcrumb()}
        <div className="separator-line" role="separator" aria-hidden="true"></div>
        <LoadingSpinner text={`Loading ${selectedNavItem}...`} />
      </div>
    );
  }

  return (
    <div className="tab-content">
      {getBreadcrumb()}
      <div className="separator-line" role="separator" aria-hidden="true"></div>
      <main 
        className="description"
        role="main"
        aria-live="polite"
        aria-label="Main content area"
      >
        <div className="content-wrapper">
          {currentComponent || (
            <div className="placeholder-content">
              <div className="placeholder-icon">{TAB_ICONS[activeTab]}</div>
              <h2>Welcome to {TAB_LABELS[activeTab]}</h2>
              <p>Select an item from the navigation to view its content.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

/**
 * Main Tab System Component
 */
const TabSystemCore = () => {
  const { activeTab, changeTab } = useTabManagement();
  const { isDarkMode, toggleTheme } = useTheme();
  const { 
    selectedNavItem, 
    isLeftNavVisible, 
    selectNavItem, 
    toggleLeftNav 
  } = useNavigation();

  // Listen for performance events
  useEventListener(EVENT_NAMES.PERFORMANCE_MEASURE, (data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance]', data);
    }
  });

  // Listen for error events
  useEventListener(EVENT_NAMES.COMPONENT_ERROR, (data) => {
    console.error('[Component Error]', data);
  });

  return (
    <div className="main-container">
      <TabHeader
        activeTab={activeTab}
        onTabChange={changeTab}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <div className={`tab-content-container ${!isLeftNavVisible ? 'nav-hidden' : ''}`}>
        <Navigation
          activeTab={activeTab}
          selectedNavItem={selectedNavItem}
          onNavItemSelect={selectNavItem}
          isVisible={isLeftNavVisible}
          onToggleVisibility={toggleLeftNav}
        />

        <MainContent
          activeTab={activeTab}
          selectedNavItem={selectedNavItem}
          isLeftNavVisible={isLeftNavVisible}
        />
      </div>
    </div>
  );
};

/**
 * Tab System with providers and initialization
 */
const TabSystemNew = () => {
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize component registry
        initializeComponentRegistry();
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize TabSystem:', error);
      }
    };

    initialize();
  }, []);

  if (!initialized) {
    return <LoadingSpinner text="Initializing application..." />;
  }

  return (
    <ErrorBoundary
      title="Application Error"
      message="The application encountered an unexpected error."
    >
      <AppStateProvider>
        <TabSystemCore />
      </AppStateProvider>
    </ErrorBoundary>
  );
};

export default TabSystemNew;