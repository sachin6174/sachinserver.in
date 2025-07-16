import React, { useState, useCallback, useRef, useMemo } from 'react';
import './EncoderTool.css';

const EncoderTool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [activeTab, setActiveTab] = useState('base64');
    const [direction, setDirection] = useState('encode');
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const encodingMethods = useMemo(() => ({
        base64: {
            name: 'Base64',
            description: 'Standard Base64 encoding/decoding',
            encode: (text) => btoa(unescape(encodeURIComponent(text))),
            decode: (text) => decodeURIComponent(escape(atob(text)))
        },
        url: {
            name: 'URL',
            description: 'URL encoding/decoding (percent encoding)',
            encode: (text) => encodeURIComponent(text),
            decode: (text) => decodeURIComponent(text)
        },
        html: {
            name: 'HTML',
            description: 'HTML entity encoding/decoding',
            encode: (text) => text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;'),
            decode: (text) => text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
        },
        ascii: {
            name: 'ASCII',
            description: 'ASCII character code conversion',
            encode: (text) => text.split('').map(char => char.charCodeAt(0)).join(' '),
            decode: (text) => text.split(' ').map(code => String.fromCharCode(parseInt(code))).join('')
        },
        hex: {
            name: 'Hexadecimal',
            description: 'Hexadecimal encoding/decoding',
            encode: (text) => text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
            decode: (text) => {
                const hex = text.replace(/[^0-9A-Fa-f]/g, '');
                let result = '';
                for (let i = 0; i < hex.length; i += 2) {
                    result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                }
                return result;
            }
        },
        binary: {
            name: 'Binary',
            description: 'Binary encoding/decoding',
            encode: (text) => text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
            decode: (text) => text.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join('')
        },
        morse: {
            name: 'Morse Code',
            description: 'Morse code encoding/decoding',
            encode: (text) => {
                const morseMap = {
                    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
                    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
                    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
                    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
                    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
                    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
                    '8': '---..', '9': '----.', ' ': '/'
                };
                return text.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
            },
            decode: (text) => {
                const morseMap = {
                    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
                    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
                    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
                    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
                    '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
                    '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
                    '---..': '8', '----.': '9', '/': ' '
                };
                return text.split(' ').map(morse => morseMap[morse] || morse).join('');
            }
        },
        rot13: {
            name: 'ROT13',
            description: 'ROT13 cipher encoding/decoding',
            encode: (text) => text.replace(/[a-zA-Z]/g, char => {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
            }),
            decode: (text) => text.replace(/[a-zA-Z]/g, char => {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
            })
        }
    }), []);

    const processText = useCallback(() => {
        if (!inputText.trim()) {
            setOutputText('');
            setError('');
            return;
        }

        try {
            const method = encodingMethods[activeTab];
            const result = direction === 'encode'
                ? method.encode(inputText)
                : method.decode(inputText);

            setOutputText(result);
            setError('');
        } catch (err) {
            setError(`${direction === 'encode' ? 'Encoding' : 'Decoding'} failed: ${err.message}`);
            setOutputText('');
        }
    }, [inputText, activeTab, direction, encodingMethods]);

    React.useEffect(() => {
        processText();
    }, [processText]);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setInputText(e.target.result);
        };
        reader.readAsText(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Could add a toast notification here
        });
    };

    const downloadFile = (content, filename) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const swapInputOutput = () => {
        const temp = inputText;
        setInputText(outputText);
        setOutputText(temp);
        setDirection(direction === 'encode' ? 'decode' : 'encode');
    };

    const clearAll = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };

    const loadSample = () => {
        const samples = {
            base64: 'Hello, World! 👋 This is a sample text for Base64 encoding.',
            url: 'https://example.com/search?q=hello world&lang=en&special=characters!@#$%',
            html: '<div class="example">Hello & welcome to <strong>"HTML"</strong> encoding!</div>',
            ascii: 'Hello ASCII! 123',
            hex: 'Hello Hex World!',
            binary: 'Binary 101',
            morse: 'HELLO WORLD',
            rot13: 'The quick brown fox jumps over the lazy dog.'
        };
        setInputText(samples[activeTab] || 'Sample text');
    };

    const getEncodingInfo = () => {
        const method = encodingMethods[activeTab];
        const inputLength = inputText.length;
        const outputLength = outputText.length;
        const compressionRatio = inputLength > 0 ? (outputLength / inputLength).toFixed(2) : '0';

        return {
            method: method.name,
            description: method.description,
            inputLength,
            outputLength,
            compressionRatio
        };
    };

    const info = getEncodingInfo();

    return (
        <div className="tools-container">
            <div className="encoder-tool">
                <div className="encoding-tabs">
                    {Object.entries(encodingMethods).map(([key, method]) => (
                        <button
                            key={key}
                            className={`encoding-tab ${activeTab === key ? 'active' : ''}`}
                            onClick={() => setActiveTab(key)}
                            title={method.description}
                        >
                            {method.name}
                        </button>
                    ))}
                </div>

                <div className="tool-controls">
                    <div className="direction-selector">
                        <button
                            className={`direction-btn ${direction === 'encode' ? 'active' : ''}`}
                            onClick={() => setDirection('encode')}
                        >
                            🔒 Encode
                        </button>
                        <button
                            className={`direction-btn ${direction === 'decode' ? 'active' : ''}`}
                            onClick={() => setDirection('decode')}
                        >
                            🔓 Decode
                        </button>
                    </div>

                    <div className="control-buttons">
                        <button className="btn btn-sample" onClick={loadSample}>
                            📄 Load Sample
                        </button>
                        <button className="btn btn-upload" onClick={() => fileInputRef.current?.click()}>
                            📁 Upload File
                        </button>
                        <button className="btn btn-swap" onClick={swapInputOutput}>
                            🔄 Swap
                        </button>
                        <button className="btn btn-clear" onClick={clearAll}>
                            🗑️ Clear
                        </button>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                    accept=".txt,.json,.xml,.html,.css,.js"
                    style={{ display: 'none' }}
                />

                <div className="encoding-info">
                    <div className="info-card">
                        <h3>{info.method}</h3>
                        <p>{info.description}</p>
                        <div className="stats">
                            <span>Input: {info.inputLength} chars</span>
                            <span>Output: {info.outputLength} chars</span>
                            <span>Ratio: {info.compressionRatio}x</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="encoder-content">
                    <div className="input-section">
                        <div className="section-header">
                            <h3>{direction === 'encode' ? 'Input Text' : 'Encoded Text'}</h3>
                            <div className="header-actions">
                                <button
                                    className="btn-icon"
                                    onClick={() => copyToClipboard(inputText)}
                                    title="Copy input"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                        <div
                            className={`textarea-container ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder={`Enter text to ${direction} using ${encodingMethods[activeTab].name}...`}
                                className="encoder-textarea"
                                rows={12}
                            />
                            {isDragging && (
                                <div className="drag-overlay">
                                    <div className="drag-message">
                                        Drop your file here
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-stats">
                            Characters: {inputText.length} | Lines: {inputText.split('\n').length}
                        </div>
                    </div>

                    <div className="conversion-arrow">
                        <div className="arrow-container">
                            <div className="arrow-icon">
                                {direction === 'encode' ? '→' : '←'}
                            </div>
                            <div className="arrow-label">
                                {direction === 'encode' ? 'Encoding' : 'Decoding'}
                            </div>
                        </div>
                    </div>

                    <div className="output-section">
                        <div className="section-header">
                            <h3>{direction === 'encode' ? 'Encoded Text' : 'Decoded Text'}</h3>
                            <div className="header-actions">
                                <button
                                    className="btn-icon"
                                    onClick={() => copyToClipboard(outputText)}
                                    title="Copy output"
                                    disabled={!outputText}
                                >
                                    📋
                                </button>
                                <button
                                    className="btn-icon"
                                    onClick={() => downloadFile(outputText, `${direction}d_${activeTab}.txt`)}
                                    title="Download output"
                                    disabled={!outputText}
                                >
                                    💾
                                </button>
                            </div>
                        </div>
                        <div className="output-container">
                            <textarea
                                value={outputText}
                                readOnly
                                placeholder={`${direction === 'encode' ? 'Encoded' : 'Decoded'} text will appear here...`}
                                className="encoder-textarea output"
                                rows={12}
                            />
                        </div>
                        <div className="output-stats">
                            Characters: {outputText.length} | Lines: {outputText.split('\n').length}
                        </div>
                    </div>
                </div>

                <div className="encoding-examples">
                    <h3>Quick Examples</h3>
                    <div className="examples-grid">
                        <div className="example-card">
                            <h4>📝 Text</h4>
                            <code>Hello World!</code>
                        </div>
                        <div className="example-card">
                            <h4>🔐 {encodingMethods[activeTab].name}</h4>
                            <code>
                                {(() => {
                                    try {
                                        return encodingMethods[activeTab].encode('Hello World!');
                                    } catch {
                                        return 'Error encoding example';
                                    }
                                })()}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncoderTool;
