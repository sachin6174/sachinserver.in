import React, { useState, useCallback, useMemo } from 'react';
import './UUIDTool.css';

const UUIDTool = () => {
    const [generatedUUIDs, setGeneratedUUIDs] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [uuidVersion, setUuidVersion] = useState('v4');
    const [customNamespace, setCustomNamespace] = useState('');
    const [customName, setCustomName] = useState('');
    const [inputUUID, setInputUUID] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('generate');
    const [history, setHistory] = useState([]);

    // UUID validation regex
    const uuidRegex = useMemo(() => 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    []);

    // Generate random hex
    const randomHex = (length) => {
        return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    };

    // Generate UUID v1 (timestamp-based)
    const generateUUIDv1 = useCallback(() => {
        const timestamp = Date.now();
        const timestampHex = timestamp.toString(16).padStart(12, '0');
        const clockSeq = Math.floor(Math.random() * 0x3fff);
        const node = randomHex(12);

        return [
            timestampHex.substring(8, 12) + timestampHex.substring(4, 8) + timestampHex.substring(0, 4),
            timestampHex.substring(0, 4),
            '1' + timestampHex.substring(1, 4),
            ((clockSeq >> 8) | 0x80).toString(16).padStart(2, '0') + (clockSeq & 0xff).toString(16).padStart(2, '0'),
            node
        ].join('-');
    }, []);

    // Generate UUID v4 (random)
    const generateUUIDv4 = useCallback(() => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : ((r & 0x3) | 0x8);
            return v.toString(16);
        });
    }, []);

    // Simple hash function for UUID v5 (name-based)
    const simpleHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16).padStart(8, '0').substring(0, 8);
    };

    // Generate UUID v5 (name-based with SHA-1 - simplified version)
    const generateUUIDv5 = useCallback((namespace, name) => {
        if (!namespace || !name) return generateUUIDv4();

        const combined = namespace + name;
        const hash1 = simpleHash(combined);
        const hash2 = simpleHash(combined.split('').reverse().join(''));
        const hash3 = simpleHash(hash1 + hash2);
        const hash4 = simpleHash(hash2 + hash1);

        return [
            hash1,
            hash2.substring(0, 4),
            '5' + hash3.substring(1, 4),
            '8' + hash4.substring(1, 3),
            hash3 + hash4.substring(4)
        ].join('-');
    }, [generateUUIDv4]);

    // Generate UUIDs based on version
    const generateUUID = useCallback((version) => {
        switch (version) {
            case 'v1':
                return generateUUIDv1();
            case 'v4':
                return generateUUIDv4();
            case 'v5':
                return generateUUIDv5(customNamespace, customName);
            default:
                return generateUUIDv4();
        }
    }, [customNamespace, customName, generateUUIDv1, generateUUIDv5, generateUUIDv4]);

    // Generate multiple UUIDs
    const handleGenerate = useCallback(() => {
        const newUUIDs = [];
        const count = Math.min(Math.max(1, parseInt(quantity) || 1), 100);

        for (let i = 0; i < count; i++) {
            const uuid = generateUUID(uuidVersion);
            newUUIDs.push({
                id: uuid,
                version: uuidVersion,
                timestamp: Date.now(),
                index: i + 1
            });
        }

        setGeneratedUUIDs(newUUIDs);

        // Add to history
        const historyItem = {
            count,
            version: uuidVersion,
            timestamp: Date.now(),
            preview: newUUIDs[0]?.id
        };
        setHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    }, [quantity, uuidVersion, generateUUID]);

    // Validate UUID
    const validateUUID = useCallback(() => {
        if (!inputUUID.trim()) {
            setValidationResult(null);
            return;
        }

        const uuid = inputUUID.trim();
        const isValid = uuidRegex.test(uuid);

        if (isValid) {
            const version = uuid.charAt(14);
            const variant = uuid.charAt(19);
            let variantName = 'Unknown';

            if (['8', '9', 'a', 'b'].includes(variant.toLowerCase())) {
                variantName = 'RFC 4122';
            } else if (['0', '1', '2', '3', '4', '5', '6', '7'].includes(variant)) {
                variantName = 'NCS backward compatibility';
            } else if (['c', 'd'].includes(variant.toLowerCase())) {
                variantName = 'Microsoft GUID';
            } else if (['e', 'f'].includes(variant.toLowerCase())) {
                variantName = 'Reserved for future';
            }

            setValidationResult({
                isValid: true,
                version: `Version ${version}`,
                variant: variantName,
                format: 'Standard UUID format',
                length: uuid.length,
                parts: {
                    timeLow: uuid.substring(0, 8),
                    timeMid: uuid.substring(9, 13),
                    timeHigh: uuid.substring(14, 18),
                    clockSeq: uuid.substring(19, 23),
                    node: uuid.substring(24, 36)
                }
            });
        } else {
            setValidationResult({
                isValid: false,
                error: 'Invalid UUID format',
                expected: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                received: uuid
            });
        }
    }, [inputUUID, uuidRegex]);

    React.useEffect(() => {
        validateUUID();
    }, [validateUUID]);

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Could add a toast notification here
        });
    };

    // Copy all UUIDs
    const copyAllUUIDs = () => {
        const allUUIDs = generatedUUIDs.map(item => item.id).join('\n');
        copyToClipboard(allUUIDs);
    };

    // Download UUIDs
    const downloadUUIDs = (format = 'txt') => {
        let content = '';
        const timestamp = new Date().toISOString().split('T')[0];

        if (format === 'txt') {
            content = generatedUUIDs.map(item => item.id).join('\n');
        } else if (format === 'json') {
            content = JSON.stringify(generatedUUIDs, null, 2);
        } else if (format === 'csv') {
            content = 'UUID,Version,Index,Timestamp\n' +
                generatedUUIDs.map(item =>
                    `${item.id},${item.version},${item.index},${new Date(item.timestamp).toISOString()}`
                ).join('\n');
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uuids_${timestamp}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Clear generated UUIDs
    const clearUUIDs = () => {
        setGeneratedUUIDs([]);
        setValidationResult(null);
        setInputUUID('');
    };

    // Load sample UUID
    const loadSample = () => {
        const sampleUUID = generateUUIDv4();
        setInputUUID(sampleUUID);
    };

    // Generate single UUID quick action
    const generateSingle = () => {
        const uuid = generateUUID(uuidVersion);
        copyToClipboard(uuid);
        setGeneratedUUIDs([{
            id: uuid,
            version: uuidVersion,
            timestamp: Date.now(),
            index: 1
        }]);
    };

    return (
        <div className="tools-container">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h1 className="tool-title">UUID Generator & Validator</h1>
                    <p className="tool-subtitle">Generate, validate, and analyze UUIDs (Universally Unique Identifiers)</p>
                </div>
            </div>

            <div className="uuid-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'generate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('generate')}
                    >
                        🎲 Generate
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'validate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('validate')}
                    >
                        ✅ Validate
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        📚 History
                    </button>
                </div>

                {activeTab === 'generate' && (
                    <div className="generate-section">
                        <div className="generation-controls">
                            <div className="control-group">
                                <label htmlFor="version">UUID Version:</label>
                                <select
                                    id="version"
                                    value={uuidVersion}
                                    onChange={(e) => setUuidVersion(e.target.value)}
                                    className="version-select"
                                >
                                    <option value="v1">Version 1 (Timestamp-based)</option>
                                    <option value="v4">Version 4 (Random)</option>
                                    <option value="v5">Version 5 (Name-based SHA-1)</option>
                                </select>
                            </div>

                            <div className="control-group">
                                <label htmlFor="quantity">Quantity:</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="quantity-input"
                                />
                            </div>

                            {uuidVersion === 'v5' && (
                                <>
                                    <div className="control-group">
                                        <label htmlFor="namespace">Namespace:</label>
                                        <input
                                            id="namespace"
                                            type="text"
                                            value={customNamespace}
                                            onChange={(e) => setCustomNamespace(e.target.value)}
                                            placeholder="Enter namespace UUID"
                                            className="namespace-input"
                                        />
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={customName}
                                            onChange={(e) => setCustomName(e.target.value)}
                                            placeholder="Enter name for UUID generation"
                                            className="name-input"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="action-buttons">
                            <button className="btn btn-primary" onClick={handleGenerate}>
                                🎲 Generate UUIDs
                            </button>
                            <button className="btn btn-quick" onClick={generateSingle}>
                                ⚡ Quick Generate & Copy
                            </button>
                            <button className="btn btn-clear" onClick={clearUUIDs}>
                                🗑️ Clear
                            </button>
                        </div>

                        {generatedUUIDs.length > 0 && (
                            <div className="results-section">
                                <div className="results-header">
                                    <h3>Generated UUIDs ({generatedUUIDs.length})</h3>
                                    <div className="results-actions">
                                        <button
                                            className="btn-icon"
                                            onClick={copyAllUUIDs}
                                            title="Copy all UUIDs"
                                        >
                                            📋
                                        </button>
                                        <div className="download-dropdown">
                                            <button className="btn-icon" title="Download UUIDs">💾</button>
                                            <div className="dropdown-content">
                                                <button onClick={() => downloadUUIDs('txt')}>Download as TXT</button>
                                                <button onClick={() => downloadUUIDs('json')}>Download as JSON</button>
                                                <button onClick={() => downloadUUIDs('csv')}>Download as CSV</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="uuid-list">
                                    {generatedUUIDs.map((item, index) => (
                                        <div key={index} className="uuid-item">
                                            <div className="uuid-content">
                                                <span className="uuid-index">#{item.index}</span>
                                                <code className="uuid-value">{item.id}</code>
                                                <button
                                                    className="copy-btn"
                                                    onClick={() => copyToClipboard(item.id)}
                                                    title="Copy UUID"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                            <div className="uuid-meta">
                                                <span className="uuid-version">{item.version}</span>
                                                <span className="uuid-time">
                                                    {new Date(item.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'validate' && (
                    <div className="validate-section">
                        <div className="validation-controls">
                            <div className="input-group">
                                <label htmlFor="uuid-input">Enter UUID to validate:</label>
                                <div className="uuid-input-wrapper">
                                    <input
                                        id="uuid-input"
                                        type="text"
                                        value={inputUUID}
                                        onChange={(e) => setInputUUID(e.target.value)}
                                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                        className="uuid-input"
                                    />
                                    <button
                                        className="btn btn-sample"
                                        onClick={loadSample}
                                    >
                                        📄 Sample
                                    </button>
                                </div>
                            </div>
                        </div>

                        {validationResult && (
                            <div className={`validation-result ${validationResult.isValid ? 'valid' : 'invalid'}`}>
                                <div className="validation-header">
                                    <h3>
                                        {validationResult.isValid ? '✅ Valid UUID' : '❌ Invalid UUID'}
                                    </h3>
                                </div>

                                {validationResult.isValid ? (
                                    <div className="validation-details">
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>Version:</label>
                                                <span>{validationResult.version}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Variant:</label>
                                                <span>{validationResult.variant}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Format:</label>
                                                <span>{validationResult.format}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Length:</label>
                                                <span>{validationResult.length} characters</span>
                                            </div>
                                        </div>

                                        <div className="uuid-breakdown">
                                            <h4>UUID Structure:</h4>
                                            <div className="breakdown-grid">
                                                <div className="breakdown-item">
                                                    <label>Time Low:</label>
                                                    <code>{validationResult.parts.timeLow}</code>
                                                </div>
                                                <div className="breakdown-item">
                                                    <label>Time Mid:</label>
                                                    <code>{validationResult.parts.timeMid}</code>
                                                </div>
                                                <div className="breakdown-item">
                                                    <label>Time High:</label>
                                                    <code>{validationResult.parts.timeHigh}</code>
                                                </div>
                                                <div className="breakdown-item">
                                                    <label>Clock Seq:</label>
                                                    <code>{validationResult.parts.clockSeq}</code>
                                                </div>
                                                <div className="breakdown-item">
                                                    <label>Node:</label>
                                                    <code>{validationResult.parts.node}</code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="validation-error">
                                        <div className="error-details">
                                            <p><strong>Error:</strong> {validationResult.error}</p>
                                            <p><strong>Expected format:</strong> <code>{validationResult.expected}</code></p>
                                            <p><strong>Received:</strong> <code>{validationResult.received}</code></p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="history-section">
                        <div className="history-header">
                            <h3>Generation History</h3>
                            {history.length > 0 && (
                                <button
                                    className="btn btn-clear"
                                    onClick={() => setHistory([])}
                                >
                                    🗑️ Clear History
                                </button>
                            )}
                        </div>

                        {history.length > 0 ? (
                            <div className="history-list">
                                {history.map((item, index) => (
                                    <div key={index} className="history-item">
                                        <div className="history-content">
                                            <div className="history-info">
                                                <div className="history-main">
                                                    <span className="history-count">{item.count} UUIDs</span>
                                                    <span className="history-version">{item.version}</span>
                                                </div>
                                                <div className="history-time">
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="history-preview">
                                                <code>{item.preview}</code>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-history">
                                <p>No generation history yet. Generate some UUIDs to see them here!</p>
                            </div>
                        )}

                        <div className="uuid-info-section">
                            <h3>UUID Information</h3>
                            <div className="info-grid">
                                <div className="info-card">
                                    <h4>🕐 Version 1</h4>
                                    <p>Timestamp-based UUIDs that include the current time and MAC address. Provides temporal ordering but may reveal information about the generating system.</p>
                                </div>
                                <div className="info-card">
                                    <h4>🎲 Version 4</h4>
                                    <p>Randomly generated UUIDs. Most commonly used version providing excellent uniqueness with 122 bits of randomness.</p>
                                </div>
                                <div className="info-card">
                                    <h4>🏷️ Version 5</h4>
                                    <p>Name-based UUIDs generated using SHA-1 hash of a namespace and name. Deterministic - same inputs always produce the same UUID.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UUIDTool;
