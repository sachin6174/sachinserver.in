import React, { useState, useEffect } from "react";
import "./AboutMe.css";
import profileImage from "../../assets/images/ProfilePic/profile1.jpeg";

const AboutMe = () => {
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                        // Add visible class for CSS animations
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const skills = [
        { name: "Swift", level: 96, category: "Languages", context: "Primary language for iOS/macOS product development." },
        { name: "Objective-C", level: 72, category: "Languages", context: "Maintaining and modernizing legacy Apple codebases." },
        { name: "JavaScript", level: 82, category: "Languages", context: "Used in internal tools and browser extensions." },
        { name: "C++", level: 78, category: "Languages", context: "Solid DSA and systems foundation." },
        { name: "iOS SDK", level: 95, category: "Frameworks", context: "Core platform APIs for shipping enterprise apps." },
        { name: "UIKit", level: 92, category: "Frameworks", context: "Production UI development for complex app flows." },
        { name: "SwiftUI", level: 93, category: "Frameworks", context: "Building modern, declarative Apple interfaces." },
        { name: "Combine", level: 84, category: "Frameworks", context: "Reactive state/data pipelines for UI and services." },
        { name: "Swift Concurrency", level: 92, category: "Frameworks", context: "Task groups, async/await, and safe concurrent workflows." },
        { name: "Core Data", level: 92, category: "Frameworks", context: "Large-scale local persistence with optimized models." },
        { name: "Core Location", level: 86, category: "Frameworks", context: "Geofencing and policy-aware location workflows." },
        { name: "Foundation", level: 96, category: "Frameworks", context: "Robust networking, data handling, and system integration." },
        { name: "URLSession", level: 88, category: "Frameworks", context: "Reliable API and background transfer implementation." },
        { name: "Xcode", level: 96, category: "Tools", context: "Primary IDE for app engineering, profiling, and release." },
        { name: "Instruments", level: 88, category: "Tools", context: "Performance tracing and memory diagnostics." },
        { name: "SPM", level: 86, category: "Tools", context: "Managing modular package dependencies." },
        { name: "CocoaPods", level: 84, category: "Tools", context: "Supporting existing dependency ecosystems." },
        { name: "GitLab CI/CD", level: 90, category: "Tools", context: "Automated package/release workflows and validation." },
        { name: "TestFlight", level: 92, category: "Tools", context: "Beta release and stakeholder feedback loops." },
        { name: "App Store Connect", level: 90, category: "Tools", context: "Store metadata, release rollout, and compliance." },
        { name: "Git", level: 92, category: "Tools", context: "Version control and collaborative delivery workflow." },
        { name: "Jira", level: 88, category: "Tools", context: "Agile planning and execution with cross-functional teams." },
        { name: "SonarQube", level: 84, category: "Tools", context: "Code quality gates and maintainability tracking." },
        { name: "MVC", level: 90, category: "Architecture", context: "Reliable baseline architecture for feature modules." },
        { name: "MVVM", level: 90, category: "Architecture", context: "Structured view-state and testable UI logic." },
        { name: "VIPER", level: 92, category: "Architecture", context: "Scalable modularization used in production migration." },
        { name: "Clean Architecture", level: 88, category: "Architecture", context: "Separation of concerns for long-lived codebases." },
        { name: "Dependency Injection", level: 86, category: "Architecture", context: "Loose coupling and test-friendly module design." },
        { name: "XCTest", level: 90, category: "Testing", context: "Unit and integration testing for Apple platforms." },
        { name: "XCUITest", level: 86, category: "Testing", context: "UI automation for critical user journeys." },
        { name: "Playwright", level: 84, category: "Testing", context: "Regression automation for internal QA tooling." },
        { name: "Appium", level: 82, category: "Testing", context: "Cross-platform E2E workflow validation." },
        { name: "TDD", level: 86, category: "Testing", context: "Test-first implementation for high-risk logic." },
        { name: "RESTful APIs", level: 92, category: "Networking", context: "Robust backend integration for enterprise workflows." },
        { name: "JSON", level: 95, category: "Data", context: "Parsing/serialization for high-volume payloads." },
        { name: "SQLite", level: 85, category: "Data", context: "Efficient local querying and structured data handling." },
        { name: "Firebase", level: 78, category: "Data", context: "Cloud integration for side projects and prototypes." },
        { name: "Push Notifications", level: 84, category: "Networking", context: "Reliable APNs notification delivery pipelines." },
        { name: "Agile Development", level: 92, category: "Practices", context: "Sprint-based delivery with measurable outcomes." },
        { name: "Memory Management", level: 92, category: "Practices", context: "Leak-free, stable app behavior under load." },
        { name: "Auto Layout", level: 90, category: "Practices", context: "Adaptive layouts across iPhone and iPad classes." },
        { name: "Performance Optimization", level: 90, category: "Practices", context: "Profiling and tuning for responsiveness and scale." },
        { name: "Code Review", level: 90, category: "Practices", context: "Maintaining engineering quality and shared ownership." }
    ];

    const timeline = [
        {
            year: "July 2023 – Present",
            title: "iOS Software Engineer",
            description: "42Gears, Bengaluru - Shipped enterprise macOS/iOS management features for 10,000+ devices, improved large file delivery reliability by 2x, and automated 95% of JIT admin access workflows.",
            type: "experience"
        },
        {
            year: "February 2023 – June 2023",
            title: "iOS Developer Intern",
            description: "42Gears, Bengaluru - Built core Swift/UIKit/SwiftUI foundation, worked on PKG/DMG signing and notarization, and improved data/security handling using Core Data, UserDefaults, and Keychain.",
            type: "experience"
        },
        {
            year: "August 2019 – May 2023",
            title: "Bachelor of Engineering in Computer Science",
            description: "Chandigarh Group of Colleges, Landran, Mohali - CGPA: 7.9",
            type: "education"
        }
    ];

    const projects = [
        {
            title: "SureMDM Agent for macOS",
            description: "Enterprise macOS device management agent with app lifecycle management, security policies, and remote administration.",
            challenge: "Managing app lifecycle, policy compliance, and secure privilege workflows across large enterprise fleets.",
            solution: "Built app management jobs (PKG/DMG install-upgrade-uninstall), daemonized process orchestration, geofencing/time-fence policies, and internal QA/debug tooling.",
            impact: "Supported 10,000+ managed devices, reduced security incidents by 40%, and improved admin workflow automation by 95%.",
            tech: ["macOS", "Swift", "XPC", "Core Data", "VIPER"],
            year: "2023 – Present",
            links: {
                product: "https://www.42gears.com/products/mobile-device-management/suremdm-agent-for-macos-past-releases/"
            }
        },
        {
            title: "NotingDown",
            description: "SwiftUI and Core Data note-taking app designed for offline-first capture with clean native UX.",
            challenge: "Create a lightweight, reliable notes workflow without compromising native performance.",
            solution: "Built with SwiftUI + Core Data and integrated CloudKit synchronization for continuity.",
            impact: "Shipped a production-ready personal app with full native Apple platform architecture.",
            tech: ["SwiftUI", "Core Data", "CloudKit", "iOS"],
            year: "2025",
            links: {
                appStore: "https://apps.apple.com/us/app/notingdown/id123456789",
                github: "https://github.com/sachin6174/NotingDown"
            }
        },
        {
            title: "Guitar Utility",
            description: "SwiftUI app for guitar tuning and metronome using AVFoundation framework with custom audio algorithms and Core Audio, achieving 90% tuning accuracy.",
            challenge: "Creating a highly accurate and responsive guitar tuner and metronome on iOS.",
            solution: "Used AVFoundation and Core Audio to build custom audio algorithms for tuning and timing.",
            impact: "Reached ~90% tuning accuracy with low-latency audio analysis and stable timing controls.",
            tech: ["SwiftUI", "AVFoundation", "Core Audio", "iOS"],
            year: "2024",
            links: {
                appStore: "https://apps.apple.com/us/app/guitar-utility/id6751228342",
                github: "https://github.com/sachin6174/Guitar-Utility"
            }
        },
        {
            title: "Secure Text",
            description: "Chrome extension for text encryption/decryption with Base64/Base32 encoding and secure storage.",
            challenge: "Providing a simple and secure way to encrypt and decrypt text within the browser.",
            solution: "Developed a Chrome extension using JavaScript and Chrome APIs for secure text handling.",
            impact: "Published to the Chrome Web Store with production-ready encryption/decryption flows.",
            tech: ["JavaScript", "Chrome APIs", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "https://chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei",
                github: "https://github.com/sachin6174/secure-text-chrome-extension"
            }
        }
    ];

    const achievements = [
        "Google Cloud Agentic AI Hackathon 2025: selected among top 700 teams from 57,000+ developers.",
        "Reduced critical bugs by 70% after architectural migration from MVVM to VIPER.",
        "Reduced app crashes by 90% through thread-safe concurrency redesign.",
        "Automated 95% of admin access workflows using JIT Access implementation.",
        "Built internal debugger and QA utility adopted by 20+ engineers."
    ];

    const interests = [
        {
            name: "Exploring AI tools",
            icon: "🤖"
        },
        {
            name: "Reading Literature",
            icon: "📚"
        },
        {
            name: "Drawing",
            icon: "🎨"
        },
        {
            name: "Listening to Music",
            icon: "🎵"
        }
    ];

    return (
        <div className="about-me-container">
            {/* Hero Section */}
            <section className="hero-section fade-in-section" id="hero">
                <div className="hero-content">
                    <div className="avatar-container">
                        <img
                            src={profileImage}
                            alt="Sachin Kumar - Profile"
                            className="avatar-image"
                        />
                        <div className="status-indicator"></div>
                    </div>
                    <div className="hero-text">
                        <h1 className="hero-name">SACHIN KUMAR</h1>
                        <p className="hero-tagline">iOS Software Engineer | iOS/macOS | Enterprise Mobility</p>
                        <p className="hero-description">
                            iOS Software Engineer with 3 years and 2 months of total iOS/macOS experience (as of March 2026), focused on enterprise mobility products, scalable app architecture, and reliable release engineering.
                        </p>
                        <div className="hero-contact">
                            <span>📧 sachinmehtab@gmail.com</span>
                            <span>📱 +91 9501841073</span>
                            <span>📍 Bengaluru, Karnataka</span>
                            <span>🌐 sachinserver.in</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section fade-in-section" id="about">
                <div className="section-header">
                    <h2>About Me</h2>
                    <div className="section-divider"></div>
                </div>
                <div className="about-grid">
                    <div className="about-text">
                        <p>
                            I build enterprise-grade iOS/macOS experiences that are stable under scale and easy for teams to maintain. My day-to-day work includes app lifecycle automation, policy-driven device management, secure privilege workflows, and observability tooling.
                        </p>
                        <p>
                            At 42Gears, I shipped device-management capabilities for 10,000+ enterprise macOS endpoints, built resilient download and monitoring systems, and improved operational quality through better architecture, concurrency, and QA automation.
                        </p>
                        <p>
                            Outside work, I stay sharp through AI exploration, reading, drawing, and music. These habits keep my engineering approach practical: ship fast, measure impact, and keep the user experience simple.
                        </p>
                    </div>
                    <div className="quick-facts">
                        <h3>Interests</h3>
                        <ul>
                            {interests.map((interest, index) => (
                                <li key={index}>{interest.icon} {interest.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section fade-in-section" id="skills">
                <div className="section-header">
                    <h2>Skills & Expertise</h2>
                    <div className="section-divider"></div>
                </div>
                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="skill-header">
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-category">{skill.category}</span>
                            </div>
                            <div className="skill-bar">
                                <div
                                    className="skill-progress"
                                    style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                                ></div>
                            </div>
                            <span className="skill-percentage">{skill.level}%</span>
                            {skill.context && (
                                <p className="skill-context">{skill.context}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>


            {/* Timeline Section */}
            <section className="timeline-section fade-in-section" id="timeline">
                <div className="section-header">
                    <h2>Journey & Experience</h2>
                    <div className="section-divider"></div>
                </div>
                <div className="timeline">
                    {timeline.map((item, index) => (
                        <div key={index} className={`timeline-item ${item.type}`}>
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <span className="timeline-year">{item.year}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-preview fade-in-section" id="projects">
                <div className="section-header">
                    <h2>Featured Projects</h2>
                    <div className="section-divider"></div>
                </div>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-header">
                                <h3>{project.title}</h3>
                                <span className="project-year">{project.year}</span>
                            </div>
                            <p className="project-overview">{project.description}</p>
                            
                            {project.challenge && (
                                <div className="case-study-section">
                                    <h4>Challenge</h4>
                                    <p>{project.challenge}</p>
                                </div>
                            )}
                            
                            {project.solution && (
                                <div className="case-study-section">
                                    <h4>Solution</h4>
                                    <p>{project.solution}</p>
                                </div>
                            )}
                            
                            {project.impact && (
                                <div className="case-study-section">
                                    <h4>Impact</h4>
                                    <p>{project.impact}</p>
                                </div>
                            )}
                            
                            <div className="tech-stack">
                                {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.links.appStore && (
                                    <a
                                        href={`${project.links.appStore}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on App Store`}
                                    >
                                        App Store
                                    </a>
                                )}
                                {project.links.chromeStore && (
                                    <a
                                        href={`${project.links.chromeStore}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on Chrome Web Store`}
                                    >
                                        Chrome Store
                                    </a>
                                )}
                                {project.links.github && (
                                    <a
                                        href={`${project.links.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} source code on GitHub`}
                                    >
                                        Source Code
                                    </a>
                                )}
                                {project.links.product && (
                                    <a
                                        href={`${project.links.product}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} product page`}
                                    >
                                        Product Page
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Professional Focus */}
            <section className="testimonial-section fade-in-section" id="testimonial">
                <div className="testimonial-card">
                    <div className="quote-icon">💡</div>
                    <blockquote>
                        "Every app I build starts with a user problem, not a technology choice. Whether its 
                        helping IT teams manage thousands of devices or creating a simple note-taking experience, 
                        I focus on solutions that people actually want to use. Great software should feel 
                        invisible—it just works."
                    </blockquote>
                    <cite>— How I Approach Development</cite>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section fade-in-section" id="cta">
                <div className="cta-content">
                    <h2>Ready to Build Something Great?</h2>
                    <p>Whether you need iOS development expertise, enterprise mobility solutions, or want to discuss 
                    innovative app ideas, I'm here to help turn concepts into user-friendly applications.</p>
                    <div className="cta-buttons">
                        <a href="mailto:sachinmehtab@gmail.com" className="btn-primary">Start a Conversation</a>
                        <a href="https://linkedin.com/in/sachinkumar6174" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            View LinkedIn
                        </a>
                        <a href="https://github.com/sachin6174" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            Explore Code
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutMe;
