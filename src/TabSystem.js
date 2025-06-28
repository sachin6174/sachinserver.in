import React, { useState, useEffect } from "react";
import AboutMe from "./LeftBrain/AboutMe/AboutMe";
import AppleDevelopment from "./LeftBrain/AppleDevelopment/AppleDevelopment";
import NodeJS from "./LeftBrain/NodeJS/NodeJS";
import ReactJS from "./LeftBrain/ReactJS/ReactJS";
import Drawing from "./RightBrain/Drawing/Drawing";
import Literature from "./RightBrain/Litlerature/Literature";
import Philosophy from "./RightBrain/Philosophy/Philosophy";
import { JsonTool, XmlTool, CryptoTool, WritingBoardTool, APITool, BackgroundRemoverTool, StorageTool, ColorPickerTool } from './Tools';
import logo from './assets/logo512.png';  // Updated import path
import './TabSystem.css';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';

const TabSystem = () => {
    const [activeTab, setActiveTab] = useState("leftbrain");
    const [selectedNavItem, setSelectedNavItem] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to night mode

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
        ],
        rightbrain: [
            { id: "drawing", label: "Drawing", icon: "✏️", description: <Drawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <Literature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <Philosophy /> },
        ],
        tools: [
            { id: "JSON-Tool", label: "JSON Tool", icon: "📝", description: <JsonTool /> },
            { id: "XML-Tool", label: "XML Tool", icon: "🔧", description: <XmlTool /> },
            { id: "Encryption-Decryption-Tool", label: "Crypto Tool", icon: "🔒", description: <CryptoTool /> },
            { id: "writing-board", label: "Writing Board", icon: "✏️", description: <WritingBoardTool /> },
            { id: "api-tool", label: "API Tool", icon: "🌐", description: <APITool /> },
            { id: "background-remover", label: "Background Remover", icon: "🖼️", description: <BackgroundRemoverTool /> },
            { id: "storage-tool", label: "Storage Tool", icon: "💾", description: <StorageTool /> },
            { id: "color-picker", label: "Color Picker", icon: "🎨", description: <ColorPickerTool /> },
        ],
    };

    useEffect(() => {
        if (activeTab === "rightbrain") {
            setSelectedNavItem("Drawing");
        } else if (activeTab === "leftbrain") {
            setSelectedNavItem("About Me");
        } else if (activeTab === "tools") {
            setSelectedNavItem("JSON Tool"); // Default tool selection
        } else if (!selectedNavItem) {
            const defaultItem = navigationItems[activeTab][0]?.label;
            setSelectedNavItem(defaultItem);
        }
    }, [activeTab]); // Add activeTab as dependency

    return (
        <div className="main-container">
            <div className="tabs">
                {
                <>
                    <img 
                        src={logo}
                        alt="Tab Icon" 
                        style={{ width: '32px', height: '32px', marginTop: '15px' }} 
                    />{
                    ["leftbrain", "rightbrain", "tools"].map((tab) => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : "background"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span className="tab-icon">
                                {tab === "leftbrain" ? "🧠" : tab === "rightbrain" ? "🎨" : "🛠️"}
                            </span>
                            {tab === "leftbrain" ? "LeftBrain" : tab === "rightbrain" ? "RightBrain" : "Tools"}
                        </div>
                    ))}
                </>
                }
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? "🌙 Night Mode" : "☀️ Day Mode"}
                </button>
            </div>

            {/* Below Tabs Section */}
            <div className="below-tabs">
                <div className="dynamic-title">
                    {activeTab === "leftbrain"
                        ? "LeftBrain: Logic and Analysis"
                        : "RightBrain: Creativity and Art"}
                </div>
                <div className="selected-item black-text">
                    {selectedNavItem ? `${selectedNavItem}` : "No item selected"}
                </div>
            </div>

            <div className="tab-content-container">
                {/* Left Navigation */}
                <div className="left-nav">
                    <LeftNavigation
                        items={navigationItems[activeTab]}
                        selectedNavItem={selectedNavItem}
                        setSelectedNavItem={setSelectedNavItem}
                    />
                </div>

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
