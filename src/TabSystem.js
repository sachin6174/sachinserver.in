import React, { useState, useEffect, useMemo, useCallback, memo, Suspense } from "react";
import { createLazyComponent } from './utils/lazyLoading';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import logo from './assets/logo512.png';
import './TabSystem.css';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';
import { ReactComponent as ToggleIcon } from './assets/svgs/toggle-icon.svg';

// Lazy load all components for better performance
const LazyAboutMe = createLazyComponent(() => import('./LeftBrain/AboutMe/AboutMe'), { componentName: 'AboutMe' });
const LazyAppleDevelopment = createLazyComponent(() => import('./LeftBrain/AppleDevelopment/AppleDevelopment'), { componentName: 'AppleDevelopment' });
const LazyNodeJS = createLazyComponent(() => import('./LeftBrain/NodeJS/NodeJS'), { componentName: 'NodeJS' });
const LazyReactJS = createLazyComponent(() => import('./LeftBrain/ReactJS/ReactJS'), { componentName: 'ReactJS' });
const LazyDSA = createLazyComponent(() => import('./LeftBrain/DSA/DSA'), { 
  componentName: 'DSA',
  fallback: <SkeletonLoader type="dsa" />
});
const LazyXcodeShortcuts = createLazyComponent(() => import('./LeftBrain/XcodeShortcuts/XcodeShortcuts'), { componentName: 'XcodeShortcuts' });
const LazyAppleDevYouTubeChannels = createLazyComponent(() => import('./LeftBrain/AppleDevYouTubeChannels/AppleDevYouTubeChannels'), { componentName: 'AppleDevYouTubeChannels' });
const LazyMacTerminalScripts = createLazyComponent(() => import('./LeftBrain/MacTerminalScripts/MacTerminalScripts'), { componentName: 'MacTerminalScripts' });
const LazySwiftNetworking = createLazyComponent(() => import('./LeftBrain/SwiftNetworking/SwiftNetworking'), { componentName: 'SwiftNetworking' });
const LazyDebugging = createLazyComponent(() => import('./LeftBrain/Debugging/Debugging'), { componentName: 'Debugging' });
const LazySystemDesign = createLazyComponent(() => import('./LeftBrain/SystemDesign/SystemDesign'), { componentName: 'SystemDesign' });
const LazySwiftGUI = createLazyComponent(() => import('./LeftBrain/SwiftGUI/SwiftGUI'), { componentName: 'SwiftGUI' });
const LazySwiftStorage = createLazyComponent(() => import('./LeftBrain/SwiftStorage/SwiftStorage'), { componentName: 'SwiftStorage' });
const LazySwiftTesting = createLazyComponent(() => import('./LeftBrain/SwiftTesting/SwiftTesting'), { componentName: 'SwiftTesting' });
const LazyAppleLanguages = createLazyComponent(() => import('./LeftBrain/AppleLanguages/AppleLanguages'), { componentName: 'AppleLanguages' });
const LazyPackageDeployment = createLazyComponent(() => import('./LeftBrain/PackageDeployment/PackageDeployment'), { componentName: 'PackageDeployment' });
const LazyChromeExtensions = createLazyComponent(() => import('./LeftBrain/ChromeExtensions/ChromeExtensions'), { componentName: 'ChromeExtensions' });
const LazyBlog = createLazyComponent(() => import('./LeftBrain/Blogs/Blog'), { componentName: 'Blog' });
const LazyAIAndTools = createLazyComponent(() => import('./LeftBrain/AIAndTools/AIAndTools'), { componentName: 'AIAndTools' });
const LazyDesignPatterns = createLazyComponent(() => import('./LeftBrain/DesignPatterns/DesignPatterns'), { componentName: 'DesignPatterns' });
const LazySoftwareArchitecture = createLazyComponent(() => import('./LeftBrain/SoftwareArchitecture/SoftwareArchitecture'), { componentName: 'SoftwareArchitecture' });
const LazyDrawing = createLazyComponent(() => import('./RightBrain/Drawing/Drawing'), { componentName: 'Drawing' });
const LazyLiterature = createLazyComponent(() => import('./RightBrain/Litlerature/Literature'), { componentName: 'Literature' });
const LazyPhilosophy = createLazyComponent(() => import('./RightBrain/Philosophy/Philosophy'), { componentName: 'Philosophy' });
const LazyMusic = createLazyComponent(() => import('./RightBrain/Music/Music'), { componentName: 'Music' });
const LazyPsychology = createLazyComponent(() => import('./RightBrain/Psychology/Psychology'), { componentName: 'Psychology' });

// Lazy load all tools
const LazyInfoTool = createLazyComponent(() => import('./Tools/InfoTool/InfoTool'), { 
  componentName: 'InfoTool',
  fallback: <SkeletonLoader type="tool" />
});
const LazyJsonTool = createLazyComponent(() => import('./Tools/JSONTool/JsonTool'), { 
  componentName: 'JsonTool',
  fallback: <SkeletonLoader type="tool" />
});
const LazyXmlTool = createLazyComponent(() => import('./Tools/XMLTool/XmlTool'), { 
  componentName: 'XmlTool',
  fallback: <SkeletonLoader type="tool" />
});
const LazyCryptoTool = createLazyComponent(() => import('./Tools/CryptoTool/CryptoTool'), { componentName: 'CryptoTool' });
const LazyWritingBoardTool = createLazyComponent(() => import('./Tools/WritingBoard/WritingBoardTool'), { componentName: 'WritingBoardTool' });
const LazyAPITool = createLazyComponent(() => import('./Tools/APITool/APITool'), { componentName: 'APITool' });
const LazyStorageTool = createLazyComponent(() => import('./Tools/StorageTool/StorageTool'), { componentName: 'StorageTool' });
const LazyColorPickerTool = createLazyComponent(() => import('./Tools/ColorPicker/ColorPickerTool'), { componentName: 'ColorPickerTool' });
const LazyScreenRecorderTool = createLazyComponent(() => import('./Tools/ScreenRecorder/ScreenRecorderTool'), { componentName: 'ScreenRecorderTool' });
const LazyCSVTool = createLazyComponent(() => import('./Tools/CSVTool/CSVTool'), { componentName: 'CSVTool' });
const LazyHashTool = createLazyComponent(() => import('./Tools/HashTool/HashTool'), { componentName: 'HashTool' });
const LazyPasswordTool = createLazyComponent(() => import('./Tools/PasswordTool/PasswordTool'), { componentName: 'PasswordTool' });
const LazyYAMLTool = createLazyComponent(() => import('./Tools/YAMLTool/YAMLTool'), { componentName: 'YAMLTool' });
const LazyRegexTool = createLazyComponent(() => import('./Tools/RegexTool/RegexTool'), { componentName: 'RegexTool' });
const LazyEncoderTool = createLazyComponent(() => import('./Tools/EncoderTool/EncoderTool'), { componentName: 'EncoderTool' });
const LazyUUIDTool = createLazyComponent(() => import('./Tools/UUIDTool/UUIDTool'), { componentName: 'UUIDTool' });
const LazyMarkdownRenderer = createLazyComponent(() => import('./Tools/MarkdownRenderer/MarkdownRenderer'), { componentName: 'MarkdownRenderer' });
const LazyLaTeXRenderer = createLazyComponent(() => import('./Tools/LaTeXRenderer/LaTeXRenderer'), { componentName: 'LaTeXRenderer' });
const LazyPassportPhotoMaker = createLazyComponent(() => import('./Tools/PassportPhotoMaker/PassportPhotoMaker'), { componentName: 'PassportPhotoMaker' });
const LazyPDFTool = createLazyComponent(() => import('./Tools/PDFTool/PDFTool'), { componentName: 'PDFTool' });
const LazyQRCodeTool = createLazyComponent(() => import('./Tools/QRCodeTool/QRCodeTool'), { componentName: 'QRCodeTool' });
const LazyDiffChecker = createLazyComponent(() => import('./Tools/DiffChecker/DiffChecker'), { componentName: 'DiffChecker' });
const LazyTextGenerator = createLazyComponent(() => import('./Tools/TextUtilities/TextGenerator'), { componentName: 'TextGenerator' });
const LazyQATools = createLazyComponent(() => import('./Tools/QATools/QATools'), { componentName: 'QATools' });
const LazyAIToolsChannels = createLazyComponent(() => import('./Tools/AIToolsChannels/AIToolsChannels'), { componentName: 'AIToolsChannels' });
const LazyImportantWebsites = createLazyComponent(() => import('./Tools/ImportantWebsites/ImportantWebsites'), { componentName: 'ImportantWebsites' });
const LazyMacOSAppCatalog = createLazyComponent(() => import('./Tools/MacOSAppCatalog/MacOSAppCatalog'), { componentName: 'MacOSAppCatalog' });
const LazyEmojiPicker = createLazyComponent(() => import('./Tools/EmojiPicker/EmojiPicker'), { componentName: 'EmojiPicker' });
const LazyNumberToUnicode = createLazyComponent(() => import('./Tools/NumberToUnicode/NumberToUnicode'), { componentName: 'NumberToUnicode' });

const TabSystem = () => {
    // Helper function to get default item for a tab (memoized)
    const getDefaultItemForTab = useCallback((tab) => {
        switch (tab) {
            case "developer-tools": return "ai-tools-channels";
            case "qa-tools": return "qa-testing-apps";
            case "general-tools": return "info-tool";
            case "rightbrain": return "apple-dev-youtube-rb";
            default: return "about-me";
        }
    }, []);

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


    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevMode) => !prevMode);
    }, []);

    const toggleLeftNav = useCallback(() => {
        setIsLeftNavVisible((prev) => !prev);
    }, []);

    // Memoize navigation items to prevent recreation on every render
    const navigationItems = useMemo(() => ({
        leftbrain: [
            { id: "about-me", label: "About Me", icon: "👤", description: <LazyAboutMe /> },
            { id: "dsa", label: "DSA", icon: "🧮", description: <LazyDSA /> },
            { id: "xcode-shortcuts", label: "Xcode Shortcuts", icon: "⌨️", description: <LazyXcodeShortcuts /> },
            { id: "apple-dev-youtube", label: "Apple Dev YouTube", icon: "📺", description: <LazyAppleDevYouTubeChannels /> },
            { id: "apple-development", label: "Apple Development", icon: "🍎", description: <LazyAppleDevelopment /> },
            { id: "apple-languages", label: "Apple Languages", icon: "🍎", description: <LazyAppleLanguages /> },
            { id: "swift-gui", label: "Swift GUI", icon: "🖥️", description: <LazySwiftGUI /> },
            { id: "swift-storage", label: "Swift Storage", icon: "💾", description: <LazySwiftStorage /> },
            { id: "swift-networking", label: "Swift Networking", icon: "🌐", description: <LazySwiftNetworking /> },
            { id: "debugging", label: "Swift Debugging", icon: "🐛", description: <LazyDebugging /> },
            { id: "swift-testing", label: "Swift Testing", icon: "🧪", description: <LazySwiftTesting /> },
            { id: "package-deployment", label: "Package & Deployment", icon: "📦", description: <LazyPackageDeployment /> },
            { id: "mac-terminal-scripts", label: "Mac Terminal Scripts", icon: "💻", description: <LazyMacTerminalScripts /> },
            { id: "ai-and-tools", label: "AI and Tools", icon: "🤖", description: <LazyAIAndTools /> },
            { id: "design-patterns", label: "Design Patterns", icon: "🏗️", description: <LazyDesignPatterns /> },
            { id: "software-architecture", label: "Software Architecture", icon: "🏛️", description: <LazySoftwareArchitecture /> },
            { id: "system-design", label: "System Design", icon: "🏢", description: <LazySystemDesign /> },
            { id: "nodejs", label: "NodeJS", icon: "🌐", description: <LazyNodeJS /> },
            { id: "reactjs", label: "ReactJS", icon: "⚛️", description: <LazyReactJS /> },
            { id: "chrome-extensions", label: "Chrome Extensions", icon: "🧩", description: <LazyChromeExtensions /> },
            { id: "blogs", label: "Blogs", icon: "📝", description: <LazyBlog /> },
        ],
        rightbrain: [
            { id: "apple-dev-youtube-rb", label: "Apple Dev YouTube", icon: "📺", description: <LazyAppleDevYouTubeChannels /> },
            { id: "drawing", label: "Drawing", icon: "✏️", description: <LazyDrawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <LazyLiterature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <LazyPhilosophy /> },
            { id: "psychology", label: "Psychology", icon: "🧠", description: <LazyPsychology /> },
            { id: "music", label: "Music", icon: "🎵", description: <LazyMusic /> },
        ],
        "developer-tools": [
            { id: "ai-tools-channels", label: "AI Tools Channels", icon: "🤖", description: <LazyAIToolsChannels /> },
            { id: "api-tool", label: "API Tool", icon: "🌐", description: <LazyAPITool /> },
            { id: "storage-tool", label: "Storage Tool", icon: "💾", description: <LazyStorageTool /> },
            { id: "qr-code-tool", label: "QR Code Tool", icon: "🔲", description: <LazyQRCodeTool /> },
            { id: "pdf-tool", label: "PDF Tool", icon: "📄", description: <LazyPDFTool /> },
            { id: "JSON-Tool", label: "JSON Tool", icon: "📝", description: <LazyJsonTool /> },
            { id: "XML-Tool", label: "XML Tool", icon: "🔧", description: <LazyXmlTool /> },
            { id: "yaml-tool", label: "YAML Tool", icon: "📄", description: <LazyYAMLTool /> },
            { id: "csv-tool", label: "CSV Tool", icon: "📊", description: <LazyCSVTool /> },
            { id: "Encryption-Decryption-Tool", label: "Crypto Tool", icon: "🔒", description: <LazyCryptoTool /> },
            { id: "hash-tool", label: "Hash Tool", icon: "🔑", description: <LazyHashTool /> },
            { id: "encoder-tool", label: "Encoder Tool", icon: "🔤", description: <LazyEncoderTool /> },
        ],
        "qa-tools": [
            { id: "qa-testing-apps", label: "QA Testing Apps", icon: "🧪", description: <LazyQATools /> },
            { id: "macos-app-catalog", label: "macOS App Catalog", icon: "📱", description: <LazyMacOSAppCatalog /> },
            { id: "regex-tool", label: "Regex Tool", icon: "🔍", description: <LazyRegexTool /> },
            { id: "diff-checker", label: "Diff Checker", icon: "🔄", description: <LazyDiffChecker /> },
            { id: "password-tool", label: "Password Tool", icon: "🛡️", description: <LazyPasswordTool /> },
            { id: "uuid-tool", label: "UUID Tool", icon: "🆔", description: <LazyUUIDTool /> },
            { id: "markdown-renderer", label: "Markdown Renderer", icon: "📄", description: <LazyMarkdownRenderer /> },
            { id: "latex-renderer", label: "LaTeX Renderer", icon: "📝", description: <LazyLaTeXRenderer /> },
            { id: "writing-board", label: "Writing Board", icon: "✏️", description: <LazyWritingBoardTool /> },
            { id: "text-generator", label: "Text Util", icon: "🎲", description: <LazyTextGenerator /> },
        ],
        "general-tools": [
            { id: "info-tool", label: "Info Tool", icon: "📊", description: <LazyInfoTool /> },
            { id: "passport-photo-maker", label: "Passport Photo Maker", icon: "📷", description: <LazyPassportPhotoMaker /> },
            { id: "color-picker", label: "Color Picker", icon: "🎨", description: <LazyColorPickerTool /> },
            { id: "screen-recorder", label: "Screen Recorder", icon: "🎥", description: <LazyScreenRecorderTool /> },
            { id: "important-websites", label: "Important Websites", icon: "🌐", description: <LazyImportantWebsites /> },
            { id: "emoji-picker", label: "Emoji Picker", icon: "😀", description: <LazyEmojiPicker /> },
            { id: "number-to-unicode", label: "Number Base Converter", icon: "🔢", description: <LazyNumberToUnicode /> },
        ],
    }), []);

    // Custom setSelectedNavItem that also updates localStorage (memoized)
    const handleNavItemChange = useCallback((newItem) => {
        setSelectedNavItem(newItem);

        // Update the last selected item for the current tab
        setLastSelectedItems(prevItems => {
            const updatedLastSelectedItems = {
                ...prevItems,
                [activeTab]: newItem
            };
            localStorage.setItem('lastSelectedItems', JSON.stringify(updatedLastSelectedItems));
            return updatedLastSelectedItems;
        });
    }, [activeTab]);


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
