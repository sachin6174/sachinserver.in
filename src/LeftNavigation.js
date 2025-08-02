import React, { useState, useEffect, useCallback, memo } from 'react';

const LeftNavigation = memo(({ items, selectedNavItem, setSelectedNavItem }) => {
    const [animatedItems, setAnimatedItems] = useState(new Set());

    useEffect(() => {
        // Stagger the animation of navigation items
        items?.forEach((item, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, item.id]));
            }, index * 50);
        });
    }, [items]);

    const handleItemClick = useCallback((itemId) => {
        setSelectedNavItem(itemId);
        
        // Add a subtle click animation
        const element = document.querySelector(`[data-item-id="${itemId}"]`);
        if (element) {
            element.style.transform = 'scale(0.98)';
            setTimeout(() => {
                element.style.transform = '';
            }, 100);
        }
    }, [setSelectedNavItem]);

    return (
        <div className="left-nav">
            <div className="nav-items">
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
                            animationDelay: `${index * 0.05}s`,
                            opacity: animatedItems.has(item.id) ? 1 : 0,
                            transform: animatedItems.has(item.id) ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                        }}
                    >
                        <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

LeftNavigation.displayName = 'LeftNavigation';

export default LeftNavigation;
