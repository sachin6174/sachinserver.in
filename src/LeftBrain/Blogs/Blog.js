import React, { useState } from "react";
import "../shared-styles.css";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const blogCategories = [
        {
            name: "iOS Development",
            icon: "📱",
            description: "Tips, tricks, and best practices for iOS app development",
            posts: [
                {
                    title: "SwiftUI vs UIKit: When to Use What",
                    excerpt: "A comprehensive guide on choosing between SwiftUI and UIKit for your next iOS project.",
                    date: "2024-01-15",
                    readTime: "5 min read",
                    tags: ["SwiftUI", "UIKit", "iOS"]
                },
                {
                    title: "Mastering Core Data in iOS",
                    excerpt: "Learn how to effectively use Core Data for local data persistence in your iOS applications.",
                    date: "2024-01-08",
                    readTime: "8 min read",
                    tags: ["Core Data", "iOS", "Data Persistence"]
                }
            ]
        },
        {
            name: "Web Development",
            icon: "🌐",
            description: "Full-stack web development insights and tutorials",
            posts: [
                {
                    title: "Building Scalable APIs with Node.js",
                    excerpt: "Best practices for creating robust and scalable REST APIs using Node.js and Express.",
                    date: "2024-01-20",
                    readTime: "7 min read",
                    tags: ["Node.js", "Express", "API"]
                },
                {
                    title: "React Performance Optimization",
                    excerpt: "Techniques to optimize React applications for better performance and user experience.",
                    date: "2024-01-12",
                    readTime: "6 min read",
                    tags: ["React", "Performance", "Optimization"]
                }
            ]
        },
        {
            name: "Career & Growth",
            icon: "🚀",
            description: "Professional development and career insights in tech",
            posts: [
                {
                    title: "From Student to Software Developer",
                    excerpt: "My journey from computer science student to professional software developer.",
                    date: "2024-01-25",
                    readTime: "4 min read",
                    tags: ["Career", "Journey", "Tips"]
                },
                {
                    title: "Essential Skills for Modern Developers",
                    excerpt: "The key skills every developer should focus on in 2024 and beyond.",
                    date: "2024-01-18",
                    readTime: "5 min read",
                    tags: ["Skills", "Career", "Development"]
                }
            ]
        },
        {
            name: "Technology Trends",
            icon: "🔮",
            description: "Exploring emerging technologies and industry trends",
            posts: [
                {
                    title: "The Future of Mobile Development",
                    excerpt: "Exploring upcoming trends and technologies in mobile app development.",
                    date: "2024-01-22",
                    readTime: "6 min read",
                    tags: ["Mobile", "Trends", "Future"]
                },
                {
                    title: "AI Integration in Web Applications",
                    excerpt: "How artificial intelligence is transforming web development and user experiences.",
                    date: "2024-01-10",
                    readTime: "7 min read",
                    tags: ["AI", "Web Development", "Innovation"]
                }
            ]
        }
    ];

    const featuredPosts = [
        {
            title: "Complete Guide to iOS App Architecture",
            excerpt: "Learn about different architectural patterns like MVC, MVP, MVVM, and VIPER for iOS applications.",
            date: "2024-01-28",
            readTime: "12 min read",
            tags: ["iOS", "Architecture", "Design Patterns"],
            featured: true
        },
        {
            title: "Building Real-time Applications with Socket.IO",
            excerpt: "Step-by-step guide to creating real-time web applications using Socket.IO and Node.js.",
            date: "2024-01-26",
            readTime: "10 min read",
            tags: ["Socket.IO", "Real-time", "Node.js"],
            featured: true
        }
    ];

    const stats = [
        { number: "50+", label: "Articles Written" },
        { number: "10K+", label: "Total Reads" },
        { number: "4", label: "Categories" },
        { number: "2", label: "Years Writing" }
    ];

    return (
        <div className="leftbrain-container">
            {selectedCategory ? (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedCategory.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button 
                        className="leftbrain-button" 
                        onClick={() => setSelectedCategory(null)}
                        style={{ marginBottom: '2rem' }}
                    >
                        ← Back to Categories
                    </button>
                    <div className="features-grid">
                        {selectedCategory.posts.map((post, index) => (
                            <div key={index} className="leftbrain-card hover-effect">
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-light)'
                                }}>
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="tech-stack">
                                    {post.tags.map((tag, idx) => (
                                        <span key={idx} className="tech-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Tech Blog</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Sharing insights, tutorials, and experiences in software development
                            </p>
                        </div>
                    </div>

                    {/* Blog Stats */}
                    <section>
                        <div className="section-header">
                            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Blog Statistics</h2>
                        </div>
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Featured Posts */}
                    <section>
                        <div className="section-header">
                            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Featured Articles</h2>
                        </div>
                        <div className="features-grid">
                            {featuredPosts.map((post, index) => (
                                <div key={index} className="leftbrain-card hover-effect" style={{ 
                                    border: '2px solid var(--tech-blue)',
                                    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)'
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        marginBottom: '1rem' 
                                    }}>
                                        <span style={{ 
                                            background: 'var(--tech-blue)', 
                                            color: 'white', 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: 'var(--radius-sm)', 
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            FEATURED
                                        </span>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginTop: '1rem',
                                        fontSize: '0.875rem',
                                        color: 'var(--text-light)'
                                    }}>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <div className="tech-stack">
                                        {post.tags.map((tag, idx) => (
                                            <span key={idx} className="tech-tag primary">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Blog Categories */}
                    <section>
                        <div className="section-header">
                            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Blog Categories</h2>
                        </div>
                        <div className="cards-container">
                            {blogCategories.map((category, index) => (
                                <div 
                                    key={index} 
                                    className="tech-card blogs hover-effect"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <div className="tech-icon">{category.icon}</div>
                                    <h3>{category.name}</h3>
                                    <p>{category.description}</p>
                                    <div style={{ 
                                        marginTop: '1rem', 
                                        padding: '1rem', 
                                        background: 'var(--background-secondary)', 
                                        borderRadius: 'var(--radius-md)',
                                        textAlign: 'center'
                                    }}>
                                        <span style={{ 
                                            fontWeight: 'bold', 
                                            color: 'var(--text-primary)',
                                            fontSize: '1.2rem'
                                        }}>
                                            {category.posts.length}
                                        </span>
                                        <br />
                                        <span style={{ 
                                            fontSize: '0.875rem', 
                                            color: 'var(--text-secondary)' 
                                        }}>
                                            Articles
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Blog;