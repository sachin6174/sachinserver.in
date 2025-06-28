import React from "react";
import "../shared-styles.css";

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
        </div>
    );
};

export default AppleDevelopment;
