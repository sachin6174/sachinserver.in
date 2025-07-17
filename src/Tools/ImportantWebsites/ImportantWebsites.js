import React, { useState, useEffect } from 'react';
import './ImportantWebsites.css';

const ImportantWebsites = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('importantWebsitesFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('importantWebsitesFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (websiteId) => {
        setFavorites(prev => 
            prev.includes(websiteId) 
                ? prev.filter(id => id !== websiteId)
                : [...prev, websiteId]
        );
    };

    const websites = [
        // Developer Tools
        {
            id: 'github',
            name: 'GitHub',
            url: 'https://github.com',
            description: 'Git repository hosting service',
            category: 'developer',
            icon: '💻',
            tags: ['git', 'code', 'repository', 'collaboration']
        },
        {
            id: 'stackoverflow',
            name: 'Stack Overflow',
            url: 'https://stackoverflow.com',
            description: 'Q&A platform for developers',
            category: 'developer',
            icon: '❓',
            tags: ['questions', 'answers', 'coding', 'help']
        },
        {
            id: 'mdn',
            name: 'MDN Web Docs',
            url: 'https://developer.mozilla.org',
            description: 'Web development documentation',
            category: 'developer',
            icon: '📚',
            tags: ['documentation', 'web', 'javascript', 'html', 'css']
        },
        {
            id: 'codepen',
            name: 'CodePen',
            url: 'https://codepen.io',
            description: 'Frontend code playground',
            category: 'developer',
            icon: '🎨',
            tags: ['frontend', 'playground', 'demo', 'css', 'javascript']
        },
        {
            id: 'npmjs',
            name: 'npm',
            url: 'https://www.npmjs.com',
            description: 'Node.js package manager',
            category: 'developer',
            icon: '📦',
            tags: ['nodejs', 'packages', 'javascript', 'npm']
        },
        {
            id: 'overleaf',
            name: 'Overleaf',
            url: 'https://www.overleaf.com/project',
            description: 'LaTeX resume creator and collaborative editor',
            category: 'utilities',
            icon: '📄',
            tags: ['latex', 'resume', 'cv', 'editor', 'collaboration', 'academic']
        },

        // Design & UI
        {
            id: 'dribbble',
            name: 'Dribbble',
            url: 'https://dribbble.com',
            description: 'Design inspiration community',
            category: 'design',
            icon: '🎨',
            tags: ['design', 'inspiration', 'ui', 'creative']
        },
        {
            id: 'behance',
            name: 'Behance',
            url: 'https://www.behance.net',
            description: 'Creative portfolio platform',
            category: 'design',
            icon: '🖼️',
            tags: ['portfolio', 'creative', 'design', 'artwork']
        },
        {
            id: 'figma',
            name: 'Figma',
            url: 'https://www.figma.com',
            description: 'Collaborative design tool',
            category: 'design',
            icon: '🎯',
            tags: ['design', 'ui', 'collaboration', 'prototyping']
        },
        {
            id: 'unsplash',
            name: 'Unsplash',
            url: 'https://unsplash.com',
            description: 'Free high-quality photos',
            category: 'design',
            icon: '📸',
            tags: ['photos', 'free', 'stock', 'images']
        },

        // Productivity
        {
            id: 'notion',
            name: 'Notion',
            url: 'https://www.notion.so',
            description: 'All-in-one workspace',
            category: 'productivity',
            icon: '📝',
            tags: ['notes', 'workspace', 'organization', 'productivity']
        },
        {
            id: 'trello',
            name: 'Trello',
            url: 'https://trello.com',
            description: 'Project management boards',
            category: 'productivity',
            icon: '📋',
            tags: ['project', 'management', 'boards', 'tasks']
        },
        {
            id: 'todoist',
            name: 'Todoist',
            url: 'https://todoist.com',
            description: 'Task management app',
            category: 'productivity',
            icon: '✅',
            tags: ['tasks', 'todo', 'productivity', 'planning']
        },

        // Learning & Education
        {
            id: 'coursera',
            name: 'Coursera',
            url: 'https://www.coursera.org',
            description: 'Online courses and degrees',
            category: 'education',
            icon: '🎓',
            tags: ['courses', 'education', 'learning', 'university']
        },
        {
            id: 'freecodecamp',
            name: 'freeCodeCamp',
            url: 'https://www.freecodecamp.org',
            description: 'Free coding bootcamp',
            category: 'education',
            icon: '🔥',
            tags: ['coding', 'free', 'bootcamp', 'programming']
        },
        {
            id: 'khanacademy',
            name: 'Khan Academy',
            url: 'https://www.khanacademy.org',
            description: 'Free online education',
            category: 'education',
            icon: '📖',
            tags: ['education', 'free', 'learning', 'academy']
        },

        // Utilities
        {
            id: 'speedtest',
            name: 'Speedtest',
            url: 'https://www.speedtest.net',
            description: 'Internet speed test',
            category: 'utilities',
            icon: '⚡',
            tags: ['speed', 'internet', 'test', 'network']
        },
        {
            id: 'downdetector',
            name: 'Downdetector',
            url: 'https://downdetector.com',
            description: 'Website outage monitoring',
            category: 'utilities',
            icon: '📊',
            tags: ['outage', 'monitoring', 'status', 'downtime']
        },
        {
            id: 'regex101',
            name: 'regex101',
            url: 'https://regex101.com',
            description: 'Regular expression tester',
            category: 'utilities',
            icon: '🔍',
            tags: ['regex', 'testing', 'pattern', 'matching']
        },

        // Entertainment
        {
            id: 'youtube',
            name: 'YouTube',
            url: 'https://www.youtube.com',
            description: 'Video sharing platform',
            category: 'entertainment',
            icon: '📺',
            tags: ['video', 'entertainment', 'streaming', 'content']
        },
        {
            id: 'spotify',
            name: 'Spotify',
            url: 'https://open.spotify.com',
            description: 'Music streaming service',
            category: 'entertainment',
            icon: '🎵',
            tags: ['music', 'streaming', 'playlist', 'audio']
        },
        {
            id: 'reddit',
            name: 'Reddit',
            url: 'https://www.reddit.com',
            description: 'Social news aggregation',
            category: 'entertainment',
            icon: '🤖',
            tags: ['social', 'news', 'discussion', 'community']
        }
    ];

    const categories = [
        { id: 'all', name: 'All', icon: '🌐' },
        { id: 'developer', name: 'Developer', icon: '💻' },
        { id: 'design', name: 'Design', icon: '🎨' },
        { id: 'productivity', name: 'Productivity', icon: '📝' },
        { id: 'education', name: 'Education', icon: '🎓' },
        { id: 'utilities', name: 'Utilities', icon: '🔧' },
        { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
    ];

    const filteredWebsites = websites.filter(website => {
        const matchesCategory = selectedCategory === 'all' || website.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
            website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            website.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            website.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    const favoriteWebsites = websites.filter(website => favorites.includes(website.id));

    return (
        <div className="important-websites-container">
            <div className="header-section">
                <h2 className="page-title">Important Websites</h2>
                <p className="page-description">
                    Curated collection of useful websites for developers, designers, and productivity enthusiasts
                </p>
            </div>

            <div className="controls-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search websites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        >
                            <span className="category-icon">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h3 className="section-title">
                        <span className="section-icon">⭐</span>
                        Favorites
                    </h3>
                    <div className="websites-grid">
                        {favoriteWebsites.map(website => (
                            <div key={website.id} className="website-card favorite">
                                <div className="card-header">
                                    <div className="website-icon">{website.icon}</div>
                                    <button
                                        onClick={() => toggleFavorite(website.id)}
                                        className="favorite-btn active"
                                        title="Remove from favorites"
                                    >
                                        ⭐
                                    </button>
                                </div>
                                <h4 className="website-name">{website.name}</h4>
                                <p className="website-description">{website.description}</p>
                                <div className="website-tags">
                                    {website.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <a
                                    href={website.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="visit-btn"
                                >
                                    Visit Website
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="websites-section">
                <h3 className="section-title">
                    <span className="section-icon">🌐</span>
                    {selectedCategory === 'all' ? 'All Websites' : categories.find(c => c.id === selectedCategory)?.name}
                    <span className="results-count">({filteredWebsites.length})</span>
                </h3>
                
                <div className="websites-grid">
                    {filteredWebsites.map(website => (
                        <div key={website.id} className="website-card">
                            <div className="card-header">
                                <div className="website-icon">{website.icon}</div>
                                <button
                                    onClick={() => toggleFavorite(website.id)}
                                    className={`favorite-btn ${favorites.includes(website.id) ? 'active' : ''}`}
                                    title={favorites.includes(website.id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    {favorites.includes(website.id) ? '⭐' : '☆'}
                                </button>
                            </div>
                            <h4 className="website-name">{website.name}</h4>
                            <p className="website-description">{website.description}</p>
                            <div className="website-tags">
                                {website.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <a
                                href={website.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="visit-btn"
                            >
                                Visit Website
                            </a>
                        </div>
                    ))}
                </div>

                {filteredWebsites.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h4>No websites found</h4>
                        <p>Try adjusting your search or category filter</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImportantWebsites;