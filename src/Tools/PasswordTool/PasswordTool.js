import React, { useState, useCallback, useEffect } from 'react';
import './PasswordTool.css';

const PasswordTool = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeSimilar, setExcludeSimilar] = useState(false);
    const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
    const [customChars, setCustomChars] = useState('');
    const [passwordHistory, setPasswordHistory] = useState([]);
    const [strength, setStrength] = useState(null);
    const [entropyBits, setEntropyBits] = useState(0);

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const similarChars = 'il1Lo0O';
    const ambiguousChars = '{}[]()/\\\'"`~,;<>.?';

    // Calculate password strength
    const calculateStrength = useCallback((pass) => {
        if (!pass) return null;

        let score = 0;
        const checks = {
            length: pass.length >= 12,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            numbers: /[0-9]/.test(pass),
            symbols: /[^A-Za-z0-9]/.test(pass),
            noRepeats: !/(.)\1{2,}/.test(pass),
            noSequential: !/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(pass)
        };

        // Calculate score
        score += checks.length ? 25 : 0;
        score += checks.uppercase ? 10 : 0;
        score += checks.lowercase ? 10 : 0;
        score += checks.numbers ? 10 : 0;
        score += checks.symbols ? 15 : 0;
        score += checks.noRepeats ? 15 : 0;
        score += checks.noSequential ? 15 : 0;

        // Additional length bonus
        if (pass.length >= 16) score += 10;
        if (pass.length >= 20) score += 10;

        let level, color, description;
        if (score < 30) {
            level = 'Very Weak';
            color = '#ef4444';
            description = 'This password is very weak and easily guessable.';
        } else if (score < 50) {
            level = 'Weak';
            color = '#f97316';
            description = 'This password is weak and could be cracked quickly.';
        } else if (score < 70) {
            level = 'Fair';
            color = '#eab308';
            description = 'This password is fair but could be improved.';
        } else if (score < 85) {
            level = 'Good';
            color = '#22c55e';
            description = 'This password is good and reasonably secure.';
        } else {
            level = 'Excellent';
            color = '#16a34a';
            description = 'This password is excellent and very secure.';
        }

        return {
            score,
            level,
            color,
            description,
            checks
        };
    }, []);

    // Calculate entropy
    const calculateEntropy = useCallback((charsetSize, passwordLength) => {
        return Math.log2(Math.pow(charsetSize, passwordLength));
    }, []);

    // Generate password
    const generatePassword = useCallback(() => {
        let charset = '';
        let charsetSize = 0;

        if (customChars.trim()) {
            charset = customChars;
        } else {
            if (includeUppercase) charset += uppercaseChars;
            if (includeLowercase) charset += lowercaseChars;
            if (includeNumbers) charset += numberChars;
            if (includeSymbols) charset += symbolChars;
        }

        if (!charset) {
            setPassword('');
            setStrength(null);
            setEntropyBits(0);
            return;
        }

        // Remove similar/ambiguous characters if requested
        if (excludeSimilar) {
            charset = charset.split('').filter(char => !similarChars.includes(char)).join('');
        }
        if (excludeAmbiguous) {
            charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('');
        }

        // Remove duplicates
        charset = [...new Set(charset)].join('');
        charsetSize = charset.length;

        if (charsetSize === 0) {
            setPassword('');
            setStrength(null);
            setEntropyBits(0);
            return;
        }

        // Generate password
        let newPassword = '';
        const crypto = window.crypto || window.msCrypto;

        if (crypto && crypto.getRandomValues) {
            // Use cryptographically secure random
            const array = new Uint32Array(length);
            crypto.getRandomValues(array);
            for (let i = 0; i < length; i++) {
                newPassword += charset[array[i] % charsetSize];
            }
        } else {
            // Fallback to Math.random (less secure)
            for (let i = 0; i < length; i++) {
                newPassword += charset[Math.floor(Math.random() * charsetSize)];
            }
        }

        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
        setEntropyBits(calculateEntropy(charsetSize, length));

        // Add to history
        const newEntry = {
            password: newPassword,
            timestamp: new Date().toISOString(),
            length: length,
            charset: charset.length
        };
        setPasswordHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
    }, [
        length, includeUppercase, includeLowercase, includeNumbers,
        includeSymbols, excludeSimilar, excludeAmbiguous, customChars,
        calculateStrength, calculateEntropy
    ]);

    // Auto-generate on settings change
    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    // Copy to clipboard
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Could add toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Clear history
    const clearHistory = () => {
        setPasswordHistory([]);
    };

    // Password strength meter component
    const StrengthMeter = ({ strength }) => {
        if (!strength) return null;

        return (
            <div className="strength-meter">
                <div className="strength-header">
                    <span className="strength-label">Password Strength:</span>
                    <span
                        className="strength-level"
                        style={{ color: strength.color }}
                    >
                        {strength.level}
                    </span>
                </div>
                <div className="strength-bar">
                    <div
                        className="strength-fill"
                        style={{
                            width: `${strength.score}%`,
                            backgroundColor: strength.color
                        }}
                    />
                </div>
                <p className="strength-description">{strength.description}</p>

                <div className="strength-checks">
                    <div className={`check-item ${strength.checks.length ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.length ? '✅' : '❌'}</span>
                        <span>At least 12 characters</span>
                    </div>
                    <div className={`check-item ${strength.checks.uppercase ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.uppercase ? '✅' : '❌'}</span>
                        <span>Contains uppercase letters</span>
                    </div>
                    <div className={`check-item ${strength.checks.lowercase ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.lowercase ? '✅' : '❌'}</span>
                        <span>Contains lowercase letters</span>
                    </div>
                    <div className={`check-item ${strength.checks.numbers ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.numbers ? '✅' : '❌'}</span>
                        <span>Contains numbers</span>
                    </div>
                    <div className={`check-item ${strength.checks.symbols ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.symbols ? '✅' : '❌'}</span>
                        <span>Contains symbols</span>
                    </div>
                    <div className={`check-item ${strength.checks.noRepeats ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.noRepeats ? '✅' : '❌'}</span>
                        <span>No repeated characters</span>
                    </div>
                    <div className={`check-item ${strength.checks.noSequential ? 'passed' : 'failed'}`}>
                        <span className="check-icon">{strength.checks.noSequential ? '✅' : '❌'}</span>
                        <span>No sequential patterns</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="password-tool">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h2 className="tool-title">🔐 Password Generator</h2>
                    <p className="tool-subtitle">Generate secure passwords and check their strength</p>
                </div>
            </div>

            <div className="tool-container">
                {/* Password Display */}
                <div className="password-section">
                    <div className="password-display">
                        <div className="password-field">
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className="password-input"
                                placeholder="Generated password will appear here..."
                            />
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(password)}
                                disabled={!password}
                                title="Copy to clipboard"
                            >
                                📋
                            </button>
                        </div>
                        <div className="password-actions">
                            <button
                                className="tool-button"
                                onClick={generatePassword}
                            >
                                🔄 Generate New Password
                            </button>
                            <div className="entropy-info">
                                <span className="entropy-label">Entropy:</span>
                                <span className="entropy-value">{entropyBits.toFixed(1)} bits</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="settings-section">
                    <h3>⚙️ Password Settings</h3>

                    <div className="setting-group">
                        <label htmlFor="length">Password Length: {length}</label>
                        <input
                            id="length"
                            type="range"
                            min="4"
                            max="128"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="length-slider"
                        />
                        <div className="length-marks">
                            <span>4</span>
                            <span>16</span>
                            <span>32</span>
                            <span>64</span>
                            <span>128</span>
                        </div>
                    </div>

                    <div className="character-options">
                        <h4>Character Types</h4>
                        <div className="checkbox-grid">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={includeUppercase}
                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Uppercase Letters</span>
                                    <span className="checkbox-example">(A-Z)</span>
                                </span>
                            </label>

                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={includeLowercase}
                                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Lowercase Letters</span>
                                    <span className="checkbox-example">(a-z)</span>
                                </span>
                            </label>

                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Numbers</span>
                                    <span className="checkbox-example">(0-9)</span>
                                </span>
                            </label>

                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={includeSymbols}
                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Symbols</span>
                                    <span className="checkbox-example">(!@#$%^&*)</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="exclusion-options">
                        <h4>Exclusion Options</h4>
                        <div className="checkbox-grid">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={excludeSimilar}
                                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Exclude Similar Characters</span>
                                    <span className="checkbox-example">(i, l, 1, L, o, 0, O)</span>
                                </span>
                            </label>

                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={excludeAmbiguous}
                                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    <span className="checkbox-title">Exclude Ambiguous Characters</span>
                                    <span className="checkbox-example">({`{} [] () / \\ ' " \` ~ , ; < > . ?`})</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="custom-chars-section">
                        <label htmlFor="customChars">Custom Character Set (optional):</label>
                        <input
                            id="customChars"
                            type="text"
                            value={customChars}
                            onChange={(e) => setCustomChars(e.target.value)}
                            placeholder="Enter custom characters to use..."
                            className="tool-input"
                        />
                        <p className="setting-note">
                            If specified, only these characters will be used (overrides other settings)
                        </p>
                    </div>
                </div>

                {/* Strength Analysis */}
                {password && <StrengthMeter strength={strength} />}

                {/* Password History */}
                {passwordHistory.length > 0 && (
                    <div className="history-section">
                        <div className="history-header">
                            <h3>📋 Recent Passwords</h3>
                            <button
                                className="tool-button secondary small"
                                onClick={clearHistory}
                            >
                                🗑️ Clear History
                            </button>
                        </div>
                        <div className="history-list">
                            {passwordHistory.map((entry, index) => (
                                <div key={index} className="history-item">
                                    <div className="history-password">
                                        <span className="password-text">{entry.password}</span>
                                        <button
                                            className="copy-btn small"
                                            onClick={() => copyToClipboard(entry.password)}
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </button>
                                    </div>
                                    <div className="history-meta">
                                        <span>Length: {entry.length}</span>
                                        <span>Charset: {entry.charset}</span>
                                        <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                <div className="tips-section">
                    <h3>💡 Password Security Tips</h3>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <h4>🔒 Use Strong Passwords</h4>
                            <p>Use passwords with at least 12 characters, including uppercase, lowercase, numbers, and symbols.</p>
                        </div>
                        <div className="tip-card">
                            <h4>🔄 Use Unique Passwords</h4>
                            <p>Never reuse passwords across different accounts. Each account should have its own unique password.</p>
                        </div>
                        <div className="tip-card">
                            <h4>🔐 Use a Password Manager</h4>
                            <p>Store your passwords in a reputable password manager to keep them secure and easily accessible.</p>
                        </div>
                        <div className="tip-card">
                            <h4>🔑 Enable 2FA</h4>
                            <p>Use two-factor authentication whenever possible to add an extra layer of security.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordTool;
