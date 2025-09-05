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
        { name: "Swift", level: 95, category: "Mobile", context: "Primary language for iOS development at 42 Gears, used daily for enterprise mobility apps" },
        { name: "SwiftUI", level: 88, category: "Mobile UI", context: "Built NotingDown app interface, creating responsive and intuitive user experiences" },
        { name: "UIKit", level: 85, category: "Mobile UI", context: "Legacy app maintenance and complex UI implementations requiring programmatic control" },
        { name: "Core Data", level: 85, category: "Data", context: "Persistent data storage for iOS apps, implemented in NotingDown for offline functionality" },
        { name: "iOS Development", level: 90, category: "Mobile", context: "End-to-end app development from concept to App Store publication" },
        { name: "JavaScript", level: 82, category: "Web", context: "Chrome extension development and web tooling, published extensions on Chrome Web Store" },
        { name: "React", level: 75, category: "Web UI", context: "Built this portfolio website and various web applications for personal projects" },
        { name: "Enterprise Solutions", level: 88, category: "Business", context: "Device management systems at 42 Gears serving thousands of enterprise clients" },
        { name: "Node.js", level: 70, category: "Backend", context: "API development and server-side tooling for web applications" },
        { name: "Cryptography", level: 75, category: "Security", context: "Implemented encryption algorithms in Chrome extensions for secure data handling" },
        { name: "System Design", level: 78, category: "Architecture", context: "Designing scalable mobile and web applications with performance considerations" },
        { name: "Objective-C", level: 65, category: "Mobile", context: "Legacy iOS codebase maintenance and bridging with Swift implementations" }
    ];

    const timeline = [
        {
            year: "2023-Present",
            title: "Mac/iOS Developer",
            description: "42 Gears Mobility Systems - Developing enterprise mobility solutions, implementing file transfer functionality, and creating device management features",
            type: "experience"
        },
        {
            year: "2023",
            title: "Mac/iOS Developer Intern",
            description: "42 Gears Mobility Systems - Learned Swift, UIKit, SwiftUI, and gained expertise in PKG/DMG creation and macOS development",
            type: "experience"
        },
        {
            year: "2019-2023",
            title: "B.Tech Computer Science",
            description: "Chandigarh Group of Colleges, Landran - Specialized in Computer Science Engineering with focus on mobile and web development",
            type: "education"
        },
        {
            year: "2019",
            title: "Class 12",
            description: "Shishu Niketan Public School - Completed intermediate education with strong foundation in mathematics and sciences",
            type: "education"
        }
    ];

    const projects = [
        {
            title: "NotingDown",
            description: "A productivity crisis led to this solution. Many users struggle with scattered notes across different apps. NotingDown addresses this by providing a unified, intuitive note-taking experience built with SwiftUI.",
            challenge: "Users needed a simple yet powerful note app that works offline and syncs seamlessly",
            solution: "Built native iOS app with Core Data persistence and clean SwiftUI interface",
            impact: "Published on App Store with positive user reviews, demonstrating production-ready iOS development skills",
            tech: ["SwiftUI", "Core Data", "iOS"],
            year: "2025",
            links: {
                appStore: "apps.apple.com/us/app/notingdown/id6742340327",
                github: "github.com/sachin6174/NotingDown"
            }
        },
        {
            title: "Secure Text Chrome Extension",
            description: "Privacy concerns drove this browser security tool. Users needed quick text encryption without leaving their browser workflow.",
            challenge: "No simple browser-based encryption tool with password protection and multiple encoding formats",
            solution: "Created Chrome extension with AES encryption, Base64/Base32 encoding, and secure password handling",
            impact: "Deployed to Chrome Web Store, serving users who need quick text encryption in their daily workflows",
            tech: ["JavaScript", "Chrome Extension", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei",
                github: "github.com/sachin6174/secure-text-chrome-extension"
            }
        },
        {
            title: "QR Encoder Decoder",
            description: "Bridged the gap between encryption and quick sharing. Users wanted to share encrypted data through QR codes for secure offline communication.",
            challenge: "Combine multi-layer encryption with QR code generation for secure data sharing",
            solution: "Developed Chrome extension with iterative encryption algorithms and dynamic QR code generation",
            impact: "Enables secure offline data sharing through QR codes, showcasing cryptography and API integration skills",
            tech: ["JavaScript", "QR Code API", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "chromewebstore.google.com/detail/ybv-qr-encoder-decoder/bkfdepagfbledopemnbibcpcmainlfam",
                github: "github.com/sachin6174/YBV-QR-Encoder-Decoder"
            }
        }
    ];

    const achievements = [
        "📱 Published NotingDown iOS app with active users on App Store",
        "🏢 Building enterprise solutions used by thousands of businesses",
        "🔐 Created Chrome extensions with 1000+ downloads and 5-star ratings",
        "🛠️ 2+ years of professional iOS/macOS development experience",
        "☁️ Expert in device management systems and mobile security",
        "🔧 Swift, SwiftUI, and enterprise architecture specialist"
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
                        <h1 className="hero-name">Sachin Kumar</h1>
                        <p className="hero-tagline">Turning Complex Problems into Elegant iOS Solutions</p>
                        <p className="hero-description">
                            Mac/iOS Developer at 42 Gears Mobility Systems, building enterprise mobility 
                            solutions that help businesses manage thousands of devices. Creator of published 
                            iOS apps and Chrome extensions used by real people solving real problems.
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
                            My developer journey started with a simple question: "How do apps actually work?" 
                            That curiosity led me from a Computer Science student in Chandigarh to a Mac/iOS 
                            Developer at 42 Gears Mobility Systems, where I build enterprise mobility solutions 
                            used by companies worldwide.
                        </p>
                        <p>
                            What drives me? Solving real problems through code. When I built NotingDown, my 
                            iOS note-taking app, I wasnt just creating another productivity tool—I was addressing 
                            the frustration of scattered thoughts and ideas that many of us face daily. The app 
                            now helps users organize their digital lives with intuitive SwiftUI interfaces.
                        </p>
                        <p>
                            At 42 Gears, I work on systems that help IT administrators manage thousands of 
                            devices remotely. Every line of Swift code I write potentially saves hours of manual 
                            work for businesses. Thats the impact that motivates me—technology that makes peoples 
                            work lives genuinely better.
                        </p>
                        <p>
                            Beyond iOS development, I create Chrome extensions that solve everyday problems and 
                            build developer tools that streamline workflows. My approach? Start with the user 
                            problem, then craft elegant technical solutions.
                        </p>
                    </div>
                    <div className="quick-facts">
                        <h3>Quick Facts</h3>
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
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
                                        href={`https://${project.links.appStore}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on App Store`}
                                    >
                                        App Store
                                    </a>
                                )}
                                {project.links.chromeStore && (
                                    <a
                                        href={`https://${project.links.chromeStore}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on Chrome Web Store`}
                                    >
                                        Chrome Store
                                    </a>
                                )}
                                {project.links.github && (
                                    <a
                                        href={`https://${project.links.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} source code on GitHub`}
                                    >
                                        Source Code
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
