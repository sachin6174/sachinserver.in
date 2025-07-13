import React, { useState } from "react";
import "../shared-styles.css";
import "./PackageDeployment.css";

const PackageDeployment = () => {
    const [activeTab, setActiveTab] = useState("packaging");

    const sections = {
        packaging: {
            title: "App Packaging & Distribution",
            icon: "📦",
            color: "#007AFF"
        },
        dependencies: {
            title: "Dependency Management",
            icon: "🔗",
            color: "#34C759"
        },
        services: {
            title: "System Services",
            icon: "⚙️",
            color: "#FF9500"
        },
        deployment: {
            title: "Deployment & CI/CD",
            icon: "🚀",
            color: "#FF3B30"
        }
    };

    const packagingMethods = [
        {
            name: "App Store Distribution",
            description: "Official distribution through Apple's App Store with automatic updates and security.",
            icon: "🏪",
            tools: ["Xcode", "App Store Connect", "TestFlight", "Transporter"],
            process: [
                "Code signing with distribution certificate",
                "Archive build in Xcode",
                "Upload to App Store Connect",
                "Submit for review",
                "Release to App Store"
            ]
        },
        {
            name: "Direct Distribution",
            description: "Distribute apps outside the App Store using Developer ID signing.",
            icon: "📤",
            tools: ["Developer ID Certificate", "Notarization", "Gatekeeper", "DMG Creation"],
            process: [
                "Sign with Developer ID certificate",
                "Submit for notarization",
                "Create installer package",
                "Distribute via website/email",
                "User downloads and installs"
            ]
        },
        {
            name: "Enterprise Distribution",
            description: "Internal distribution for enterprise apps within organizations.",
            icon: "🏢",
            tools: ["Enterprise Certificate", "Mobile Device Management", "Internal App Store"],
            process: [
                "Sign with enterprise certificate",
                "Create enterprise build",
                "Distribute via MDM",
                "Install on managed devices",
                "Monitor deployment"
            ]
        },
        {
            name: "Package Installers",
            description: "Create .pkg installers for macOS applications and system components.",
            icon: "📦",
            tools: ["pkgbuild", "productbuild", "Packages", "Installer.app"],
            process: [
                "Prepare installation payload",
                "Create package with pkgbuild",
                "Build product with productbuild",
                "Sign installer package",
                "Test installation process"
            ]
        }
    ];

    const uninstallerFeatures = [
        {
            name: "Clean Uninstallation",
            description: "Remove all application files, preferences, and associated data.",
            icon: "🗑️",
            locations: [
                "/Applications/AppName.app",
                "~/Library/Preferences/com.company.app.plist",
                "~/Library/Application Support/AppName/",
                "~/Library/Caches/com.company.app/",
                "/Library/LaunchDaemons/com.company.app.daemon.plist"
            ]
        },
        {
            name: "Uninstaller Script",
            description: "Automated script to remove all traces of an application.",
            icon: "📜",
            script: `#!/bin/bash
# Uninstaller for MyApp

APP_NAME="MyApp"
BUNDLE_ID="com.company.myapp"

echo "Uninstalling $APP_NAME..."

# Remove application
sudo rm -rf "/Applications/$APP_NAME.app"

# Remove user preferences
rm -f "$HOME/Library/Preferences/$BUNDLE_ID.plist"

# Remove application support files
rm -rf "$HOME/Library/Application Support/$APP_NAME"

# Remove caches
rm -rf "$HOME/Library/Caches/$BUNDLE_ID"

# Remove launch agents
launchctl unload "$HOME/Library/LaunchAgents/$BUNDLE_ID.agent.plist" 2>/dev/null
rm -f "$HOME/Library/LaunchAgents/$BUNDLE_ID.agent.plist"

# Remove launch daemons (requires sudo)
sudo launchctl unload "/Library/LaunchDaemons/$BUNDLE_ID.daemon.plist" 2>/dev/null
sudo rm -f "/Library/LaunchDaemons/$BUNDLE_ID.daemon.plist"

echo "Uninstallation completed!"`
        }
    ];

    const systemServices = [
        {
            name: "Launch Daemons",
            description: "System-wide services that run as root, available to all users.",
            icon: "👑",
            location: "/Library/LaunchDaemons/",
            example: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.company.mydaemon</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/mydaemon</string>
        <string>--config</string>
        <string>/etc/mydaemon.conf</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/var/log/mydaemon.log</string>
    <key>StandardErrorPath</key>
    <string>/var/log/mydaemon.error.log</string>
</dict>
</plist>`,
            commands: [
                "sudo launchctl load /Library/LaunchDaemons/com.company.mydaemon.plist",
                "sudo launchctl unload /Library/LaunchDaemons/com.company.mydaemon.plist",
                "sudo launchctl start com.company.mydaemon",
                "sudo launchctl stop com.company.mydaemon"
            ]
        },
        {
            name: "Launch Agents",
            description: "User-specific services that run when a user logs in.",
            icon: "👤",
            location: "~/Library/LaunchAgents/",
            example: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.company.myagent</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Applications/MyApp.app/Contents/MacOS/agent</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StartInterval</key>
    <integer>300</integer>
    <key>WorkingDirectory</key>
    <string>/Users/%USER%/Documents</string>
</dict>
</plist>`,
            commands: [
                "launchctl load ~/Library/LaunchAgents/com.company.myagent.plist",
                "launchctl unload ~/Library/LaunchAgents/com.company.myagent.plist",
                "launchctl start com.company.myagent",
                "launchctl list | grep com.company"
            ]
        }
    ];

    const dependencyManagers = [
        {
            name: "Swift Package Manager (SPM)",
            description: "Apple's official dependency manager for Swift projects.",
            icon: "📦",
            fileType: "Package.swift",
            example: `// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    platforms: [
        .iOS(.v14),
        .macOS(.v11)
    ],
    products: [
        .library(name: "MyLibrary", targets: ["MyLibrary"]),
        .executable(name: "MyCLI", targets: ["MyCLI"])
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.8.0"),
        .package(url: "https://github.com/realm/realm-swift.git", from: "10.42.0"),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.2.0")
    ],
    targets: [
        .target(
            name: "MyLibrary",
            dependencies: ["Alamofire"]
        ),
        .executableTarget(
            name: "MyCLI",
            dependencies: [
                "MyLibrary",
                .product(name: "ArgumentParser", package: "swift-argument-parser")
            ]
        ),
        .testTarget(
            name: "MyLibraryTests",
            dependencies: ["MyLibrary"]
        )
    ]
)`,
            commands: [
                "swift package init",
                "swift package resolve",
                "swift package update",
                "swift build",
                "swift test"
            ]
        },
        {
            name: "CocoaPods",
            description: "Mature dependency manager with extensive library ecosystem.",
            icon: "🥥",
            fileType: "Podfile",
            example: `platform :ios, '14.0'
use_frameworks!

target 'MyApp' do
  # Networking
  pod 'Alamofire', '~> 5.8'
  pod 'AlamofireImage', '~> 4.3'
  
  # Database
  pod 'RealmSwift', '~> 10.42'
  
  # UI
  pod 'SnapKit', '~> 5.6'
  pod 'Kingfisher', '~> 7.9'
  
  # Utilities
  pod 'SwiftyJSON', '~> 4.0'
  pod 'KeychainAccess', '~> 4.2'
  
  target 'MyAppTests' do
    inherit! :search_paths
    pod 'Quick', '~> 7.0'
    pod 'Nimble', '~> 12.0'
  end
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '14.0'
    end
  end
end`,
            commands: [
                "pod init",
                "pod install",
                "pod update",
                "pod search [library]",
                "pod repo update"
            ]
        },
        {
            name: "GitHub Libraries",
            description: "Direct integration of GitHub repositories as dependencies.",
            icon: "🐙",
            methods: [
                {
                    name: "Git Submodules",
                    commands: [
                        "git submodule add https://github.com/user/repo.git Libraries/repo",
                        "git submodule update --init --recursive",
                        "git submodule update --remote"
                    ]
                },
                {
                    name: "SPM GitHub Integration",
                    code: `.package(url: "https://github.com/user/repo.git", from: "1.0.0")`
                },
                {
                    name: "CocoaPods GitHub",
                    code: `pod 'LibraryName', :git => 'https://github.com/user/repo.git', :tag => '1.0.0'`
                }
            ]
        }
    ];

    const cicdPipelines = [
        {
            name: "Xcode Cloud",
            description: "Apple's integrated CI/CD service for iOS/macOS development.",
            icon: "☁️",
            features: ["Automatic testing", "Build automation", "TestFlight distribution", "Slack integration"],
            workflow: `# Xcode Cloud Workflow
name: CI
on:
  - push
  - pull_request

jobs:
  test:
    runs-on: macos-latest
    steps:
      - Build for testing
      - Run unit tests
      - Run UI tests
      - Archive for distribution
      - Upload to TestFlight`
        },
        {
            name: "GitHub Actions",
            description: "Popular CI/CD platform with macOS runners for iOS development.",
            icon: "⚙️",
            features: ["macOS runners", "Xcode integration", "Flexible workflows", "Third-party actions"],
            workflow: `name: iOS CI/CD
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Xcode
      uses: maxim-lobanov/setup-xcode@v1
      with:
        xcode-version: '15.0'
    
    - name: Install dependencies
      run: |
        if [ -f "Podfile" ]; then
          pod install
        fi
    
    - name: Build and test
      run: |
        xcodebuild -workspace MyApp.xcworkspace \\
                   -scheme MyApp \\
                   -destination 'platform=iOS Simulator,name=iPhone 15' \\
                   test
    
    - name: Archive and export
      if: github.ref == 'refs/heads/main'
      run: |
        xcodebuild -workspace MyApp.xcworkspace \\
                   -scheme MyApp \\
                   -archivePath MyApp.xcarchive \\
                   archive
    
    - name: Upload to TestFlight
      if: github.ref == 'refs/heads/main'
      env:
        API_KEY: \${{ secrets.APP_STORE_API_KEY }}
      run: |
        xcrun altool --upload-app \\
                     --type ios \\
                     --file MyApp.ipa \\
                     --apiKey $API_KEY`
        }
    ];

    const bestPractices = {
        packaging: [
            "Always code sign your applications",
            "Test installation on clean systems",
            "Include proper version numbering",
            "Provide clear installation instructions",
            "Handle permission requirements gracefully"
        ],
        dependencies: [
            "Pin dependency versions for reproducible builds",
            "Regularly update dependencies for security",
            "Minimize dependency count to reduce complexity",
            "Use semantic versioning for your packages",
            "Document all dependencies and their purposes"
        ],
        services: [
            "Follow principle of least privilege",
            "Include proper error handling and logging",
            "Provide uninstallation for services",
            "Test service behavior on system restart",
            "Use appropriate service type (daemon vs agent)"
        ],
        deployment: [
            "Automate the entire deployment pipeline",
            "Include comprehensive testing stages",
            "Use staged deployments (dev → staging → prod)",
            "Implement rollback strategies",
            "Monitor deployment success metrics"
        ]
    };

    const skills = [
        { name: "App Store Distribution", level: 88 },
        { name: "Code Signing & Certificates", level: 85 },
        { name: "Swift Package Manager", level: 92 },
        { name: "CocoaPods Management", level: 90 },
        { name: "Launch Services", level: 83 },
        { name: "CI/CD Pipelines", level: 87 },
        { name: "Installer Creation", level: 80 },
        { name: "Deployment Automation", level: 85 }
    ];

    const renderPackaging = () => (
        <div className="tab-content">
            <div className="cards-container">
                {packagingMethods.map((method, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{method.icon}</div>
                        <h3>{method.name}</h3>
                        <p>{method.description}</p>
                        <div className="section-content">
                            <h5>Tools & Technologies:</h5>
                            <div className="tech-stack">
                                {method.tools.map((tool, idx) => (
                                    <span key={idx} className="tech-tag">{tool}</span>
                                ))}
                            </div>
                            <h5>Process:</h5>
                            <ol className="process-list">
                                {method.process.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section">
                <h2>Uninstaller & Cleanup</h2>
                {uninstallerFeatures.map((feature, index) => (
                    <div key={index} className="content-card">
                        <div className="feature-header">
                            <span className="tech-icon">{feature.icon}</span>
                            <h3>{feature.name}</h3>
                        </div>
                        <p>{feature.description}</p>
                        
                        {feature.locations && (
                            <div>
                                <h5>Typical Locations to Clean:</h5>
                                <ul className="location-list">
                                    {feature.locations.map((location, idx) => (
                                        <li key={idx}><code>{location}</code></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {feature.script && (
                            <div className="code-block">
                                <h5>Example Uninstaller Script:</h5>
                                <pre><code>{feature.script}</code></pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDependencies = () => (
        <div className="tab-content">
            <div className="cards-container">
                {dependencyManagers.map((manager, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{manager.icon}</div>
                        <h3>{manager.name}</h3>
                        <p>{manager.description}</p>
                        
                        {manager.fileType && (
                            <div className="code-block">
                                <h5>{manager.fileType} Example:</h5>
                                <pre><code>{manager.example}</code></pre>
                            </div>
                        )}
                        
                        {manager.commands && (
                            <div>
                                <h5>Common Commands:</h5>
                                <ul className="command-list">
                                    {manager.commands.map((cmd, idx) => (
                                        <li key={idx}><code>{cmd}</code></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {manager.methods && (
                            <div>
                                <h5>Integration Methods:</h5>
                                {manager.methods.map((method, idx) => (
                                    <div key={idx} className="method-item">
                                        <h6>{method.name}:</h6>
                                        {method.commands && method.commands.map((cmd, cmdIdx) => (
                                            <div key={cmdIdx}><code>{cmd}</code></div>
                                        ))}
                                        {method.code && <div><code>{method.code}</code></div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderServices = () => (
        <div className="tab-content">
            <div className="cards-container">
                {systemServices.map((service, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{service.icon}</div>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <p><strong>Location:</strong> <code>{service.location}</code></p>
                        
                        <div className="code-block">
                            <h5>Example Plist Configuration:</h5>
                            <pre><code>{service.example}</code></pre>
                        </div>
                        
                        <div>
                            <h5>Management Commands:</h5>
                            <ul className="command-list">
                                {service.commands.map((cmd, idx) => (
                                    <li key={idx}><code>{cmd}</code></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDeployment = () => (
        <div className="tab-content">
            <div className="cards-container">
                {cicdPipelines.map((pipeline, index) => (
                    <div key={index} className="theme-card">
                        <div className="tech-icon">{pipeline.icon}</div>
                        <h3>{pipeline.name}</h3>
                        <p>{pipeline.description}</p>
                        
                        <div className="tech-stack">
                            {pipeline.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                        
                        <div className="code-block">
                            <h5>Example Workflow:</h5>
                            <pre><code>{pipeline.workflow}</code></pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case "packaging": return renderPackaging();
            case "dependencies": return renderDependencies();
            case "services": return renderServices();
            case "deployment": return renderDeployment();
            default: return renderPackaging();
        }
    };

    return (
        <div className="leftbrain-container package-deployment-theme">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Package & Deployment</h1>
                <p>Comprehensive guide to packaging, dependencies, system services, and deployment for Apple platforms</p>
            </div>

            {/* Section Tabs */}
            <div className="section-tabs">
                {Object.entries(sections).map(([key, section]) => (
                    <button 
                        key={key}
                        className={`section-tab ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                    >
                        <span className="tab-icon">{section.icon}</span>
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            {renderContent()}

            {/* Best Practices */}
            <div className="section">
                <h2>Best Practices - {sections[activeTab].title}</h2>
                <ul className="feature-list">
                    {bestPractices[activeTab].map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Package & Deployment Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, var(--current-theme), var(--current-theme-dark))',
                                        height: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                ></div>
                            </div>
                            <span>{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageDeployment;