import React, { useMemo, useState, useEffect, useCallback, memo } from 'react';
import './VirtualizedNavigation.css';

const ITEM_HEIGHT = 48; // Height of each navigation item in pixels
const BUFFER_SIZE = 5; // Number of items to render outside visible area

const VirtualizedNavigation = memo(({ items, selectedNavItem, setSelectedNavItem, containerHeight = 400 }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [animatedItems, setAnimatedItems] = useState(new Set());

    // Calculate visible range
    const visibleRange = useMemo(() => {
        const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
        const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT) + BUFFER_SIZE * 2;
        const endIndex = Math.min(items.length, startIndex + visibleCount);
        
        return { startIndex, endIndex };
    }, [scrollTop, containerHeight, items.length]);

    // Get visible items
    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.startIndex, visibleRange.endIndex);
    }, [items, visibleRange]);

    useEffect(() => {
        // Stagger the animation of navigation items
        visibleItems.forEach((item, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => new Set([...prev, item.id]));
            }, index * 25); // Reduced delay for better performance
        });
    }, [visibleItems]);

    const handleScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);

    const handleItemClick = useCallback((itemId) => {
        setSelectedNavItem(itemId);
        
        // Add a subtle click animation (optimized)
        requestAnimationFrame(() => {
            const element = document.querySelector(`[data-item-id="${itemId}"]`);
            if (element) {
                element.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    if (element) {
                        element.style.transform = '';
                    }
                }, 100);
            }
        });
    }, [setSelectedNavItem]);

    const totalHeight = items.length * ITEM_HEIGHT;
    const offsetY = visibleRange.startIndex * ITEM_HEIGHT;

    return (
        <div className="virtualized-nav">
            <div 
                className="nav-scroll-container"
                style={{ height: containerHeight, overflowY: 'auto' }}
                onScroll={handleScroll}
            >
                <div style={{ height: totalHeight, position: 'relative' }}>
                    <div 
                        className="nav-items-container"
                        style={{ 
                            transform: `translateY(${offsetY}px)`,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0
                        }}
                    >
                        {visibleItems.map((item, index) => {
                            const actualIndex = visibleRange.startIndex + index;
                            return (
                                <div
                                    key={`${item.id}-${actualIndex}`}
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
                                        height: ITEM_HEIGHT,
                                        opacity: animatedItems.has(item.id) ? 1 : 0,
                                        transform: animatedItems.has(item.id) ? 'translateY(0)' : 'translateY(20px)',
                                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                                    }}
                                >
                                    <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                                    <span className="nav-label">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});

VirtualizedNavigation.displayName = 'VirtualizedNavigation';

export default VirtualizedNavigation;