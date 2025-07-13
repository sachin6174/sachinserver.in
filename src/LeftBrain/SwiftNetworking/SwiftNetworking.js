import React from "react";
import "../shared-styles.css";
import "./SwiftNetworking.css";

const SwiftNetworking = () => {
    const networkingPatterns = [
        {
            name: "URLSession",
            description: "Apple's powerful networking API for HTTP/HTTPS requests with support for background tasks, authentication, and caching.",
            icon: "🌐",
            features: ["Background Downloads", "Certificate Pinning", "HTTP/2 Support", "Request Caching"]
        },
        {
            name: "Async/Await",
            description: "Modern Swift concurrency for clean, readable asynchronous networking code without callback hell.",
            icon: "⚡",
            features: ["Structured Concurrency", "Error Handling", "Cancellation Support", "Task Groups"]
        },
        {
            name: "Combine Framework",
            description: "Reactive programming framework for handling asynchronous events and data streams in networking.",
            icon: "🔄",
            features: ["Publishers/Subscribers", "Operators", "Error Handling", "Backpressure"]
        },
        {
            name: "REST API Integration",
            description: "Best practices for consuming RESTful APIs with proper error handling and data parsing.",
            icon: "🔗",
            features: ["JSON Parsing", "Error Mapping", "Request/Response Models", "API Versioning"]
        }
    ];

    const codeExamples = [
        {
            title: "Async/Await Network Request",
            code: `func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, response) = try await URLSession.shared.data(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse,
          httpResponse.statusCode == 200 else {
        throw NetworkError.invalidResponse
    }
    
    return try JSONDecoder().decode(User.self, from: data)
}`
        },
        {
            title: "Combine Network Publisher",
            code: `func fetchUsers() -> AnyPublisher<[User], Error> {
    let url = URL(string: "https://api.example.com/users")!
    
    return URLSession.shared.dataTaskPublisher(for: url)
        .map(\\.data)
        .decode(type: [User].self, decoder: JSONDecoder())
        .receive(on: DispatchQueue.main)
        .eraseToAnyPublisher()
}`
        }
    ];

    const networkingStats = [
        { value: "HTTP/2", label: "Protocol" },
        { value: "SSL/TLS", label: "Security" },
        { value: "JSON", label: "Format" },
        { value: "REST", label: "Architecture" }
    ];

    const bestPractices = [
        "Use HTTPS for all network communications",
        "Implement proper error handling and user feedback",
        "Cache responses to improve performance and offline support",
        "Use certificate pinning for sensitive applications",
        "Implement request timeouts and retry mechanisms",
        "Parse JSON safely with proper error handling",
        "Use background URLSessions for large downloads",
        "Implement proper authentication token management"
    ];

    const skills = [
        { name: "URLSession", level: 95 },
        { name: "Async/Await", level: 88 },
        { name: "Combine", level: 85 },
        { name: "JSON Parsing", level: 92 },
        { name: "API Design", level: 87 },
        { name: "Error Handling", level: 90 }
    ];

    return (
        <div className="leftbrain-container swift-networking-theme">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Swift Networking</h1>
                <p>Modern networking solutions for iOS applications using URLSession, Async/Await, and Combine framework</p>
            </div>

            {/* Networking Stats */}
            <div className="section">
                <h2>Key Technologies</h2>
                <div className="stats-grid">
                    {networkingStats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <h4>{stat.label}</h4>
                            <span className="highlight-text">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Networking Patterns */}
            <div className="section">
                <h2>Networking Patterns</h2>
                <div className="cards-container">
                    {networkingPatterns.map((pattern, index) => (
                        <div key={index} className="theme-card">
                            <div className="tech-icon">{pattern.icon}</div>
                            <h3>{pattern.name}</h3>
                            <p>{pattern.description}</p>
                            <div className="tech-stack">
                                {pattern.features.map((feature, idx) => (
                                    <span key={idx} className="tech-tag">{feature}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Code Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Networking Skills</h2>
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

            {/* Best Practices */}
            <div className="section">
                <h2>Networking Best Practices</h2>
                <ul className="feature-list">
                    {bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                    ))}
                </ul>
            </div>

            {/* Protocol Tags */}
            <div className="section">
                <h2>Supported Protocols & Standards</h2>
                <div className="tech-stack">
                    <span className="tech-tag">HTTP/1.1</span>
                    <span className="tech-tag">HTTP/2</span>
                    <span className="tech-tag">WebSocket</span>
                    <span className="tech-tag">TLS 1.3</span>
                    <span className="tech-tag">OAuth 2.0</span>
                    <span className="tech-tag">JWT</span>
                    <span className="tech-tag">GraphQL</span>
                    <span className="tech-tag">REST</span>
                </div>
            </div>
        </div>
    );
};

export default SwiftNetworking;