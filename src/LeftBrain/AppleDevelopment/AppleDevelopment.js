import React from "react";
import "../shared-styles.css";
import "./AppleDevelopment.css";
import developmentAppsData from "./developmentApps.json";

const AppleDevelopment = () => {
    const frameworks = [
        {
            name: "SwiftUI",
            description: "Modern declarative UI framework for building native iOS, macOS, watchOS, and tvOS apps.",
            icon: "🎨",
            features: ["Declarative Syntax", "Live Previews", "Cross-platform", "Animation Support"]
        },
        {
            name: "UIKit",
            description: "Mature and powerful framework for building iOS applications with programmatic and storyboard approaches.",
            icon: "📱",
            features: ["MVC Architecture", "Interface Builder", "Custom Controls", "Animation APIs"]
        },
        {
            name: "Core Data",
            description: "Apple's object graph and persistence framework for managing model layer objects.",
            icon: "💾",
            features: ["Object-Relational Mapping", "Data Persistence", "iCloud Sync", "Migration Support"]
        },
        {
            name: "Xcode",
            description: "Integrated development environment with powerful tools for building Apple platform apps.",
            icon: "🔧",
            features: ["Interface Builder", "Debugging Tools", "Performance Analysis", "Simulator"]
        }
    ];

    const skills = [
        { name: "Swift", level: 95 },
        { name: "SwiftUI", level: 88 },
        { name: "UIKit", level: 85 },
        { name: "Core Data", level: 85 },
        { name: "Xcode", level: 90 },
        { name: "iOS SDK", level: 87 }
    ];

    // Helpful development apps
    const developmentApps = developmentAppsData;

    // Important macOS scripts
    const macosScripts = [
        {
            title: "iOS Simulator Reset",
            description: "Completely reset iOS Simulator data and settings. Useful when simulator gets corrupted or you need a fresh start.",
            usage: "Run this when iOS Simulator is behaving unexpectedly or you need to clear all simulator data.",
            script: `#!/bin/bash
# Reset iOS Simulator
echo "Resetting iOS Simulator..."

# Close all simulator instances
killall "Simulator" 2>/dev/null

# Erase all simulator data
xcrun simctl erase all

# Reset simulator preferences
defaults delete com.apple.iphonesimulator 2>/dev/null

echo "iOS Simulator has been reset successfully!"
echo "You can now restart Xcode and Simulator."`,
            category: "Simulator Management"
        },
        {
            title: "Xcode Cache Cleaner",
            description: "Clean Xcode derived data, archives, and cache files to free up disk space and resolve build issues.",
            usage: "Use when experiencing build errors, slow compilation, or when Xcode is consuming too much disk space.",
            script: `#!/bin/bash
# Xcode Cache Cleaner
echo "Cleaning Xcode caches..."

# Close Xcode first
killall "Xcode" 2>/dev/null

# Clean DerivedData
echo "Cleaning DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Clean Archives
echo "Cleaning Archives..."
rm -rf ~/Library/Developer/Xcode/Archives/*

# Clean Device Support
echo "Cleaning Device Support..."
rm -rf ~/Library/Developer/Xcode/iOS\\ DeviceSupport/*

# Clean Simulator Caches
echo "Cleaning Simulator Caches..."
rm -rf ~/Library/Developer/CoreSimulator/Caches/*

echo "Xcode cache cleanup completed!"
echo "Freed up disk space and cleared build caches."`,
            category: "Cache Management"
        },
        {
            title: "App Bundle Analyzer",
            description: "Analyze the contents and size of iOS app bundles to optimize app size and identify large resources.",
            usage: "Use to understand what's taking up space in your app bundle and optimize for App Store size limits.",
            script: `#!/bin/bash
# App Bundle Analyzer
if [ $# -eq 0 ]; then
    echo "Usage: $0 <path-to-app-bundle>"
    echo "Example: $0 MyApp.app"
    exit 1
fi

APP_PATH="$1"

if [ ! -d "$APP_PATH" ]; then
    echo "Error: App bundle not found at $APP_PATH"
    exit 1
fi

echo "Analyzing app bundle: $APP_PATH"
echo "=================================="

# Total size
echo "Total bundle size:"
du -sh "$APP_PATH"
echo ""

# Largest files
echo "Top 10 largest files:"
find "$APP_PATH" -type f -exec du -h {} + | sort -hr | head -10
echo ""

# File type breakdown
echo "File type breakdown:"
find "$APP_PATH" -type f | sed 's/.*\\.//' | sort | uniq -c | sort -nr
echo ""

# Framework sizes
if [ -d "$APP_PATH/Frameworks" ]; then
    echo "Framework sizes:"
    du -sh "$APP_PATH/Frameworks"/*
fi`,
            category: "App Analysis"
        },
        {
            title: "iOS Device Log Viewer",
            description: "Stream and filter logs from connected iOS devices for debugging and monitoring.",
            usage: "Use for real-time debugging of apps running on physical devices.",
            script: `#!/bin/bash
# iOS Device Log Viewer
echo "iOS Device Log Viewer"
echo "===================="

# Check if device is connected
DEVICE_ID=$(xcrun xctrace list devices | grep "iPhone\\|iPad" | head -1 | grep -o '([^)]*)' | tr -d '()')

if [ -z "$DEVICE_ID" ]; then
    echo "No iOS device found. Please connect your device and try again."
    exit 1
fi

echo "Found device: $DEVICE_ID"
echo "Starting log stream... (Press Ctrl+C to stop)"
echo ""

# Stream device logs with filtering
xcrun devicectl list devices
echo ""
echo "Streaming logs from device..."

# You can add app-specific filtering here
# Replace 'YourAppName' with your actual app name
APP_NAME="YourAppName"

if [ $# -eq 1 ]; then
    APP_NAME="$1"
fi

echo "Filtering logs for app: $APP_NAME"
echo "Use Ctrl+C to stop logging"
echo ""

xcrun simctl spawn booted log stream --predicate 'processImagePath contains "$APP_NAME"'`,
            category: "Device Debugging"
        }
    ];

    return (
        <div className="apple-development-container">
            {/* Hero Section */}
            <div className="apple-hero-section">
                <div className="apple-hero-content">
                    <h1 className="apple-hero-title">Apple Development</h1>
                    <p className="apple-hero-subtitle">
                        Building native applications for iOS, macOS, watchOS, and tvOS using Swift and Apple's frameworks
                    </p>
                </div>
            </div>

            {/* Skills Overview */}
            <section className="skills-showcase">
                <div className="section-header">
                    <h2 className="section-title">Development Skills</h2>
                </div>
                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <div className="skill-name">{skill.name}</div>
                            <div className="skill-level">{skill.level}%</div>
                            <div className="skill-progress">
                                <div
                                    className="skill-progress-fill"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Frameworks & Tools */}
            <section>
                <div className="section-header">
                    <h2 className="section-title">Frameworks & Tools</h2>
                </div>
                <div className="frameworks-grid">
                    {frameworks.map((framework, index) => (
                        <div key={index} className="framework-card">
                            <div className="framework-header">
                                <div className="framework-icon">{framework.icon}</div>
                                <h3 className="framework-title">{framework.name}</h3>
                            </div>
                            <p className="framework-description">{framework.description}</p>
                            <ul className="framework-features">
                                {framework.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Helpful Apps for Development */}
            <section className="development-apps-section">
                <div className="section-header">
                    <h2 className="section-title">Helpful Apps for Development</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                        Essential tools and applications that enhance iOS and macOS development workflow
                    </p>
                </div>
                <div className="apps-grid">
                    {developmentApps.map((app, index) => (
                        <div key={index} className="app-card">
                            <div className="app-header">
                                <img
                                    src={app.icon}
                                    alt={`${app.name} icon`}
                                    className="app-icon"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="app-icon-fallback" style={{ display: 'none' }}>
                                    {app.name.charAt(0)}
                                </div>
                                <div className="app-info">
                                    <h3 className="app-name">{app.name}</h3>
                                    <span className="app-category">{app.category}</span>
                                </div>
                            </div>
                            <p className="app-description">{app.description}</p>
                            {app.features && app.features.length > 0 && (
                                <ul className="app-features">
                                    {app.features.slice(0, 3).map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            )}
                            <a
                                href={app.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="app-link"
                            >
                                Download / Learn More ↗
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* macOS Scripts */}
            <section className="scripts-section">
                <div className="section-header">
                    <h2 className="section-title">Useful macOS Scripts</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                        Automation scripts to streamline your development workflow
                    </p>
                </div>
                <div className="scripts-grid">
                    {macosScripts.map((script, index) => (
                        <div key={index} className="script-card">
                            <div className="script-header">
                                <h3 className="script-title">{script.title}</h3>
                                <span className="script-category">{script.category}</span>
                            </div>
                            <p className="script-description">{script.description}</p>
                            <div className="script-usage">
                                <span className="script-usage-label">Usage:</span>
                                <p className="script-usage-text">{script.usage}</p>
                            </div>
                            <pre className="script-code">{script.script}</pre>
                        </div>
                    ))}
                </div>
            </section>

            {/* Code Example */}
            <section>
                <div className="section-header">
                    <h2 className="section-title">Code Example</h2>
                </div>
                <div className="leftbrain-card">
                    <h3>SwiftUI Hello World</h3>
                    <div className="code-snippet">
                        {`import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, World!")
                .font(.largeTitle)
                .foregroundColor(.blue)
            
            Button("Tap me!") {
                print("Button tapped!")
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}`}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AppleDevelopment;
