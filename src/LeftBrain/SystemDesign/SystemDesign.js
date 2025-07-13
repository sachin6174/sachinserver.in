import React from "react";
import "../shared-styles.css";
import "./SystemDesign.css";

const SystemDesign = () => {
    const systemComponents = [
        {
            name: "Load Balancers",
            description: "Distribute incoming requests across multiple servers to ensure high availability and scalability.",
            icon: "⚖️",
            features: ["Round Robin", "Least Connections", "Health Checks", "SSL Termination"]
        },
        {
            name: "Databases",
            description: "Design scalable data storage solutions with proper indexing, partitioning, and replication strategies.",
            icon: "🗄️",
            features: ["ACID Properties", "Sharding", "Replication", "CAP Theorem"]
        },
        {
            name: "Caching",
            description: "Implement multi-layer caching strategies to improve performance and reduce database load.",
            icon: "⚡",
            features: ["Redis", "Memcached", "CDN", "Application Cache"]
        },
        {
            name: "Message Queues",
            description: "Asynchronous communication between services using reliable message queuing systems.",
            icon: "📨",
            features: ["RabbitMQ", "Apache Kafka", "Dead Letter Queues", "Event Sourcing"]
        }
    ];

    const designPrinciples = [
        {
            title: "Scalability",
            description: "Design systems that can handle increased load by adding resources horizontally or vertically.",
            examples: ["Horizontal scaling with load balancers", "Database sharding", "Microservices architecture"]
        },
        {
            title: "Reliability",
            description: "Ensure system continues to work correctly even when failures occur.",
            examples: ["Redundancy and failover", "Circuit breakers", "Graceful degradation"]
        },
        {
            title: "Availability", 
            description: "Minimize downtime and ensure system remains operational.",
            examples: ["99.9% uptime targets", "Health checks", "Auto-scaling"]
        },
        {
            title: "Consistency",
            description: "Maintain data consistency across distributed systems.",
            examples: ["ACID transactions", "Eventual consistency", "Distributed locks"]
        }
    ];

    const architectureExamples = [
        {
            title: "Social Media Platform (Twitter-like)",
            components: [
                { name: "Web Servers", type: "normal" },
                { name: "Load Balancer", type: "critical" },
                { name: "API Gateway", type: "normal" },
                { name: "User Service", type: "normal" },
                { name: "Tweet Service", type: "normal" },
                { name: "Timeline Service", type: "normal" },
                { name: "PostgreSQL", type: "database" },
                { name: "Redis Cache", type: "critical" },
                { name: "Message Queue", type: "normal" }
            ],
            description: "Microservices architecture with event-driven communication"
        },
        {
            title: "E-commerce Platform",
            components: [
                { name: "CDN", type: "critical" },
                { name: "Load Balancer", type: "critical" },
                { name: "Product Catalog", type: "normal" },
                { name: "Order Service", type: "critical" },
                { name: "Payment Gateway", type: "critical" },
                { name: "Inventory Service", type: "normal" },
                { name: "MySQL Cluster", type: "database" },
                { name: "Search Engine", type: "normal" },
                { name: "Analytics", type: "normal" }
            ],
            description: "High-availability system with strong consistency for orders"
        }
    ];

    const scalabilityMetrics = [
        { value: "1M+", label: "Requests/Second" },
        { value: "99.99%", label: "Availability" },
        { value: "<100ms", label: "Response Time" },
        { value: "1000+", label: "Concurrent Users" }
    ];

    const cachingStrategies = [
        {
            name: "Browser Cache",
            level: "l1",
            description: "Client-side caching for static assets",
            ttl: "Hours to Days"
        },
        {
            name: "CDN Cache", 
            level: "l2",
            description: "Geographic distribution of content",
            ttl: "Minutes to Hours"
        },
        {
            name: "Application Cache",
            level: "l2", 
            description: "In-memory caching (Redis/Memcached)",
            ttl: "Seconds to Minutes"
        },
        {
            name: "Database Cache",
            level: "l3",
            description: "Query result caching",
            ttl: "Milliseconds to Seconds"
        }
    ];

    const microservices = [
        "User Service", "Auth Service", "Product Service", "Order Service",
        "Payment Service", "Inventory Service", "Notification Service", "Analytics Service",
        "Search Service", "Recommendation Service", "File Storage Service", "API Gateway"
    ];

    const systemDesignPhases = [
        {
            phase: "Requirements Gathering",
            description: "Define functional and non-functional requirements",
            deliverables: ["User stories", "Performance targets", "Constraints"]
        },
        {
            phase: "Capacity Planning",
            description: "Estimate system load and resource requirements",
            deliverables: ["Traffic estimates", "Storage calculations", "Bandwidth requirements"]
        },
        {
            phase: "High-Level Design",
            description: "Create overall system architecture",
            deliverables: ["Architecture diagrams", "Component interactions", "Data flow"]
        },
        {
            phase: "Detailed Design",
            description: "Deep dive into individual components",
            deliverables: ["Database schemas", "API specifications", "Security protocols"]
        },
        {
            phase: "Implementation",
            description: "Build and deploy the system",
            deliverables: ["Code implementation", "Testing", "Monitoring setup"]
        }
    ];

    const tradeOffs = {
        consistency: {
            pros: ["Data accuracy", "ACID guarantees", "Simplified reasoning", "Strong consistency"],
            cons: ["Reduced availability", "Higher latency", "Complex coordination", "Scalability limits"]
        },
        availability: {
            pros: ["Always accessible", "Better user experience", "Fault tolerance", "Geographic distribution"],
            cons: ["Eventual consistency", "Data conflicts", "Complex reconciliation", "Stale reads"]
        }
    };

    const loadTestingTools = [
        { name: "Apache JMeter", icon: "📊", description: "Performance testing tool" },
        { name: "Artillery", icon: "🎯", description: "Modern load testing toolkit" },
        { name: "k6", icon: "⚡", description: "Developer-centric performance testing" },
        { name: "Gatling", icon: "🔫", description: "High-performance load testing" }
    ];

    const skills = [
        { name: "System Architecture", level: 92 },
        { name: "Database Design", level: 88 },
        { name: "Microservices", level: 85 },
        { name: "Load Balancing", level: 87 },
        { name: "Caching Strategies", level: 90 },
        { name: "Message Queues", level: 82 },
        { name: "Performance Optimization", level: 89 },
        { name: "Disaster Recovery", level: 85 }
    ];

    const bestPractices = [
        "Start with simple monolithic architecture, then scale to microservices",
        "Design for failure - assume components will fail",
        "Use asynchronous communication where possible",
        "Implement comprehensive monitoring and alerting",
        "Plan for data consistency and backup strategies",
        "Use load testing to validate performance assumptions",
        "Document architecture decisions and trade-offs",
        "Consider security at every layer of the system"
    ];

    return (
        <div className="leftbrain-container system-design-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>System Design</h1>
                <p>Scalable architecture design, distributed systems, and performance optimization strategies</p>
            </div>

            {/* Scalability Metrics */}
            <div className="scalability-metrics">
                {scalabilityMetrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                    </div>
                ))}
            </div>

            {/* System Components */}
            <div className="cards-container">
                {systemComponents.map((component, index) => (
                    <div key={index} className="leftbrain-card system-component-card">
                        <div className="tech-icon">{component.icon}</div>
                        <h3>{component.name}</h3>
                        <p>{component.description}</p>
                        <div className="tech-stack">
                            {component.features.map((feature, idx) => (
                                <span key={idx} className="tech-tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Design Principles */}
            <div className="section">
                <h2>Core Design Principles</h2>
                {designPrinciples.map((principle, index) => (
                    <div key={index} className="design-principle">
                        <h4>{principle.title}</h4>
                        <p>{principle.description}</p>
                        <ul>
                            {principle.examples.map((example, idx) => (
                                <li key={idx}>{example}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Architecture Examples */}
            <div className="section">
                <h2>Real-world Architecture Examples</h2>
                {architectureExamples.map((example, index) => (
                    <div key={index} className="architecture-diagram complex">
                        <h3>{example.title}</h3>
                        <p>{example.description}</p>
                        <div className="architecture-flow">
                            {example.components.map((comp, idx) => (
                                <React.Fragment key={idx}>
                                    <div className={`flow-component ${comp.type}`}>
                                        <strong>{comp.name}</strong>
                                    </div>
                                    {idx < example.components.length - 1 && (
                                        <span className="flow-arrow">→</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Caching Strategies */}
            <div className="section">
                <h2>Multi-Layer Caching Strategy</h2>
                <div className="caching-strategy">
                    {cachingStrategies.map((cache, index) => (
                        <div key={index} className={`cache-layer ${cache.level}`}>
                            <h4>{cache.name}</h4>
                            <p>{cache.description}</p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                TTL: {cache.ttl}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trade-offs Analysis */}
            <div className="section">
                <h2>CAP Theorem Trade-offs</h2>
                <div className="trade-offs-comparison">
                    <div className="trade-off-card pros">
                        <h4>✅ Consistency First</h4>
                        <ul>
                            {tradeOffs.consistency.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                            ))}
                        </ul>
                        <h5 style={{ marginTop: '1rem', color: '#DC2626' }}>Trade-offs:</h5>
                        <ul>
                            {tradeOffs.consistency.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="trade-off-card cons">
                        <h4>✅ Availability First</h4>
                        <ul>
                            {tradeOffs.availability.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                            ))}
                        </ul>
                        <h5 style={{ marginTop: '1rem', color: '#DC2626' }}>Trade-offs:</h5>
                        <ul>
                            {tradeOffs.availability.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Microservices Architecture */}
            <div className="section">
                <h2>Microservices Architecture</h2>
                <div className="microservices-grid">
                    {microservices.map((service, index) => (
                        <div key={index} className="microservice-card">
                            {service}
                        </div>
                    ))}
                </div>
            </div>

            {/* System Design Process */}
            <div className="section">
                <h2>System Design Process</h2>
                <div className="system-timeline">
                    {systemDesignPhases.map((phase, index) => (
                        <div key={index} className="timeline-phase">
                            <h4>Phase {index + 1}: {phase.phase}</h4>
                            <p>{phase.description}</p>
                            <div style={{ marginTop: '0.75rem' }}>
                                <strong>Deliverables:</strong>
                                <ul>
                                    {phase.deliverables.map((deliverable, idx) => (
                                        <li key={idx}>{deliverable}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Capacity Planning */}
            <div className="capacity-planning">
                <h4>📊 Capacity Planning Example</h4>
                <div className="system-design-code-block">
                    <pre><code>{`// Daily Active Users: 10M
// Average requests per user per day: 100
// Peak traffic multiplier: 3x

// Calculate peak QPS
const dailyRequests = 10_000_000 * 100; // 1B requests/day
const requestsPerSecond = dailyRequests / (24 * 60 * 60); // ~11,574 RPS
const peakQPS = requestsPerSecond * 3; // ~34,722 QPS

// Storage calculations
const avgPostSize = 1000; // bytes
const postsPerDay = 10_000_000 * 2; // 2 posts per user
const dailyStorage = postsPerDay * avgPostSize; // ~20GB/day
const yearlyStorage = dailyStorage * 365; // ~7.3TB/year

// Memory requirements for caching
const activeUserCache = 1_000_000 * 1024; // 1GB for 1M active users
const hotDataCache = dailyStorage * 0.2; // 20% of daily data in cache

console.log(\`Peak QPS: \${peakQPS}\`);
console.log(\`Storage needed: \${yearlyStorage / 1e12} TB/year\`);
console.log(\`Cache memory: \${(activeUserCache + hotDataCache) / 1e9} GB\`);`}</code></pre>
                </div>
            </div>

            {/* Load Testing Tools */}
            <div className="section">
                <h2>Load Testing Tools</h2>
                <div className="load-testing-grid">
                    {loadTestingTools.map((tool, index) => (
                        <div key={index} className="load-test-card">
                            <span className="load-test-icon">{tool.icon}</span>
                            <h4>{tool.name}</h4>
                            <p>{tool.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>System Design Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #059669, #10B981)',
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

            {/* Database Design Example */}
            <div className="section">
                <h2>Database Design Patterns</h2>
                <div className="system-design-code-block">
                    <h4>Social Media Platform - Database Schema</h4>
                    <pre><code>{`-- Users table with sharding key
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) PARTITION BY HASH(user_id) PARTITIONS 16;

-- Posts table with user_id as sharding key
CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    content TEXT,
    media_urls JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX idx_user_created (user_id, created_at),
    INDEX idx_created_at (created_at)
) PARTITION BY HASH(user_id) PARTITIONS 16;

-- Followers table for social graph
CREATE TABLE followers (
    follower_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    INDEX idx_following (following_id)
) PARTITION BY HASH(follower_id) PARTITIONS 16;

-- Timeline cache (Redis)
-- Key: timeline:{user_id}
-- Value: JSON array of post_ids with metadata
-- TTL: 15 minutes

-- Hot data strategy:
-- - Recent posts (last 24h) in memory cache
-- - User profiles in Redis with 1h TTL
-- - Timeline generation using fan-out on write for active users`}</code></pre>
                </div>
            </div>

            {/* Best Practices */}
            <div className="section">
                <h2>System Design Best Practices</h2>
                <ul className="feature-list">
                    {bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SystemDesign;