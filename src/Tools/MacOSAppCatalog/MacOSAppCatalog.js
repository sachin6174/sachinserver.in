import React, { useState, useEffect } from 'react';
import './MacOSAppCatalog.css';

const MacOSAppCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFormat, setSelectedFormat] = useState('all');
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    const disclaimerAccepted = localStorage.getItem('macOSAppCatalogDisclaimerAccepted');
    
    useEffect(() => {
        if (disclaimerAccepted) {
            setShowDisclaimer(false);
        }
    }, [disclaimerAccepted]);

    const handleDisclaimerAccept = () => {
        localStorage.setItem('macOSAppCatalogDisclaimerAccepted', 'true');
        setShowDisclaimer(false);
    };

    const dmgApps = [
        {
            id: 'chrome',
            name: 'Google Chrome',
            icon: '🌐',
            size: '~80MB',
            url: 'https://www.google.com/chrome/',
            category: 'browsers',
            format: 'dmg',
            description: 'Popular web browser by Google',
            official: true
        },
        {
            id: 'anydesk',
            name: 'AnyDesk',
            icon: '💻',
            size: '~15MB',
            url: 'https://anydesk.com/download',
            category: 'utilities',
            format: 'dmg',
            description: 'Remote desktop software',
            official: true
        },
        {
            id: 'android-file-transfer',
            name: 'Android File Transfer',
            icon: '📱',
            size: '~12MB',
            url: 'https://www.android.com/filetransfer/',
            category: 'utilities',
            format: 'dmg',
            description: 'Transfer files between Android and Mac',
            official: true
        },
        {
            id: 'figma',
            name: 'Figma',
            icon: '🎨',
            size: '~120MB',
            url: 'https://www.figma.com/downloads/',
            category: 'design',
            format: 'dmg',
            description: 'Collaborative design tool',
            official: true
        },
        {
            id: 'discord',
            name: 'Discord',
            icon: '💬',
            size: '~150MB',
            url: 'https://discord.com/download',
            category: 'communication',
            format: 'dmg',
            description: 'Voice and text chat for gamers',
            official: true
        },
        {
            id: 'android-studio',
            name: 'Android Studio',
            icon: '🤖',
            size: '~1.2GB',
            url: 'https://developer.android.com/studio',
            category: 'development',
            format: 'dmg',
            description: 'Official Android development environment',
            official: true
        },
        {
            id: 'vlc',
            name: 'VLC Media Player',
            icon: '🎬',
            size: '~45MB',
            url: 'https://www.videolan.org/vlc/',
            category: 'media',
            format: 'dmg',
            description: 'Free media player',
            official: true
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            icon: '💬',
            size: '~70MB',
            url: 'https://www.whatsapp.com/download',
            category: 'communication',
            format: 'dmg',
            description: 'Popular messaging app',
            official: true
        },
        {
            id: 'telegram',
            name: 'Telegram',
            icon: '✈️',
            size: '~35MB',
            url: 'https://desktop.telegram.org/',
            category: 'communication',
            format: 'dmg',
            description: 'Secure messaging app',
            official: true
        },
        {
            id: 'db-browser-sqlite',
            name: 'DB Browser for SQLite',
            icon: '🗄️',
            size: '~20MB',
            url: 'https://sqlitebrowser.org/dl/',
            category: 'development',
            format: 'dmg',
            description: 'SQLite database browser',
            official: true
        },
        {
            id: 'sf-symbols',
            name: 'SF Symbols 6',
            icon: '🔣',
            size: '~8MB',
            url: 'https://developer.apple.com/sf-symbols/',
            category: 'design',
            format: 'dmg',
            description: 'Apple\'s symbol library',
            official: true
        },
        {
            id: 'notion',
            name: 'Notion',
            icon: '📝',
            size: '~130MB',
            url: 'https://www.notion.so/desktop',
            category: 'productivity',
            format: 'dmg',
            description: 'All-in-one workspace',
            official: true
        },
        {
            id: 'spotify',
            name: 'Spotify',
            icon: '🎵',
            size: '~110MB',
            url: 'https://www.spotify.com/download/',
            category: 'media',
            format: 'dmg',
            description: 'Music streaming service',
            official: true
        },
        {
            id: 'brave',
            name: 'Brave Browser',
            icon: '🦁',
            size: '~180MB',
            url: 'https://brave.com/download/',
            category: 'browsers',
            format: 'dmg',
            description: 'Privacy-focused web browser',
            official: true
        },
        {
            id: 'libreoffice',
            name: 'LibreOffice',
            icon: '📊',
            size: '~400MB',
            url: 'https://www.libreoffice.org/download/',
            category: 'productivity',
            format: 'dmg',
            description: 'Free office suite',
            official: true
        },
        {
            id: 'audacity',
            name: 'Audacity',
            icon: '🎵',
            size: '~45MB',
            url: 'https://www.audacityteam.org/download/',
            category: 'media',
            format: 'dmg',
            description: 'Free audio editor',
            official: true
        },
        {
            id: 'steam',
            name: 'Steam',
            icon: '🎮',
            size: '~3MB',
            url: 'https://store.steampowered.com/about/',
            category: 'gaming',
            format: 'dmg',
            description: 'PC gaming platform',
            official: true
        },
        {
            id: 'opera',
            name: 'Opera Browser',
            icon: '🌍',
            size: '~120MB',
            url: 'https://www.opera.com/download',
            category: 'browsers',
            format: 'dmg',
            description: 'Feature-rich web browser',
            official: true
        },
        {
            id: 'alfred',
            name: 'Alfred',
            icon: '🔍',
            size: '~5MB',
            url: 'https://www.alfredapp.com/',
            category: 'utilities',
            format: 'dmg',
            description: 'Productivity app for macOS',
            official: true
        },
        {
            id: 'bitwarden',
            name: 'Bitwarden',
            icon: '🔐',
            size: '~85MB',
            url: 'https://bitwarden.com/download/',
            category: 'security',
            format: 'dmg',
            description: 'Password manager',
            official: true
        },
        {
            id: 'obsidian',
            name: 'Obsidian',
            icon: '📝',
            size: '~85MB',
            url: 'https://obsidian.md/download',
            category: 'productivity',
            format: 'dmg',
            description: 'Knowledge management tool',
            official: true
        },
        {
            id: 'minecraft',
            name: 'Minecraft',
            icon: '🎮',
            size: '~2MB',
            url: 'https://www.minecraft.net/download',
            category: 'gaming',
            format: 'dmg',
            description: 'Popular sandbox game',
            official: true
        }
    ];

    const pkgApps = [
        {
            id: 'chrome-pkg',
            name: 'Google Chrome',
            icon: '🌐',
            size: '~80MB',
            url: 'https://www.google.com/chrome/',
            category: 'browsers',
            format: 'pkg',
            description: 'Popular web browser by Google',
            official: true
        },
        {
            id: 'mactex',
            name: 'MacTeX',
            icon: '📚',
            size: '~4GB',
            url: 'https://www.tug.org/mactex/',
            category: 'development',
            format: 'pkg',
            description: 'TeX Live distribution for macOS',
            official: true
        },
        {
            id: 'python',
            name: 'Python',
            icon: '🐍',
            size: '~50MB',
            url: 'https://www.python.org/downloads/',
            category: 'development',
            format: 'pkg',
            description: 'Python programming language',
            official: true
        },
        {
            id: 'zoom',
            name: 'Zoom',
            icon: '📹',
            size: '~80MB',
            url: 'https://zoom.us/download',
            category: 'communication',
            format: 'pkg',
            description: 'Video conferencing software',
            official: true
        },
        {
            id: 'java',
            name: 'Java JDK',
            icon: '☕',
            size: '~200MB',
            url: 'https://www.oracle.com/java/technologies/downloads/',
            category: 'development',
            format: 'pkg',
            description: 'Java Development Kit',
            official: true
        },
        {
            id: 'r-lang',
            name: 'R',
            icon: '📊',
            size: '~90MB',
            url: 'https://cran.r-project.org/bin/macosx/',
            category: 'development',
            format: 'pkg',
            description: 'Statistical computing language',
            official: true
        },
        {
            id: 'nodejs',
            name: 'Node.js',
            icon: '🎯',
            size: '~45MB',
            url: 'https://nodejs.org/en/download/',
            category: 'development',
            format: 'pkg',
            description: 'JavaScript runtime',
            official: true
        },
        {
            id: 'anaconda',
            name: 'Anaconda',
            icon: '📊',
            size: '~800MB',
            url: 'https://www.anaconda.com/download',
            category: 'development',
            format: 'pkg',
            description: 'Python data science platform',
            official: true
        },
        {
            id: 'git',
            name: 'Git',
            icon: '🔧',
            size: '~50MB',
            url: 'https://git-scm.com/download/mac',
            category: 'development',
            format: 'pkg',
            description: 'Version control system',
            official: true
        }
    ];

    const zipApps = [
        {
            id: 'vscode',
            name: 'Visual Studio Code',
            icon: '💻',
            size: '~180MB',
            url: 'https://code.visualstudio.com/download',
            category: 'development',
            format: 'zip',
            description: 'Popular code editor',
            official: true
        },
        {
            id: 'cursor',
            name: 'Cursor IDE',
            icon: '🎯',
            size: '~220MB',
            url: 'https://cursor.sh/',
            category: 'development',
            format: 'zip',
            description: 'AI-powered code editor',
            official: true
        },
        {
            id: 'sublime',
            name: 'Sublime Text',
            icon: '🚀',
            size: '~25MB',
            url: 'https://www.sublimetext.com/download',
            category: 'development',
            format: 'zip',
            description: 'Sophisticated text editor',
            official: true
        },
        {
            id: 'postman',
            name: 'Postman',
            icon: '🔧',
            size: '~200MB',
            url: 'https://www.postman.com/downloads/',
            category: 'development',
            format: 'zip',
            description: 'API development tool',
            official: true
        },
        {
            id: 'the-unarchiver',
            name: 'The Unarchiver',
            icon: '🗂️',
            size: '~5MB',
            url: 'https://theunarchiver.com/',
            category: 'utilities',
            format: 'zip',
            description: 'Archive extraction tool',
            official: true
        },
        {
            id: '1password',
            name: '1Password',
            icon: '🔐',
            size: '~85MB',
            url: 'https://1password.com/downloads/',
            category: 'security',
            format: 'zip',
            description: 'Password manager',
            official: true
        },
        {
            id: 'iterm2',
            name: 'iTerm2',
            icon: '🖥️',
            size: '~8MB',
            url: 'https://iterm2.com/',
            category: 'utilities',
            format: 'zip',
            description: 'Terminal emulator',
            official: true
        },
        {
            id: 'imageoptim',
            name: 'ImageOptim',
            icon: '🖼️',
            size: '~4MB',
            url: 'https://imageoptim.com/',
            category: 'utilities',
            format: 'zip',
            description: 'Image optimization tool',
            official: true
        }
    ];

    const allApps = [...dmgApps, ...pkgApps, ...zipApps];

    const categories = [
        { id: 'all', name: 'All Categories', icon: '📱' },
        { id: 'browsers', name: 'Web Browsers', icon: '🌐' },
        { id: 'development', name: 'Development', icon: '💻' },
        { id: 'design', name: 'Design', icon: '🎨' },
        { id: 'productivity', name: 'Productivity', icon: '📝' },
        { id: 'communication', name: 'Communication', icon: '💬' },
        { id: 'media', name: 'Media', icon: '🎵' },
        { id: 'utilities', name: 'Utilities', icon: '🔧' },
        { id: 'gaming', name: 'Gaming', icon: '🎮' },
        { id: 'security', name: 'Security', icon: '🔐' }
    ];

    const formats = [
        { id: 'all', name: 'All Formats', icon: '📦' },
        { id: 'dmg', name: 'DMG Files', icon: '💿' },
        { id: 'pkg', name: 'PKG Files', icon: '📦' },
        { id: 'zip', name: 'ZIP Files', icon: '🗂️' }
    ];

    const filteredApps = allApps.filter(app => {
        const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
        const matchesFormat = selectedFormat === 'all' || app.format === selectedFormat;
        const matchesSearch = searchTerm === '' || 
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesFormat && matchesSearch;
    });

    if (showDisclaimer) {
        return (
            <div className="disclaimer-overlay">
                <div className="disclaimer-modal">
                    <div className="disclaimer-header">
                        <h2>⚠️ Important Disclaimer</h2>
                    </div>
                    <div className="disclaimer-content">
                        <p><strong>Security Notice:</strong></p>
                        <ul>
                            <li>This catalog provides links to official download pages, not direct download links</li>
                            <li>Always verify downloads are from official sources</li>
                            <li>Check digital signatures and certificates before installing</li>
                            <li>Use antivirus software to scan downloaded files</li>
                            <li>Be cautious of modified or unofficial versions</li>
                        </ul>
                        <p><strong>Responsibility:</strong> You are responsible for verifying the safety and legitimacy of any software you download and install.</p>
                    </div>
                    <div className="disclaimer-actions">
                        <button onClick={handleDisclaimerAccept} className="accept-btn">
                            I Understand & Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="macos-app-catalog">
            <div className="header-section">
                <h2 className="page-title">macOS Application Catalog</h2>
                <p className="page-description">
                    Curated collection of popular macOS applications with official download links
                </p>
            </div>

            <div className="controls-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="filters-container">
                    <div className="filter-group">
                        <label>Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Format:</label>
                        <select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            className="filter-select"
                        >
                            {formats.map(format => (
                                <option key={format.id} value={format.id}>
                                    {format.icon} {format.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <span className="stat-number">{filteredApps.length}</span>
                    <span className="stat-label">Applications</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{dmgApps.length}</span>
                    <span className="stat-label">DMG Files</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{pkgApps.length}</span>
                    <span className="stat-label">PKG Files</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{zipApps.length}</span>
                    <span className="stat-label">ZIP Files</span>
                </div>
            </div>

            <div className="apps-grid">
                {filteredApps.map(app => (
                    <div key={app.id} className="app-card">
                        <div className="app-header">
                            <div className="app-icon">{app.icon}</div>
                            <div className="app-badges">
                                <span className={`format-badge ${app.format}`}>
                                    {app.format.toUpperCase()}
                                </span>
                                {app.official && (
                                    <span className="official-badge">✓ Official</span>
                                )}
                            </div>
                        </div>
                        
                        <h3 className="app-name">{app.name}</h3>
                        <p className="app-description">{app.description}</p>
                        
                        <div className="app-details">
                            <div className="app-size">
                                <span className="detail-label">Size:</span>
                                <span className="detail-value">{app.size}</span>
                            </div>
                            <div className="app-category">
                                <span className="detail-label">Category:</span>
                                <span className="detail-value">
                                    {categories.find(c => c.id === app.category)?.name}
                                </span>
                            </div>
                        </div>
                        
                        <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn"
                        >
                            <span className="download-icon">⬇️</span>
                            Visit Official Site
                        </a>
                    </div>
                ))}
            </div>

            {filteredApps.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No applications found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            )}

            <div className="footer-section">
                <div className="safety-notice">
                    <h3>🔒 Safety Reminder</h3>
                    <p>Always download software from official sources and verify digital signatures before installation.</p>
                </div>
                
                <div className="additional-resources">
                    <h3>📚 Additional Resources</h3>
                    <ul>
                        <li>
                            <a href="https://support.apple.com/downloads" target="_blank" rel="noopener noreferrer">
                                Apple Support Downloads
                            </a>
                        </li>
                        <li>
                            <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer">
                                Homebrew Package Manager
                            </a>
                        </li>
                        <li>
                            <a href="https://www.macports.org/" target="_blank" rel="noopener noreferrer">
                                MacPorts
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MacOSAppCatalog;