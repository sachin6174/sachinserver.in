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
