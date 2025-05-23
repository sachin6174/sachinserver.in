import React from 'react';

const MainContent = ({ activeTab, selectedNavItem, navigationItems }) => {
    // Find the selected item's description
    const selectedItem = selectedNavItem && navigationItems[activeTab]
        ? navigationItems[activeTab].find(item => item.id === selectedNavItem)
        : null;
    const selectedContent = selectedItem ? selectedItem.description : null;

    return (
        <div className="tab-content" style={{ position: "relative", height: "100%" }}>
            {/* Breadcrumb Path */}
            <div
                className="breadcrumb-path"
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#666",
                }}
            >
                <span>{activeTab === "leftbrain" ? "🧠 LeftBrain" : 
                       activeTab === "rightbrain" ? "🎨 RightBrain" : 
                       "🛠️ Tools"}</span>
                {selectedItem && (
                    <>
                        <span style={{ 
                            fontSize: "12px", 
                            color: "#999",
                            marginTop: "-2px" 
                        }}>›</span>
                        <span>{selectedItem.label}</span>
                    </>
                )}
            </div>
            
            {/* Separator Line */}
            <div
                className="separator-line"
                style={{
                    position: "absolute",
                    top: "35px",
                    left: "0",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#ccc",
                }}
            ></div>

            {/* Content Display */}
            <div className="description" style={{ marginTop: "50px", padding: "20px" }}>
                {selectedContent || "Select an item to see its description."}
            </div>
        </div>
    );
};

export default MainContent;
