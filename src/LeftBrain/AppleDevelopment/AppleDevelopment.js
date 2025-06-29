import React from "react";
import "../shared-styles.css";
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
        <div className="leftbrain-container">
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">Apple Development</h1>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Building native applications for iOS, macOS, watchOS, and tvOS using Swift and Apple's frameworks
                    </p>
                </div>
            </div>

            {/* Helpful Apps for Development */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Helpful Apps for Development</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                        Essential tools and applications that enhance iOS and macOS development workflow
                    </p>
                </div>
                <div className="cards-container">
                    {developmentApps.map((app, index) => (
                        <div key={index} className="tech-card apple hover-effect" style={{
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                            }}>
                            <div className="tech-icon" style={{
                                width: '96px',
                                height: '96px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '8px'
                            }}>
                                <img
                                    src={app.icon}
                                    alt={`${app.name} icon`}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'contain',
                                        borderRadius: '16px',
                                        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))',
                                        transition: 'transform 0.3s ease, filter 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.filter = 'drop-shadow(0 6px 20px rgba(0,0,0,0.2))';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.filter = 'drop-shadow(0 4px 16px rgba(0,0,0,0.15))';
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{
                                    display: 'none',
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                                    borderRadius: '16px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
                                }}>
                                    {app.name.charAt(0)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.3rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: '600',
                                    lineHeight: '1.3'
                                }}>{app.name}</h3>
                                <span className="tech-tag" style={{
                                    fontSize: '0.75rem',
                                    padding: '0.4rem 0.8rem',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '12px',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {app.category}
                                </span>
                            </div>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '1rem',
                                fontSize: '0.95rem'
                            }}>{app.description}</p>
                            <ul className="feature-list" style={{
                                marginBottom: '1rem'
                            }}>
                                {app.features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.25rem',
                                        paddingLeft: '0.5rem'
                                    }}>{feature}</li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <a
                                    href={app.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="leftbrain-button"
                                    style={{
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        padding: '0.75rem 1.25rem',
                                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    }}
                                >
                                    <span>Download / Learn More</span>
                                    <span style={{ fontSize: '0.8rem' }}>↗</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Overview */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Development Skills</h2>
                </div>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <span className="stat-number">{skill.level}%</span>
                            <span className="stat-label">{skill.name}</span>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
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
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Frameworks & Tools</h2>
                </div>
                <div className="cards-container">
                    {frameworks.map((framework, index) => (
                        <div key={index} className="tech-card apple hover-effect">
                            <div className="tech-icon">{framework.icon}</div>
                            <h3>{framework.name}</h3>
                            <p>{framework.description}</p>
                            <ul className="feature-list">
                                {framework.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Code Example */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Code Example</h2>
                </div>
                <div className="leftbrain-card">
                    <h3>SwiftUI Hello World</h3>
                    <div className="code-snippet" data-language="Swift">
                        {`import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, iOS!")
                .font(.largeTitle)
                .foregroundColor(.blue)
            
            Button("Tap Me") {
                print("Button tapped!")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}`}
                    </div>
                    <div className="tech-stack">
                        <span className="tech-tag primary">SwiftUI</span>
                        <span className="tech-tag">iOS 14+</span>
                        <span className="tech-tag">Xcode 12+</span>
                    </div>
                </div>
            </section>

            {/* Important macOS Scripts */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Important macOS Scripts</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                        Useful shell scripts for development tasks, debugging, and system maintenance
                    </p>
                </div>
                <div className="features-grid">
                    {macosScripts.map((script, index) => (
                        <div key={index} className="leftbrain-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{script.title}</h3>
                                <span className="tech-tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                                    {script.category}
                                </span>
                            </div>

                            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                {script.description}
                            </p>

                            <div style={{
                                backgroundColor: 'var(--background-tertiary)',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem',
                                border: '1px solid var(--border-color)'
                            }}>
                                <h4 style={{
                                    margin: '0 0 0.5rem 0',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}>
                                    Usage:
                                </h4>
                                <p style={{
                                    margin: 0,
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)',
                                    fontStyle: 'italic'
                                }}>
                                    {script.usage}
                                </p>
                            </div>

                            <div className="code-snippet" data-language="bash">
                                {script.script}
                            </div>

                            <div className="tech-stack" style={{ marginTop: '1rem' }}>
                                <span className="tech-tag primary">Shell Script</span>
                                <span className="tech-tag">macOS</span>
                                <span className="tech-tag">Terminal</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AppleDevelopment;
