import React, { useState, useEffect } from "react";
import AboutMe from "./LeftBrain/AboutMe";

const TabSystem = () => {
    const [activeTab, setActiveTab] = useState("leftbrain");
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [selectedNavItem, setSelectedNavItem] = useState("");

    const navigationItems = {
        leftbrain: [
            { id: "Apple Development", label: "Apple Development", icon: "🍎", description: "Explore app development for Apple platforms." },
            { id: "NodeJS", label: "NodeJS", icon: "🌐", description: "Learn backend development with Node.js." },
            { id: "ReactJS", label: "ReactJS", icon: "⚛️", description: "Build user interfaces with React." },
            { id: "About Me", label: "About Me", icon: "👤", description: <AboutMe></AboutMe> },
        ],
        rightbrain: [
            { id: "Drawing", label: "Drawing", icon: "✏️", description: "Express your creativity through drawing." },
            { id: "Literature", label: "Literature", icon: "📖", description: "Dive into the world of books and stories." },
            { id: "Philosophy", label: "Philosophy", icon: "💭", description: "Ponder the big questions in life." },
        ],
    };

    useEffect(() => {
        const defaultItem =
            activeTab === "leftbrain" ? "About Me" : navigationItems[activeTab][0]?.label;
        setSelectedNavItem(defaultItem);
    }, [activeTab]);

    return (
        <div className="main-container">
            {/* Tab Headers */}
            <div className="tabs">
                {["leftbrain", "rightbrain"].map((tab) => (
                    <div
                        key={tab}
                        className={`tab ${activeTab === tab ? "active" : "background"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        <span className="tab-icon">
                            {tab === "leftbrain" ? "🧠" : "🎨"}
                        </span>
                        {tab === "leftbrain" ? "LeftBrain" : "RightBrain"}
                    </div>
                ))}
            </div>

            {/* Below Tabs Section */}
            <div className="below-tabs">
                <button
                    className="toggle-icon"
                    onClick={() => setIsNavVisible(!isNavVisible)}
                    aria-label="Toggle Navigation"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        height="24"
                        width="24"
                        fill="currentColor"
                    >
                        <path d="M11.632 11.991c0.577 0 1.010-0.143 1.299-0.43 0.287-0.286 0.432-0.713 0.432-1.278v-6.562c0-0.565-0.145-0.991-0.433-1.28s-0.721-0.433-1.298-0.433h-9.264c-0.569 0-1 0.144-1.292 0.43s-0.439 0.714-0.439 1.283v6.562c0 0.569 0.147 0.996 0.439 1.28s0.723 0.427 1.292 0.427h9.264zM4.837 11.030h-2.43c-0.258 0-0.455-0.068-0.591-0.205s-0.206-0.34-0.206-0.609v-6.425c0-0.269 0.068-0.472 0.205-0.609s0.335-0.205 0.592-0.205h2.43v8.053zM11.593 11.030h-5.828v-8.053h5.827c0.258 0 0.458 0.068 0.598 0.205s0.211 0.34 0.211 0.609v6.425c0 0.27-0.070 0.473-0.211 0.609s-0.339 0.205-0.597 0.205zM3.791 4.963c0.091 0 0.168-0.033 0.233-0.1 0.060-0.057 0.097-0.138 0.097-0.228s-0.037-0.17-0.097-0.228l-0-0c-0.058-0.058-0.139-0.094-0.228-0.094-0.002 0-0.004 0-0.005 0h-1.132c-0.001-0-0.002-0-0.003-0-0.088 0-0.168 0.036-0.225 0.094l-0 0c-0.060 0.057-0.097 0.138-0.097 0.228s0.037 0.17 0.097 0.228l0 0c0.064 0.067 0.14 0.1 0.227 0.1h1.132zM3.791 6.379c0.091 0 0.168-0.032 0.233-0.097 0.060-0.057 0.098-0.137 0.098-0.226s-0.037-0.17-0.098-0.226l-0-0c-0.058-0.058-0.139-0.094-0.228-0.094-0.002 0-0.004 0-0.005 0h-1.132c-0.001-0-0.002-0-0.003-0-0.088 0-0.168 0.036-0.225 0.094l-0 0c-0.060 0.057-0.097 0.137-0.097 0.226s0.037 0.169 0.097 0.226l0 0c0.057 0.060 0.137 0.097 0.226 0.097 0 0 0.001 0 0.001 0h1.132zM3.791 7.796c0.091 0 0.168-0.032 0.233-0.097 0.059-0.056 0.096-0.135 0.097-0.222v-0c0-0.002 0-0.004 0-0.007 0-0.088-0.037-0.168-0.096-0.224l-0-0c-0.058-0.058-0.139-0.094-0.228-0.094-0.002 0-0.004 0-0.005 0h-1.132c-0.001-0-0.002-0-0.003-0-0.088 0-0.168 0.036-0.225 0.094l-0 0c-0.060 0.056-0.097 0.136-0.097 0.224 0 0.002 0 0.005 0 0.007l-0-0c0 0.083 0.032 0.158 0.097 0.222 0.057 0.060 0.137 0.097 0.225 0.097 0.001 0 0.001 0 0.002-0h1.132z"></path>
                    </svg>
                    <div className="dynamic-title">
                        {activeTab === "leftbrain"
                            ? "LeftBrain: Logic and Analysis"
                            : "RightBrain: Creativity and Art"}
                    </div>
                </button>
                <div className="selected-item">
                    {selectedNavItem ? `${selectedNavItem}` : "No item selected"}
                </div>
            </div>

            <div className="tab-content-container">
                {/* Left Navigation */}
                {isNavVisible && (
                    <div className="left-nav">
                        <div className="nav-items">
                            {navigationItems[activeTab]?.map((item) => (
                                <div
                                    key={item.id}
                                    className={`nav-item ${selectedNavItem === item.label ? "selected" : ""}`}
                                    onClick={() => setSelectedNavItem(item.label)}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
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

            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                html, body {
                    height: 100%;
                    width: 100%;
                    font-family: Arial, sans-serif;
                }
                .main-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                }
                .tabs {
                    display: flex;
                    justify-content: space-between;
                    background-color: #3c3c3c;
                    padding: 8px 0;
                }
                .tab {
                    flex: 1;
                    text-align: center;
                    padding: 12px 0;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                }
                .tab.background {
                    background-color: transparent;
                    color: #a9a9a9;
                }
                .tab.active {
                    background-color: #ffffff;
                    color: black;
                    font-weight: bold;
                    border-radius: 20px;
                    margin: 0 10px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                }
                .below-tabs {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    background-color: #f0f0f0;
                    border-top: 1px solid #ccc;
                }
                .toggle-icon {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    gap: 10px; /* Add spacing between the SVG and the text */
                }
                .toggle-icon svg {
                    width: 24px;
                    height: 24px;
                }
                .selected-item {
                    font-size: 16px;
                    font-weight: bold;
                    flex-grow: 1; /* Allow the item to grow and occupy available space */
                    text-align: center; /* Center the text horizontally */
                    display: flex;
                    align-items: center; /* Center the text vertically if necessary */
                    justify-content: center; /* Ensure it is centered horizontally */
                }
                .tab-content-container {
                    display: flex;
                    flex-grow: 1;
                    background-color: #ffffff;
                    height: 100%;
                }
                .left-nav {
                    width: 250px;
                    background-color: #f5f5f5;
                    border-right: 1px solid #ddd;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .nav-items {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 10px;
                }
                .nav-item {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .nav-item.selected {
                    background-color: #d0d0d0;
                }
                .nav-item:hover {
                    background-color: #e0e0e0;
                }
                .tab-content {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-size: 24px;
                }
                    .dynamic-title {
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    flex-grow: 1; /* Centers it horizontally within the flex container */
                }
            `}</style>
        </div>
    );
};

export default TabSystem;
