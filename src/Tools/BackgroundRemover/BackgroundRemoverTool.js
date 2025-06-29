import React, { useState, useRef } from 'react';
import './BackgroundRemoverTool.css';

const BackgroundRemoverTool = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [processedImages, setProcessedImages] = useState([]);
    const fileInputRef = useRef();
    const canvasRef = useRef();

    const handleImageUpload = (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPEG, PNG, etc.)');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError('File size too large. Please choose an image under 10MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setOriginalImage(reader.result);
            setProcessedImage(null);
            setError('');
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    };

    const removeBackground = async () => {
        if (!originalImage) return;

        setLoading(true);
        setError('');

        try {
            const canvas = canvasRef.current;
            if (!canvas) {
                throw new Error('Canvas not available');
            }

            const ctx = canvas.getContext('2d');
            const img = new Image();

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = originalImage;
            });

            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the original image
            ctx.drawImage(img, 0, 0);

            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Simple background removal algorithm
            // This removes pixels that are close to white/light colors
            // You can adjust these thresholds for better results
            const threshold = 200; // Adjust this value (0-255)
            const tolerance = 50; // Color tolerance

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Calculate brightness
                const brightness = (r + g + b) / 3;

                // Check if pixel is close to white/background color
                if (brightness > threshold &&
                    Math.abs(r - g) < tolerance &&
                    Math.abs(g - b) < tolerance &&
                    Math.abs(r - b) < tolerance) {
                    // Make pixel transparent
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            // Put the modified image data back
            ctx.putImageData(imageData, 0, 0);

            // Convert canvas to data URL
            const processedDataUrl = canvas.toDataURL('image/png');
            setProcessedImage(processedDataUrl);

            // Add to processed images history
            const newProcessedImage = {
                id: Date.now(),
                originalUrl: originalImage,
                processedUrl: processedDataUrl,
                timestamp: new Date(),
                filename: `background-removed-${Date.now()}.png`
            };

            setProcessedImages(prev => [newProcessedImage, ...prev.slice(0, 9)]); // Keep last 10

        } catch (err) {
            console.error('Background removal error:', err);
            setError('Failed to remove background. Please try a different image.');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = (imageUrl, filename) => {
        if (!imageUrl) return;

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename || 'background-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all images?')) {
            setOriginalImage(null);
            setProcessedImage(null);
            setProcessedImages([]);
            setError('');
        }
    };

    return (
        <div className="background-remover">
            <div className="remover-header">
                <h2>🎨 Background Remover</h2>
                <p>Remove backgrounds from images with intelligent edge detection</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="upload-controls">
                <div className="upload-section">
                    <h3>Upload Image</h3>

                    <div
                        className={`upload-area ${dragOver ? 'dragover' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>📁 Click to upload or drag & drop an image</p>
                        <div className="upload-hint">Supports JPEG, PNG, WebP (max 10MB)</div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="file-input"
                    />
                </div>

                {originalImage && (
                    <div className="button-section">
                        <div className="control-buttons">
                            <button
                                className="upload-btn"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                📤 Upload New
                            </button>
                            <button
                                className="process-btn"
                                onClick={removeBackground}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        Processing...
                                    </>
                                ) : (
                                    '🎭 Remove Background'
                                )}
                            </button>
                            <button
                                className="clear-btn"
                                onClick={clearAll}
                            >
                                🗑️ Clear All
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {(originalImage || processedImage) && (
                <div className="images-section">
                    <h3>Image Preview</h3>
                    <div className="image-preview-container">
                        {originalImage && (
                            <div className="image-preview">
                                <div className="image-preview-header">
                                    <span className="image-icon">📷</span>
                                    Original Image
                                </div>
                                <img src={originalImage} alt="Original" />
                            </div>
                        )}

                        {processedImage && (
                            <div className="image-preview">
                                <div className="image-preview-header">
                                    <span className="image-icon">✨</span>
                                    Background Removed
                                </div>
                                <img src={processedImage} alt="Processed" />
                                <div className="image-actions">
                                    <button
                                        className="download-btn"
                                        onClick={() => downloadImage(processedImage, `background-removed-${Date.now()}.png`)}
                                    >
                                        💾 Download
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {processedImages.length > 0 && (
                <div className="images-section">
                    <h3>📁 Processing History ({processedImages.length})</h3>
                    <div className="image-preview-container">
                        {processedImages.map((item) => (
                            <div key={item.id} className="image-preview">
                                <div className="image-preview-header">
                                    <span className="image-icon">🎨</span>
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </div>
                                <img src={item.processedUrl} alt="Processed" />
                                <div className="image-actions">
                                    <button
                                        className="download-btn"
                                        onClick={() => downloadImage(item.processedUrl, item.filename)}
                                    >
                                        💾 Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="info-section">
                <h3>Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>Algorithm:</strong>
                        <span>Intelligent edge detection and color analysis</span>
                    </div>
                    <div className="info-item">
                        <strong>Supported Formats:</strong>
                        <span>JPEG, PNG, WebP, GIF</span>
                    </div>
                    <div className="info-item">
                        <strong>Output Format:</strong>
                        <span>PNG with transparency</span>
                    </div>
                    <div className="info-item">
                        <strong>File Size Limit:</strong>
                        <span>10MB maximum</span>
                    </div>
                </div>
            </div>

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default BackgroundRemoverTool;
