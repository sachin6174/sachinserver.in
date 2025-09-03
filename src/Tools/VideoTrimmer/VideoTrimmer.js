import React, { useState, useRef, useEffect } from 'react';
import './VideoTrimmer.css';

// Lazy load FFmpeg
const loadFFmpeg = async () => {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { fetchFile } = await import('@ffmpeg/util');
    return { FFmpeg, fetchFile };
};

const VideoTrimmer = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoDuration, setVideoDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [trimmedVideos, setTrimmedVideos] = useState([]);
    const [error, setError] = useState('');
    const [previewTime, setPreviewTime] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Load saved trimmed videos from localStorage
    useEffect(() => {
        const savedVideos = localStorage.getItem('trimmed-videos');
        if (savedVideos) {
            try {
                setTrimmedVideos(JSON.parse(savedVideos));
            } catch (e) {
                console.error('Error loading saved videos:', e);
                localStorage.removeItem('trimmed-videos');
            }
        }
    }, []);

    // Format time to HH:MM:SS
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '00:00:00';
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Convert time string to seconds
    const timeToSeconds = (timeString) => {
        if (!timeString) return 0;
        const parts = timeString.split(':').map(Number).filter(n => !isNaN(n));
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        }
        return 0;
    };

    // Convert seconds to HH:MM:SS format for time input
    const formatTimeForInput = (seconds) => {
        if (!seconds || isNaN(seconds)) return '00:00:00';
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            // Clean up previous video URL
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
            
            setVideoFile(file);
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
            setError('');
            setStartTime(0);
            setEndTime(0);
            setVideoDuration(0);
            setPreviewTime(0);
        } else {
            setError('Please select a valid video file (MP4, WebM, MOV, AVI, etc.)');
        }
    };

    // Handle video metadata load
    const handleLoadedMetadata = () => {
        if (videoRef.current && !isNaN(videoRef.current.duration)) {
            const duration = videoRef.current.duration;
            setVideoDuration(duration);
            setStartTime(0);
            setEndTime(duration);
            setError('');
        }
    };

    // Handle time input changes
    const handleStartTimeChange = (e) => {
        const time = timeToSeconds(e.target.value);
        setStartTime(time);
        if (time >= endTime && endTime > 0) {
            setEndTime(Math.min(time + 10, videoDuration)); // Add 10 seconds or to end
        }
    };

    const handleEndTimeChange = (e) => {
        const time = timeToSeconds(e.target.value);
        setEndTime(time);
        if (time <= startTime) {
            setStartTime(Math.max(0, time - 10)); // Subtract 10 seconds or to start
        }
    };

    // Seek to start/end time
    const seekToTime = (time) => {
        if (videoRef.current && !isNaN(time)) {
            videoRef.current.currentTime = Math.min(time, videoDuration);
            setPreviewTime(time);
        }
    };

    // Simplified video trimming using MediaRecorder and Canvas
    const trimVideo = async () => {
        if (!videoFile || !videoRef.current) {
            setError('Please select a valid video file first');
            return;
        }

        if (startTime >= endTime) {
            setError('End time must be greater than start time');
            return;
        }

        if (endTime - startTime < 0.1) {
            setError('Trim duration must be at least 0.1 seconds');
            return;
        }

        setIsProcessing(true);
        setError('');
        setProcessingProgress(0);

        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;

            // Create MediaRecorder for canvas stream
            const stream = canvas.captureStream(30);
            let mediaRecorder;
            
            // Try different codec options
            const codecOptions = [
                'video/webm;codecs=vp9',
                'video/webm;codecs=vp8',
                'video/webm',
                'video/mp4'
            ];

            for (const codec of codecOptions) {
                if (MediaRecorder.isTypeSupported(codec)) {
                    mediaRecorder = new MediaRecorder(stream, { 
                        mimeType: codec,
                        videoBitsPerSecond: 2500000 // 2.5 Mbps
                    });
                    break;
                }
            }

            if (!mediaRecorder) {
                throw new Error('No supported video codec found');
            }

            const chunks = [];
            let recordingStartTime = Date.now();
            const expectedDuration = (endTime - startTime) * 1000; // in milliseconds

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
                const url = URL.createObjectURL(blob);
                
                // Generate filename
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const originalName = videoFile.name.split('.')[0];
                const extension = mediaRecorder.mimeType.includes('mp4') ? 'mp4' : 'webm';
                const filename = `${originalName}_trimmed_${timestamp}.${extension}`;

                // Create trimmed video object
                const trimmedVideo = {
                    id: Date.now(),
                    filename,
                    url,
                    blob,
                    originalName: videoFile.name,
                    startTime,
                    endTime,
                    duration: endTime - startTime,
                    size: blob.size,
                    timestamp: new Date().toISOString(),
                    mimeType: mediaRecorder.mimeType
                };

                // Update state
                setTrimmedVideos(prev => {
                    const updated = [trimmedVideo, ...prev];
                    // Save to localStorage (without blob)
                    localStorage.setItem('trimmed-videos', JSON.stringify(updated.map(v => ({
                        ...v,
                        blob: null,
                        url: null
                    }))));
                    return updated;
                });

                // Auto-download
                downloadVideo(blob, filename);
                setIsProcessing(false);
                setProcessingProgress(100);
                
                setTimeout(() => setProcessingProgress(0), 2000);
            };

            mediaRecorder.onerror = (event) => {
                console.error('MediaRecorder error:', event.error);
                setError('Recording failed: ' + event.error.message);
                setIsProcessing(false);
                setProcessingProgress(0);
            };

            // Start recording
            mediaRecorder.start(100); // Record in 100ms chunks
            
            // Seek to start time and play
            video.currentTime = startTime;
            
            const startRecording = () => {
                video.play().catch(e => {
                    console.error('Video play failed:', e);
                    setError('Failed to play video for recording');
                    setIsProcessing(false);
                    return;
                });

                const drawFrame = () => {
                    if (!isProcessing) return;
                    
                    const currentTime = video.currentTime;
                    const progress = Math.min(((currentTime - startTime) / (endTime - startTime)) * 100, 100);
                    setProcessingProgress(Math.round(progress));

                    if (currentTime >= endTime) {
                        video.pause();
                        mediaRecorder.stop();
                        return;
                    }

                    // Draw video frame to canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    requestAnimationFrame(drawFrame);
                };

                // Start drawing when video is ready
                video.addEventListener('playing', drawFrame, { once: true });
            };

            // Wait for seek to complete
            video.addEventListener('seeked', startRecording, { once: true });

            // Fallback timeout
            setTimeout(() => {
                if (isProcessing && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    video.pause();
                }
            }, expectedDuration + 5000); // 5 second buffer

        } catch (err) {
            console.error('Error trimming video:', err);
            setError(`Failed to trim video: ${err.message}`);
            setIsProcessing(false);
            setProcessingProgress(0);
        }
    };

    // Download video function
    const downloadVideo = (blob, filename) => {
        try {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (err) {
            console.error('Download failed:', err);
            setError('Failed to download video');
        }
    };

    // Delete trimmed video
    const deleteTrimmedVideo = (id) => {
        setTrimmedVideos(prev => {
            const updated = prev.filter(v => v.id !== id);
            localStorage.setItem('trimmed-videos', JSON.stringify(updated.map(v => ({
                ...v,
                blob: null,
                url: null
            }))));
            return updated;
        });
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="video-trimmer-tool">
            {error && (
                <div className="error-message">
                    <span>❌</span>
                    {error}
                    <button 
                        className="error-close"
                        onClick={() => setError('')}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="tool-container upload-section">
                <h3 className="tool-section-title">📹 Upload Video</h3>
                
                <div className="upload-area">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="file-input"
                        id="video-upload"
                    />
                    <label htmlFor="video-upload" className="upload-label">
                        <div className="upload-icon">📁</div>
                        <div className="upload-text">
                            {videoFile ? videoFile.name : 'Click to select a video file'}
                        </div>
                        <div className="upload-hint">
                            Supports MP4, WebM, MOV, AVI and other video formats
                        </div>
                    </label>
                </div>
            </div>

            {videoUrl && (
                <div className="tool-container video-section">
                    <h3 className="tool-section-title">🎬 Video Preview</h3>
                    
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            controls
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={(e) => setPreviewTime(e.target.currentTime)}
                            className="video-preview"
                            preload="metadata"
                        />
                        <canvas 
                            ref={canvasRef} 
                            style={{ display: 'none' }}
                            width="640"
                            height="480"
                        />
                    </div>

                    <div className="video-info">
                        <span>📊 Duration: {formatTime(videoDuration)}</span>
                        <span>⏱️ Current: {formatTime(previewTime)}</span>
                    </div>
                </div>
            )}

            {videoUrl && videoDuration > 0 && (
                <div className="tool-container trim-section">
                    <h3 className="tool-section-title">✂️ Trim Settings</h3>
                    
                    <div className="trim-controls">
                        <div className="time-input-group">
                            <label className="tool-form-label">🟢 Start Time:</label>
                            <input
                                type="time"
                                step="1"
                                value={formatTimeForInput(startTime)}
                                onChange={handleStartTimeChange}
                                className="tool-input time-input"
                                max={formatTimeForInput(videoDuration)}
                            />
                            <button
                                className="tool-button seek-btn"
                                onClick={() => seekToTime(startTime)}
                                disabled={isProcessing}
                            >
                                🎯 Seek
                            </button>
                        </div>

                        <div className="time-input-group">
                            <label className="tool-form-label">🔴 End Time:</label>
                            <input
                                type="time"
                                step="1"
                                value={formatTimeForInput(endTime)}
                                onChange={handleEndTimeChange}
                                className="tool-input time-input"
                                max={formatTimeForInput(videoDuration)}
                            />
                            <button
                                className="tool-button seek-btn"
                                onClick={() => seekToTime(endTime)}
                                disabled={isProcessing}
                            >
                                🎯 Seek
                            </button>
                        </div>
                    </div>

                    <div className="trim-info">
                        <span>📏 Trim Duration: {formatTime(endTime - startTime)}</span>
                        <span>📊 Original Duration: {formatTime(videoDuration)}</span>
                    </div>

                    {isProcessing && (
                        <div className="processing-section">
                            <h4>🔄 Processing Video...</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${processingProgress}%` }}
                                ></div>
                            </div>
                            <p>Progress: {processingProgress}%</p>
                        </div>
                    )}

                    <div className="trim-actions">
                        <button
                            className="tool-button trim-btn"
                            onClick={trimVideo}
                            disabled={isProcessing || startTime >= endTime || !videoDuration}
                        >
                            {isProcessing ? '⏳ Processing...' : '✂️ Trim Video'}
                        </button>
                    </div>
                </div>
            )}

            {trimmedVideos.length > 0 && (
                <div className="tool-container trimmed-videos-section">
                    <h3 className="tool-section-title">📁 Trimmed Videos ({trimmedVideos.length})</h3>
                    
                    <div className="trimmed-videos-list">
                        {trimmedVideos.map((video) => (
                            <div key={video.id} className="trimmed-video-item">
                                <div className="video-info-section">
                                    <div className="video-name">
                                        <span className="file-icon">🎬</span>
                                        {video.filename}
                                    </div>
                                    <div className="video-details">
                                        <span>📄 Original: {video.originalName}</span>
                                        <span>⏱️ Duration: {formatTime(video.duration)}</span>
                                        <span>📊 Size: {formatFileSize(video.size)}</span>
                                        <span>🟢 Start: {formatTime(video.startTime)}</span>
                                        <span>🔴 End: {formatTime(video.endTime)}</span>
                                        <span>📅 {new Date(video.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="video-actions">
                                    {video.blob && (
                                        <>
                                            <button
                                                className="tool-button preview-btn"
                                                onClick={() => {
                                                    const videoElement = document.createElement('video');
                                                    videoElement.src = video.url;
                                                    videoElement.controls = true;
                                                    videoElement.style.maxWidth = '100%';
                                                    videoElement.style.maxHeight = '70vh';
                                                    videoElement.style.borderRadius = '8px';

                                                    const modal = document.createElement('div');
                                                    modal.style.cssText = `
                                                        position: fixed;
                                                        top: 0;
                                                        left: 0;
                                                        width: 100%;
                                                        height: 100%;
                                                        background: rgba(0,0,0,0.9);
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        z-index: 1500;
                                                        padding: 2rem;
                                                        box-sizing: border-box;
                                                    `;
                                                    
                                                    modal.onclick = (e) => {
                                                        if (e.target === modal) {
                                                            document.body.removeChild(modal);
                                                        }
                                                    };

                                                    modal.appendChild(videoElement);
                                                    document.body.appendChild(modal);
                                                }}
                                            >
                                                👁️ Preview
                                            </button>
                                            <button
                                                className="tool-button download-btn"
                                                onClick={() => downloadVideo(video.blob, video.filename)}
                                            >
                                                💾 Download
                                            </button>
                                        </>
                                    )}
                                    <button
                                        className="tool-button delete-btn"
                                        onClick={() => deleteTrimmedVideo(video.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoTrimmer;
