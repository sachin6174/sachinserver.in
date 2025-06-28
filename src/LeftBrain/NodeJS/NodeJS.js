import React from "react";
import "../shared-styles.css";

const NodeJS = () => {
    const technologies = [
        {
            name: "Express.js",
            description: "Fast, unopinionated, minimalist web framework for Node.js applications.",
            icon: "🚀",
            features: ["RESTful APIs", "Middleware Support", "Routing", "Template Engines"]
        },
        {
            name: "MongoDB",
            description: "NoSQL document database that provides high performance and easy scalability.",
            icon: "🍃",
            features: ["Document Storage", "Flexible Schema", "Aggregation", "GridFS"]
        },
        {
            name: "Socket.IO",
            description: "Real-time bidirectional event-based communication library.",
            icon: "🔌",
            features: ["Real-time Communication", "WebSocket Support", "Room Management", "Broadcasting"]
        },
        {
            name: "JWT",
            description: "JSON Web Tokens for secure authentication and authorization.",
            icon: "🔐",
            features: ["Stateless Authentication", "Cross-platform", "Secure", "Scalable"]
        }
    ];

    const projects = [
        {
            name: "REST API Server",
            description: "Complete backend API with authentication, CRUD operations, and database integration.",
            tech: ["Node.js", "Express", "MongoDB", "JWT"]
        },
        {
            name: "Real-time Chat App",
            description: "WebSocket-based chat application with rooms and private messaging.",
            tech: ["Socket.IO", "Express", "Redis", "JWT"]
        },
        {
            name: "E-commerce Backend",
            description: "Scalable e-commerce API with payment integration and inventory management.",
            tech: ["Node.js", "MongoDB", "Stripe", "Cloudinary"]
        }
    ];

    const skills = [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "API Design", level: 88 },
        { name: "Authentication", level: 82 },
        { name: "WebSockets", level: 70 }
    ];

    return (
        <div className="leftbrain-container">
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">Node.js Development</h1>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Building scalable server-side applications and APIs using JavaScript runtime environment
                    </p>
                </div>
            </div>

            {/* Skills Overview */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Backend Skills</h2>
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

            {/* Technologies */}
            <section>
                <div className="section-header">
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Technologies & Frameworks</h2>
                </div>
                <div className="cards-container">
                    {technologies.map((tech, index) => (
                        <div key={index} className="tech-card nodejs hover-effect">
                            <div className="tech-icon">{tech.icon}</div>
                            <h3>{tech.name}</h3>
                            <p>{tech.description}</p>
                            <ul className="feature-list">
                                {tech.features.map((feature, idx) => (
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
                    <h3>Express.js API Route</h3>
                    <div className="code-snippet" data-language="JavaScript">
                        {`const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user and verify password
        const user = await User.findOne({ email });
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ 
                error: 'Invalid credentials' 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                email: user.email 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;`}
                    </div>
                    <div className="tech-stack">
                        <span className="tech-tag primary">Express.js</span>
                        <span className="tech-tag">JWT</span>
                        <span className="tech-tag">MongoDB</span>
                        <span className="tech-tag">Async/Await</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NodeJS;
