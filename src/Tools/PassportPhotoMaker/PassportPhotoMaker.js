import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import './PassportPhotoMaker.css';

const PassportPhotoMaker = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState('6x4');
    const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [passportPhotos, setPassportPhotos] = useState([]);
    const [activeTab, setActiveTab] = useState('upload');
    const [imageDisplayInfo, setImageDisplayInfo] = useState({ width: 0, height: 0, offsetX: 0, offsetY: 0, scale: 1 });
    
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const cropRef = useRef(null);
    const containerRef = useRef(null);
    const fileInputRef = useRef(null);

    const photoSizes = useMemo(() => ({
        '6x4': {
            name: '6x4 inch',
            paperWidth: 6 * 96, // 6 inches in pixels (96 DPI)
            paperHeight: 4 * 96,
            photoWidth: 1.2 * 96, // 1.2 inch passport photo width
            photoHeight: 1.54 * 96, // Height based on 0.778 aspect ratio
            photosPerRow: 4,
            photosPerColumn: 2,
            aspectRatio: 35/45, // 0.778 - Same rectangular ratio as A4 for consistency
            description: '6x4 inch paper with rectangular passport photos (4x2 layout)'
        },
        'A4': {
            name: 'A4 (210x297mm)',
            paperWidth: 8.27 * 96, // A4 width in pixels
            paperHeight: 11.69 * 96, // A4 height in pixels
            photoWidth: 1.38 * 96, // 35mm passport photo
            photoHeight: 1.77 * 96, // 45mm passport photo
            photosPerRow: 5,
            photosPerColumn: 6,
            aspectRatio: 35/45, // 0.778 - Standard international passport photo ratio (35mm x 45mm)
            description: 'A4 paper with 35x45mm passport photos (5x6 layout)'
        }
    }), []);

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
                        height: img.height
                    });
                    setActiveTab('crop');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    // Calculate display info when image loads
    const updateImageDisplayInfo = useCallback(() => {
        if (!uploadedImage || !imageRef.current) return;

        const imgElement = imageRef.current;
        const rect = imgElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Calculate scale factor
        const scaleX = rect.width / uploadedImage.width;
        const scaleY = rect.height / uploadedImage.height;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate displayed dimensions
        const displayWidth = uploadedImage.width * scale;
        const displayHeight = uploadedImage.height * scale;
        
        // Calculate offset (centering)
        const offsetX = (rect.width - displayWidth) / 2;
        const offsetY = (rect.height - displayHeight) / 2;
        
        setImageDisplayInfo({
            width: displayWidth,
            height: displayHeight,
            offsetX: rect.left - containerRect.left + offsetX,
            offsetY: rect.top - containerRect.top + offsetY,
            scale
        });

        // Initialize crop area if not set or if image changed
        if (cropArea.width === 200 && cropArea.height === 200) {
            const aspectRatio = photoSizes[selectedSize].aspectRatio;
            const minDimension = Math.min(uploadedImage.width, uploadedImage.height);
            const baseSize = Math.min(200, minDimension * 0.3);
            
            let cropWidth, cropHeight;
            if (aspectRatio >= 1) {
                // Width >= Height (landscape or square)
                cropWidth = baseSize;
                cropHeight = baseSize / aspectRatio;
            } else {
                // Height > Width (portrait)
                cropHeight = baseSize;
                cropWidth = baseSize * aspectRatio;
            }
            
            setCropArea({
                x: (uploadedImage.width - cropWidth) / 2,
                y: (uploadedImage.height - cropHeight) / 2,
                width: cropWidth,
                height: cropHeight
            });
        }
    }, [uploadedImage, cropArea.width, cropArea.height, selectedSize, photoSizes]);

    useEffect(() => {
        if (uploadedImage && activeTab === 'crop') {
            // Small delay to ensure image is rendered
            const timer = setTimeout(updateImageDisplayInfo, 100);
            return () => clearTimeout(timer);
        }
    }, [uploadedImage, activeTab, updateImageDisplayInfo]);

    // Add window resize listener to update display info
    useEffect(() => {
        if (uploadedImage && activeTab === 'crop') {
            const handleResize = () => {
                setTimeout(updateImageDisplayInfo, 100);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [uploadedImage, activeTab, updateImageDisplayInfo]);

    const handleMouseDown = useCallback((e, action, handle = null) => {
        e.preventDefault();
        e.stopPropagation();
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Convert display coordinates to image coordinates
        const imageX = (x - imageDisplayInfo.offsetX) / imageDisplayInfo.scale;
        const imageY = (y - imageDisplayInfo.offsetY) / imageDisplayInfo.scale;

        if (action === 'drag') {
            setIsDragging(true);
            setDragStart({
                x: imageX - cropArea.x,
                y: imageY - cropArea.y
            });
        } else if (action === 'resize') {
            setIsResizing(true);
            setResizeHandle(handle);
            setDragStart({ x: imageX, y: imageY });
        }
    }, [cropArea, imageDisplayInfo]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging && !isResizing) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Convert display coordinates to image coordinates
        const imageX = (x - imageDisplayInfo.offsetX) / imageDisplayInfo.scale;
        const imageY = (y - imageDisplayInfo.offsetY) / imageDisplayInfo.scale;

        if (isDragging) {
            const newX = Math.max(0, Math.min(imageX - dragStart.x, uploadedImage.width - cropArea.width));
            const newY = Math.max(0, Math.min(imageY - dragStart.y, uploadedImage.height - cropArea.height));
            
            setCropArea(prev => ({
                ...prev,
                x: newX,
                y: newY
            }));
        } else if (isResizing) {
            const deltaX = imageX - dragStart.x;
            const deltaY = imageY - dragStart.y;
            
            setCropArea(prev => {
                const aspectRatio = photoSizes[selectedSize].aspectRatio;
                const minSize = 50;
                const maxX = uploadedImage.width;
                const maxY = uploadedImage.height;
                
                // For aspect ratio constrained resizing, we'll primarily use the larger delta
                // and calculate the other dimension based on aspect ratio
                let newWidth = prev.width;
                let newHeight = prev.height;
                let newX = prev.x;
                let newY = prev.y;
                
                if (resizeHandle === 'top-left') {
                    // Use the larger of the two deltas to maintain aspect ratio
                    const delta = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX < 0 || deltaY < 0 ? -1 : 1);
                    newWidth = Math.max(minSize, prev.width - delta);
                    newHeight = newWidth / aspectRatio;
                    newX = Math.max(0, Math.min(prev.x + delta, prev.x + prev.width - minSize));
                    newY = Math.max(0, Math.min(prev.y + (prev.height - newHeight), maxY - newHeight));
                } else if (resizeHandle === 'top-right') {
                    const delta = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX > 0 || deltaY < 0 ? 1 : -1);
                    newWidth = Math.max(minSize, prev.width + delta);
                    newHeight = newWidth / aspectRatio;
                    newY = Math.max(0, Math.min(prev.y + (prev.height - newHeight), maxY - newHeight));
                } else if (resizeHandle === 'bottom-left') {
                    const delta = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX < 0 || deltaY > 0 ? -1 : 1);
                    newWidth = Math.max(minSize, prev.width - delta);
                    newHeight = newWidth / aspectRatio;
                    newX = Math.max(0, Math.min(prev.x + delta, prev.x + prev.width - minSize));
                } else if (resizeHandle === 'bottom-right') {
                    const delta = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX > 0 || deltaY > 0 ? 1 : -1);
                    newWidth = Math.max(minSize, prev.width + delta);
                    newHeight = newWidth / aspectRatio;
                } 
                // For edge handles, we'll disable them to maintain aspect ratio
                // Only corner handles will work for aspect ratio constrained resizing
                else {
                    // Disable edge resizing for aspect ratio maintenance
                    return prev;
                }
                
                // Ensure the crop area fits within image bounds
                newWidth = Math.min(newWidth, maxX - newX);
                newHeight = Math.min(newHeight, maxY - newY);
                
                // If width was constrained, recalculate height
                if (newWidth < prev.width && newWidth === maxX - newX) {
                    newHeight = newWidth / aspectRatio;
                }
                
                // If height was constrained, recalculate width  
                if (newHeight < prev.height && newHeight === maxY - newY) {
                    newWidth = newHeight * aspectRatio;
                }
                
                return {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight
                };
            });
            
            setDragStart({ x: imageX, y: imageY });
        }
    }, [isDragging, isResizing, dragStart, cropArea, uploadedImage, resizeHandle, imageDisplayInfo, selectedSize, photoSizes]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
    }, []);

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    const cropImage = () => {
        if (!uploadedImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            const size = photoSizes[selectedSize];
            canvas.width = size.photoWidth;
            canvas.height = size.photoHeight;
            
            // Draw cropped and resized image
            ctx.drawImage(
                img,
                cropArea.x, cropArea.y, cropArea.width, cropArea.height,
                0, 0, size.photoWidth, size.photoHeight
            );
            
            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            setPassportPhotos(prev => [...prev, {
                id: Date.now(),
                dataUrl: croppedDataUrl,
                size: selectedSize
            }]);
            
            setActiveTab('preview');
        };
        
        img.src = uploadedImage.src;
    };

    const generatePassportSheet = useCallback(() => {
        if (passportPhotos.length === 0) return;

        const size = photoSizes[selectedSize];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = size.paperWidth;
        canvas.height = size.paperHeight;
        
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const latestPhoto = passportPhotos[passportPhotos.length - 1];
        const img = new Image();
        
        img.onload = () => {
            // Calculate spacing
            const marginX = (size.paperWidth - (size.photosPerRow * size.photoWidth)) / (size.photosPerRow + 1);
            const marginY = (size.paperHeight - (size.photosPerColumn * size.photoHeight)) / (size.photosPerColumn + 1);
            
            // Draw photos in grid
            for (let row = 0; row < size.photosPerColumn; row++) {
                for (let col = 0; col < size.photosPerRow; col++) {
                    const x = marginX + col * (size.photoWidth + marginX);
                    const y = marginY + row * (size.photoHeight + marginY);
                    
                    // Draw photo
                    ctx.drawImage(img, x, y, size.photoWidth, size.photoHeight);
                }
            }
        };
        
        img.src = latestPhoto.dataUrl;
    }, [passportPhotos, selectedSize, photoSizes]);

    const downloadPassportSheet = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `passport-photos-${selectedSize}-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };

    const downloadSinglePhoto = (photo) => {
        const link = document.createElement('a');
        link.download = `passport-photo-${photo.size}-${photo.id}.jpg`;
        link.href = photo.dataUrl;
        link.click();
    };

    const clearPhotos = () => {
        setPassportPhotos([]);
        setUploadedImage(null);
        setActiveTab('upload');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetCrop = () => {
        if (uploadedImage) {
            const aspectRatio = photoSizes[selectedSize].aspectRatio;
            const minDimension = Math.min(uploadedImage.width, uploadedImage.height);
            const baseSize = Math.min(200, minDimension * 0.3);
            
            let cropWidth, cropHeight;
            if (aspectRatio >= 1) {
                // Width >= Height (landscape or square)
                cropWidth = baseSize;
                cropHeight = baseSize / aspectRatio;
            } else {
                // Height > Width (portrait)
                cropHeight = baseSize;
                cropWidth = baseSize * aspectRatio;
            }
            
            setCropArea({
                x: (uploadedImage.width - cropWidth) / 2,
                y: (uploadedImage.height - cropHeight) / 2,
                width: cropWidth,
                height: cropHeight
            });
        }
    };

    useEffect(() => {
        if (passportPhotos.length > 0) {
            generatePassportSheet();
        }
    }, [passportPhotos, selectedSize, generatePassportSheet]);

    // Reset crop area when size changes to maintain proper aspect ratio
    useEffect(() => {
        if (uploadedImage && activeTab === 'crop') {
            resetCrop();
        }
    }, [selectedSize]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="tools-container">
            <div className="passport-tool">
                <div className="tool-tabs">
                    <button
                        className={`tool-tab ${activeTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upload')}
                    >
                        📤 Upload
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'crop' ? 'active' : ''}`}
                        onClick={() => setActiveTab('crop')}
                        disabled={!uploadedImage}
                    >
                        ✂️ Crop
                    </button>
                    <button
                        className={`tool-tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                        disabled={passportPhotos.length === 0}
                    >
                        👁️ Preview
                    </button>
                </div>

                <div className="passport-controls">
                    <div className="size-selection">
                        <label htmlFor="photo-size">Photo Size:</label>
                        <select
                            id="photo-size"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="size-dropdown"
                        >
                            {Object.entries(photoSizes).map(([key, size]) => (
                                <option key={key} value={key}>
                                    {size.name} - {size.description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-clear" onClick={clearPhotos}>
                            🗑️ Clear All
                        </button>
                        {passportPhotos.length > 0 && (
                            <button className="btn btn-download" onClick={downloadPassportSheet}>
                                💾 Download Sheet
                            </button>
                        )}
                    </div>
                </div>

                <div className="passport-content">
                    {activeTab === 'upload' && (
                        <div className="upload-section">
                            <div className="upload-area">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                    id="photo-upload"
                                />
                                <label htmlFor="photo-upload" className="upload-label">
                                    <div className="upload-icon">📷</div>
                                    <div className="upload-text">
                                        <h3>Upload Your Photo</h3>
                                        <p>Click here or drag and drop an image file</p>
                                        <small>Supported formats: JPG, PNG, GIF</small>
                                    </div>
                                </label>
                            </div>

                            <div className="upload-tips">
                                <h3>📋 Photo Guidelines</h3>
                                <ul>
                                    <li>✅ Use a high-resolution image (at least 600x600 pixels)</li>
                                    <li>✅ Ensure good lighting and clear visibility</li>
                                    <li>✅ Face should be centered and looking straight</li>
                                    <li>✅ Plain background preferred (white or light colored)</li>
                                    <li>✅ No accessories that cover the face</li>
                                    <li>✅ Recent photo (taken within last 6 months)</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'crop' && uploadedImage && (
                        <div className="crop-section">
                            <div className="crop-instructions">
                                <h3>✂️ Crop Your Photo</h3>
                                <p>Drag the crop area to position your face. Resize using the corner handles. Aspect ratio is locked to prevent distortion.</p>
                                <div className="crop-controls">
                                    <button className="btn btn-reset" onClick={resetCrop}>
                                        🔄 Reset Crop
                                    </button>
                                    <button className="btn btn-crop" onClick={cropImage}>
                                        ✂️ Create Passport Photo
                                    </button>
                                </div>
                            </div>

                            <div className="crop-container" ref={containerRef}>
                                <img
                                    ref={imageRef}
                                    src={uploadedImage.src}
                                    alt="Uploaded"
                                    className="crop-image"
                                    style={{
                                        width: uploadedImage.width,
                                        height: uploadedImage.height,
                                        maxWidth: '100%',
                                        maxHeight: '500px',
                                        objectFit: 'contain'
                                    }}
                                    onLoad={updateImageDisplayInfo}
                                    draggable={false}
                                />
                                
                                <div
                                    ref={cropRef}
                                    className="crop-overlay"
                                    style={{
                                        left: imageDisplayInfo.offsetX + cropArea.x * imageDisplayInfo.scale,
                                        top: imageDisplayInfo.offsetY + cropArea.y * imageDisplayInfo.scale,
                                        width: cropArea.width * imageDisplayInfo.scale,
                                        height: cropArea.height * imageDisplayInfo.scale
                                    }}
                                    onMouseDown={(e) => handleMouseDown(e, 'drag')}
                                >
                                    <div className="crop-grid">
                                        <div></div><div></div><div></div>
                                        <div></div><div></div><div></div>
                                        <div></div><div></div><div></div>
                                    </div>
                                    
                                    {/* Resize handles - Only corners to maintain aspect ratio */}
                                    <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'resize', 'top-left')}></div>
                                    <div className="resize-handle top-right" onMouseDown={(e) => handleMouseDown(e, 'resize', 'top-right')}></div>
                                    <div className="resize-handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'resize', 'bottom-left')}></div>
                                    <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'resize', 'bottom-right')}></div>
                                    
                                    <div className="crop-info">
                                        {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
                                        <br/>
                                        <small>Aspect: {photoSizes[selectedSize].aspectRatio.toFixed(2)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preview' && (
                        <div className="preview-section">
                            <div className="preview-header">
                                <h3>📋 Passport Photo Sheet Preview</h3>
                                <p>Preview your {photoSizes[selectedSize].name} photo sheet before downloading.</p>
                            </div>

                            <div className="photo-gallery">
                                <h4>Individual Photos:</h4>
                                <div className="photos-grid">
                                    {passportPhotos.map((photo) => (
                                        <div key={photo.id} className="photo-item">
                                            <img src={photo.dataUrl} alt={`Passport ${photo.id}`} />
                                            <div className="photo-actions">
                                                <span className="photo-size">{photoSizes[photo.size].name}</span>
                                                <button
                                                    className="btn-small"
                                                    onClick={() => downloadSinglePhoto(photo)}
                                                >
                                                    💾 Download
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sheet-preview">
                                <h4>Sheet Preview:</h4>
                                <div className="canvas-container">
                                    <canvas
                                        ref={canvasRef}
                                        className="preview-canvas"
                                    />
                                </div>
                                <div className="sheet-info">
                                    <p>
                                        <strong>Size:</strong> {photoSizes[selectedSize].name}<br/>
                                        <strong>Layout:</strong> {photoSizes[selectedSize].photosPerRow} × {photoSizes[selectedSize].photosPerColumn} photos<br/>
                                        <strong>Photo dimensions:</strong> {Math.round(photoSizes[selectedSize].photoWidth/96 * 25.4)}mm × {Math.round(photoSizes[selectedSize].photoHeight/96 * 25.4)}mm
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PassportPhotoMaker;