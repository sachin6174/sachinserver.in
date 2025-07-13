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
        { name: "Swift", level: 95, category: "Mobile" },
        { name: "iOS Development", level: 90, category: "Mobile" },
        { name: "SwiftUI", level: 88, category: "Frontend" },
        { name: "UIKit", level: 85, category: "Frontend" },
        { name: "JavaScript", level: 82, category: "Web" },
        { name: "React", level: 75, category: "Frontend" },
        { name: "Node.js", level: 70, category: "Backend" },
        { name: "Core Data", level: 85, category: "Database" },
        { name: "MongoDB", level: 70, category: "Database" },
        { name: "Objective-C", level: 65, category: "Mobile" },
        { name: "C++", level: 75, category: "Programming" },
        { name: "System Design", level: 78, category: "Architecture" }
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
            description: "Feature-rich note-taking iOS application built with SwiftUI and Core Data. Published on Apple App Store with open source availability.",
            tech: ["SwiftUI", "Core Data", "iOS"],
            year: "2025",
            links: {
                appStore: "apps.apple.com/us/app/notingdown/id6742340327",
                github: "github.com/sachin6174/NotingDown"
            }
        },
        {
            title: "Secure Text Chrome Extension",
            description: "Chrome extension for text encryption/decryption with password protection, featuring Base64 and Base32 encoding functionality.",
            tech: ["JavaScript", "Chrome Extension", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "chromewebstore.google.com/detail/secure-text/ankgchfieiimiijhlcjcongijapefmei",
                github: "github.com/sachin6174/secure-text-chrome-extension"
            }
        },
        {
            title: "QR Encoder Decoder",
            description: "Chrome extension combining encryption with QR code generation, implementing multi-iteration encryption with password protection.",
            tech: ["JavaScript", "QR Code API", "Cryptography"],
            year: "2024",
            links: {
                chromeStore: "chromewebstore.google.com/detail/ybv-qr-encoder-decoder/bkfdepagfbledopemnbibcpcmainlfam",
                github: "github.com/sachin6174/YBV-QR-Encoder-Decoder"
            }
        }
    ];

    const achievements = [
        "📱 Published iOS app on Apple App Store",
        "🏢 Working at 42 Gears Mobility Systems",
        "🔐 Developed multiple Chrome extensions",
        "🛠️ Expert in iOS/macOS development",
        "☁️ Experience with enterprise mobility solutions",
        "🔧 Proficient in system-level programming"
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
                        <p className="hero-tagline">Mac/iOS Developer & Software Engineer</p>
                        <p className="hero-description">
                            Passionate Mac/iOS developer at 42 Gears Mobility Systems,
                            specializing in enterprise mobility solutions and native app development.
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
                            Hello! I'm Sachin Kumar, a dedicated Mac/iOS Developer currently working at
                            42 Gears Mobility Systems in Bangalore. I graduated with a B.Tech in Computer
                            Science Engineering from Chandigarh Group of Colleges, Landran in 2023.
                        </p>
                        <p>
                            My expertise lies in developing enterprise mobility solutions, creating native
                            iOS applications, and building Chrome extensions. I have experience with Swift,
                            SwiftUI, UIKit, and have published applications on both the Apple App Store and
                            Chrome Web Store.
                        </p>
                        <p>
                            I'm passionate about creating efficient, user-friendly applications and solving
                            complex technical challenges in mobile and web development.
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
                            <p>{project.description}</p>
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
                        "I specialize in developing enterprise mobility solutions and native applications.
                        My focus is on creating robust, scalable software that solves real-world problems
                        in mobile device management and user productivity."
                    </blockquote>
                    <cite>— My Development Philosophy</cite>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section fade-in-section" id="cta">
                <div className="cta-content">
                    <h2>Let's Connect</h2>
                    <p>I'm always interested in discussing new opportunities and technical challenges.</p>
                    <div className="cta-buttons">
                        <a href="mailto:sachinmehtab@gmail.com" className="btn-primary">Get In Touch</a>
                        <a href="https://linkedin.com/in/sachinkumar6174" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            LinkedIn Profile
                        </a>
                        <a href="https://github.com/sachin6174" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            GitHub Profile
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutMe;
