import React, { useState, useRef } from 'react';
import './BackgroundRemoverTool.css';

const BackgroundRemoverTool = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = () => {
                setOriginalImage(reader.result);
                setProcessedImage(null);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const removeBackground = async () => {
        if (!originalImage) return;

        setLoading(true);
        setError('');
        
        try {
            // This is a placeholder for actual API integration
            // You would typically send the image to a background removal API
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
            
            // For demonstration, we're just using the original image
            setProcessedImage(originalImage);
        } catch (err) {
            setError('Failed to remove background: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!processedImage) return;
        
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'processed-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="background-remover">
            <h2>Background Remover</h2>
            
            <div className="tool-container">
                <div className="upload-section">
                    <button onClick={() => fileInputRef.current.click()}>
                        Upload Image
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="image-preview-container">
                    <div className="image-preview">
                        {originalImage && (
                            <>
                                <h3>Original Image</h3>
                                <img src={originalImage} alt="Original" />
                            </>
                        )}
                    </div>
                    
                    <div className="image-preview">
                        {processedImage && (
                            <>
                                <h3>Processed Image</h3>
                                <img src={processedImage} alt="Processed" />
                            </>
                        )}
                    </div>
                </div>

                {originalImage && (
                    <div className="actions">
                        <button 
                            onClick={removeBackground}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Remove Background'}
                        </button>
                        {processedImage && (
                            <button onClick={downloadImage}>
                                Download
                            </button>
                        )}
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default BackgroundRemoverTool;
