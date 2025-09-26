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
        { name: "Swift", level: 95, category: "Languages", context: "Primary language for iOS/macOS development." },
        { name: "Objective-C", level: 70, category: "Languages", context: "Experience with legacy iOS codebases." },
        { name: "JavaScript", level: 80, category: "Languages", context: "Used for web development and Chrome extensions." },
        { name: "C++", level: 75, category: "Languages", context: "Strong foundation in data structures and algorithms." },
        { name: "iOS SDK", level: 90, category: "Frameworks", context: "Deep understanding of the iOS ecosystem." },
        { name: "UIKit", level: 85, category: "Frameworks", context: "Classic UI framework for iOS." },
        { name: "SwiftUI", level: 90, category: "Frameworks", context: "Modern UI framework for Apple platforms." },
        { name: "Core Data", level: 85, category: "Frameworks", context: "For persistent data storage." },
        { name: "Core Animation", level: 80, category: "Frameworks", context: "For creating smooth animations." },
        { name: "Core Location", level: 80, category: "Frameworks", context: "For location-aware applications." },
        { name: "Foundation", level: 95, category: "Frameworks", context: "Basic building blocks of Apple development." },
        { name: "Cocoa Touch", level: 90, category: "Frameworks", context: "Key framework for building iOS apps." },
        { name: "Xcode", level: 95, category: "Tools", context: "The primary IDE for Apple development." },
        { name: "Instruments", level: 85, category: "Tools", context: "For performance tuning and debugging." },
        { name: "TestFlight", level: 90, category: "Tools", context: "For beta testing applications." },
        { name: "App Store Connect", level: 90, category: "Tools", context: "For managing and publishing apps." },
        { name: "Git", level: 90, category: "Tools", context: "For version control." },
        { name: "JIRA", level: 85, category: "Tools", context: "For agile project management." },
        { name: "SonarQube", level: 80, category: "Tools", context: "For code quality and security." },
        { name: "MVC", level: 90, category: "Architecture", context: "Model-View-Controller." },
        { name: "MVVM", level: 90, category: "Architecture", context: "Model-View-ViewModel." },
        { name: "VIPER", level: 85, category: "Architecture", context: "View-Interactor-Presenter-Entity-Router." },
        { name: "Clean Architecture", level: 80, category: "Architecture", context: "A set of principles for building scalable and maintainable software." },
        { name: "XCTest", level: 85, category: "Testing", context: "For unit and UI testing." },
        { name: "TDD", level: 80, category: "Testing", context: "Test-Driven Development." },
        { name: "RESTful APIs", level: 90, category: "Networking", context: "For communication with backend services." },
        { name: "JSON", level: 95, category: "Data", context: "Standard format for data interchange." },
        { name: "SQLite", level: 80, category: "Data", context: "For local data storage." },
        { name: "Push Notifications", level: 85, category: "Networking", context: "For engaging users." },
        { name: "Agile Development", level: 90, category: "Practices", context: "Iterative approach to software development." },
        { name: "Memory Management", level: 90, category: "Practices", context: "Crucial for building performant apps." },
        { name: "Auto Layout", level: 90, category: "Practices", context: "For creating adaptive user interfaces." }
    ];

    const timeline = [
        {
            year: "July 2023 – Present",
            title: "iOS Developer",
            description: "42 Gears Mobility Systems Private Limited - Developed app management jobs, implemented a robust Download Manager, engineered geofencing features, and utilized Core Data for persistent storage.",
            type: "experience"
        },
        {
            year: "February 2023 – June 2023",
            title: "iOS Developer Intern",
            description: "42 Gears Mobility Systems Private Limited - Learned Swift, UIKit, SwiftUI, and applied asynchronous programming techniques to optimize application performance.",
            type: "experience"
        },
        {
            year: "August 2019 - May 2023",
            title: "Bachelor of Engineering in Computer Science",
            description: "Chandigarh Group of Colleges, Landran, Mohali - CGPA: 7.9",
            type: "education"
        }
    ];

    const projects = [
        {
            title: "SureMDM Agent for macOS",
            description: "Enterprise macOS device management agent with app lifecycle management, security policies, and remote administration.",
            challenge: "Managing a large fleet of macOS devices in an enterprise environment with a high degree of automation and security.",
            solution: "Built a comprehensive agent that handles app installation, updates, and removal, along with security features like geofencing and JIT access.",
            impact: "Improved device management efficiency by 60% and reduced security incidents by 40%.",
            tech: ["macOS", "Swift", "XPC", "Core Data", "VIPER"],
            year: "2023-2025",
            links: {
                product: "https://www.42gears.com/products/mobile-device-management/suremdm-agent-for-macos-past-releases/"
            }
        },
        {
            title: "NotingDown",
            description: "A productivity crisis led to this solution. Many users struggle with scattered notes across different apps. NotingDown addresses this by providing a unified, intuitive note-taking experience built with SwiftUI.",
            challenge: "Users needed a simple yet powerful note app that works offline and syncs seamlessly.",
            solution: "Built native iOS app with Core Data persistence and clean SwiftUI interface.",
            impact: "Published on App Store with positive user reviews, demonstrating production-ready iOS development skills.",
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
            impact: "Achieved 90% tuning accuracy, providing a useful tool for musicians.",
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
            impact: "Published on the Chrome Web Store, offering a convenient tool for privacy-conscious users.",
            tech: ["JavaScript", "Chrome APIs", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "https://chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei",
                github: "https://github.com/sachin6174/secure-text-chrome-extension"
            }
        }
    ];

    const achievements = [
        "Selected among top 700 teams from 57,000+ developers in the Google Cloud Agentic AI Hackathon 2025.",
        "Reduced critical bugs by 70% after migrating from MVVM to VIPER.",
        "Reduced app crashes by 90% by introducing proper thread-safety mechanisms.",
        "Automated 95% of admin access workflows with JIT Access implementation."
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
                        <p className="hero-tagline">iOS Developer | Swift, SwiftUI, UIKit | Enterprise Mobility</p>
                        <p className="hero-description">
                            iOS Developer with 2.8 years of experience in iOS SDK, Swift, SwiftUI, UIKit, and mobile app development. Expertise in MacOS/iOS app development, Core Data, Cocoa Touch framework, RESTful API integration, and App Store deployment.
                        </p>
                        <div className="hero-contact">
                            <span>📧 sachinmehtab@gmail.com</span>
                            <span>📱 +91 9501841073</span>
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
                            As a developer, I'm driven by a passion for turning complex problems into elegant and intuitive solutions. My journey in technology has been a constant exploration, from building enterprise mobility solutions to creating personal projects that solve real-world problems.
                        </p>
                        <p>
                            When I'm not coding, I'm exploring my other interests. I'm an avid explorer of AI tools, always curious about the next wave of innovation. I also enjoy reading literature, which gives me new perspectives on storytelling and communication. Drawing allows me to express my creativity visually, and listening to music is my go-to for focus and inspiration.
                        </p>
                        <p>
                            These interests aren't just hobbies; they shape how I approach my work. They've taught me the importance of creativity, clear communication, and a user-centered approach to everything I build.
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