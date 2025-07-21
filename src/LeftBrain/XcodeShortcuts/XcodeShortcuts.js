import React from "react";
import "../shared-styles.css";
import "./XcodeShortcuts.css";

const XcodeShortcuts = () => {
    const shortcutCategories = [
        {
            category: "Navigation",
            icon: "🧭",
            shortcuts: [
                { keys: "⌘ + ⇧ + O", description: "Open Quickly (files, symbols)" },
                { keys: "⌘ + ⌃ + J", description: "Jump to Definition" },
                { keys: "⌘ + ⌥ + ←", description: "Navigate Back" },
                { keys: "⌘ + ⌥ + →", description: "Navigate Forward" },
                { keys: "⌘ + ⇧ + J", description: "Reveal in Project Navigator" },
                { keys: "⌘ + T", description: "New Tab" },
                { keys: "⌘ + ⇧ + T", description: "Reopen Recently Closed Tab" },
                { keys: "⌘ + [number]", description: "Switch to Tab by Number" }
            ]
        },
        {
            category: "Code Editing",
            icon: "✏️",
            shortcuts: [
                { keys: "⌘ + /", description: "Toggle Comment" },
                { keys: "⌃ + I", description: "Re-indent Selection" },
                { keys: "⌘ + ⌥ + [", description: "Move Line Up" },
                { keys: "⌘ + ⌥ + ]", description: "Move Line Down" },
                { keys: "⌘ + D", description: "Duplicate Line" },
                { keys: "⌃ + K", description: "Delete to End of Line" },
                { keys: "⌘ + ⌥ + E", description: "Rename Symbol" },
                { keys: "⌘ + ⌃ + E", description: "Edit All in Scope" }
            ]
        },
        {
            category: "Building & Running",
            icon: "⚙️",
            shortcuts: [
                { keys: "⌘ + R", description: "Run" },
                { keys: "⌘ + B", description: "Build" },
                { keys: "⌘ + ⇧ + K", description: "Clean Build Folder" },
                { keys: "⌘ + U", description: "Test" },
                { keys: "⌘ + ⌃ + U", description: "Build for Testing" },
                { keys: "⌘ + .", description: "Stop Running" },
                { keys: "⌘ + ⇧ + R", description: "Run Without Building" }
            ]
        },
        {
            category: "Debugging",
            icon: "🐛",
            shortcuts: [
                { keys: "⌘ + Y", description: "Activate/Deactivate Breakpoints" },
                { keys: "F6", description: "Step Over" },
                { keys: "F7", description: "Step Into" },
                { keys: "F8", description: "Step Out" },
                { keys: "⌃ + ⌘ + Y", description: "Continue Program Execution" },
                { keys: "⌘ + ⌃ + R", description: "Run to Cursor" },
                { keys: "⌘ + ⇧ + Y", description: "Debug Area Toggle" }
            ]
        },
        {
            category: "Interface Builder",
            icon: "🎨",
            shortcuts: [
                { keys: "⌘ + ⌥ + Return", description: "Open Assistant Editor" },
                { keys: "⌘ + Return", description: "Show Standard Editor" },
                { keys: "⌘ + ⌃ + ←", description: "Add Left Constraint" },
                { keys: "⌘ + ⌃ + →", description: "Add Right Constraint" },
                { keys: "⌘ + ⌃ + ↑", description: "Add Top Constraint" },
                { keys: "⌘ + ⌃ + ↓", description: "Add Bottom Constraint" },
                { keys: "⌘ + =", description: "Update Frames" }
            ]
        },
        {
            category: "Simulator",
            icon: "📱",
            shortcuts: [
                { keys: "⌘ + ⇧ + H", description: "Home Button" },
                { keys: "⌘ + ⇧ + H H", description: "App Switcher (double tap)" },
                { keys: "Device → Shake", description: "Shake Gesture" },
                { keys: "⌘ + K", description: "Toggle Software Keyboard" },
                { keys: "⌘ + ⇧ + M", description: "Toggle Device Orientation" },
                { keys: "⌘ + S", description: "Screenshot" },
                { keys: "Hardware → Lock", description: "Lock/Unlock Device" }
            ]
        },
        {
            category: "Source Control",
            icon: "📦",
            shortcuts: [
                { keys: "⌘ + ⌥ + C", description: "Commit Changes" },
                { keys: "⌘ + ⌥ + X", description: "Show Source Control Navigator" },
                { keys: "⌘ + ⌥ + ⇧ + C", description: "Create Pull Request" },
                { keys: "⌘ + ⌥ + P", description: "Push Changes" },
                { keys: "⌘ + ⌥ + F", description: "Pull Changes" },
                { keys: "⌘ + ⌃ + ⇧ + G", description: "Show Git Blame" }
            ]
        },
        {
            category: "Window Management",
            icon: "🪟",
            shortcuts: [
                { keys: "⌘ + 0", description: "Show/Hide Navigator" },
                { keys: "⌘ + ⌥ + 0", description: "Show/Hide Inspector" },
                { keys: "⌘ + ⇧ + Y", description: "Show/Hide Debug Area" },
                { keys: "⌘ + ⌃ + F", description: "Enter Full Screen" },
                { keys: "⌘ + W", description: "Close Tab" },
                { keys: "⌘ + ⇧ + W", description: "Close Window" },
                { keys: "⌘ + `", description: "Cycle Through Windows" }
            ]
        }
    ];

    const tips = [
        {
            title: "Quick Actions",
            icon: "⚡",
            content: "Use ⌘ + ⇧ + A to access all actions and their shortcuts quickly."
        },
        {
            title: "Custom Shortcuts",
            icon: "⚙️",
            content: "Customize shortcuts in Xcode → Preferences → Key Bindings for your workflow."
        },
        {
            title: "Search Shortcuts",
            icon: "🔍",
            content: "Type part of an action name in Key Bindings preferences to find its shortcut."
        },
        {
            title: "Multiple Cursors",
            icon: "📍",
            content: "Hold ⌥ and click to place multiple cursors for simultaneous editing."
        }
    ];

    return (
        <div className="content-container">
            <div className="header-section">
                <h1 className="main-title">
                    <span className="title-icon">⌨️</span>
                    Xcode Shortcuts
                </h1>
                <p className="description">
                    Master Xcode development with essential keyboard shortcuts for faster coding, debugging, and navigation.
                </p>
            </div>

            <div className="shortcuts-grid">
                {shortcutCategories.map((category, index) => (
                    <div key={index} className="shortcut-category">
                        <div className="category-header">
                            <span className="category-icon">{category.icon}</span>
                            <h3 className="category-title">{category.category}</h3>
                        </div>
                        <div className="shortcuts-list">
                            {category.shortcuts.map((shortcut, idx) => (
                                <div key={idx} className="shortcut-item">
                                    <div className="shortcut-keys">
                                        {shortcut.keys.split(' + ').map((key, keyIdx) => (
                                            <React.Fragment key={keyIdx}>
                                                <kbd className="key">{key}</kbd>
                                                {keyIdx < shortcut.keys.split(' + ').length - 1 && <span className="plus">+</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="shortcut-description">
                                        {shortcut.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="tips-section">
                <h2 className="section-title">
                    <span className="section-icon">💡</span>
                    Pro Tips
                </h2>
                <div className="tips-grid">
                    {tips.map((tip, index) => (
                        <div key={index} className="tip-card">
                            <div className="tip-header">
                                <span className="tip-icon">{tip.icon}</span>
                                <h4 className="tip-title">{tip.title}</h4>
                            </div>
                            <p className="tip-content">{tip.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default XcodeShortcuts;