import React, { useState } from 'react';
import './QrTool.css';

const QrTool = () => {
    const [text, setText] = useState('');
    const [qrSize, setQrSize] = useState(200);
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');

    const generateQRCode = () => {
        if (!text) return;
        
        // Using Google Charts API for QR code generation
        const baseUrl = 'https://chart.googleapis.com/chart';
        const params = new URLSearchParams({
            cht: 'qr', // Chart type: QR code
            chs: `${qrSize}x${qrSize}`, // Size
            chl: text, // Data
            chld: `${errorCorrectionLevel}|0` // Error correction level
        });

        return `${baseUrl}?${params.toString()}`;
    };

    const handleDownload = () => {
        const qrUrl = generateQRCode();
        if (!qrUrl) return;

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="qr-tool">
            <h2>QR Code Generator</h2>
            <div className="qr-container">
                <div className="input-section">
                    <div className="form-group">
                        <label>Enter text or URL:</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text to generate QR code..."
                        />
                    </div>

                    <div className="form-group">
                        <label>QR Code Size (px):</label>
                        <input
                            type="range"
                            min="100"
                            max="500"
                            value={qrSize}
                            onChange={(e) => setQrSize(e.target.value)}
                        />
                        <span>{qrSize}px</span>
                    </div>

                    <div className="form-group">
                        <label>Error Correction Level:</label>
                        <select
                            value={errorCorrectionLevel}
                            onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                        >
                            <option value="L">Low (7%)</option>
                            <option value="M">Medium (15%)</option>
                            <option value="Q">Quarter (25%)</option>
                            <option value="H">High (30%)</option>
                        </select>
                    </div>
                </div>

                <div className="output-section">
                    {text && (
                        <>
                            <div className="qr-preview">
                                <img src={generateQRCode()} alt="Generated QR Code" />
                            </div>
                            <button onClick={handleDownload}>Download QR Code</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrTool;
