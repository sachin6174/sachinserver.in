import React, { useState, useEffect } from "react";
import AboutMe from "./LeftBrain/AboutMe/AboutMe";
import AppleDevelopment from "./LeftBrain/AppleDevelopment/AppleDevelopment";
import NodeJS from "./LeftBrain/NodeJS/NodeJS";
import ReactJS from "./LeftBrain/ReactJS/ReactJS";
import Tools from "./LeftBrain/Tools/Tools";
import Drawing from "./RightBrain/Drawing/Drawing";
import Literature from "./RightBrain/Literature/Literature";
import Philosophy from "./RightBrain/Philosophy/Philosophy";
import ToggleIcon from "./assets/svgs/toggle-icon.svg";
import './TabSystem.css';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';

const TabSystem = () => {
    const [activeTab, setActiveTab] = useState("leftbrain");
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [selectedNavItem, setSelectedNavItem] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const navigationItems = {
        leftbrain: [
            { id: "apple-development", label: "Apple Development", icon: "🍎", description: <AppleDevelopment /> },
            { id: "nodejs", label: "NodeJS", icon: "🌐", description: <NodeJS /> },
            { id: "reactjs", label: "ReactJS", icon: "⚛️", description: <ReactJS /> },
            { id: "about-me", label: "About Me", icon: "👤", description: <AboutMe /> },
            { id: "tools", label: "Tools", icon: "🛠️", description: <Tools /> },
        ],
        rightbrain: [
            { id: "drawing", label: "Drawing", icon: "✏️", description: <Drawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <Literature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <Philosophy /> },
        ],
    };

    useEffect(() => {
        const defaultItem =
            activeTab === "leftbrain" ? "About Me" : navigationItems[activeTab][0]?.label;
        setSelectedNavItem(defaultItem);
    }, [activeTab, navigationItems]);

    return (
        <div className="main-container">
            {/* Theme Toggle Button */}
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
            >
                {isDarkMode ? "🌙 Night Mode" : "☀️ Day Mode"}
            </button>
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
                    <img src={ToggleIcon} alt="Toggle Navigation" height="24" width="24" />
                    <div className="dynamic-title">
                        {activeTab === "leftbrain"
                            ? "LeftBrain: Logic and Analysis"
                            : "RightBrain: Creativity and Art"}
                    </div>
                </button>
                <div className="selected-item black-text">
                    {selectedNavItem ? `${selectedNavItem}` : "No item selected"}
                </div>
            </div>

            <div className="tab-content-container">
                {/* Left Navigation */}
                {isNavVisible && (
                    <LeftNavigation
                        items={navigationItems[activeTab]}
                        selectedNavItem={selectedNavItem}
                        setSelectedNavItem={setSelectedNavItem}
                    />
                )}

                {/* Main Content Area */}
                <MainContent
                    activeTab={activeTab}
                    selectedNavItem={selectedNavItem}
                    navigationItems={navigationItems}
                />
            </div>
        </div>
    );
};

export default TabSystem;
