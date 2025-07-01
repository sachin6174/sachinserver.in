import React from 'react';

const MainContent = ({ activeTab, selectedNavItem, navigationItems, isLeftNavVisible }) => {
    // Find the selected item's description
    const selectedContent = selectedNavItem && navigationItems[activeTab]
        ? navigationItems[activeTab].find(item => item.label === selectedNavItem || item.id === selectedNavItem)?.description
        : null;

    return (
        <div className="tab-content" style={{ position: "relative", height: "100%" }}>

            {/* Breadcrumb Path */}
            <div
                className="breadcrumb-path"
                style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#666",
                    padding: "10px 20px",
                    marginBottom: "10px",
                }}
            >
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
                        <span>{selectedNavItem}</span>
                    </>
                )}
            </div>

            {/* Separator Line */}
            <div
                className="separator-line"
                style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    right: "0",
                    height: "1px",
                    backgroundColor: "#ccc",
                    marginBottom: "20px",
                    marginLeft: "20px",
                    marginRight: "20px",
                }}
            ></div>

            {/* Content Display */}
            <div className="description" style={{ padding: "20px" }}>
                {selectedContent || "Select an item to see its description."}
            </div>
        </div>
    );
};

export default MainContent;
