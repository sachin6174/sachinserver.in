import React, { useState, useRef, useEffect } from 'react';
import './ScreenRecorderTool.css';

const ScreenRecorderTool = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingMode, setRecordingMode] = useState('screen'); // 'screen', 'window', 'tab'
    const [audioSource, setAudioSource] = useState('system'); // 'system', 'microphone', 'both', 'none'
    const [quality, setQuality] = useState('high'); // 'low', 'medium', 'high'
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [error, setError] = useState('');
    const [recordings, setRecordings] = useState([]);
    const [countdown, setCountdown] = useState(0);

    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const timerRef = useRef(null);
    const countdownRef = useRef(null);

    // Quality settings
    const qualitySettings = {
        low: { width: 1280, height: 720, frameRate: 15, videoBitsPerSecond: 1000000 },
        medium: { width: 1920, height: 1080, frameRate: 30, videoBitsPerSecond: 2500000 },
        high: { width: 1920, height: 1080, frameRate: 60, videoBitsPerSecond: 5000000 }
    };

    // Load saved recordings from localStorage
    useEffect(() => {
        const savedRecordings = localStorage.getItem('screen-recordings');
        if (savedRecordings) {
            setRecordings(JSON.parse(savedRecordings));
        }
    }, []);

    // Timer effect
    useEffect(() => {
        if (isRecording && !isPaused) {
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isRecording, isPaused]);

    // Countdown effect
    useEffect(() => {
        if (countdown > 0) {
            countdownRef.current = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearTimeout(countdownRef.current);
    }, [countdown]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getScreenConstraints = () => {
        const settings = qualitySettings[quality];

        const baseConstraints = {
            video: {
                width: { ideal: settings.width },
                height: { ideal: settings.height },
                frameRate: { ideal: settings.frameRate }
            }
        };

        // Audio constraints based on selected source
        if (audioSource === 'system') {
            baseConstraints.audio = {
                echoCancellation: false,
                noiseSuppression: false,
                sampleRate: 44100
            };
        } else if (audioSource === 'none') {
            baseConstraints.audio = false;
        }

        return baseConstraints;
    };

    const getMicrophoneStream = async () => {
        if (audioSource === 'microphone' || audioSource === 'both') {
            try {
                return await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
            } catch (err) {
                console.warn('Could not access microphone:', err);
                return null;
            }
        }
        return null;
    };

    const mixAudioStreams = (stream1, stream2) => {
        const audioContext = new AudioContext();
        const destination = audioContext.createMediaStreamDestination();

        if (stream1 && stream1.getAudioTracks().length > 0) {
            const source1 = audioContext.createMediaStreamSource(stream1);
            source1.connect(destination);
        }

        if (stream2 && stream2.getAudioTracks().length > 0) {
            const source2 = audioContext.createMediaStreamSource(stream2);
            source2.connect(destination);
        }

        return destination.stream;
    };

    const startRecording = async () => {
        try {
            setError('');
            setCountdown(3);

            // Wait for countdown
            await new Promise(resolve => {
                const countdownInterval = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(countdownInterval);
                            resolve();
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            });

            let screenStream;

            // Get screen/display stream based on recording mode
            if (recordingMode === 'screen') {
                screenStream = await navigator.mediaDevices.getDisplayMedia(getScreenConstraints());
            } else if (recordingMode === 'window') {
                screenStream = await navigator.mediaDevices.getDisplayMedia({
                    ...getScreenConstraints(),
                    video: {
                        ...getScreenConstraints().video,
                        displaySurface: 'window'
                    }
                });
            } else if (recordingMode === 'tab') {
                screenStream = await navigator.mediaDevices.getDisplayMedia({
                    ...getScreenConstraints(),
                    video: {
                        ...getScreenConstraints().video,
                        displaySurface: 'browser'
                    }
                });
            }

            let finalStream = screenStream;

            // Handle audio mixing if needed
            if (audioSource === 'microphone') {
                const micStream = await getMicrophoneStream();
                if (micStream) {
                    const audioStream = mixAudioStreams(null, micStream);
                    const videoTrack = screenStream.getVideoTracks()[0];
                    const audioTrack = audioStream.getAudioTracks()[0];
                    finalStream = new MediaStream([videoTrack, audioTrack]);
                }
            } else if (audioSource === 'both') {
                const micStream = await getMicrophoneStream();
                if (micStream) {
                    const audioStream = mixAudioStreams(screenStream, micStream);
                    const videoTrack = screenStream.getVideoTracks()[0];
                    const audioTracks = audioStream.getAudioTracks();
                    finalStream = new MediaStream([videoTrack, ...audioTracks]);
                }
            }

            streamRef.current = finalStream;

            // Create MediaRecorder
            const options = {
                mimeType: 'video/webm;codecs=vp9,opus',
                videoBitsPerSecond: qualitySettings[quality].videoBitsPerSecond
            };

            // Fallback for different browsers
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm;codecs=vp8,opus';
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    options.mimeType = 'video/webm';
                }
            }

            mediaRecorderRef.current = new MediaRecorder(finalStream, options);

            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const filename = `screen-recording-${timestamp}.webm`;

                // Save recording info
                const newRecording = {
                    id: Date.now(),
                    filename,
                    url,
                    blob,
                    duration: recordingTime,
                    timestamp: new Date().toISOString(),
                    size: blob.size,
                    mode: recordingMode,
                    quality
                };

                setRecordings(prev => {
                    const updated = [newRecording, ...prev];
                    localStorage.setItem('screen-recordings', JSON.stringify(updated.map(r => ({
                        ...r,
                        blob: null, // Don't store blob in localStorage
                        url: null
                    }))));
                    return updated;
                });

                // Auto-download
                downloadRecording(blob, filename);

                // Cleanup
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
                setRecordedChunks(chunks);
            };

            // Handle stream end (user stops sharing)
            finalStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            mediaRecorderRef.current.start(1000); // Record in 1-second chunks
            setIsRecording(true);
            setRecordingTime(0);

        } catch (err) {
            console.error('Error starting recording:', err);
            setError(`Failed to start recording: ${err.message}`);
            setCountdown(0);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
            setRecordingTime(0);

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                setIsPaused(false);
            } else {
                mediaRecorderRef.current.pause();
                setIsPaused(true);
            }
        }
    };

    const downloadRecording = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const deleteRecording = (id) => {
        setRecordings(prev => {
            const updated = prev.filter(r => r.id !== id);
            localStorage.setItem('screen-recordings', JSON.stringify(updated.map(r => ({
                ...r,
                blob: null,
                url: null
            }))));
            return updated;
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="screen-recorder-tool">
            <div className="recorder-header">
                <h2>🎥 Screen Recorder</h2>
                <p>Record your screen, window, or browser tab with audio support</p>
            </div>

            {error && (
                <div className="error-message">
                    <span>❌</span>
                    {error}
                </div>
            )}

            {countdown > 0 && (
                <div className="countdown-overlay">
                    <div className="countdown-number">{countdown}</div>
                    <div className="countdown-text">Recording starts in...</div>
                </div>
            )}

            <div className="recorder-controls">
                <div className="settings-section">
                    <h3>Recording Settings</h3>

                    <div className="setting-group">
                        <label>Recording Mode:</label>
                        <select
                            value={recordingMode}
                            onChange={(e) => setRecordingMode(e.target.value)}
                            disabled={isRecording}
                        >
                            <option value="screen">🖥️ Entire Screen</option>
                            <option value="window">🪟 Application Window</option>
                            <option value="tab">🌐 Browser Tab</option>
                        </select>
                    </div>

                    <div className="setting-group">
                        <label>Audio Source:</label>
                        <select
                            value={audioSource}
                            onChange={(e) => setAudioSource(e.target.value)}
                            disabled={isRecording}
                        >
                            <option value="system">🔊 System Audio</option>
                            <option value="microphone">🎤 Microphone</option>
                            <option value="both">🔊🎤 Both</option>
                            <option value="none">🔇 No Audio</option>
                        </select>
                    </div>

                    <div className="setting-group">
                        <label>Quality:</label>
                        <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            disabled={isRecording}
                        >
                            <option value="low">📺 Low (720p, 15fps)</option>
                            <option value="medium">📹 Medium (1080p, 30fps)</option>
                            <option value="high">🎬 High (1080p, 60fps)</option>
                        </select>
                    </div>
                </div>

                <div className="recording-section">
                    <div className="recording-status">
                        {isRecording && (
                            <>
                                <div className="recording-indicator">
                                    <div className={`rec-dot ${isPaused ? 'paused' : ''}`}></div>
                                    <span>{isPaused ? 'PAUSED' : 'RECORDING'}</span>
                                </div>
                                <div className="recording-timer">
                                    {formatTime(recordingTime)}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="control-buttons">
                        {!isRecording ? (
                            <button
                                className="start-btn"
                                onClick={startRecording}
                                disabled={countdown > 0}
                            >
                                {countdown > 0 ? `Starting in ${countdown}...` : '🔴 Start Recording'}
                            </button>
                        ) : (
                            <>
                                <button
                                    className="pause-btn"
                                    onClick={pauseRecording}
                                >
                                    {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                                </button>
                                <button
                                    className="stop-btn"
                                    onClick={stopRecording}
                                >
                                    ⏹️ Stop
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {recordings.length > 0 && (
                <div className="recordings-section">
                    <h3>📁 Recorded Videos ({recordings.length})</h3>
                    <div className="recordings-list">
                        {recordings.map((recording) => (
                            <div key={recording.id} className="recording-item">
                                <div className="recording-info">
                                    <div className="recording-name">
                                        <span className="file-icon">🎬</span>
                                        {recording.filename}
                                    </div>
                                    <div className="recording-details">
                                        <span>📅 {new Date(recording.timestamp).toLocaleDateString()}</span>
                                        <span>⏱️ {formatTime(recording.duration)}</span>
                                        <span>📊 {formatFileSize(recording.size)}</span>
                                        <span>🎯 {recording.mode}</span>
                                        <span>⚡ {recording.quality}</span>
                                    </div>
                                </div>
                                <div className="recording-actions">
                                    {recording.blob && (
                                        <>
                                            <button
                                                className="preview-btn"
                                                onClick={() => {
                                                    const video = document.createElement('video');
                                                    video.src = recording.url;
                                                    video.controls = true;
                                                    video.style.maxWidth = '100%';
                                                    video.style.maxHeight = '400px';

                                                    const modal = document.createElement('div');
                                                    modal.style.position = 'fixed';
                                                    modal.style.top = '0';
                                                    modal.style.left = '0';
                                                    modal.style.width = '100%';
                                                    modal.style.height = '100%';
                                                    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
                                                    modal.style.display = 'flex';
                                                    modal.style.justifyContent = 'center';
                                                    modal.style.alignItems = 'center';
                                                    modal.style.zIndex = '9999';
                                                    modal.onclick = () => document.body.removeChild(modal);

                                                    modal.appendChild(video);
                                                    document.body.appendChild(modal);
                                                }}
                                            >
                                                👁️ Preview
                                            </button>
                                            <button
                                                className="download-btn"
                                                onClick={() => downloadRecording(recording.blob, recording.filename)}
                                            >
                                                💾 Download
                                            </button>
                                        </>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteRecording(recording.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="info-section">
                <h3>ℹ️ Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>Browser Support:</strong>
                        <span>Chrome, Firefox, Edge (latest versions)</span>
                    </div>
                    <div className="info-item">
                        <strong>File Format:</strong>
                        <span>WebM (VP9/VP8 + Opus)</span>
                    </div>
                    <div className="info-item">
                        <strong>Max Recording:</strong>
                        <span>Limited by available storage</span>
                    </div>
                    <div className="info-item">
                        <strong>Auto-Save:</strong>
                        <span>Downloads folder</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScreenRecorderTool;
