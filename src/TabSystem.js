import React, { useState, useEffect } from "react";
import AboutMe from "./LeftBrain/AboutMe/AboutMe";
import AppleDevelopment from "./LeftBrain/AppleDevelopment/AppleDevelopment";
import NodeJS from "./LeftBrain/NodeJS/NodeJS";
import ReactJS from "./LeftBrain/ReactJS/ReactJS";
import DSA from "./LeftBrain/DSA/DSA";
import MacTerminalScripts from "./LeftBrain/MacTerminalScripts/MacTerminalScripts";
import Drawing from "./RightBrain/Drawing/Drawing";
import Literature from "./RightBrain/Litlerature/Literature";
import Philosophy from "./RightBrain/Philosophy/Philosophy";
import Music from "./RightBrain/Music/Music";
import { InfoTool, JsonTool, XmlTool, CryptoTool, WritingBoardTool, APITool, BackgroundRemoverTool, StorageTool, ColorPickerTool, ScreenRecorderTool, CSVTool, HashTool, PasswordTool, YAMLTool, RegexTool, EncoderTool, UUIDTool } from './Tools';
import logo from './assets/logo512.png';  // Updated import path
import './TabSystem.css';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';
import { ReactComponent as ToggleIcon } from './assets/svgs/toggle-icon.svg';

const TabSystem = () => {
    // Initialize state with stored values or defaults
    const [activeTab, setActiveTab] = useState(() => {
        const stored = localStorage.getItem('activeTab');
        return stored || "leftbrain"; // Default to leftbrain on first load
    });

    // State to track the last selected navigation item for each section
    const [lastSelectedItems, setLastSelectedItems] = useState(() => {
        const stored = localStorage.getItem('lastSelectedItems');
        return stored ? JSON.parse(stored) : {
            leftbrain: "about-me",        // Default for first load
            rightbrain: "drawing",        // Default when switching to rightbrain
            tools: "data-processing"      // Default when switching to tools
        };
    });

    const [selectedNavItem, setSelectedNavItem] = useState(() => {
        const stored = localStorage.getItem('activeTab');
        const lastItems = localStorage.getItem('lastSelectedItems');
        if (stored && lastItems) {
            const parsedItems = JSON.parse(lastItems);
            return parsedItems[stored] || (stored === "tools" ? "data-processing" : "about-me");
        }
        return stored === "tools" ? "data-processing" : "about-me"; // Default based on tab
    });

    // New state for selected tool within a category (only for tools tab)
    const [selectedTool, setSelectedTool] = useState(() => {
        const stored = localStorage.getItem('selectedTool');
        return stored || "info-tool"; // Default to first tool
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('isDarkMode');
        if (stored !== null) {
            // If user has previously set a preference, use that
            return JSON.parse(stored);
        } else {
            // If no stored preference, detect system preference
            if (window.matchMedia) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            // Fallback to light mode if matchMedia is not supported
            return false;
        }
    });

    const [isLeftNavVisible, setIsLeftNavVisible] = useState(() => {
        const stored = localStorage.getItem('isLeftNavVisible');
        return stored !== null ? JSON.parse(stored) : true; // Default to visible
    });

    // Handle tab changes and update selected nav item
    // Handle tab changes and update selected nav item
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);

        // Update selectedNavItem to the last selected item for this tab
        const lastSelected = lastSelectedItems[activeTab];
        if (lastSelected && lastSelected !== selectedNavItem) {
            setSelectedNavItem(lastSelected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]); // Only depend on activeTab to prevent infinite loops

    // Save localStorage when selectedNavItem changes
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    }, [isDarkMode]);

    // Listen for system theme changes (only if no stored preference exists)
    useEffect(() => {
        const stored = localStorage.getItem('isDarkMode');
        if (stored === null && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemThemeChange = (e) => {
                setIsDarkMode(e.matches);
            };
            
            mediaQuery.addListener(handleSystemThemeChange);
            
            // Cleanup listener on unmount
            return () => {
                mediaQuery.removeListener(handleSystemThemeChange);
            };
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isLeftNavVisible', JSON.stringify(isLeftNavVisible));
    }, [isLeftNavVisible]);

    // Save selected tool to localStorage
    useEffect(() => {
        localStorage.setItem('selectedTool', selectedTool);
    }, [selectedTool]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const toggleLeftNav = () => {
        setIsLeftNavVisible((prev) => !prev);
    };

    const navigationItems = {
        leftbrain: [
            { id: "apple-development", label: "Apple Development", icon: "🍎", description: <AppleDevelopment /> },
            { id: "nodejs", label: "NodeJS", icon: "🌐", description: <NodeJS /> },
            { id: "reactjs", label: "ReactJS", icon: "⚛️", description: <ReactJS /> },
            { id: "mac-terminal-scripts", label: "Mac Terminal Scripts", icon: "💻", description: <MacTerminalScripts /> },
            { id: "dsa", label: "DSA", icon: "🧮", description: <DSA /> },
            { id: "about-me", label: "About Me", icon: "👤", description: <AboutMe /> },
        ],
        rightbrain: [
            { id: "drawing", label: "Drawing", icon: "✏️", description: <Drawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <Literature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <Philosophy /> },
            { id: "music", label: "Music", icon: "🎵", description: <Music /> },
        ],
        tools: [
            { 
                id: "data-processing", 
                label: "Data Processing", 
                icon: "📊", 
                isCategory: true,
                tools: [
                    { id: "info-tool", label: "Info Tool", icon: "📊", description: <InfoTool /> },
                    { id: "JSON-Tool", label: "JSON Tool", icon: "📝", description: <JsonTool /> },
                    { id: "XML-Tool", label: "XML Tool", icon: "🔧", description: <XmlTool /> },
                    { id: "yaml-tool", label: "YAML Tool", icon: "📄", description: <YAMLTool /> },
                    { id: "csv-tool", label: "CSV Tool", icon: "📊", description: <CSVTool /> },
                ]
            },
            { 
                id: "security-crypto", 
                label: "Security & Crypto", 
                icon: "🔒", 
                isCategory: true,
                tools: [
                    { id: "Encryption-Decryption-Tool", label: "Crypto Tool", icon: "🔒", description: <CryptoTool /> },
                    { id: "hash-tool", label: "Hash Tool", icon: "🔑", description: <HashTool /> },
                    { id: "password-tool", label: "Password Tool", icon: "🛡️", description: <PasswordTool /> },
                    { id: "encoder-tool", label: "Encoder Tool", icon: "🔤", description: <EncoderTool /> },
                ]
            },
            { 
                id: "text-utilities", 
                label: "Text Utilities", 
                icon: "📝", 
                isCategory: true,
                tools: [
                    { id: "regex-tool", label: "Regex Tool", icon: "🔍", description: <RegexTool /> },
                    { id: "uuid-tool", label: "UUID Tool", icon: "🆔", description: <UUIDTool /> },
                    { id: "writing-board", label: "Writing Board", icon: "✏️", description: <WritingBoardTool /> },
                ]
            },
            { 
                id: "media-design", 
                label: "Media & Design", 
                icon: "🎨", 
                isCategory: true,
                tools: [
                    { id: "background-remover", label: "Background Remover", icon: "🖼️", description: <BackgroundRemoverTool /> },
                    { id: "color-picker", label: "Color Picker", icon: "🎨", description: <ColorPickerTool /> },
                    { id: "screen-recorder", label: "Screen Recorder", icon: "🎥", description: <ScreenRecorderTool /> },
                ]
            },
            { 
                id: "development", 
                label: "Development", 
                icon: "🌐", 
                isCategory: true,
                tools: [
                    { id: "api-tool", label: "API Tool", icon: "🌐", description: <APITool /> },
                    { id: "storage-tool", label: "Storage Tool", icon: "💾", description: <StorageTool /> },
                ]
            },
        ],
    };

    // Custom setSelectedNavItem that also updates localStorage
    const handleNavItemChange = (newItem) => {
        setSelectedNavItem(newItem);

        // If it's tools tab and selecting a category, set default tool for that category
        if (activeTab === "tools") {
            const category = navigationItems.tools.find(cat => cat.id === newItem);
            if (category && category.tools && category.tools.length > 0) {
                setSelectedTool(category.tools[0].id);
            }
        }

        // Update the last selected item for the current tab
        const updatedLastSelectedItems = {
            ...lastSelectedItems,
            [activeTab]: newItem
        };
        setLastSelectedItems(updatedLastSelectedItems);
        localStorage.setItem('lastSelectedItems', JSON.stringify(updatedLastSelectedItems));
    };

    // Handle tool selection within a category
    const handleToolSelection = (toolId) => {
        setSelectedTool(toolId);
    };

    return (
        <div className="main-container">
            <div className="tabs">
                <div className="nav-section">
                    <img
                        src={logo}
                        alt="Tab Icon"
                    />
                    {["leftbrain", "rightbrain", "tools"].map((tab) => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span className="tab-icon">
                                {tab === "leftbrain" ? "🧠" : tab === "rightbrain" ? "🎨" : "🛠️"}
                            </span>
                            {tab === "leftbrain" ? "LeftBrain" : tab === "rightbrain" ? "RightBrain" : "Tools"}
                        </div>
                    ))}
                </div>
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    {isDarkMode ? "☀️ Day Mode" : "🌙 Night Mode"}
                </button>
            </div>

            <div className={`tab-content-container ${!isLeftNavVisible ? 'nav-hidden' : ''}`}>
                {/* Left Navigation */}
                <div className={`left-nav ${isLeftNavVisible ? 'visible' : 'hidden'}`}>
                    <div className="nav-toggle-container">
                        <button
                            className="nav-toggle-btn"
                            onClick={toggleLeftNav}
                            aria-label={isLeftNavVisible ? "Hide navigation" : "Show navigation"}
                        >
                            <ToggleIcon className="toggle-icon" />
                        </button>
                    </div>
                    {isLeftNavVisible && (
                        <LeftNavigation
                            items={navigationItems[activeTab]}
                            selectedNavItem={selectedNavItem}
                            setSelectedNavItem={handleNavItemChange}
                        />
                    )}
                </div>

                {/* Main Content Area */}
                <MainContent
                    activeTab={activeTab}
                    selectedNavItem={selectedNavItem}
                    navigationItems={navigationItems}
                    isLeftNavVisible={isLeftNavVisible}
                    selectedTool={selectedTool}
                    onToolSelection={handleToolSelection}
                />
            </div>
        </div>
    );
};

export default TabSystem;
