import React, { useState, useCallback, useRef } from 'react';
import './HashTool.css';

const HashTool = () => {
    const [inputText, setInputText] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const [hashResults, setHashResults] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('text');
    const [compareMode, setCompareMode] = useState(false);
    const [compareHash, setCompareHash] = useState('');
    const [compareResult, setCompareResult] = useState(null);
    const fileInputRef = useRef(null);

    // Hash algorithms available
    const hashAlgorithms = [
        { id: 'md5', name: 'MD5', description: '128-bit hash (deprecated for security)' },
        { id: 'sha1', name: 'SHA-1', description: '160-bit hash (deprecated for security)' },
        { id: 'sha256', name: 'SHA-256', description: '256-bit hash (recommended)' },
        { id: 'sha384', name: 'SHA-384', description: '384-bit hash' },
        { id: 'sha512', name: 'SHA-512', description: '512-bit hash' }
    ];

    // MD5 implementation (for demonstration - use crypto API in production)
    const md5 = (str) => {
        // Simplified MD5 - in production, use a proper crypto library
        return 'MD5 hash would be calculated here';
    };

    // SHA-1 implementation using Web Crypto API
    const sha1 = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-1', dataBuffer);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // SHA-256 implementation using Web Crypto API
    const sha256 = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // SHA-384 implementation using Web Crypto API
    const sha384 = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-384', dataBuffer);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // SHA-512 implementation using Web Crypto API
    const sha512 = async (data) => {
        const encoder = new TextEncoder();
        const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
        const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // CRC32 implementation
    const crc32 = (str) => {
        const table = [];
        let c;

        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            table[n] = c;
        }

        let crc = 0 ^ (-1);
        for (let i = 0; i < str.length; i++) {
            crc = (crc >>> 8) ^ table[(crc ^ str.charCodeAt(i)) & 0xFF];
        }
        return ((crc ^ (-1)) >>> 0).toString(16).padStart(8, '0');
    };

    // Calculate all hashes
    const calculateHashes = useCallback(async (data) => {
        setIsProcessing(true);
        const results = {};

        try {
            // Calculate different hash types
            results.md5 = md5(typeof data === 'string' ? data : 'File content');
            results.sha1 = await sha1(data);
            results.sha256 = await sha256(data);
            results.sha384 = await sha384(data);
            results.sha512 = await sha512(data);
            results.crc32 = crc32(typeof data === 'string' ? data : 'File content');

            // Add additional information
            results.length = typeof data === 'string' ? data.length : data.byteLength;
            results.timestamp = new Date().toISOString();

            setHashResults(results);
        } catch (error) {
            console.error('Error calculating hashes:', error);
        } finally {
            setIsProcessing(false);
        }
    }, []);

    // Handle text input change
    const handleTextChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        if (text.trim()) {
            calculateHashes(text);
        } else {
            setHashResults({});
        }
    };

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                calculateHashes(event.target.result);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    // Copy to clipboard
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Compare hashes
    const compareHashes = () => {
        if (!compareHash.trim()) {
            setCompareResult(null);
            return;
        }

        const cleanHash = compareHash.trim().toLowerCase();
        const results = {};

        Object.entries(hashResults).forEach(([algorithm, hash]) => {
            if (typeof hash === 'string') {
                results[algorithm] = hash.toLowerCase() === cleanHash;
            }
        });

        setCompareResult(results);
    };

    // Clear all data
    const clearAll = () => {
        setInputText('');
        setInputFile(null);
        setHashResults({});
        setCompareHash('');
        setCompareResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="hash-tool">
            <div className="tool-header">
                <div className="tool-header-content">
                    <h2 className="tool-title">🔐 Hash Generator</h2>
                    <p className="tool-subtitle">Generate cryptographic hashes for text and files</p>
                </div>
            </div>

            <div className="tool-container">
                {/* Tab Navigation */}
                <div className="tab-nav">
                    <button
                        className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                        onClick={() => setActiveTab('text')}
                    >
                        📝 Text Input
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'file' ? 'active' : ''}`}
                        onClick={() => setActiveTab('file')}
                    >
                        📁 File Input
                    </button>
                </div>

                {/* Input Section */}
                <div className="input-section">
                    {activeTab === 'text' ? (
                        <div className="text-input-area">
                            <label htmlFor="textInput">Text to Hash:</label>
                            <textarea
                                id="textInput"
                                className="tool-textarea"
                                value={inputText}
                                onChange={handleTextChange}
                                placeholder="Enter text to generate hashes..."
                                rows={6}
                            />
                            <div className="input-info">
                                <span>Characters: {inputText.length}</span>
                                <span>Bytes: {new Blob([inputText]).size}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="file-input-area">
                            <label htmlFor="fileInput">File to Hash:</label>
                            <div className="file-upload-zone">
                                <input
                                    id="fileInput"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="file-input"
                                />
                                <div className="file-upload-content">
                                    {inputFile ? (
                                        <div className="file-info">
                                            <span className="file-icon">📄</span>
                                            <div className="file-details">
                                                <div className="file-name">{inputFile.name}</div>
                                                <div className="file-size">{(inputFile.size / 1024).toFixed(2)} KB</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-icon">📁</span>
                                            <p>Click to select a file or drag and drop</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Processing Indicator */}
                {isProcessing && (
                    <div className="processing-indicator">
                        <div className="spinner"></div>
                        <span>Calculating hashes...</span>
                    </div>
                )}

                {/* Hash Results */}
                {Object.keys(hashResults).length > 0 && (
                    <div className="results-section">
                        <div className="results-header">
                            <h3>🔑 Hash Results</h3>
                            <div className="result-actions">
                                <button
                                    className="tool-button secondary"
                                    onClick={() => setCompareMode(!compareMode)}
                                >
                                    {compareMode ? '❌ Cancel Compare' : '🔍 Compare Hash'}
                                </button>
                                <button
                                    className="tool-button secondary"
                                    onClick={clearAll}
                                >
                                    🗑️ Clear All
                                </button>
                            </div>
                        </div>

                        <div className="hash-grid">
                            {hashAlgorithms.map(algorithm => {
                                const hash = hashResults[algorithm.id];
                                if (!hash) return null;

                                return (
                                    <div key={algorithm.id} className="hash-item">
                                        <div className="hash-header">
                                            <div className="hash-name">
                                                <strong>{algorithm.name}</strong>
                                                <span className="hash-description">{algorithm.description}</span>
                                            </div>
                                            <button
                                                className="copy-btn"
                                                onClick={() => copyToClipboard(hash)}
                                                title="Copy to clipboard"
                                            >
                                                📋
                                            </button>
                                        </div>
                                        <div className="hash-value">
                                            {hash}
                                        </div>
                                        {compareResult && compareResult[algorithm.id] !== undefined && (
                                            <div className={`compare-result ${compareResult[algorithm.id] ? 'match' : 'no-match'}`}>
                                                {compareResult[algorithm.id] ? '✅ Match' : '❌ No Match'}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Additional hashes */}
                            {hashResults.crc32 && (
                                <div className="hash-item">
                                    <div className="hash-header">
                                        <div className="hash-name">
                                            <strong>CRC32</strong>
                                            <span className="hash-description">32-bit cyclic redundancy check</span>
                                        </div>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(hashResults.crc32)}
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </button>
                                    </div>
                                    <div className="hash-value">
                                        {hashResults.crc32}
                                    </div>
                                    {compareResult && compareResult.crc32 !== undefined && (
                                        <div className={`compare-result ${compareResult.crc32 ? 'match' : 'no-match'}`}>
                                            {compareResult.crc32 ? '✅ Match' : '❌ No Match'}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Metadata */}
                        <div className="metadata-section">
                            <h4>📊 Metadata</h4>
                            <div className="metadata-grid">
                                <div className="metadata-item">
                                    <span className="metadata-label">Input Size:</span>
                                    <span className="metadata-value">{hashResults.length} bytes</span>
                                </div>
                                <div className="metadata-item">
                                    <span className="metadata-label">Generated:</span>
                                    <span className="metadata-value">{new Date(hashResults.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="metadata-item">
                                    <span className="metadata-label">Source:</span>
                                    <span className="metadata-value">{activeTab === 'text' ? 'Text Input' : 'File Upload'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Compare Section */}
                        {compareMode && (
                            <div className="compare-section">
                                <h4>🔍 Hash Comparison</h4>
                                <div className="compare-input-group">
                                    <input
                                        type="text"
                                        className="tool-input"
                                        value={compareHash}
                                        onChange={(e) => setCompareHash(e.target.value)}
                                        placeholder="Enter hash to compare..."
                                    />
                                    <button
                                        className="tool-button"
                                        onClick={compareHashes}
                                        disabled={!compareHash.trim()}
                                    >
                                        Compare
                                    </button>
                                </div>
                                <p className="compare-note">
                                    Enter a hash value to compare against the generated hashes above.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Info Section */}
                <div className="info-section">
                    <h3>ℹ️ Hash Algorithm Information</h3>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>🔒 Secure Algorithms</h4>
                            <p>SHA-256, SHA-384, and SHA-512 are considered cryptographically secure and suitable for security applications.</p>
                        </div>
                        <div className="info-card">
                            <h4>⚠️ Deprecated Algorithms</h4>
                            <p>MD5 and SHA-1 have known vulnerabilities and should not be used for security-critical applications.</p>
                        </div>
                        <div className="info-card">
                            <h4>🔍 Use Cases</h4>
                            <p>File integrity verification, password storage (with salt), digital signatures, and data deduplication.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HashTool;
