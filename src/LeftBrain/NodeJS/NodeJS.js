import React from "react";
import "../shared-styles.css";
import "./NodeJS.css";

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
        <div className="leftbrain-container nodejs-theme">
            <div className="hero-section">
                <h1 className="section-title">Node.js Development</h1>
                <p>Building scalable server-side applications and APIs using JavaScript runtime environment</p>
                <div className="tech-stack">
                    <span className="theme-badge">Node.js</span>
                    <span className="theme-badge">Express</span>
                    <span className="theme-badge">MongoDB</span>
                    <span className="theme-badge">Socket.IO</span>
                </div>
            </div>

            {/* Skills Overview */}
            <div className="section">
                <h2>Backend Skills</h2>
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

            {/* Technologies */}
            <div className="section">
                <h2>Technologies & Frameworks</h2>
                <div className="cards-container">
                    {technologies.map((tech, index) => (
                        <div key={index} className="theme-card">
                            <div className="tech-icon">{tech.icon}</div>
                            <h3>{tech.name}</h3>
                            <p>{tech.description}</p>
                            <div className="tech-stack">
                                {tech.features.map((feature, idx) => (
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
                    <h4>Express.js API Route</h4>
                    <pre><code>{`const express = require('express');
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

module.exports = router;`}</code></pre>
                    <div className="tech-stack">
                        <span className="tech-tag">Express.js</span>
                        <span className="tech-tag">JWT</span>
                        <span className="tech-tag">MongoDB</span>
                        <span className="tech-tag">Async/Await</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeJS;
