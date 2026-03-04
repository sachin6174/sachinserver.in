import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

const LeftNavigation = memo(({ items, selectedNavItem, setSelectedNavItem, activeTab }) => {
    const [animatedItems, setAnimatedItems] = useState(new Set());
    const [filter, setFilter] = useState('');

    // Reset filter when section changes
    useEffect(() => { setFilter(''); }, [activeTab]);

    useEffect(() => {
        // Stagger item appearance and clear timers on unmount/update.
        const timers = [];
        items?.forEach((item, index) => {
            const timerId = setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, item.id]));
            }, index * 45);
            timers.push(timerId);
        });

        return () => { timers.forEach(clearTimeout); };
    }, [items]);

    const handleItemClick = useCallback((itemId) => {
        setSelectedNavItem(itemId);

        // Optimized click animation using requestAnimationFrame
        requestAnimationFrame(() => {
            const element = document.querySelector(`[data-item-id="${itemId}"]`);
            if (element) {
                element.style.transform = 'scale(0.98)';
                element.style.transition = 'transform 0.1s ease';

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (element) { element.style.transform = ''; }
                    }, 100);
                });
            }
        });
    }, [setSelectedNavItem]);

    const filteredItems = useMemo(() => {
        if (!filter.trim()) return items || [];
        const q = filter.toLowerCase();
        return (items || []).filter(item => item.label.toLowerCase().includes(q));
    }, [items, filter]);

    const showFilter = (items?.length || 0) > 6;

    return (
        <nav className="nav-items" aria-label="Section Navigation">
            {showFilter && (
                <div className="nav-filter-wrap">
                    <span className="nav-filter-icon">🔍</span>
                    <input
                        className="nav-filter-input"
                        type="text"
                        placeholder="Filter…"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        aria-label="Filter navigation items"
                    />
                    {filter && (
                        <span className="nav-filter-count">
                            {filteredItems.length}/{items.length}
                        </span>
                    )}
                </div>
            )}

            {filteredItems.length === 0 ? (
                <div className="nav-empty-filter">
                    <span className="nav-empty-icon">🔍</span>
                    <span>No results for "<strong>{filter}</strong>"</span>
                </div>
            ) : (
                filteredItems.map((item, index) => (
                    <Link
                        key={item.id}
                        to={`/${activeTab}/${item.id}`}
                        data-item-id={item.id}
                        className={`nav-item ${selectedNavItem === item.id ? "selected" : ""} ${animatedItems.has(item.id) ? "fade-in-up" : ""
                            }`}
                        onClick={() => handleItemClick(item.id)}
                        aria-label={`Navigate to ${item.label}`}
                        aria-current={selectedNavItem === item.id ? 'page' : undefined}
                        style={{
                            animationDelay: `${index * 0.04}s`,
                            opacity: animatedItems.has(item.id) ? 1 : 0,
                            transform: animatedItems.has(item.id) ? 'translateY(0)' : 'translateY(12px)',
                            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                            textDecoration: 'none',
                            display: 'flex'
                        }}
                    >
                        <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))
            )}
        </nav>
    );
});

LeftNavigation.displayName = 'LeftNavigation';

export default LeftNavigation;
