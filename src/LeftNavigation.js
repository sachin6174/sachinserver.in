import React, { useState, useEffect, useCallback, memo } from 'react';

const LeftNavigation = memo(({ items, selectedNavItem, setSelectedNavItem }) => {
    const [animatedItems, setAnimatedItems] = useState(new Set());

    useEffect(() => {
        // Stagger item appearance and clear timers on unmount/update.
        const timers = [];
        items?.forEach((item, index) => {
            const timerId = setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, item.id]));
            }, index * 45);
            timers.push(timerId);
        });

        return () => {
            timers.forEach(clearTimeout);
        };
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
                        if (element) {
                            element.style.transform = '';
                        }
                    }, 100);
                });
            }
        });
    }, [setSelectedNavItem]);

    return (
        <nav className="nav-items" aria-label="Section Navigation">
            {items?.map((item, index) => (
                <div
                    key={item.id}
                    data-item-id={item.id}
                    className={`nav-item ${selectedNavItem === item.id ? "selected" : ""} ${
                        animatedItems.has(item.id) ? "fade-in-up" : ""
                    }`}
                    onClick={() => handleItemClick(item.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label}`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleItemClick(item.id);
                        }
                    }}
                    style={{
                        animationDelay: `${index * 0.04}s`,
                        opacity: animatedItems.has(item.id) ? 1 : 0,
                        transform: animatedItems.has(item.id) ? 'translateY(0)' : 'translateY(12px)',
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    }}
                >
                    <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </div>
            ))}
        </nav>
    );
});

LeftNavigation.displayName = 'LeftNavigation';

export default LeftNavigation;
