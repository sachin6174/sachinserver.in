import React, { useState, useEffect } from "react";
import AboutMe from "./LeftBrain/AboutMe/AboutMe";
import AppleDevelopment from "./LeftBrain/AppleDevelopment/AppleDevelopment";
import NodeJS from "./LeftBrain/NodeJS/NodeJS";
import ReactJS from "./LeftBrain/ReactJS/ReactJS";
import DSA from "./LeftBrain/DSA/DSA";
import XcodeShortcuts from "./LeftBrain/XcodeShortcuts/XcodeShortcuts";
import AppleDevYouTubeChannels from "./LeftBrain/AppleDevYouTubeChannels/AppleDevYouTubeChannels";
import MacTerminalScripts from "./LeftBrain/MacTerminalScripts/MacTerminalScripts";
import SwiftNetworking from "./LeftBrain/SwiftNetworking/SwiftNetworking";
import Debugging from "./LeftBrain/Debugging/Debugging";
import SystemDesign from "./LeftBrain/SystemDesign/SystemDesign";
import SwiftGUI from "./LeftBrain/SwiftGUI/SwiftGUI";
import SwiftStorage from "./LeftBrain/SwiftStorage/SwiftStorage";
import SwiftTesting from "./LeftBrain/SwiftTesting/SwiftTesting";
import AppleLanguages from "./LeftBrain/AppleLanguages/AppleLanguages";
import PackageDeployment from "./LeftBrain/PackageDeployment/PackageDeployment";
import ChromeExtensions from "./LeftBrain/ChromeExtensions/ChromeExtensions";
import Blog from "./LeftBrain/Blogs/Blog";
import AIAndTools from "./LeftBrain/AIAndTools/AIAndTools";
import DesignPatterns from "./LeftBrain/DesignPatterns/DesignPatterns";
import SoftwareArchitecture from "./LeftBrain/SoftwareArchitecture/SoftwareArchitecture";
import Drawing from "./RightBrain/Drawing/Drawing";
import Literature from "./RightBrain/Litlerature/Literature";
import Philosophy from "./RightBrain/Philosophy/Philosophy";
import Music from "./RightBrain/Music/Music";
import Psychology from "./RightBrain/Psychology/Psychology";
import { InfoTool, JsonTool, XmlTool, CryptoTool, WritingBoardTool, APITool, StorageTool, ColorPickerTool, ScreenRecorderTool, CSVTool, HashTool, PasswordTool, YAMLTool, RegexTool, EncoderTool, UUIDTool, MarkdownRenderer, LaTeXRenderer, PassportPhotoMaker, PDFTool, QRCodeTool, DiffChecker, TextGenerator, QATools, AIToolsChannels, ImportantWebsites, MacOSAppCatalog, EmojiPicker, NumberToUnicode } from './Tools';
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
            leftbrain: "about-me",           // Default for first load
            rightbrain: "apple-dev-youtube-rb", // Default when switching to rightbrain
            "developer-tools": "ai-tools-channels", // Default when switching to developer tools
            "qa-tools": "qa-testing-apps",   // Default when switching to qa tools
            "general-tools": "info-tool"     // Default when switching to general tools
        };
    });

    const [selectedNavItem, setSelectedNavItem] = useState(() => {
        const stored = localStorage.getItem('activeTab');
        const lastItems = localStorage.getItem('lastSelectedItems');
        if (stored && lastItems) {
            const parsedItems = JSON.parse(lastItems);
            return parsedItems[stored] || getDefaultItemForTab(stored);
        }
        return getDefaultItemForTab(stored || "leftbrain");
    });

    const getDefaultItemForTab = (tab) => {
        switch (tab) {
            case "developer-tools": return "ai-tools-channels";
            case "qa-tools": return "qa-testing-apps";
            case "general-tools": return "info-tool";
            case "rightbrain": return "apple-dev-youtube-rb";
            default: return "about-me";
        }
    };


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
            
            mediaQuery.addEventListener('change', handleSystemThemeChange);
            
            // Cleanup listener on unmount
            return () => {
                mediaQuery.removeEventListener('change', handleSystemThemeChange);
            };
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isLeftNavVisible', JSON.stringify(isLeftNavVisible));
    }, [isLeftNavVisible]);


    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const toggleLeftNav = () => {
        setIsLeftNavVisible((prev) => !prev);
    };

    const navigationItems = {
        leftbrain: [
            { id: "about-me", label: "About Me", icon: "👤", description: <AboutMe /> },
            { id: "dsa", label: "DSA", icon: "🧮", description: <DSA /> },
            { id: "xcode-shortcuts", label: "Xcode Shortcuts", icon: "⌨️", description: <XcodeShortcuts /> },
            { id: "apple-dev-youtube", label: "Apple Dev YouTube", icon: "📺", description: <AppleDevYouTubeChannels /> },
            { id: "apple-development", label: "Apple Development", icon: "🍎", description: <AppleDevelopment /> },
            { id: "apple-languages", label: "Apple Languages", icon: "🍎", description: <AppleLanguages /> },
            { id: "swift-gui", label: "Swift GUI", icon: "🖥️", description: <SwiftGUI /> },
            { id: "swift-storage", label: "Swift Storage", icon: "💾", description: <SwiftStorage /> },
            { id: "swift-networking", label: "Swift Networking", icon: "🌐", description: <SwiftNetworking /> },
            { id: "debugging", label: "Swift Debugging", icon: "🐛", description: <Debugging /> },
            { id: "swift-testing", label: "Swift Testing", icon: "🧪", description: <SwiftTesting /> },
            { id: "package-deployment", label: "Package & Deployment", icon: "📦", description: <PackageDeployment /> },
            { id: "mac-terminal-scripts", label: "Mac Terminal Scripts", icon: "💻", description: <MacTerminalScripts /> },
            { id: "ai-and-tools", label: "AI and Tools", icon: "🤖", description: <AIAndTools /> },
            { id: "design-patterns", label: "Design Patterns", icon: "🏗️", description: <DesignPatterns /> },
            { id: "software-architecture", label: "Software Architecture", icon: "🏛️", description: <SoftwareArchitecture /> },
            { id: "system-design", label: "System Design", icon: "🏢", description: <SystemDesign /> },
            { id: "nodejs", label: "NodeJS", icon: "🌐", description: <NodeJS /> },
            { id: "reactjs", label: "ReactJS", icon: "⚛️", description: <ReactJS /> },
            { id: "chrome-extensions", label: "Chrome Extensions", icon: "🧩", description: <ChromeExtensions /> },
            { id: "blogs", label: "Blogs", icon: "📝", description: <Blog /> },
        ],
        rightbrain: [
            { id: "apple-dev-youtube-rb", label: "Apple Dev YouTube", icon: "📺", description: <AppleDevYouTubeChannels /> },
            { id: "drawing", label: "Drawing", icon: "✏️", description: <Drawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <Literature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <Philosophy /> },
            { id: "psychology", label: "Psychology", icon: "🧠", description: <Psychology /> },
            { id: "music", label: "Music", icon: "🎵", description: <Music /> },
        ],
        "developer-tools": [
            { id: "ai-tools-channels", label: "AI Tools Channels", icon: "🤖", description: <AIToolsChannels /> },
            { id: "api-tool", label: "API Tool", icon: "🌐", description: <APITool /> },
            { id: "storage-tool", label: "Storage Tool", icon: "💾", description: <StorageTool /> },
            { id: "qr-code-tool", label: "QR Code Tool", icon: "🔲", description: <QRCodeTool /> },
            { id: "pdf-tool", label: "PDF Tool", icon: "📄", description: <PDFTool /> },
            { id: "JSON-Tool", label: "JSON Tool", icon: "📝", description: <JsonTool /> },
            { id: "XML-Tool", label: "XML Tool", icon: "🔧", description: <XmlTool /> },
            { id: "yaml-tool", label: "YAML Tool", icon: "📄", description: <YAMLTool /> },
            { id: "csv-tool", label: "CSV Tool", icon: "📊", description: <CSVTool /> },
            { id: "Encryption-Decryption-Tool", label: "Crypto Tool", icon: "🔒", description: <CryptoTool /> },
            { id: "hash-tool", label: "Hash Tool", icon: "🔑", description: <HashTool /> },
            { id: "encoder-tool", label: "Encoder Tool", icon: "🔤", description: <EncoderTool /> },
        ],
        "qa-tools": [
            { id: "qa-testing-apps", label: "QA Testing Apps", icon: "🧪", description: <QATools /> },
            { id: "macos-app-catalog", label: "macOS App Catalog", icon: "📱", description: <MacOSAppCatalog /> },
            { id: "regex-tool", label: "Regex Tool", icon: "🔍", description: <RegexTool /> },
            { id: "diff-checker", label: "Diff Checker", icon: "🔄", description: <DiffChecker /> },
            { id: "password-tool", label: "Password Tool", icon: "🛡️", description: <PasswordTool /> },
            { id: "uuid-tool", label: "UUID Tool", icon: "🆔", description: <UUIDTool /> },
            { id: "markdown-renderer", label: "Markdown Renderer", icon: "📄", description: <MarkdownRenderer /> },
            { id: "latex-renderer", label: "LaTeX Renderer", icon: "📝", description: <LaTeXRenderer /> },
            { id: "writing-board", label: "Writing Board", icon: "✏️", description: <WritingBoardTool /> },
            { id: "text-generator", label: "Text Util", icon: "🎲", description: <TextGenerator /> },
        ],
        "general-tools": [
            { id: "info-tool", label: "Info Tool", icon: "📊", description: <InfoTool /> },
            { id: "passport-photo-maker", label: "Passport Photo Maker", icon: "📷", description: <PassportPhotoMaker /> },
            { id: "color-picker", label: "Color Picker", icon: "🎨", description: <ColorPickerTool /> },
            { id: "screen-recorder", label: "Screen Recorder", icon: "🎥", description: <ScreenRecorderTool /> },
            { id: "important-websites", label: "Important Websites", icon: "🌐", description: <ImportantWebsites /> },
            { id: "emoji-picker", label: "Emoji Picker", icon: "😀", description: <EmojiPicker /> },
            { id: "number-to-unicode", label: "Number Base Converter", icon: "🔢", description: <NumberToUnicode /> },
        ],
    };

    // Custom setSelectedNavItem that also updates localStorage
    const handleNavItemChange = (newItem) => {
        setSelectedNavItem(newItem);

        // Update the last selected item for the current tab
        const updatedLastSelectedItems = {
            ...lastSelectedItems,
            [activeTab]: newItem
        };
        setLastSelectedItems(updatedLastSelectedItems);
        localStorage.setItem('lastSelectedItems', JSON.stringify(updatedLastSelectedItems));
    };


    return (
        <div className="main-container">
            <div className="tabs">
                <div className="nav-section">
                    <img
                        src={logo}
                        alt="Tab Icon"
                    />
                    {["leftbrain", "rightbrain", "developer-tools", "qa-tools", "general-tools"].map((tab) => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <span className="tab-icon">
                                {tab === "leftbrain" ? "🧠" : 
                                 tab === "rightbrain" ? "🎨" : 
                                 tab === "developer-tools" ? "💻" : 
                                 tab === "qa-tools" ? "🧪" : "🛠️"}
                            </span>
                            {tab === "leftbrain" ? "LeftBrain" : 
                             tab === "rightbrain" ? "RightBrain" : 
                             tab === "developer-tools" ? "Developer Tools" : 
                             tab === "qa-tools" ? "QA Tools" : "General Tools"}
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
                />
            </div>
        </div>
    );
};

export default TabSystem;
