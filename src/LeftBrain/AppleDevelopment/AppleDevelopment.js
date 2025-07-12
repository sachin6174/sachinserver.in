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

    const appleDocumentation = [
        {
            category: "Official Documentation",
            icon: "📚",
            resources: [
                {
                    name: "Swift Documentation",
                    description: "Complete Swift language guide and API reference",
                    url: "https://swift.org/documentation/",
                    type: "Language Guide"
                },
                {
                    name: "SwiftUI Documentation",
                    description: "Comprehensive SwiftUI framework documentation",
                    url: "https://developer.apple.com/documentation/swiftui",
                    type: "Framework"
                },
                {
                    name: "UIKit Documentation",
                    description: "Complete UIKit framework reference and guides",
                    url: "https://developer.apple.com/documentation/uikit",
                    type: "Framework"
                },
                {
                    name: "iOS App Dev Documentation",
                    description: "Complete iOS development guide and best practices",
                    url: "https://developer.apple.com/ios/",
                    type: "Platform Guide"
                }
            ]
        },
        {
            category: "WWDC Sessions",
            icon: "🎥",
            resources: [
                {
                    name: "WWDC 2023 Videos",
                    description: "Latest Apple developer conference sessions",
                    url: "https://developer.apple.com/videos/wwdc2023/",
                    type: "Conference"
                },
                {
                    name: "What's New in SwiftUI",
                    description: "Annual SwiftUI updates and new features",
                    url: "https://developer.apple.com/videos/play/wwdc2023/10148/",
                    type: "Session"
                },
                {
                    name: "Swift Concurrency Updates",
                    description: "Latest async/await and actor improvements",
                    url: "https://developer.apple.com/videos/play/wwdc2023/10170/",
                    type: "Session"
                },
                {
                    name: "Xcode 15 Features",
                    description: "New Xcode capabilities and improvements",
                    url: "https://developer.apple.com/videos/play/wwdc2023/10149/",
                    type: "Tools"
                }
            ]
        },
        {
            category: "Sample Code & Tutorials",
            icon: "💻",
            resources: [
                {
                    name: "Apple Sample Code",
                    description: "Official Apple code examples and projects",
                    url: "https://developer.apple.com/sample-code/",
                    type: "Code Examples"
                },
                {
                    name: "SwiftUI Tutorials",
                    description: "Step-by-step SwiftUI learning path",
                    url: "https://developer.apple.com/tutorials/swiftui",
                    type: "Tutorial"
                },
                {
                    name: "App Development Tutorial",
                    description: "Complete iOS app development course",
                    url: "https://developer.apple.com/tutorials/app-dev-training",
                    type: "Course"
                },
                {
                    name: "Swift Playgrounds",
                    description: "Interactive Swift learning platform",
                    url: "https://developer.apple.com/swift-playgrounds/",
                    type: "Interactive"
                }
            ]
        },
        {
            category: "Design & Guidelines",
            icon: "🎨",
            resources: [
                {
                    name: "Human Interface Guidelines",
                    description: "Apple's design principles and interface standards",
                    url: "https://developer.apple.com/design/human-interface-guidelines/",
                    type: "Design Guide"
                },
                {
                    name: "SF Symbols",
                    description: "Apple's comprehensive symbol library",
                    url: "https://developer.apple.com/sf-symbols/",
                    type: "Assets"
                },
                {
                    name: "App Store Guidelines",
                    description: "Review guidelines and submission requirements",
                    url: "https://developer.apple.com/app-store/review/guidelines/",
                    type: "Guidelines"
                },
                {
                    name: "Accessibility Guidelines",
                    description: "Making apps accessible to all users",
                    url: "https://developer.apple.com/accessibility/",
                    type: "Accessibility"
                }
            ]
        }
    ];

    // Helpful development apps
    const developmentApps = developmentAppsData;


    return (
        <div className="leftbrain-container apple-theme">
            {/* Hero Section */}
            <div className="hero-section">
                <h1 className="section-title">Apple Development</h1>
                <p>Building native applications for iOS, macOS, watchOS, and tvOS using Swift and Apple's frameworks</p>
                <div className="tech-stack">
                    <span className="theme-badge">Swift</span>
                    <span className="theme-badge">SwiftUI</span>
                    <span className="theme-badge">Xcode</span>
                    <span className="theme-badge">iOS 17</span>
                </div>
            </div>

            {/* Skills Overview */}
            <div className="section">
                <h2>Development Skills</h2>
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

            {/* Frameworks & Tools */}
            <div className="section">
                <h2>Frameworks & Tools</h2>
                <div className="cards-container">
                    {frameworks.map((framework, index) => (
                        <div key={index} className="theme-card">
                            <div className="tech-icon">{framework.icon}</div>
                            <h3>{framework.name}</h3>
                            <p>{framework.description}</p>
                            <div className="tech-stack">
                                {framework.features.map((feature, idx) => (
                                    <span key={idx} className="tech-tag">{feature}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apple Documentation & Resources */}
            <div className="section">
                <h2>Apple Documentation & Resources</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Essential Apple developer resources, documentation, and learning materials
                </p>
                {appleDocumentation.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="documentation-category">
                        <div className="category-header">
                            <span className="category-icon">{category.icon}</span>
                            <h3>{category.category}</h3>
                        </div>
                        <div className="documentation-grid">
                            {category.resources.map((resource, resourceIndex) => (
                                <div key={resourceIndex} className="documentation-card">
                                    <div className="doc-header">
                                        <h4>{resource.name}</h4>
                                        <span className="doc-type">{resource.type}</span>
                                    </div>
                                    <p>{resource.description}</p>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="leftbrain-button doc-link"
                                    >
                                        View Resource ↗
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Helpful Apps for Development */}
            <div className="section">
                <h2>Helpful Apps for Development</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Essential tools and applications that enhance iOS and macOS development workflow
                </p>
                <div className="cards-container">
                    {developmentApps.map((app, index) => (
                        <div key={index} className="theme-card">
                            <div className="tech-icon">
                                <img
                                    src={app.icon}
                                    alt={`${app.name} icon`}
                                    style={{ width: '40px', height: '40px', borderRadius: '8px' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div style={{ display: 'none', width: '40px', height: '40px', background: 'var(--current-theme)', color: 'white', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    {app.name.charAt(0)}
                                </div>
                            </div>
                            <h3>{app.name}</h3>
                            <span className="theme-badge">{app.category}</span>
                            <p>{app.description}</p>
                            {app.features && app.features.length > 0 && (
                                <div className="tech-stack">
                                    {app.features.slice(0, 3).map((feature, idx) => (
                                        <span key={idx} className="tech-tag">{feature}</span>
                                    ))}
                                </div>
                            )}
                            <a
                                href={app.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="leftbrain-button"
                                style={{ marginTop: 'auto' }}
                            >
                                Download / Learn More ↗
                            </a>
                        </div>
                    ))}
                </div>
            </div>


            {/* Code Example */}
            <div className="section">
                <h2>Code Example</h2>
                <div className="code-block">
                    <h4>SwiftUI Hello World</h4>
                    <pre><code>{`import SwiftUI

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
}`}</code></pre>
                </div>
            </div>
        </div>
    );
};

export default AppleDevelopment;
