import React, { useState } from 'react';
import { Sheet, Button } from '../../ui';
import NavigationSearch from '../NavigationSearch/NavigationSearch';
import './MobileNavigation.css';

const MobileNavigation = ({ 
  items = [], 
  selectedNavItem, 
  setSelectedNavItem, 
  activeTab 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(new Set(['featured']));

  // Group items for better mobile UX
  const groupedItems = React.useMemo(() => {
    if (!items) return {};
    
    // Featured/Popular items
    const featured = ['about-me', 'dsa', 'github', 'JSON-Tool', 'crypto-tool', 'drawing'];
    const recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed') || '[]');
    
    return {
      featured: items.filter(item => featured.includes(item.id)),
      recent: items.filter(item => recentlyUsed.includes(item.id) && !featured.includes(item.id)),
      all: items
    };
  }, [items]);

  const handleItemSelect = (itemId) => {
    setSelectedNavItem(itemId);
    setIsOpen(false);
    
    // Track recently used
    const recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed') || '[]');
    const updated = [itemId, ...recentlyUsed.filter(id => id !== itemId)].slice(0, 5);
    localStorage.setItem('recentlyUsed', JSON.stringify(updated));
  };

  const toggleGroup = (groupName) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const currentItem = items?.find(item => item.id === selectedNavItem);

  return (
    <>
      {/* Mobile nav trigger */}
      <div className="mobile-nav-trigger">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="nav-trigger-btn"
        >
          <span className="current-item">
            {currentItem ? (
              <>
                <span className="current-icon">{currentItem.icon}</span>
                <span className="current-label">{currentItem.label}</span>
              </>
            ) : (
              'Browse sections'
            )}
          </span>
          <span className="trigger-arrow">▼</span>
        </Button>
      </div>

      {/* Mobile navigation sheet */}
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${activeTab} Navigation`}
        className="mobile-navigation-sheet"
      >
        <div className="mobile-nav-content">
          {/* Search */}
          <NavigationSearch
            items={items}
            onItemSelect={handleItemSelect}
            placeholder={`Search ${activeTab}...`}
          />

          {/* Quick Access - Featured */}
          {groupedItems.featured?.length > 0 && (
            <div className="nav-group">
              <button
                className="nav-group-header"
                onClick={() => toggleGroup('featured')}
                aria-expanded={expandedGroups.has('featured')}
              >
                <span className="group-title">⭐ Featured</span>
                <span className={`group-arrow ${expandedGroups.has('featured') ? 'expanded' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedGroups.has('featured') && (
                <div className="nav-group-items">
                  {groupedItems.featured.map((item) => (
                    <button
                      key={item.id}
                      className={`mobile-nav-item ${selectedNavItem === item.id ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item.id)}
                    >
                      <span className="nav-item-icon">{item.icon}</span>
                      <span className="nav-item-label">{item.label}</span>
                      {selectedNavItem === item.id && (
                        <span className="selected-indicator">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recent */}
          {groupedItems.recent?.length > 0 && (
            <div className="nav-group">
              <button
                className="nav-group-header"
                onClick={() => toggleGroup('recent')}
                aria-expanded={expandedGroups.has('recent')}
              >
                <span className="group-title">🕒 Recently Used</span>
                <span className={`group-arrow ${expandedGroups.has('recent') ? 'expanded' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedGroups.has('recent') && (
                <div className="nav-group-items">
                  {groupedItems.recent.map((item) => (
                    <button
                      key={item.id}
                      className={`mobile-nav-item ${selectedNavItem === item.id ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item.id)}
                    >
                      <span className="nav-item-icon">{item.icon}</span>
                      <span className="nav-item-label">{item.label}</span>
                      {selectedNavItem === item.id && (
                        <span className="selected-indicator">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Items */}
          <div className="nav-group">
            <button
              className="nav-group-header"
              onClick={() => toggleGroup('all')}
              aria-expanded={expandedGroups.has('all')}
            >
              <span className="group-title">📋 All Items ({items?.length || 0})</span>
              <span className={`group-arrow ${expandedGroups.has('all') ? 'expanded' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('all') && (
              <div className="nav-group-items">
                {groupedItems.all?.map((item) => (
                  <button
                    key={item.id}
                    className={`mobile-nav-item ${selectedNavItem === item.id ? 'selected' : ''}`}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    <span className="nav-item-label">{item.label}</span>
                    {selectedNavItem === item.id && (
                      <span className="selected-indicator">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Sheet>
    </>
  );
};

export default MobileNavigation;
