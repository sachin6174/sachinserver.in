import React, { useState } from 'react';
import '../shared-styles.css';
import './MacTerminalScripts.css';

const MacTerminalScripts = () => {
    const [selectedCategory, setSelectedCategory] = useState('system');

    const scriptCategories = {
        system: {
            title: "System Management",
            icon: "🖥️",
            scripts: [
                {
                    name: "System Information",
                    command: "system_profiler SPHardwareDataType",
                    description: "Display detailed system hardware information",
                    usage: "Get complete hardware specs including CPU, memory, and serial numbers"
                },
                {
                    name: "Memory Usage",
                    command: "vm_stat | head -15",
                    description: "Show virtual memory statistics",
                    usage: "Monitor memory pressure and swap usage"
                },
                {
                    name: "Disk Usage",
                    command: "df -h",
                    description: "Display disk space usage in human readable format",
                    usage: "Check available disk space on all mounted volumes"
                },
                {
                    name: "Process Monitor",
                    command: "top -l 1 -n 10",
                    description: "Show top 10 processes by CPU usage",
                    usage: "Quick snapshot of resource-intensive processes"
                },
                {
                    name: "Network Info",
                    command: "ifconfig | grep inet",
                    description: "Display all network interface IP addresses",
                    usage: "Get IP addresses for all active network interfaces"
                }
            ]
        },
        maintenance: {
            title: "System Maintenance",
            icon: "🔧",
            scripts: [
                {
                    name: "Clear DNS Cache",
                    command: "sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder",
                    description: "Flush DNS cache to resolve network issues",
                    usage: "Fix DNS resolution problems and refresh network connections"
                },
                {
                    name: "Rebuild Launch Services",
                    command: "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user",
                    description: "Rebuild the Launch Services database",
                    usage: "Fix issues with file associations and 'Open With' menu"
                },
                {
                    name: "Clear System Caches",
                    command: "sudo rm -rf /System/Library/Caches/* && sudo rm -rf /Library/Caches/*",
                    description: "Clear system-level cache files",
                    usage: "Free up space and resolve system performance issues"
                },
                {
                    name: "Reset Spotlight Index",
                    command: "sudo mdutil -E /",
                    description: "Rebuild Spotlight search index",
                    usage: "Fix Spotlight search problems and missing results"
                },
                {
                    name: "Repair Permissions",
                    command: "sudo /usr/libexec/repair_packages --repair --standard-pkgs --volume /",
                    description: "Repair system file permissions",
                    usage: "Fix permission-related issues and system stability"
                }
            ]
        },
        productivity: {
            title: "Productivity Scripts",
            icon: "⚡",
            scripts: [
                {
                    name: "Hide Desktop Icons",
                    command: "defaults write com.apple.finder CreateDesktop false && killall Finder",
                    description: "Hide all desktop icons for a clean look",
                    usage: "Create a minimalist desktop appearance"
                },
                {
                    name: "Show Desktop Icons",
                    command: "defaults write com.apple.finder CreateDesktop true && killall Finder",
                    description: "Restore desktop icons visibility",
                    usage: "Bring back desktop icons after hiding them"
                },
                {
                    name: "Enable Hidden Files",
                    command: "defaults write com.apple.finder AppleShowAllFiles true && killall Finder",
                    description: "Show hidden files and folders in Finder",
                    usage: "Access system files and hidden directories"
                },
                {
                    name: "Disable Hidden Files",
                    command: "defaults write com.apple.finder AppleShowAllFiles false && killall Finder",
                    description: "Hide system files and folders in Finder",
                    usage: "Return to default Finder view without clutter"
                },
                {
                    name: "Screenshot Format to PNG",
                    command: "defaults write com.apple.screencapture type png && killall SystemUIServer",
                    description: "Set screenshot format to PNG",
                    usage: "Change default screenshot format for better quality"
                }
            ]
        },
        development: {
            title: "Development Tools",
            icon: "💻",
            scripts: [
                {
                    name: "Show Git Branch in Terminal",
                    command: "echo 'parse_git_branch() { git branch 2> /dev/null | sed -e \"/^[^*]/d\" -e \"s/* \\(.*\\)/[\\1]/\"; }' >> ~/.zshrc && echo 'PS1=\"\\[\\033[32m\\]\\w\\[\\033[33m\\]\\$(parse_git_branch)\\[\\033[00m\\] $ \"' >> ~/.zshrc",
                    description: "Add Git branch display to terminal prompt",
                    usage: "Always see current Git branch in terminal prompt"
                },
                {
                    name: "Kill Process by Port",
                    command: "lsof -ti:3000 | xargs kill -9",
                    description: "Kill process running on port 3000",
                    usage: "Free up development ports (change 3000 to desired port)"
                },
                {
                    name: "List Open Ports",
                    command: "lsof -i -P -n | grep LISTEN",
                    description: "Show all processes listening on network ports",
                    usage: "Debug network services and find port conflicts"
                },
                {
                    name: "Install Xcode Command Line Tools",
                    command: "xcode-select --install",
                    description: "Install essential development tools",
                    usage: "Set up basic development environment on new Mac"
                },
                {
                    name: "Check Node.js Version",
                    command: "node --version && npm --version",
                    description: "Display Node.js and npm versions",
                    usage: "Verify development environment setup"
                }
            ]
        },
        security: {
            title: "Security & Privacy",
            icon: "🔒",
            scripts: [
                {
                    name: "Generate SSH Key",
                    command: "ssh-keygen -t rsa -b 4096 -C \"your.email@example.com\"",
                    description: "Generate a new SSH key pair",
                    usage: "Create SSH keys for secure remote connections"
                },
                {
                    name: "View WiFi Password",
                    command: "security find-generic-password -wa WIFI_NAME",
                    description: "Retrieve saved WiFi password (replace WIFI_NAME)",
                    usage: "Recover forgotten WiFi passwords from Keychain"
                },
                {
                    name: "Lock Screen Immediately",
                    command: "pmset displaysleepnow",
                    description: "Instantly lock the screen",
                    usage: "Quick screen lock for security when leaving desk"
                },
                {
                    name: "Check File Integrity",
                    command: "shasum -a 256 filename.ext",
                    description: "Generate SHA-256 checksum for file verification",
                    usage: "Verify file integrity and detect tampering"
                },
                {
                    name: "View Certificate Info",
                    command: "openssl x509 -in certificate.crt -text -noout",
                    description: "Display SSL certificate details",
                    usage: "Examine certificate validity and information"
                }
            ]
        }
    };

    const copyToClipboard = (command) => {
        navigator.clipboard.writeText(command).then(() => {
            // Could add a toast notification here
        });
    };

    return (
        <div className="leftbrain-container terminal-theme">
            <div className="simple-header">
                <h1>Mac Terminal Scripts</h1>
                <p>Essential macOS terminal commands and automation scripts</p>
            </div>

            <div className="section">
                <h2>Script Categories</h2>
                <div className="filter-buttons">
                    {Object.entries(scriptCategories).map(([key, category]) => (
                        <button
                            key={key}
                            className={`leftbrain-button ${selectedCategory === key ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(key)}
                        >
                            <span>{category.icon}</span>
                            <span>{category.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>{scriptCategories[selectedCategory].title}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Click any command to copy to clipboard</p>

                <div className="cards-container">
                    {scriptCategories[selectedCategory].scripts.map((script, index) => (
                        <div key={index} className="theme-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3>{script.name}</h3>
                                <button
                                    className="leftbrain-button"
                                    onClick={() => copyToClipboard(script.command)}
                                    title="Copy to clipboard"
                                    style={{ minWidth: 'auto', padding: '0.5rem' }}
                                >
                                    📋
                                </button>
                            </div>

                            <div className="code-block" onClick={() => copyToClipboard(script.command)} style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                                <pre><code>{script.command}</code></pre>
                            </div>

                            <p style={{ marginBottom: '1rem' }}>{script.description}</p>
                            <div style={{ padding: '1rem', background: 'var(--background-secondary)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--current-theme)' }}>
                                <strong style={{ color: 'var(--current-theme)' }}>Usage:</strong> {script.usage}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>💡 Terminal Tips</h2>
                <ul className="feature-list">
                    <li><strong>Sudo Commands:</strong> Commands with 'sudo' require administrator password</li>
                    <li><strong>Backup First:</strong> Always backup important data before running system commands</li>
                    <li><strong>Tab Completion:</strong> Use Tab key to auto-complete file paths and commands</li>
                    <li><strong>Command History:</strong> Use ↑/↓ arrows to navigate through command history</li>
                    <li><strong>Manual Pages:</strong> Type 'man command_name' to read detailed command documentation</li>
                </ul>
            </div>
        </div>
    );
};

export default MacTerminalScripts;
