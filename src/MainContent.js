import React, { useState, useEffect, useMemo, memo } from 'react';
import { Breadcrumb } from './ui';

const MainContent = memo(({ activeTab, selectedNavItem, navigationItems, isLeftNavVisible }) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);

    // Memoize selected content calculation
    const selectedContent = useMemo(() => {
        if (!selectedNavItem || !navigationItems[activeTab]) {
            return null;
        }
        return navigationItems[activeTab].find(item =>
            item.label === selectedNavItem || item.id === selectedNavItem
        )?.description || null;
    }, [selectedNavItem, navigationItems, activeTab]);

    useEffect(() => {
        // Optimize content change animation
        if (selectedContent !== currentContent) {
            setIsContentVisible(false);

            // Use requestAnimationFrame for better performance
            const animationFrame = requestAnimationFrame(() => {
                const timer = setTimeout(() => {
                    setCurrentContent(selectedContent);
                    setIsContentVisible(true);
                }, 100); // Reduced delay for snappier UI

                return () => clearTimeout(timer);
            });

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [selectedContent, currentContent]);

    // Memoize tab configuration to prevent recreation
    const tabConfig = useMemo(() => ({
        leftbrain: {
            icon: "🧠",
            shortName: "LeftBrain",
            fullName: "LeftBrain: Logic and Analysis",
            description: "Technical skills and logical thinking"
        },
        rightbrain: {
            icon: "🎨",
            shortName: "RightBrain",
            fullName: "RightBrain: Creativity and Art",
            description: "Creative pursuits and artistic expression"
        },
        "developer-tools": {
            icon: "💻",
            shortName: "Developer Tools",
            fullName: "Developer Tools: Development Utilities",
            description: "Tools for software development"
        },
        "qa-tools": {
            icon: "🧪",
            shortName: "QA Tools",
            fullName: "QA Tools: Testing and Quality Assurance",
            description: "Quality assurance and testing utilities"
        },
        "general-tools": {
            icon: "🛠️",
            shortName: "General Tools",
            fullName: "General Tools: Utilities and Widgets",
            description: "General purpose tools and utilities"
        }
    }), []);

    const getTabInfo = (tab) => {
        return tabConfig[tab] || tabConfig["general-tools"];
    };

    // Memoize tab info and selected item calculations
    const tabInfo = useMemo(() => getTabInfo(activeTab), [activeTab, tabConfig]);
    const selectedItem = useMemo(() =>
        navigationItems[activeTab]?.find(item => item.id === selectedNavItem),
        [navigationItems, activeTab, selectedNavItem]
    );

    return (
        <div className="tab-content" style={{ position: "relative", height: "100%" }}>
            {/* Compact breadcrumb strip */}
            <div className="breadcrumb-path">
                <Breadcrumb
                    items={[
                        { label: (<><span className="breadcrumb-icon" aria-hidden>{tabInfo.icon}</span> <span className="tab-label-mobile">{tabInfo.shortName}</span><span className="tab-label-desktop">{tabInfo.fullName}</span></>), onClick: undefined },
                        ...(selectedItem ? [{ label: (<><span className="breadcrumb-icon" aria-hidden>{selectedItem.icon}</span> <span>{selectedItem.label}</span></>), current: true }] : [])
                    ]}
                />
            </div>

            {/* Content fills remaining space */}
            <main
                id="main"
                className={`description ${isContentVisible ? 'content-visible' : 'content-hidden'}`}
                role="main"
                aria-live="polite"
                aria-busy={!isContentVisible}
                tabIndex="-1"
                aria-label="Main content area"
                style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}
            >
                <div className={`content-wrapper ${isContentVisible ? 'fade-in-up' : ''}`}>
                    {currentContent || (
                        <div className="placeholder-content">
                            <div className="placeholder-icon">{tabInfo.icon}</div>
                            <h2>Welcome to {tabInfo.shortName}</h2>
                            <p>{tabInfo.description}</p>
                            <p className="placeholder-instruction">
                                Select an item from the navigation to view its content.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
});

MainContent.displayName = 'MainContent';

export default MainContent;
