import React from "react";
import "../shared-styles.css";

const ReactJS = () => {
    const concepts = [
        {
            name: "React Hooks",
            description: "Modern React feature for state management and lifecycle methods in functional components.",
            icon: "🪝",
            features: ["useState", "useEffect", "useContext", "Custom Hooks"]
        },
        {
            name: "Component Architecture",
            description: "Building reusable and maintainable UI components with proper separation of concerns.",
            icon: "🧩",
            features: ["Functional Components", "Props", "State Management", "Component Composition"]
        },
        {
            name: "State Management",
            description: "Managing application state using Redux, Context API, and other state management solutions.",
            icon: "🗃️",
            features: ["Redux", "Context API", "Zustand", "Local State"]
        },
        {
            name: "Modern Tooling",
            description: "Development tools and build systems for efficient React development workflow.",
            icon: "🔧",
            features: ["Vite", "Webpack", "ESLint", "Prettier"]
        }
    ];

    const projects = [
        {
            name: "E-commerce Dashboard",
            description: "Admin dashboard with charts, data tables, and real-time updates using React and modern libraries.",
            tech: ["React", "TypeScript", "Chart.js", "Material-UI"]
        },
        {
            name: "Social Media App",
            description: "Full-featured social platform with real-time messaging and media sharing capabilities.",
            tech: ["React", "Socket.IO", "Redux", "Styled Components"]
        },
        {
            name: "Task Management Tool",
            description: "Collaborative project management application with drag-and-drop functionality.",
            tech: ["React", "DnD Kit", "React Query", "Tailwind CSS"]
        }
    ];

    const skills = [
        { name: "React", level: 90 },
        { name: "JSX", level: 95 },
        { name: "Hooks", level: 88 },
        { name: "Redux", level: 75 },
        { name: "TypeScript", level: 80 },
        { name: "Testing", level: 70 }
    ];

    return (
        <div className="leftbrain-container">
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">React Development</h1>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Building modern, interactive user interfaces with React.js and its ecosystem
                    </p>
                </div>
            </div>

            {/* Skills Overview */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Frontend Skills</h2>
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

            {/* Core Concepts */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Core Concepts</h2>
                </div>
                <div className="cards-container">
                    {concepts.map((concept, index) => (
                        <div key={index} className="tech-card react hover-effect">
                            <div className="tech-icon">{concept.icon}</div>
                            <h3>{concept.name}</h3>
                            <p>{concept.description}</p>
                            <ul className="feature-list">
                                {concept.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Featured Projects</h2>
                </div>
                <div className="features-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="leftbrain-card hover-effect">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, idx) => (
                                    <span key={idx} className="tech-tag">{tech}</span>
                                ))}
                            </div>
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
                    <h3>Custom Hook for API Calls</h3>
                    <div className="code-snippet" data-language="JavaScript">
                        {`import { useState, useEffect } from 'react';

const useApiData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(\`Error: \${response.status}\`);
                }
                
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

// Usage in component
const UserProfile = ({ userId }) => {
    const { data: user, loading, error } = useApiData(
        \`/api/users/\${userId}\`
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};`}
                    </div>
                    <div className="tech-stack">
                        <span className="tech-tag primary">React Hooks</span>
                        <span className="tech-tag">Custom Hook</span>
                        <span className="tech-tag">Async/Await</span>
                        <span className="tech-tag">Error Handling</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReactJS;
