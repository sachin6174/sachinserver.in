import React, { useState, useEffect, useMemo, useCallback, memo, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createLazyComponent } from './utils/lazyLoading';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { optimizedStorage, usePerformanceTracker } from './utils/performanceOptimizer';
import CommandPalette from './components/CommandPalette/CommandPalette';
import logo from './assets/logo512.png';
import './TabSystem.css';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';
import { ReactComponent as ToggleIcon } from './assets/svgs/toggle-icon.svg';

// Lazy load all components for better performance
const LazyAboutMe = createLazyComponent(() => import('./LeftBrain/AboutMe/AboutMe'), { componentName: 'AboutMe' });
const LazyDSA = createLazyComponent(() => import('./LeftBrain/DSA/DSA'), {
    componentName: 'DSA',
    fallback: <SkeletonLoader type="dsa" />
});
const LazyGitHub = createLazyComponent(() => import('./LeftBrain/GitHub/GitHub'), { componentName: 'GitHub' });
const LazyXcodeShortcuts = createLazyComponent(() => import('./LeftBrain/XcodeShortcuts/XcodeShortcuts'), { componentName: 'XcodeShortcuts' });
const LazyAppleDevYouTubeChannels = createLazyComponent(() => import('./LeftBrain/AppleDevYouTubeChannels/AppleDevYouTubeChannels'), { componentName: 'AppleDevYouTubeChannels' });
const LazyAppleDevelopmentPodcasts = createLazyComponent(() => import('./LeftBrain/AppleDevelopmentPodcasts/AppleDevelopmentPodcasts'), { componentName: 'AppleDevelopmentPodcasts' });
const LazyMacTerminalScripts = createLazyComponent(() => import('./LeftBrain/MacTerminalScripts/MacTerminalScripts'), { componentName: 'MacTerminalScripts' });
const LazySwiftNetworking = createLazyComponent(() => import('./LeftBrain/SwiftNetworking/SwiftNetworking'), { componentName: 'SwiftNetworking' });
const LazyDebugging = createLazyComponent(() => import('./LeftBrain/Debugging/Debugging'), { componentName: 'Debugging' });
const LazySystemDesign = createLazyComponent(() => import('./LeftBrain/SystemDesign/SystemDesign'), { componentName: 'SystemDesign' });
const LazySwiftGUI = createLazyComponent(() => import('./LeftBrain/SwiftGUI/SwiftGUI'), { componentName: 'SwiftGUI' });
const LazySwiftStorage = createLazyComponent(() => import('./LeftBrain/SwiftStorage/SwiftStorage'), { componentName: 'SwiftStorage' });
const LazySwiftTesting = createLazyComponent(() => import('./LeftBrain/SwiftTesting/SwiftTesting'), { componentName: 'SwiftTesting' });
const LazyPackageDeployment = createLazyComponent(() => import('./LeftBrain/PackageDeployment/PackageDeployment'), { componentName: 'PackageDeployment' });
const LazyChromeExtensions = createLazyComponent(() => import('./LeftBrain/ChromeExtensions/ChromeExtensions'), { componentName: 'ChromeExtensions' });
const LazyAIAndTools = createLazyComponent(() => import('./LeftBrain/AIAndTools/AIAndTools'), { componentName: 'AIAndTools' });
const LazyDesignPatterns = createLazyComponent(() => import('./LeftBrain/DesignPatterns/DesignPatterns'), { componentName: 'DesignPatterns' });
const LazySoftwareArchitecture = createLazyComponent(() => import('./LeftBrain/SoftwareArchitecture/SoftwareArchitecture'), { componentName: 'SoftwareArchitecture' });
const LazyDrawing = createLazyComponent(() => import('./RightBrain/Drawing/Drawing'), { componentName: 'Drawing' });
const LazyLiterature = createLazyComponent(() => import('./RightBrain/Litlerature/Literature'), { componentName: 'Literature' });
const LazyPhilosophy = createLazyComponent(() => import('./RightBrain/Philosophy/Philosophy'), { componentName: 'Philosophy' });
const LazyMusic = createLazyComponent(() => import('./RightBrain/Music/Music'), { componentName: 'Music' });
const LazyPsychology = createLazyComponent(() => import('./RightBrain/Psychology/Psychology'), { componentName: 'Psychology' });
const LazyRightbrainYouTube = createLazyComponent(() => import('./RightBrain/YouTube/YouTube'), { componentName: 'RightbrainYouTube' });

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
const LazyAIToolsChannels = createLazyComponent(() => import('./Tools/AIToolsChannels/AIToolsChannels'), { componentName: 'AIToolsChannels' });
const LazyImportantWebsites = createLazyComponent(() => import('./Tools/ImportantWebsites/ImportantWebsites'), { componentName: 'ImportantWebsites' });
const LazyMacOSAppCatalog = createLazyComponent(() => import('./Tools/MacOSAppCatalog/MacOSAppCatalog'), { componentName: 'MacOSAppCatalog' });
const LazyEmojiPicker = createLazyComponent(() => import('./Tools/EmojiPicker/EmojiPicker'), { componentName: 'EmojiPicker' });
const LazyPomodoroTimer = createLazyComponent(() => import('./Tools/PomodoroTimer/PomodoroTimer'), { componentName: 'PomodoroTimer' });
const LazyNumberToUnicode = createLazyComponent(() => import('./Tools/NumberToUnicode/NumberToUnicode'), { componentName: 'NumberToUnicode' });
const LazyYouTubeDownloader = createLazyComponent(() => import('./Tools/YouTubeDownloader/YouTubeDownloader'), { componentName: 'YouTubeDownloader' });
const LazyAppIconGenerator = createLazyComponent(() => import('./Tools/AppIconGenerator/AppIconGenerator'), { componentName: 'AppIconGenerator' });
const LazyTerminalScripts = createLazyComponent(() => import('./Tools/TerminalScripts/TerminalScripts'), { componentName: 'TerminalScripts' });
const LazyTerminalTutorial = createLazyComponent(() => import('./Tools/TerminalTutorial/TerminalTutorial'), { componentName: 'TerminalTutorial' });
const LazyOnlineClipboard = createLazyComponent(() => import('./Tools/OnlineClipboard/OnlineClipboard'), { componentName: 'OnlineClipboard' });
const LazyTaskManager = createLazyComponent(() => import('./Tools/TaskManager/TaskManager'), { componentName: 'TaskManager' });
const LazyNotesApp = createLazyComponent(() => import('./Tools/NotesApp/NotesApp'), { componentName: 'NotesApp' });
const LazyTimeZoneConverter = createLazyComponent(() => import('./Tools/TimeZoneConverter/TimeZoneConverter'), { componentName: 'TimeZoneConverter' });
const LazyBudgetTracker = createLazyComponent(() => import('./Tools/BudgetTracker/BudgetTracker'), { componentName: 'BudgetTracker' });
const LazySwiftPractice = createLazyComponent(() => import('./Tools/SwiftPractice/SwiftPractice'), { componentName: 'SwiftPractice' });

const TabSystem = memo(() => {
    // Performance tracking for development
    usePerformanceTracker('TabSystem');

    const { tab: paramTab, item: paramItem } = useParams();
    const navigate = useNavigate();

    // Helper function to get default item for a tab (memoized)
    const getDefaultItemForTab = useCallback((tab) => {
        switch (tab) {
            case "developer-tools": return "ai-tools-channels";
            case "qa-tools": return "swift-practice";
            case "general-tools": return "info-tool";
            case "rightbrain": return "drawing";
            default: return "about-me";
        }
    }, []);

    const validTabs = useMemo(() => ["leftbrain", "rightbrain", "developer-tools", "qa-tools", "general-tools"], []);
    const activeTab = validTabs.includes(paramTab) ? paramTab : "leftbrain";

    // State to track the last selected navigation item for each section
    const [lastSelectedItems, setLastSelectedItems] = useState(() => {
        const stored = localStorage.getItem('lastSelectedItems');
        return stored ? JSON.parse(stored) : {
            leftbrain: "about-me",
            rightbrain: "drawing",
            "developer-tools": "ai-tools-channels",
            "qa-tools": "swift-practice",
            "general-tools": "info-tool"
        };
    });

    const selectedNavItem = paramItem || getDefaultItemForTab(activeTab);

    // If param is missing or incorrect, redirect to default
    useEffect(() => {
        if (!paramTab || !validTabs.includes(paramTab)) {
            navigate(`/${activeTab}/${selectedNavItem}`, { replace: true });
        } else if (!paramItem) {
            const itemToNavigate = lastSelectedItems[activeTab] || getDefaultItemForTab(activeTab);
            navigate(`/${activeTab}/${itemToNavigate}`, { replace: true });
        }
    }, [paramTab, paramItem, activeTab, selectedNavItem, navigate, lastSelectedItems, getDefaultItemForTab, validTabs]);

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

    // Save localStorage when theme changes (optimized)
    useEffect(() => {
        optimizedStorage.set('isDarkMode', isDarkMode);
        // Toggle body theme classes without clobbering other classes
        const dark = 'dark-mode';
        const light = 'light-mode';
        const root = document.documentElement;
        if (isDarkMode) {
            document.body.classList.remove(light);
            document.body.classList.add(dark);
            root.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove(dark);
            document.body.classList.add(light);
            root.setAttribute('data-theme', 'light');
        }
    }, [isDarkMode]);

    // Listen for system theme changes (only if no stored preference exists)
    useEffect(() => {
        const stored = optimizedStorage.get('isDarkMode');
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
        optimizedStorage.set('isLeftNavVisible', isLeftNavVisible);
    }, [isLeftNavVisible]);

    // Keyboard shortcuts: 1-5 to switch tabs, ⌘/ to toggle nav
    useEffect(() => {
        const tabKeys = ["leftbrain", "rightbrain", "developer-tools", "qa-tools", "general-tools"];
        const handler = (e) => {
            const tag = e.target.tagName;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= 5) {
                const tab = tabKeys[n - 1];
                const item = lastSelectedItems[tab] || getDefaultItemForTab(tab);
                navigate(`/${tab}/${item}`);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [lastSelectedItems, getDefaultItemForTab, navigate]);

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
            { id: "github", label: "GitHub", icon: "🐙", description: <LazyGitHub /> },
            { id: "apple-development-podcasts", label: "YouTube", icon: "🎧", description: <LazyAppleDevelopmentPodcasts /> },
            { id: "xcode-shortcuts", label: "Xcode Shortcuts", icon: "⌨️", description: <LazyXcodeShortcuts /> },
            { id: "apple-dev-youtube", label: "Apple Dev YouTube", icon: "📺", description: <LazyAppleDevYouTubeChannels /> },
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
            { id: "chrome-extensions", label: "Chrome Extensions", icon: "🧩", description: <LazyChromeExtensions /> },
        ],
        rightbrain: [
            { id: "drawing", label: "Drawing", icon: "✏️", description: <LazyDrawing /> },
            { id: "literature", label: "Literature", icon: "📖", description: <LazyLiterature /> },
            { id: "philosophy", label: "Philosophy", icon: "🤔", description: <LazyPhilosophy /> },
            { id: "psychology", label: "Psychology", icon: "🧠", description: <LazyPsychology /> },
            { id: "music", label: "Music", icon: "🎵", description: <LazyMusic /> },
            { id: "rightbrain-youtube", label: "YouTube", icon: "🎥", description: <LazyRightbrainYouTube /> },
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
            { id: "markdown-renderer", label: "Markdown Renderer", icon: "📄", description: <LazyMarkdownRenderer /> },
            { id: "regex-tool", label: "Regex Tool", icon: "🔍", description: <LazyRegexTool /> },
            { id: "diff-checker", label: "Diff Checker", icon: "🔄", description: <LazyDiffChecker /> },
            { id: "password-tool", label: "Password Tool", icon: "🛡️", description: <LazyPasswordTool /> },
            { id: "uuid-tool", label: "UUID Tool", icon: "🆔", description: <LazyUUIDTool /> },
            { id: "writing-board", label: "Writing Board", icon: "✏️", description: <LazyWritingBoardTool /> },
            { id: "latex-renderer", label: "LaTeX Renderer", icon: "📝", description: <LazyLaTeXRenderer /> },
            { id: "text-generator", label: "Text Util", icon: "🎲", description: <LazyTextGenerator /> },
        ],
        "qa-tools": [
            { id: "swift-practice", label: "Swift Practice", icon: "🦅", description: <LazySwiftPractice /> },
            { id: "macos-app-catalog", label: "macOS App Catalog", icon: "📱", description: <LazyMacOSAppCatalog /> },
            { id: "terminal-scripts", label: "Terminal Scripts", icon: "💻", description: <LazyTerminalScripts /> },
            { id: "terminal-tutorial", label: "Terminal Tutorial", icon: "📘", description: <LazyTerminalTutorial /> },
            { id: "online-clipboard", label: "Online Clipboard", icon: "📋", description: <LazyOnlineClipboard /> },
        ],
        "general-tools": [
            { id: "info-tool", label: "Info Tool", icon: "📊", description: <LazyInfoTool /> },
            { id: "passport-photo-maker", label: "Passport Photo Maker", icon: "📷", description: <LazyPassportPhotoMaker /> },
            { id: "app-icon-generator", label: "App Icon Generator", icon: "🍎", description: <LazyAppIconGenerator /> },
            { id: "color-picker", label: "Color Picker", icon: "🎨", description: <LazyColorPickerTool /> },
            { id: "screen-recorder", label: "Screen Recorder", icon: "🎥", description: <LazyScreenRecorderTool /> },
            { id: "youtube-downloader", label: "YouTube Downloader", icon: "📹", description: <LazyYouTubeDownloader /> },
            { id: "important-websites", label: "Important Websites", icon: "🌐", description: <LazyImportantWebsites /> },
            { id: "emoji-picker", label: "Emoji Picker", icon: "😀", description: <LazyEmojiPicker /> },
            { id: "pomodoro-timer", label: "Pomodoro Timer", icon: "⏱️", description: <LazyPomodoroTimer /> },
            { id: "task-manager", label: "Task Manager", icon: "✓", description: <LazyTaskManager /> },
            { id: "notes-app", label: "Notes", icon: "📝", description: <LazyNotesApp /> },
            { id: "time-zone-converter", label: "Time Zone Converter", icon: "🌍", description: <LazyTimeZoneConverter /> },
            { id: "budget-tracker", label: "Budget Tracker", icon: "💰", description: <LazyBudgetTracker /> },
            { id: "number-to-unicode", label: "Number Base Converter", icon: "🔢", description: <LazyNumberToUnicode /> },
        ],
    }), []);

    // Custom setSelectedNavItem that also updates localStorage (memoized and debounced)
    const handleNavItemChange = useCallback((newItem) => {
        // Update the last selected item for the current tab
        setLastSelectedItems(prevItems => {
            const updatedLastSelectedItems = {
                ...prevItems,
                [activeTab]: newItem
            };

            // Optimized localStorage update
            optimizedStorage.set('lastSelectedItems', updatedLastSelectedItems);

            return updatedLastSelectedItems;
        });
    }, [activeTab]);

    // Memoized tab configuration for better performance
    const tabConfig = useMemo(() => [
        { key: "leftbrain", icon: "🧠", label: "LeftBrain" },
        { key: "rightbrain", icon: "🎨", label: "RightBrain" },
        { key: "developer-tools", icon: "💻", label: "Developer Tools" },
        { key: "qa-tools", icon: "🧪", label: "QA Tools" },
        { key: "general-tools", icon: "🛠️", label: "General Tools" }
    ], []);

    // Memoized tab click handler to prevent recreation
    const handleTabClick = useCallback((tab) => {
        const itemToNavigate = lastSelectedItems[tab] || getDefaultItemForTab(tab);
        navigate(`/${tab}/${itemToNavigate}`);
    }, [lastSelectedItems, getDefaultItemForTab, navigate]);

    return (
        <div className="main-container">
            <div className="tabs">
                <div className="nav-section">
                    <img
                        src={logo}
                        alt="Tab Icon"
                        loading="lazy"
                        decoding="async"
                        width="32"
                        height="32"
                    />
                    {tabConfig.map((tab) => (
                        <Link
                            key={tab.key}
                            to={`/${tab.key}/${lastSelectedItems[tab.key] || getDefaultItemForTab(tab.key)}`}
                            className={`tab ${activeTab === tab.key ? "active" : ""}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            {tab.label}
                        </Link>
                    ))}
                </div>
                <div className="tabs-right-controls">
                    <CommandPalette
                        navigationItems={navigationItems}
                        activeTab={activeTab}
                        toggleTheme={toggleTheme}
                        isDarkMode={isDarkMode}
                    />
                    <button
                        className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    >
                        <span className="icon sun" aria-hidden="true">☀️</span>
                        <span className="icon moon" aria-hidden="true">🌙</span>
                        <span className="toggle-thumb" aria-hidden="true"></span>
                    </button>
                </div>
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
                            activeTab={activeTab}
                        />
                    )}
                </div>

                {/* Main Content Area */}
                <section className="main-region" aria-label="Main content">
                    <MainContent
                        activeTab={activeTab}
                        selectedNavItem={selectedNavItem}
                        navigationItems={navigationItems}
                        isLeftNavVisible={isLeftNavVisible}
                    />
                </section>
            </div>
        </div>
    );

});

TabSystem.displayName = 'TabSystem';

export default TabSystem;
