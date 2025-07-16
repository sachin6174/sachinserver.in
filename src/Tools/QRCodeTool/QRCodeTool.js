import React, { useState, useRef, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import QrScanner from 'qr-scanner';
import './QRCodeTool.css';

const QRCodeTool = () => {
    const [activeTab, setActiveTab] = useState('generate');
    const [inputText, setInputText] = useState('');
    const [qrCodeURL, setQrCodeURL] = useState('');
    const [decodedText, setDecodedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDecoding, setIsDecoding] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // QR Code customization options
    const [qrOptions, setQrOptions] = useState({
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        width: 512
    });

    // Batch generation
    const [batchInput, setBatchInput] = useState('');
    const [batchResults, setBatchResults] = useState([]);

    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const generateQRCode = useCallback(async (text = inputText) => {
        if (!text.trim()) {
            setError('Please enter some text to generate QR code');
            return null;
        }

        setIsGenerating(true);
        clearMessages();

        try {
            const canvas = canvasRef.current;
            await QRCode.toCanvas(canvas, text, qrOptions);
            
            const dataURL = canvas.toDataURL(qrOptions.type, qrOptions.quality);
            setQrCodeURL(dataURL);
            setSuccess('QR Code generated successfully!');
            
            return dataURL;
        } catch (err) {
            setError('Error generating QR code: ' + err.message);
            return null;
        } finally {
            setIsGenerating(false);
        }
    }, [inputText, qrOptions]);

    const downloadQRCode = () => {
        if (!qrCodeURL) {
            setError('No QR code to download');
            return;
        }

        const link = document.createElement('a');
        link.download = `qrcode_${Date.now()}.png`;
        link.href = qrCodeURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file');
            return;
        }

        setIsDecoding(true);
        clearMessages();

        try {
            const result = await QrScanner.scanImage(file);
            setDecodedText(result);
            setSuccess('QR Code decoded successfully!');
        } catch (err) {
            setError('Could not decode QR code from image. Make sure the image contains a valid QR code.');
        } finally {
            setIsDecoding(false);
        }
    };

    const generateBatchQRCodes = async () => {
        if (!batchInput.trim()) {
            setError('Please enter text for batch generation');
            return;
        }

        setIsGenerating(true);
        clearMessages();

        try {
            const lines = batchInput.split('\n').filter(line => line.trim());
            const results = [];

            for (let i = 0; i < lines.length; i++) {
                const text = lines[i].trim();
                if (text) {
                    try {
                        const dataURL = await QRCode.toDataURL(text, qrOptions);
                        results.push({
                            id: Date.now() + i,
                            text: text,
                            dataURL: dataURL,
                            success: true
                        });
                    } catch (err) {
                        results.push({
                            id: Date.now() + i,
                            text: text,
                            error: err.message,
                            success: false
                        });
                    }
                }
            }

            setBatchResults(results);
            setSuccess(`Generated ${results.filter(r => r.success).length} QR codes successfully!`);
        } catch (err) {
            setError('Error in batch generation: ' + err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadBatchQRCode = (result) => {
        const link = document.createElement('a');
        link.download = `qrcode_${result.text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        link.href = result.dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAllBatch = () => {
        batchResults.filter(r => r.success).forEach((result, index) => {
            setTimeout(() => {
                downloadBatchQRCode(result);
            }, index * 100); // Small delay between downloads
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setSuccess('Copied to clipboard!');
    };

    const updateQROptions = (key, value) => {
        setQrOptions(prev => {
            const newOptions = { ...prev };
            if (key.includes('.')) {
                const [parent, child] = key.split('.');
                newOptions[parent] = { ...newOptions[parent], [child]: value };
            } else {
                newOptions[key] = value;
            }
            return newOptions;
        });
    };

    // Auto-generate QR code when input changes
    useEffect(() => {
        if (inputText.trim() && activeTab === 'generate') {
            const timer = setTimeout(() => {
                generateQRCode();
            }, 500); // Debounce
            return () => clearTimeout(timer);
        }
    }, [inputText, generateQRCode, activeTab]);

    const predefinedTexts = [
        { label: 'Website URL', value: 'https://example.com' },
        { label: 'Email', value: 'mailto:someone@example.com' },
        { label: 'Phone', value: 'tel:+1234567890' },
        { label: 'SMS', value: 'sms:+1234567890' },
        { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
        { label: 'vCard', value: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD' }
    ];

    return (
        <div className="tools-container">

            <div className="qr-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'generate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('generate')}
                    >
                        🔲 Generate QR
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'decode' ? 'active' : ''}`}
                        onClick={() => setActiveTab('decode')}
                    >
                        🔍 Decode QR
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'batch' ? 'active' : ''}`}
                        onClick={() => setActiveTab('batch')}
                    >
                        📦 Batch Generate
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'customize' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customize')}
                    >
                        🎨 Customize
                    </button>
                </div>

                {(error || success) && (
                    <div className="message-area">
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                    </div>
                )}

                <div className="qr-content">
                    {activeTab === 'generate' && (
                        <div className="generate-section">
                            <div className="input-section">
                                <h3>📝 Enter Text or Data</h3>
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Enter text, URL, email, phone number, or any data to generate QR code..."
                                    className="text-input"
                                    rows={6}
                                />

                                <div className="predefined-section">
                                    <h4>Quick Templates:</h4>
                                    <div className="template-buttons">
                                        {predefinedTexts.map((template, index) => (
                                            <button
                                                key={index}
                                                className="template-btn"
                                                onClick={() => setInputText(template.value)}
                                            >
                                                {template.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="generate-controls">
                                    <button
                                        className="btn btn-generate"
                                        onClick={() => generateQRCode()}
                                        disabled={isGenerating || !inputText.trim()}
                                    >
                                        {isGenerating ? '⏳ Generating...' : '🔲 Generate QR Code'}
                                    </button>
                                </div>
                            </div>

                            <div className="output-section">
                                <h3>🎯 Generated QR Code</h3>
                                <div className="qr-display">
                                    <canvas
                                        ref={canvasRef}
                                        className="qr-canvas"
                                        style={{ display: qrCodeURL ? 'block' : 'none' }}
                                    />
                                    {!qrCodeURL && (
                                        <div className="qr-placeholder">
                                            <div className="placeholder-icon">🔲</div>
                                            <p>QR code will appear here</p>
                                        </div>
                                    )}
                                </div>

                                {qrCodeURL && (
                                    <div className="qr-actions">
                                        <button className="btn btn-download" onClick={downloadQRCode}>
                                            💾 Download PNG
                                        </button>
                                        <button className="btn btn-copy" onClick={() => copyToClipboard(inputText)}>
                                            📋 Copy Text
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'decode' && (
                        <div className="decode-section">
                            <h3>🔍 Decode QR Code from Image</h3>
                            
                            <div className="upload-area">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="file-input"
                                    id="qr-upload"
                                />
                                <label htmlFor="qr-upload" className="upload-label">
                                    <div className="upload-icon">📷</div>
                                    <div className="upload-text">
                                        <h4>Upload QR Code Image</h4>
                                        <p>Click here or drag and drop an image containing a QR code</p>
                                        <small>Supports JPG, PNG, GIF, WebP</small>
                                    </div>
                                </label>
                            </div>

                            {isDecoding && (
                                <div className="decoding-status">
                                    <div className="spinner">⏳</div>
                                    <p>Decoding QR code...</p>
                                </div>
                            )}

                            {decodedText && (
                                <div className="decoded-result">
                                    <h4>✅ Decoded Text:</h4>
                                    <div className="decoded-content">
                                        <pre>{decodedText}</pre>
                                    </div>
                                    <div className="decoded-actions">
                                        <button className="btn btn-copy" onClick={() => copyToClipboard(decodedText)}>
                                            📋 Copy Result
                                        </button>
                                        {decodedText.startsWith('http') && (
                                            <a
                                                href={decodedText}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-open"
                                            >
                                                🔗 Open Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'batch' && (
                        <div className="batch-section">
                            <h3>📦 Batch QR Code Generation</h3>
                            
                            <div className="batch-input">
                                <label htmlFor="batch-text">Enter multiple texts (one per line):</label>
                                <textarea
                                    id="batch-text"
                                    value={batchInput}
                                    onChange={(e) => setBatchInput(e.target.value)}
                                    placeholder="https://example1.com&#10;https://example2.com&#10;Contact: John Doe&#10;Phone: +1234567890&#10;..."
                                    className="batch-textarea"
                                    rows={10}
                                />
                                
                                <div className="batch-controls">
                                    <button
                                        className="btn btn-generate"
                                        onClick={generateBatchQRCodes}
                                        disabled={isGenerating || !batchInput.trim()}
                                    >
                                        {isGenerating ? '⏳ Generating...' : '📦 Generate All QR Codes'}
                                    </button>
                                    
                                    {batchResults.length > 0 && (
                                        <button className="btn btn-download-all" onClick={downloadAllBatch}>
                                            💾 Download All ({batchResults.filter(r => r.success).length})
                                        </button>
                                    )}
                                </div>
                            </div>

                            {batchResults.length > 0 && (
                                <div className="batch-results">
                                    <h4>📋 Generated QR Codes ({batchResults.filter(r => r.success).length}/{batchResults.length})</h4>
                                    <div className="batch-grid">
                                        {batchResults.map((result) => (
                                            <div key={result.id} className={`batch-item ${result.success ? 'success' : 'error'}`}>
                                                {result.success ? (
                                                    <>
                                                        <img src={result.dataURL} alt="QR Code" className="batch-qr" />
                                                        <div className="batch-text">{result.text}</div>
                                                        <button
                                                            className="btn-small"
                                                            onClick={() => downloadBatchQRCode(result)}
                                                        >
                                                            💾 Download
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="error-icon">❌</div>
                                                        <div className="batch-text">{result.text}</div>
                                                        <div className="error-text">{result.error}</div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'customize' && (
                        <div className="customize-section">
                            <h3>🎨 QR Code Customization</h3>
                            
                            <div className="customization-grid">
                                <div className="custom-group">
                                    <label htmlFor="qr-size">Size (px):</label>
                                    <input
                                        id="qr-size"
                                        type="number"
                                        min="128"
                                        max="2048"
                                        value={qrOptions.width}
                                        onChange={(e) => updateQROptions('width', parseInt(e.target.value))}
                                        className="custom-input"
                                    />
                                </div>

                                <div className="custom-group">
                                    <label htmlFor="error-correction">Error Correction:</label>
                                    <select
                                        id="error-correction"
                                        value={qrOptions.errorCorrectionLevel}
                                        onChange={(e) => updateQROptions('errorCorrectionLevel', e.target.value)}
                                        className="custom-select"
                                    >
                                        <option value="L">Low (7%)</option>
                                        <option value="M">Medium (15%)</option>
                                        <option value="Q">Quartile (25%)</option>
                                        <option value="H">High (30%)</option>
                                    </select>
                                </div>

                                <div className="custom-group">
                                    <label htmlFor="margin">Margin:</label>
                                    <input
                                        id="margin"
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={qrOptions.margin}
                                        onChange={(e) => updateQROptions('margin', parseInt(e.target.value))}
                                        className="custom-input"
                                    />
                                </div>

                                <div className="custom-group">
                                    <label htmlFor="dark-color">Dark Color:</label>
                                    <input
                                        id="dark-color"
                                        type="color"
                                        value={qrOptions.color.dark}
                                        onChange={(e) => updateQROptions('color.dark', e.target.value)}
                                        className="custom-color"
                                    />
                                </div>

                                <div className="custom-group">
                                    <label htmlFor="light-color">Light Color:</label>
                                    <input
                                        id="light-color"
                                        type="color"
                                        value={qrOptions.color.light}
                                        onChange={(e) => updateQROptions('color.light', e.target.value)}
                                        className="custom-color"
                                    />
                                </div>

                                <div className="custom-group">
                                    <label htmlFor="quality">Quality:</label>
                                    <input
                                        id="quality"
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={qrOptions.quality}
                                        onChange={(e) => updateQROptions('quality', parseFloat(e.target.value))}
                                        className="custom-range"
                                    />
                                    <span className="range-value">{(qrOptions.quality * 100).toFixed(0)}%</span>
                                </div>
                            </div>

                            <div className="preview-section">
                                <h4>🎯 Preview with Current Settings</h4>
                                <p>Go to the Generate tab to see your customized QR code.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeTool;