import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommandPalette.css';

const CommandPalette = ({ navigationItems, activeTab, toggleTheme, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();

    // Build flat action list from all navigation items
    const allActions = useMemo(() => {
        const actions = [];
        const tabLabels = {
            leftbrain: 'LeftBrain',
            rightbrain: 'RightBrain',
            'developer-tools': '💻 Dev Tools',
            'qa-tools': '🧪 QA Tools',
            'general-tools': '🛠️ General'
        };

        Object.entries(navigationItems || {}).forEach(([tab, items]) => {
            items?.forEach(item => {
                actions.push({
                    id: `${tab}/${item.id}`,
                    label: item.label,
                    icon: item.icon,
                    section: tabLabels[tab] || tab,
                    tab,
                    itemId: item.id,
                    type: 'navigate'
                });
            });
        });

        // System actions
        actions.push({
            id: 'toggle-theme',
            label: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            icon: isDarkMode ? '☀️' : '🌙',
            section: 'System',
            type: 'action',
            action: toggleTheme
        });

        return actions;
    }, [navigationItems, isDarkMode, toggleTheme]);

    const filtered = useMemo(() => {
        if (!query.trim()) return allActions.slice(0, 12);
        const q = query.toLowerCase();
        return allActions.filter(a =>
            a.label.toLowerCase().includes(q) ||
            a.section.toLowerCase().includes(q)
        ).slice(0, 12);
    }, [query, allActions]);

    const open = useCallback(() => {
        setIsOpen(true);
        setQuery('');
        setSelectedIndex(0);
        setTimeout(() => inputRef.current?.focus(), 50);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setQuery('');
    }, []);

    const runAction = useCallback((action) => {
        if (action.type === 'navigate') {
            navigate(`/${action.tab}/${action.itemId}`);
        } else if (action.type === 'action') {
            action.action?.();
        }
        close();
    }, [navigate, close]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                isOpen ? close() : open();
            }
            if (e.key === 'Escape' && isOpen) close();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, open, close]);

    // Arrow key navigation inside modal
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
            runAction(filtered[selectedIndex]);
        }
    }, [filtered, selectedIndex, runAction]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Scroll selected into view
    useEffect(() => {
        const el = listRef.current?.children[selectedIndex];
        el?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);

    if (!isOpen) {
        return (
            <button
                className="cmd-trigger"
                onClick={open}
                aria-label="Open command palette"
                title="Quick Search (⌘K)"
            >
                <span className="cmd-trigger-icon">⌘</span>
                <span className="cmd-trigger-text">Search</span>
                <kbd className="cmd-trigger-kbd">K</kbd>
            </button>
        );
    }

    // Group results by section
    const grouped = filtered.reduce((acc, action) => {
        if (!acc[action.section]) acc[action.section] = [];
        acc[action.section].push(action);
        return acc;
    }, {});

    let globalIndex = 0;

    return (
        <div className="cmd-overlay" onClick={close} role="dialog" aria-modal="true" aria-label="Command Palette">
            <div className="cmd-modal" onClick={e => e.stopPropagation()}>
                <div className="cmd-search-row">
                    <span className="cmd-search-icon">🔍</span>
                    <input
                        ref={inputRef}
                        className="cmd-input"
                        type="text"
                        placeholder="Search pages, tools, actions…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {query && (
                        <button className="cmd-clear" onClick={() => setQuery('')} aria-label="Clear search">✕</button>
                    )}
                    <kbd className="cmd-esc-hint">Esc</kbd>
                </div>

                <div className="cmd-results" ref={listRef}>
                    {filtered.length === 0 ? (
                        <div className="cmd-empty">
                            <span className="cmd-empty-icon">🔍</span>
                            <p>No results for <strong>"{query}"</strong></p>
                        </div>
                    ) : (
                        Object.entries(grouped).map(([section, items]) => (
                            <div key={section} className="cmd-group">
                                <div className="cmd-group-label">{section}</div>
                                {items.map(action => {
                                    const idx = globalIndex++;
                                    return (
                                        <button
                                            key={action.id}
                                            className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                                            onClick={() => runAction(action)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                        >
                                            <span className="cmd-item-icon">{action.icon}</span>
                                            <span className="cmd-item-label">{action.label}</span>
                                            {action.tab === activeTab && (
                                                <span className="cmd-item-badge">current</span>
                                            )}
                                            <span className="cmd-item-arrow">↵</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                <div className="cmd-footer">
                    <span><kbd>↑↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                    <span><kbd>Esc</kbd> close</span>
                    <span><kbd>⌘K</kbd> toggle</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
