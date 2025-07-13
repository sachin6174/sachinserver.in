import React from "react";
import "../shared-styles.css";
import "./ReactJS.css";

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
        <div className="leftbrain-container react-theme">
            <div className="simple-header">
                <h1>React Development</h1>
                <p>Building modern, interactive user interfaces with React.js and its ecosystem</p>
            </div>

            {/* Skills Overview */}
            <div className="section">
                <h2>Frontend Skills</h2>
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

            {/* Core Concepts */}
            <div className="section">
                <h2>Core Concepts</h2>
                <div className="cards-container">
                    {concepts.map((concept, index) => (
                        <div key={index} className="theme-card">
                            <div className="tech-icon">{concept.icon}</div>
                            <h3>{concept.name}</h3>
                            <p>{concept.description}</p>
                            <div className="tech-stack">
                                {concept.features.map((feature, idx) => (
                                    <span key={idx} className="tech-tag">{feature}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects */}
            <div className="section">
                <h2>Featured Projects</h2>
                <div className="grid-2">
                    {projects.map((project, index) => (
                        <div key={index} className="content-card">
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, idx) => (
                                    <span key={idx} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Example */}
            <div className="section">
                <h2>Code Example</h2>
                <div className="code-block">
                    <h4>Custom Hook for API Calls</h4>
                    <pre><code>{`import { useState, useEffect } from 'react';

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
};`}</code></pre>
                    <div className="tech-stack">
                        <span className="tech-tag">React Hooks</span>
                        <span className="tech-tag">Custom Hook</span>
                        <span className="tech-tag">Async/Await</span>
                        <span className="tech-tag">Error Handling</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReactJS;
