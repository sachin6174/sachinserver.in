import React from 'react';

const MainContent = ({ activeTab, selectedNavItem, navigationItems }) => {
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
                    gap: "5px", // Adds spacing between breadcrumbs
                    fontSize: "14px",
                }}
            >
                <span>{activeTab === "leftbrain" ? "🧠 LeftBrain" : "🎨 RightBrain"}</span>
                {selectedNavItem && (
                    <>
                        <span style={{ fontSize: "16px" }}>›</span>
                        <span>{selectedNavItem}</span>
                    </>
                )}
            </div>

            {/* Separator Line */}
            <div
                className="separator-line"
                style={{
                    position: "absolute",
                    top: "35px", // Position it slightly below the breadcrumb path
                    left: "0",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#ccc", // Light gray line
                }}
            ></div>

            {/* Description Below */}
            <div className="description" style={{ textAlign: "center", marginTop: "50px" }}>
                {selectedNavItem
                    ? (
                        navigationItems[activeTab]
                            .find(item => item.label === selectedNavItem)?.description ||
                        "Select an item to see its description."
                    )
                    : "Select an item to see its description."
                }
            </div>
        </div>
    );
};

export default MainContent;
