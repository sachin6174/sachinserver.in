import React, { useState, useRef } from 'react';
import './AppIconGenerator.css';

const AppIconGenerator = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedIcons, setGeneratedIcons] = useState([]);
    const [platform, setPlatform] = useState('ios');
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // iOS App Icon Sizes
    const iosIconSizes = [
        { size: 20, name: 'iPhone Notification', multipliers: [2, 3] },
        { size: 29, name: 'iPhone Settings', multipliers: [2, 3] },
        { size: 40, name: 'iPhone Spotlight', multipliers: [2, 3] },
        { size: 60, name: 'iPhone App', multipliers: [2, 3] },
        { size: 20, name: 'iPad Notification', multipliers: [1, 2] },
        { size: 29, name: 'iPad Settings', multipliers: [1, 2] },
        { size: 40, name: 'iPad Spotlight', multipliers: [1, 2] },
        { size: 76, name: 'iPad App', multipliers: [1, 2] },
        { size: 83.5, name: 'iPad Pro App', multipliers: [2] },
        { size: 1024, name: 'App Store', multipliers: [1] }
    ];

    // Android App Icon Sizes
    const androidIconSizes = [
        { size: 36, name: 'ldpi', density: 'ldpi' },
        { size: 48, name: 'mdpi', density: 'mdpi' },
        { size: 72, name: 'hdpi', density: 'hdpi' },
        { size: 96, name: 'xhdpi', density: 'xhdpi' },
        { size: 144, name: 'xxhdpi', density: 'xxhdpi' },
        { size: 192, name: 'xxxhdpi', density: 'xxxhdpi' },
        { size: 512, name: 'Play Store', density: 'play-store' }
    ];

    // macOS App Icon Sizes
    const macosIconSizes = [
        { size: 16, name: 'Small', multipliers: [1, 2] },
        { size: 32, name: 'Medium', multipliers: [1, 2] },
        { size: 128, name: 'Large', multipliers: [1, 2] },
        { size: 256, name: 'Extra Large', multipliers: [1, 2] },
        { size: 512, name: 'Huge', multipliers: [1, 2] }
    ];

    const getCurrentSizes = () => {
        switch (platform) {
            case 'ios': return iosIconSizes;
            case 'android': return androidIconSizes;
            case 'macos': return macosIconSizes;
            default: return iosIconSizes;
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage({
                        src: e.target.result,
                        width: img.width,
                        height: img.height,
                        file: file
                    });
                    setGeneratedIcons([]);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const generateIcon = (size, isRetina = false) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const actualSize = Math.round(size * (isRetina ? 2 : 1));
            
            canvas.width = actualSize;
            canvas.height = actualSize;

            const img = new Image();
            img.onload = () => {
                // Enable smooth scaling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Calculate crop dimensions to maintain aspect ratio
                const sourceSize = Math.min(img.width, img.height);
                const sourceX = (img.width - sourceSize) / 2;
                const sourceY = (img.height - sourceSize) / 2;

                // Draw image with proper scaling
                ctx.drawImage(
                    img,
                    sourceX, sourceY, sourceSize, sourceSize,
                    0, 0, actualSize, actualSize
                );

                canvas.toBlob(resolve, 'image/png');
            };
            img.src = uploadedImage.src;
        });
    };

    const generateAllIcons = async () => {
        if (!uploadedImage) return;

        setIsGenerating(true);
        const icons = [];
        const sizes = getCurrentSizes();

        try {
            for (const sizeInfo of sizes) {
                if (platform === 'android') {
                    const blob = await generateIcon(sizeInfo.size);
                    icons.push({
                        name: `ic_launcher_${sizeInfo.density}.png`,
                        size: `${sizeInfo.size}x${sizeInfo.size}`,
                        blob: blob,
                        actualSize: sizeInfo.size,
                        description: sizeInfo.name
                    });
                } else {
                    const multipliers = sizeInfo.multipliers || [1];
                    for (const multiplier of multipliers) {
                        const actualSize = sizeInfo.size * multiplier;
                        const blob = await generateIcon(sizeInfo.size, multiplier > 1);
                        const suffix = multiplier > 1 ? `@${multiplier}x` : '';
                        icons.push({
                            name: `icon_${Math.round(sizeInfo.size)}x${Math.round(sizeInfo.size)}${suffix}.png`,
                            size: `${Math.round(actualSize)}x${Math.round(actualSize)}`,
                            blob: blob,
                            actualSize: actualSize,
                            description: `${sizeInfo.name}${suffix ? ` ${multiplier}x` : ''}`
                        });
                    }
                }
            }

            setGeneratedIcons(icons);
        } catch (error) {
            console.error('Error generating icons:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadIcon = (icon) => {
        const url = URL.createObjectURL(icon.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = icon.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadAllIcons = async () => {
        // For a complete implementation, you would use a library like JSZip
        // For now, we'll download them individually
        for (const icon of generatedIcons) {
            await new Promise(resolve => {
                setTimeout(() => {
                    downloadIcon(icon);
                    resolve();
                }, 100);
            });
        }
    };

    const clearUpload = () => {
        setUploadedImage(null);
        setGeneratedIcons([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="app-icon-generator">
            <div className="generator-header">
                <h2>🍎 App Icon Generator</h2>
                <p>Upload an image and generate app icons for iOS, Android, or macOS</p>
            </div>

            <div className="upload-section">
                <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                    {uploadedImage ? (
                        <div className="uploaded-image">
                            <img src={uploadedImage.src} alt="Uploaded" />
                            <div className="image-info">
                                <span>{uploadedImage.width}x{uploadedImage.height}px</span>
                                <button 
                                    className="clear-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearUpload();
                                    }}
                                >
                                    ✕ Clear
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <div className="upload-icon">📁</div>
                            <p>Click to upload image</p>
                            <small>Recommended: 1024x1024px or larger</small>
                            <small>Formats: PNG, JPG, JPEG</small>
                        </div>
                    )}
                </div>
                
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {uploadedImage && (
                <div className="platform-selection">
                    <h3>Select Platform</h3>
                    <div className="platform-buttons">
                        <button
                            className={`platform-btn ${platform === 'ios' ? 'active' : ''}`}
                            onClick={() => setPlatform('ios')}
                        >
                            📱 iOS
                        </button>
                        <button
                            className={`platform-btn ${platform === 'android' ? 'active' : ''}`}
                            onClick={() => setPlatform('android')}
                        >
                            🤖 Android
                        </button>
                        <button
                            className={`platform-btn ${platform === 'macos' ? 'active' : ''}`}
                            onClick={() => setPlatform('macos')}
                        >
                            💻 macOS
                        </button>
                    </div>
                </div>
            )}

            {uploadedImage && (
                <div className="generate-section">
                    <button 
                        className="generate-btn"
                        onClick={generateAllIcons}
                        disabled={isGenerating}
                    >
                        {isGenerating ? '⏳ Generating...' : '🎨 Generate Icons'}
                    </button>

                    {generatedIcons.length > 0 && (
                        <button 
                            className="download-all-btn"
                            onClick={downloadAllIcons}
                        >
                            📦 Download All ({generatedIcons.length})
                        </button>
                    )}
                </div>
            )}

            {generatedIcons.length > 0 && (
                <div className="generated-icons">
                    <h3>Generated Icons ({generatedIcons.length})</h3>
                    <div className="icons-grid">
                        {generatedIcons.map((icon, index) => (
                            <div key={index} className="icon-item">
                                <div className="icon-preview">
                                    <img 
                                        src={URL.createObjectURL(icon.blob)} 
                                        alt={icon.name}
                                        onLoad={(e) => {
                                            // Clean up object URL when image loads
                                            setTimeout(() => {
                                                URL.revokeObjectURL(e.target.src);
                                            }, 100);
                                        }}
                                    />
                                </div>
                                <div className="icon-details">
                                    <div className="icon-name">{icon.name}</div>
                                    <div className="icon-size">{icon.size}</div>
                                    <div className="icon-description">{icon.description}</div>
                                </div>
                                <button
                                    className="download-icon-btn"
                                    onClick={() => downloadIcon(icon)}
                                >
                                    ⬇️
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!uploadedImage && (
                <div className="features-info">
                    <h3>Features</h3>
                    <div className="features-grid">
                        <div className="feature">
                            <span className="feature-icon">📱</span>
                            <div>
                                <strong>iOS Icons</strong>
                                <p>All required sizes for iPhone, iPad, and App Store</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🤖</span>
                            <div>
                                <strong>Android Icons</strong>
                                <p>Complete set for all screen densities</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">💻</span>
                            <div>
                                <strong>macOS Icons</strong>
                                <p>Standard and Retina sizes for Mac apps</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">⚡</span>
                            <div>
                                <strong>High Quality</strong>
                                <p>Optimized scaling with smooth rendering</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default AppIconGenerator;