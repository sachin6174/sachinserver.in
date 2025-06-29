import React, { useState, useCallback, useEffect } from 'react';
import './RegexTool.css';

const RegexTool = () => {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState(['g']);
    const [testString, setTestString] = useState('');
    const [replacementString, setReplacementString] = useState('');
    const [matches, setMatches] = useState([]);
    const [replacedText, setReplacedText] = useState('');
    const [regexInfo, setRegexInfo] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('test');
    const [history, setHistory] = useState([]);
    const [showCheatSheet, setShowCheatSheet] = useState(false);

    const availableFlags = [
        { key: 'g', label: 'Global', description: 'Find all matches' },
        { key: 'i', label: 'Ignore Case', description: 'Case insensitive' },
        { key: 'm', label: 'Multiline', description: '^$ match line breaks' },
        { key: 's', label: 'Dot All', description: '. matches newlines' },
        { key: 'u', label: 'Unicode', description: 'Full unicode support' },
        { key: 'y', label: 'Sticky', description: 'Match from lastIndex' }
    ];

    const cheatSheetItems = [
        {
            category: 'Character Classes', items: [
                { pattern: '.', description: 'Any character except newline' },
                { pattern: '\\d', description: 'Any digit (0-9)' },
                { pattern: '\\D', description: 'Any non-digit' },
                { pattern: '\\w', description: 'Any word character (a-z, A-Z, 0-9, _)' },
                { pattern: '\\W', description: 'Any non-word character' },
                { pattern: '\\s', description: 'Any whitespace character' },
                { pattern: '\\S', description: 'Any non-whitespace character' }
            ]
        },
        {
            category: 'Anchors', items: [
                { pattern: '^', description: 'Start of string/line' },
                { pattern: '$', description: 'End of string/line' },
                { pattern: '\\b', description: 'Word boundary' },
                { pattern: '\\B', description: 'Non-word boundary' }
            ]
        },
        {
            category: 'Quantifiers', items: [
                { pattern: '*', description: 'Zero or more' },
                { pattern: '+', description: 'One or more' },
                { pattern: '?', description: 'Zero or one' },
                { pattern: '{n}', description: 'Exactly n times' },
                { pattern: '{n,}', description: 'n or more times' },
                { pattern: '{n,m}', description: 'Between n and m times' }
            ]
        },
        {
            category: 'Groups', items: [
                { pattern: '()', description: 'Capturing group' },
                { pattern: '(?:)', description: 'Non-capturing group' },
                { pattern: '(?=)', description: 'Positive lookahead' },
                { pattern: '(?!)', description: 'Negative lookahead' },
                { pattern: '(?<=)', description: 'Positive lookbehind' },
                { pattern: '(?<!)', description: 'Negative lookbehind' }
            ]
        }
    ];

    const presetPatterns = [
        { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: ['g', 'i'] },
        { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: ['g', 'i'] },
        { name: 'Phone (US)', pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})', flags: ['g'] },
        { name: 'IP Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: ['g'] },
        { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})', flags: ['g', 'i'] },
        { name: 'Credit Card', pattern: '\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b', flags: ['g'] },
        { name: 'HTML Tags', pattern: '<\\/?[a-z][a-z0-9]*[^<>]*>', flags: ['g', 'i'] },
        { name: 'Date (MM/DD/YYYY)', pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d\\d\\b', flags: ['g'] }
    ];

    const performRegexTest = useCallback(() => {
        if (!pattern) {
            setMatches([]);
            setRegexInfo(null);
            setError('');
            return;
        }

        try {
            const regex = new RegExp(pattern, flags.join(''));
            const allMatches = [];
            let match;

            if (flags.includes('g')) {
                while ((match = regex.exec(testString)) !== null) {
                    allMatches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1),
                        namedGroups: match.groups || {}
                    });
                    if (match.index === regex.lastIndex) break;
                }
            } else {
                match = regex.exec(testString);
                if (match) {
                    allMatches.push({
                        match: match[0],
                        index: match.index,
                        groups: match.slice(1),
                        namedGroups: match.groups || {}
                    });
                }
            }

            setMatches(allMatches);
            setRegexInfo({
                pattern: pattern,
                flags: flags.join(''),
                source: regex.source,
                global: regex.global,
                ignoreCase: regex.ignoreCase,
                multiline: regex.multiline,
                sticky: regex.sticky,
                unicode: regex.unicode,
                dotAll: regex.dotAll
            });
            setError('');

            // Add to history
            const historyItem = {
                pattern,
                flags: [...flags],
                timestamp: Date.now(),
                matchCount: allMatches.length
            };
            setHistory(prev => [historyItem, ...prev.slice(0, 9)]);

        } catch (err) {
            setError(err.message);
            setMatches([]);
            setRegexInfo(null);
        }
    }, [pattern, flags, testString]);

    const performReplace = useCallback(() => {
        if (!pattern || !testString) {
            setReplacedText('');
            return;
        }

        try {
            const regex = new RegExp(pattern, flags.join(''));
            const result = testString.replace(regex, replacementString);
            setReplacedText(result);
            setError('');
        } catch (err) {
            setError(err.message);
            setReplacedText('');
        }
    }, [pattern, flags, testString, replacementString]);

    useEffect(() => {
        if (activeTab === 'test') {
            performRegexTest();
        } else if (activeTab === 'replace') {
            performReplace();
        }
    }, [activeTab, performRegexTest, performReplace]);

    const toggleFlag = (flag) => {
        setFlags(prev =>
            prev.includes(flag)
                ? prev.filter(f => f !== flag)
                : [...prev, flag]
        );
    };

    const loadPreset = (preset) => {
        setPattern(preset.pattern);
        setFlags(preset.flags);
    };

    const loadFromHistory = (item) => {
        setPattern(item.pattern);
        setFlags(item.flags);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const highlightMatches = (text, matches) => {
        if (!matches.length) return text;

        let result = '';
        let lastIndex = 0;

        matches.forEach((match, i) => {
            result += text.slice(lastIndex, match.index);
            result += `<mark class="match-highlight" data-match="${i}">${match.match}</mark>`;
            lastIndex = match.index + match.match.length;
        });

        result += text.slice(lastIndex);
        return result;
    };

    const loadSample = () => {
        setPattern('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
        setFlags(['g', 'i']);
        setTestString(`Contact us at support@example.com or sales@company.org
For urgent matters, reach admin@test.co.uk
Invalid emails: @invalid.com, test@, incomplete@domain`);
        setReplacementString('[EMAIL]');
    };

    return (
        <div className="tools-container">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h1 className="tool-title">Regex Tool</h1>
                    <p className="tool-subtitle">Test, build, and debug regular expressions with real-time feedback</p>
                </div>
            </div>

            <div className="regex-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'test' ? 'active' : ''}`}
                        onClick={() => setActiveTab('test')}
                    >
                        🔍 Test & Match
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'replace' ? 'active' : ''}`}
                        onClick={() => setActiveTab('replace')}
                    >
                        🔄 Replace
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'learn' ? 'active' : ''}`}
                        onClick={() => setActiveTab('learn')}
                    >
                        📚 Learn
                    </button>
                </div>

                <div className="regex-controls">
                    <div className="pattern-section">
                        <div className="pattern-input-group">
                            <label htmlFor="pattern">Regular Expression Pattern:</label>
                            <div className="pattern-wrapper">
                                <span className="pattern-delimiter">/</span>
                                <input
                                    id="pattern"
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    placeholder="Enter your regex pattern here..."
                                    className="pattern-input"
                                />
                                <span className="pattern-delimiter">/</span>
                                <div className="flags-section">
                                    {availableFlags.map(flag => (
                                        <button
                                            key={flag.key}
                                            className={`flag-button ${flags.includes(flag.key) ? 'active' : ''}`}
                                            onClick={() => toggleFlag(flag.key)}
                                            title={`${flag.label}: ${flag.description}`}
                                        >
                                            {flag.key}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="quick-actions">
                        <button className="btn btn-sample" onClick={loadSample}>
                            📄 Load Sample
                        </button>
                        <button className="btn btn-help" onClick={() => setShowCheatSheet(!showCheatSheet)}>
                            📖 Cheat Sheet
                        </button>
                    </div>

                    <div className="presets-section">
                        <h3>Quick Presets:</h3>
                        <div className="presets-grid">
                            {presetPatterns.map((preset, index) => (
                                <button
                                    key={index}
                                    className="preset-button"
                                    onClick={() => loadPreset(preset)}
                                    title={preset.pattern}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {showCheatSheet && (
                    <div className="cheat-sheet">
                        <div className="cheat-sheet-header">
                            <h3>Regular Expression Cheat Sheet</h3>
                            <button
                                className="close-button"
                                onClick={() => setShowCheatSheet(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="cheat-sheet-grid">
                            {cheatSheetItems.map((category, index) => (
                                <div key={index} className="cheat-category">
                                    <h4>{category.category}</h4>
                                    <div className="cheat-items">
                                        {category.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="cheat-item">
                                                <code className="cheat-pattern">{item.pattern}</code>
                                                <span className="cheat-description">{item.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="regex-content">
                    {activeTab === 'test' && (
                        <div className="test-mode">
                            <div className="input-section">
                                <div className="section-header">
                                    <h3>Test String</h3>
                                    <button
                                        className="btn-icon"
                                        onClick={() => copyToClipboard(testString)}
                                        title="Copy to clipboard"
                                    >
                                        📋
                                    </button>
                                </div>
                                <textarea
                                    value={testString}
                                    onChange={(e) => setTestString(e.target.value)}
                                    placeholder="Enter text to test your regex against..."
                                    className="test-textarea"
                                    rows={8}
                                />
                            </div>

                            <div className="results-section">
                                <div className="matches-panel">
                                    <div className="section-header">
                                        <h3>Matches ({matches.length})</h3>
                                        {regexInfo && (
                                            <div className="regex-info">
                                                Pattern: /{regexInfo.pattern}/{regexInfo.flags}
                                            </div>
                                        )}
                                    </div>

                                    {matches.length > 0 ? (
                                        <div className="matches-list">
                                            {matches.map((match, index) => (
                                                <div key={index} className="match-item">
                                                    <div className="match-header">
                                                        <span className="match-number">#{index + 1}</span>
                                                        <span className="match-position">at {match.index}</span>
                                                    </div>
                                                    <div className="match-content">
                                                        <code>{match.match}</code>
                                                    </div>
                                                    {match.groups.length > 0 && (
                                                        <div className="match-groups">
                                                            <strong>Groups:</strong>
                                                            {match.groups.map((group, groupIndex) => (
                                                                <div key={groupIndex} className="group-item">
                                                                    Group {groupIndex + 1}: <code>{group}</code>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-matches">
                                            {pattern ? 'No matches found' : 'Enter a pattern to see matches'}
                                        </div>
                                    )}
                                </div>

                                <div className="highlighted-text">
                                    <div className="section-header">
                                        <h3>Highlighted Text</h3>
                                    </div>
                                    <div
                                        className="highlighted-content"
                                        dangerouslySetInnerHTML={{
                                            __html: highlightMatches(testString, matches)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'replace' && (
                        <div className="replace-mode">
                            <div className="replace-inputs">
                                <div className="input-section">
                                    <div className="section-header">
                                        <h3>Original Text</h3>
                                    </div>
                                    <textarea
                                        value={testString}
                                        onChange={(e) => setTestString(e.target.value)}
                                        placeholder="Enter text to search and replace..."
                                        className="test-textarea"
                                        rows={6}
                                    />
                                </div>

                                <div className="replacement-section">
                                    <div className="section-header">
                                        <h3>Replacement</h3>
                                    </div>
                                    <input
                                        type="text"
                                        value={replacementString}
                                        onChange={(e) => setReplacementString(e.target.value)}
                                        placeholder="Enter replacement text..."
                                        className="replacement-input"
                                    />
                                    <div className="replacement-help">
                                        Use $1, $2, etc. for captured groups
                                    </div>
                                </div>
                            </div>

                            <div className="replace-result">
                                <div className="section-header">
                                    <h3>Result</h3>
                                    <button
                                        className="btn-icon"
                                        onClick={() => copyToClipboard(replacedText)}
                                        title="Copy result"
                                    >
                                        📋
                                    </button>
                                </div>
                                <div className="result-content">
                                    <pre>{replacedText || 'Result will appear here...'}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'learn' && (
                        <div className="learn-mode">
                            <div className="history-section">
                                <h3>Pattern History</h3>
                                {history.length > 0 ? (
                                    <div className="history-list">
                                        {history.map((item, index) => (
                                            <div key={index} className="history-item">
                                                <div className="history-pattern">
                                                    <code>/{item.pattern}/{item.flags.join('')}</code>
                                                </div>
                                                <div className="history-meta">
                                                    {item.matchCount} matches • {new Date(item.timestamp).toLocaleTimeString()}
                                                </div>
                                                <button
                                                    className="btn-small"
                                                    onClick={() => loadFromHistory(item)}
                                                >
                                                    Load
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-history">
                                        No patterns tested yet
                                    </div>
                                )}
                            </div>

                            <div className="tips-section">
                                <h3>Regex Tips & Tricks</h3>
                                <div className="tips-grid">
                                    <div className="tip-card">
                                        <h4>🎯 Start Simple</h4>
                                        <p>Begin with basic patterns and gradually add complexity. Test each part separately.</p>
                                    </div>
                                    <div className="tip-card">
                                        <h4>🔍 Use Anchors</h4>
                                        <p>^ for start of line, $ for end. These prevent partial matches when you need exact matches.</p>
                                    </div>
                                    <div className="tip-card">
                                        <h4>📊 Quantifiers</h4>
                                        <p>Use + for one or more, * for zero or more, ? for optional. Be specific with {'{n,m}'}.</p>
                                    </div>
                                    <div className="tip-card">
                                        <h4>🎭 Escape Special Characters</h4>
                                        <p>Use backslash before . + * ? ^ $ { } [ ] \ | ( ) to match them literally.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegexTool;
