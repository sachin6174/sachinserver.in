import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from '../../ui';
import './QuickActions.css';

const QuickActions = ({ navigationItems, activeTab, onNavigate, onThemeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Quick action shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      // Cmd/Ctrl + K to open quick actions
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }

      // Theme toggle with Cmd/Ctrl + Shift + T
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        onThemeToggle?.();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, onThemeToggle]);

  // Get all available actions
  const getAllActions = useCallback(() => {
    const actions = [];
    
    // Navigation actions
    Object.entries(navigationItems || {}).forEach(([tabKey, items]) => {
      items?.forEach(item => {
        actions.push({
          id: `nav-${tabKey}-${item.id}`,
          type: 'navigation',
          title: item.label,
          description: `Go to ${item.label} in ${tabKey}`,
          icon: item.icon,
          action: () => {
            if (activeTab !== tabKey) {
              // Switch tab first, then navigate to item
              // This would need to be handled by parent component
            }
            onNavigate?.(item.id);
          },
          keywords: [item.label.toLowerCase(), tabKey],
          category: tabKey
        });
      });
    });

    // System actions
    actions.push(
      {
        id: 'theme-toggle',
        type: 'system',
        title: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        icon: '🌓',
        action: onThemeToggle,
        keywords: ['theme', 'dark', 'light', 'mode'],
        category: 'system',
        shortcut: '⌘⇧T'
      },
      {
        id: 'about',
        type: 'navigation', 
        title: 'About Me',
        description: 'Learn about the developer',
        icon: '👤',
        action: () => onNavigate?.('about-me'),
        keywords: ['about', 'profile', 'developer', 'bio'],
        category: 'featured'
      },
      {
        id: 'dsa',
        type: 'navigation',
        title: 'Data Structures & Algorithms', 
        description: 'Interactive coding problems and solutions',
        icon: '🧮',
        action: () => onNavigate?.('dsa'),
        keywords: ['dsa', 'algorithms', 'coding', 'leetcode', 'problems'],
        category: 'featured'
      },
      {
        id: 'json-tool',
        type: 'tool',
        title: 'JSON Tool',
        description: 'Format, validate and visualize JSON data',
        icon: '📝',
        action: () => onNavigate?.('JSON-Tool'),
        keywords: ['json', 'format', 'validate', 'tool'],
        category: 'tools'
      }
    );

    return actions;
  }, [navigationItems, activeTab, onNavigate, onThemeToggle]);

  const filteredActions = React.useMemo(() => {
    const actions = getAllActions();
    if (!searchTerm.trim()) return actions.slice(0, 8); // Show featured items
    
    return actions.filter(action =>
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.keywords.some(keyword => keyword.includes(searchTerm.toLowerCase()))
    ).slice(0, 10);
  }, [searchTerm, getAllActions]);

  const handleActionSelect = (action) => {
    action.action?.();
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      {/* Quick action trigger button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="quick-actions-trigger"
        title="Quick Actions (⌘K)"
        aria-label="Open quick actions"
      >
        <span className="trigger-icon">⚡</span>
        <span className="trigger-text">Quick Actions</span>
        <span className="trigger-shortcut">⌘K</span>
      </Button>

      {/* Quick actions modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="quick-actions-modal"
        closeOnOverlayClick={true}
      >
        <div className="quick-actions-container">
          {/* Header */}
          <div className="quick-actions-header">
            <h2 className="modal-title">Quick Actions</h2>
            <div className="search-container">
              <input
                type="text"
                className="action-search"
                placeholder="Search actions, navigation, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                aria-label="Search actions"
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>

          {/* Actions list */}
          <div className="actions-list">
            {filteredActions.length > 0 ? (
              <>
                {filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    className={`action-item action-${action.type}`}
                    onClick={() => handleActionSelect(action)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleActionSelect(action);
                      }
                    }}
                  >
                    <div className="action-content">
                      <div className="action-main">
                        <span className="action-icon">{action.icon}</span>
                        <div className="action-text">
                          <h3 className="action-title">{action.title}</h3>
                          <p className="action-description">{action.description}</p>
                        </div>
                      </div>
                      <div className="action-meta">
                        {action.shortcut && (
                          <span className="action-shortcut">{action.shortcut}</span>
                        )}
                        <span className="action-category">{action.category}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <div className="no-actions">
                <div className="no-actions-icon">🔍</div>
                <h3>No actions found</h3>
                <p>Try searching for something else or browse available sections.</p>
              </div>
            )}
          </div>

          {/* Footer with shortcuts info */}
          <div className="quick-actions-footer">
            <div className="keyboard-shortcuts">
              <span className="shortcut-item">
                <kbd>↵</kbd> to select
              </span>
              <span className="shortcut-item">
                <kbd>Esc</kbd> to close
              </span>
              <span className="shortcut-item">
                <kbd>⌘⇧T</kbd> toggle theme
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickActions;