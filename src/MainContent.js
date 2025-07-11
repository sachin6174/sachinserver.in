import React from 'react';

const MainContent = ({ activeTab, selectedNavItem, navigationItems, isLeftNavVisible, selectedTool, onToolSelection }) => {
    // Find the selected item's description
    let selectedContent = null;
    let toolsSubNav = null;

    if (activeTab === "tools") {
        // Find the selected category
        const selectedCategory = navigationItems[activeTab]?.find(item => item.id === selectedNavItem);
        
        if (selectedCategory && selectedCategory.tools) {
            // Create sub-navigation for tools
            toolsSubNav = selectedCategory.tools;
            
            // Find the selected tool's description
            const selectedToolData = selectedCategory.tools.find(tool => tool.id === selectedTool);
            selectedContent = selectedToolData?.description;
        }
    } else {
        // For non-tools tabs, use the existing logic
        selectedContent = selectedNavItem && navigationItems[activeTab]
            ? navigationItems[activeTab].find(item => item.label === selectedNavItem || item.id === selectedNavItem)?.description
            : null;
    }

    return (
        <div className="tab-content" style={{ position: "relative", height: "100%" }}>

            {/* Breadcrumb Path */}
            <div className="breadcrumb-path">
                <span className="tab-label-mobile">
                    {activeTab === "leftbrain" ? "🧠 LeftBrain" :
                     activeTab === "rightbrain" ? "🎨 RightBrain" :
                     "🛠️ Tools"}
                </span>
                <span className="tab-label-desktop">
                    {activeTab === "leftbrain" ? "LeftBrain: Logic and Analysis" :
                     activeTab === "rightbrain" ? "RightBrain: Creativity and Art" :
                     "Tools: Utilities and Widgets"}
                </span>
                {selectedNavItem && (
                    <>
                        <span style={{
                            fontSize: "12px",
                            color: "#999",
                            marginTop: "-2px"
                        }}>›</span>
                        <span>{navigationItems[activeTab]?.find(item => item.id === selectedNavItem)?.label || selectedNavItem}</span>
                    </>
                )}
                {activeTab === "tools" && selectedTool && toolsSubNav && (
                    <>
                        <span style={{
                            fontSize: "12px",
                            color: "#999",
                            marginTop: "-2px"
                        }}>›</span>
                        <span>{toolsSubNav.find(tool => tool.id === selectedTool)?.label}</span>
                    </>
                )}
            </div>

            {/* Tools Sub-Navigation */}
            {activeTab === "tools" && toolsSubNav && (
                <div className="tools-sub-nav">
                    {toolsSubNav.map(tool => (
                        <button
                            key={tool.id}
                            className={`tool-nav-btn ${selectedTool === tool.id ? 'active' : ''}`}
                            onClick={() => onToolSelection(tool.id)}
                        >
                            <span className="tool-icon">{tool.icon}</span>
                            {tool.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Separator Line */}
            <div className="separator-line"></div>

            {/* Content Display */}
            <div className="description">
                {selectedContent || "Select an item to see its description."}
            </div>
        </div>
    );
};

export default MainContent;
