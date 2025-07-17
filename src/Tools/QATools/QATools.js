import React, { useState } from 'react';
import './QATools.css';

const QATools = () => {
    const [activeSection, setActiveSection] = useState('dmg');
    
    const dmgApps = [
        { name: "Google Chrome", emoji: "🌐", size: "~80MB", url: "https://dl.google.com/chrome/mac/universal/stable/GGRO/googlechrome.dmg" },
        { name: "Any Desk", emoji: "💻", size: "~15MB", url: "https://download.anydesk.com/anydesk.dmg" },
        { name: "Android File Transfer", emoji: "📱", size: "~12MB", url: "https://dl.google.com/dl/androidjumper/mtp/latest/AndroidFileTransfer.dmg" },
        { name: "MiKTeX", emoji: "📚", size: "~1.5GB", url: "https://miktex.org/download" },
        { name: "GitHub Copilot for Xcode", emoji: "🤖", size: "~30MB", url: "https://github.com/github/CopilotForXcode/releases/latest" },
        { name: "WhatsApp", emoji: "💬", size: "~70MB", url: "https://web.whatsapp.com/desktop/mac_native/release/?configuration=Release" },
        { name: "Telegram", emoji: "✈️", size: "~35MB", url: "https://td.telegram.org/tmac/tsetup.5.10.7.dmg" },
        { name: "DB Browser for SQLite", emoji: "🗄️", size: "~20MB", url: "https://download.sqlitebrowser.org/DB.Browser.for.SQLite-v3.13.1.dmg" },
        { name: "SF Symbol 6", emoji: "🔤", size: "~8MB", url: "https://devimages-cdn.apple.com/design/resources/download/SF-Symbols-6.dmg" },
        { name: "Figma", emoji: "🎨", size: "~120MB", url: "https://desktop.figma.com/mac-installer/Figma.dmg" },
        { name: "Discord", emoji: "🎮", size: "~150MB", url: "https://stable.dl2.discordapp.net/apps/osx/0.0.329/Discord.dmg" },
        { name: "Android Studio", emoji: "📱", size: "~1.2GB", url: "https://developer.android.com/studio" },
        { name: "VLC", emoji: "🎬", size: "~45MB", url: "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-universal.dmg" },
        { name: "Hopper Disassembler", emoji: "🔍", size: "~25MB", url: "https://www.hopperapp.com/downloader/hopperv4/Hopper-5.17.3-demo.dmg" },
        { name: "Xcode", emoji: "🔧", size: "~15GB", url: "https://developer.apple.com/xcode/" },
        { name: "Canva", emoji: "🎨", size: "~95MB", url: "https://www.canva.com/desktop-apps/mac/canva-mac-64-bit.dmg" },
        { name: "Proxyman", emoji: "🔍", size: "~40MB", url: "https://proxyman.io/download/macos" },
        { name: "Notion", emoji: "📝", size: "~130MB", url: "https://desktop-release.notion-static.com/mac/Notion-Latest.dmg" },
        { name: "Wireshark", emoji: "🌐", size: "~45MB", url: "https://www.wireshark.org/download.html" },
        { name: "GIMP", emoji: "🎨", size: "~220MB", url: "https://download.gimp.org/gimp/v2.10/osx/gimp-2.10.38-x86_64.dmg" },
        { name: "Brave Browser", emoji: "🦁", size: "~180MB", url: "https://laptop-updates.brave.com/latest/osx" }
    ];

    const pkgApps = [
        { name: "Google Chrome", emoji: "🌐", size: "~80MB", url: "https://dl.google.com/dl/chrome/mac/universal/stable/gcem/GoogleChrome.pkg" },
        { name: "MacTeX", emoji: "📚", size: "~4GB", url: "https://tug.org/mactex/mactex-download.html" },
        { name: "Nix Agent", emoji: "🔧", size: "~20MB", url: "https://nixos.org/download.html" },
        { name: "Python", emoji: "🐍", size: "~50MB", url: "https://www.python.org/downloads/macos/" },
        { name: "Zoom", emoji: "📹", size: "~80MB", url: "https://zoom.us/download" },
        { name: "Java JDK", emoji: "☕", size: "~200MB", url: "https://www.oracle.com/java/technologies/downloads/" },
        { name: "R", emoji: "📊", size: "~90MB", url: "https://cloud.r-project.org/bin/macosx/" },
        { name: "Node.js", emoji: "🟢", size: "~45MB", url: "https://nodejs.org/en/download/" },
        { name: "GPG Suite", emoji: "🔐", size: "~35MB", url: "https://gpgtools.org/" },
        { name: "Anaconda", emoji: "🐍", size: "~800MB", url: "https://www.anaconda.com/download/" },
        { name: "Miniconda", emoji: "🐍", size: "~80MB", url: "https://docs.conda.io/en/latest/miniconda.html" },
        { name: "Git", emoji: "🌿", size: "~50MB", url: "https://git-scm.com/download/mac" },
        { name: "VPN Client", emoji: "🌐", size: "~80MB", url: "https://www.vpnclient.app/download/" },
        { name: "OpenVPN Connect", emoji: "🔐", size: "~25MB", url: "https://openvpn.net/client/" },
        { name: "Unity Hub", emoji: "🎮", size: "~150MB", url: "https://unity.com/download" }
    ];

    const zipApps = [
        { name: "VSCode", emoji: "💻", size: "~180MB", url: "https://code.visualstudio.com/download" },
        { name: "Cursor IDE", emoji: "🖱️", size: "~220MB", url: "https://www.cursor.com/" },
        { name: "Sublime Text", emoji: "📝", size: "~25MB", url: "https://www.sublimetext.com/download" },
        { name: "Sketch", emoji: "🎨", size: "~140MB", url: "https://www.sketch.com/downloads/mac/" },
        { name: "Postman", emoji: "📮", size: "~200MB", url: "https://www.postman.com/downloads/" },
        { name: "The Unarchiver", emoji: "🗂️", size: "~5MB", url: "https://theunarchiver.com/" },
        { name: "Spotify", emoji: "🎵", size: "~110MB", url: "https://www.spotify.com/download/mac/" },
        { name: "1Password", emoji: "🔐", size: "~85MB", url: "https://1password.com/downloads/mac/" },
        { name: "ImageOptim", emoji: "🖼️", size: "~4MB", url: "https://imageoptim.com/" },
        { name: "iTerm2", emoji: "🖥️", size: "~8MB", url: "https://iterm2.com/downloads.html" },
        { name: "OpenEmu", emoji: "🎮", size: "~15MB", url: "https://openemu.org/" }
    ];

    const handleDownload = (url, name) => {
        window.open(url, '_blank');
    };

    const handleCopyLink = async (url, name) => {
        try {
            await navigator.clipboard.writeText(url);
            // Show temporary success message
            const button = document.getElementById(`copy-${name.replace(/\s+/g, '-').toLowerCase()}`);
            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#10b981';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    };

    const renderAppTable = (apps, title) => (
        <div className="app-section">
            <h2>{title}</h2>
            <div className="app-grid">
                {apps.map((app, index) => (
                    <div key={index} className="app-card">
                        <div className="app-icon">{app.emoji}</div>
                        <div className="app-info">
                            <h3>{app.name}</h3>
                            <p className="app-size">{app.size}</p>
                        </div>
                        <div className="app-actions">
                            <button 
                                className="download-btn"
                                onClick={() => handleDownload(app.url, app.name)}
                            >
                                📥 Download
                            </button>
                            <button 
                                id={`copy-${app.name.replace(/\s+/g, '-').toLowerCase()}`}
                                className="copy-btn"
                                onClick={() => handleCopyLink(app.url, app.name)}
                                title="Copy download link"
                            >
                                📋 Copy Link
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="qa-tools-container">
            <div className="qa-tools-header">
                <h1>QA Testing Applications</h1>
                <p>macOS applications for quality assurance testing in DMG, PKG, and ZIP formats</p>
            </div>

            <div className="section-tabs">
                <button 
                    className={`section-tab ${activeSection === 'dmg' ? 'active' : ''}`}
                    onClick={() => setActiveSection('dmg')}
                >
                    DMG Applications ({dmgApps.length})
                </button>
                <button 
                    className={`section-tab ${activeSection === 'pkg' ? 'active' : ''}`}
                    onClick={() => setActiveSection('pkg')}
                >
                    PKG Applications ({pkgApps.length})
                </button>
                <button 
                    className={`section-tab ${activeSection === 'zip' ? 'active' : ''}`}
                    onClick={() => setActiveSection('zip')}
                >
                    ZIP Applications ({zipApps.length})
                </button>
            </div>

            <div className="qa-tools-content">
                {activeSection === 'dmg' && renderAppTable(dmgApps, "DMG Applications")}
                {activeSection === 'pkg' && renderAppTable(pkgApps, "PKG Applications")}
                {activeSection === 'zip' && renderAppTable(zipApps, "ZIP Applications")}
            </div>

            <div className="qa-tools-footer">
                <p>
                    <strong>Note:</strong> These applications are provided for quality assurance testing purposes. 
                    Always verify downloads from official sources and scan for malware before installation.
                </p>
                <p>
                    For more applications and versions, visit <a href="https://en.uptodown.com/" target="_blank" rel="noopener noreferrer">Uptodown</a>
                </p>
            </div>
        </div>
    );
};

export default QATools;