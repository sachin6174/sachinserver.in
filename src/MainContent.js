import React from 'react';

const MainContent = ({ activeTab, selectedNavItem, navigationItems, isLeftNavVisible }) => {
    // Find the selected item's description
    let selectedContent = null;

    // For all tabs (including the new tool tabs), use the same logic
    selectedContent = selectedNavItem && navigationItems[activeTab]
        ? navigationItems[activeTab].find(item => item.label === selectedNavItem || item.id === selectedNavItem)?.description
        : null;

    return (
        <div className="tab-content" style={{ position: "relative", height: "100%" }}>

            {/* Breadcrumb Path */}
            <div className="breadcrumb-path">
                <span className="tab-label-mobile">
                    {activeTab === "leftbrain" ? "🧠 LeftBrain" :
                     activeTab === "rightbrain" ? "🎨 RightBrain" :
                     activeTab === "developer-tools" ? "💻 Developer Tools" :
                     activeTab === "qa-tools" ? "🧪 QA Tools" :
                     "🛠️ General Tools"}
                </span>
                <span className="tab-label-desktop">
                    {activeTab === "leftbrain" ? "LeftBrain: Logic and Analysis" :
                     activeTab === "rightbrain" ? "RightBrain: Creativity and Art" :
                     activeTab === "developer-tools" ? "Developer Tools: Development Utilities" :
                     activeTab === "qa-tools" ? "QA Tools: Testing and Quality Assurance" :
                     "General Tools: Utilities and Widgets"}
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
            </div>


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
