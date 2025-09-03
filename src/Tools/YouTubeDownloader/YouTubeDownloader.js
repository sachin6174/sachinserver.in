import React, { useState } from 'react';
import './YouTubeDownloader.css';
import { Button, Input, Select } from '../../ui';

const YouTubeDownloader = () => {
    const [url, setUrl] = useState('');
    const [quality, setQuality] = useState('highest');
    const [downloading, setDownloading] = useState(false);
    const [downloadInfo, setDownloadInfo] = useState(null);

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleDownload = async () => {
        if (!url.trim()) {
            alert('Please enter a YouTube URL');
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            alert('Please enter a valid YouTube URL');
            return;
        }

        setDownloading(true);
        setDownloadInfo(null);

        try {
            // Get basic video info from YouTube thumbnail API
            const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            
            // Create download links using yt1d.net
            const downloadLinks = [
                {
                    quality: '1080p MP4',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp4&q=1080`,
                    service: 'YT1D',
                    format: 'MP4',
                    type: 'video'
                },
                {
                    quality: '720p MP4',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp4&q=720`,
                    service: 'YT1D',
                    format: 'MP4',
                    type: 'video'
                },
                {
                    quality: '480p MP4',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp4&q=480`,
                    service: 'YT1D',
                    format: 'MP4',
                    type: 'video'
                },
                {
                    quality: '360p MP4',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp4&q=360`,
                    service: 'YT1D',
                    format: 'MP4',
                    type: 'video'
                },
                {
                    quality: 'High Quality MP3',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp3&q=320`,
                    service: 'YT1D',
                    format: 'MP3',
                    type: 'audio'
                },
                {
                    quality: 'Standard MP3',
                    url: `https://yt1d.net/en/download?v=${videoId}&f=mp3&q=128`,
                    service: 'YT1D',
                    format: 'MP3',
                    type: 'audio'
                }
            ];

            // Try to get video title from YouTube oEmbed API (doesn't require API key)
            try {
                const oEmbedResponse = await fetch(
                    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
                );
                const oEmbedData = await oEmbedResponse.json();
                
                setDownloadInfo({
                    title: oEmbedData.title || 'YouTube Video',
                    channelTitle: oEmbedData.author_name,
                    thumbnail: oEmbedData.thumbnail_url || thumbnail,
                    downloadLinks
                });
            } catch (oEmbedError) {
                // Fallback if oEmbed fails
                setDownloadInfo({
                    title: 'YouTube Video',
                    thumbnail: thumbnail,
                    downloadLinks
                });
            }
        } catch (error) {
            console.error('Error processing video:', error);
            alert('Error processing the video. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    const handleDownloadClick = (link) => {
        window.open(link.url, '_blank');
    };

    return (
        <div className="youtube-downloader">
            <div className="youtube-downloader__header">
                <h2>📹 YouTube Video Downloader</h2>
                <p>Download YouTube videos and audio in multiple formats using YT1D</p>
            </div>

            <div className="youtube-downloader__input-section">
                <div className="input-group">
                    <Input
                        placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="url-input"
                        aria-label="YouTube URL"
                    />
                    <Button onClick={handleDownload} disabled={downloading || !url.trim()} className="download-btn">
                        {downloading ? '🔄 Processing...' : '⬇️ Get Download Links'}
                    </Button>
                </div>

                <div className="quality-selector">
                    <label htmlFor="quality">Preferred Quality:</label>
                    <Select
                        id="quality"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        options={[
                            { value: 'highest', label: 'Highest Available' },
                            { value: '1080p', label: '1080p HD' },
                            { value: '720p', label: '720p HD' },
                            { value: '480p', label: '480p' },
                            { value: 'audio', label: 'Audio Only (MP3)' },
                        ]}
                    />
                </div>
            </div>

            {downloadInfo && (
                <div className="youtube-downloader__result">
                    <div className="video-info">
                        <img
                            src={downloadInfo.thumbnail}
                            alt="Video thumbnail"
                            className="video-thumbnail"
                        />
                        <div className="video-details">
                            <h3>{downloadInfo.title}</h3>
                            {downloadInfo.channelTitle && (
                                <p className="channel-name">by {downloadInfo.channelTitle}</p>
                            )}
                            {downloadInfo.publishedAt && (
                                <p className="publish-date">Published: {downloadInfo.publishedAt}</p>
                            )}
                            {downloadInfo.description && (
                                <p className="video-description">{downloadInfo.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="download-options">
                        <h4>📥 Download Options:</h4>
                        <div className="download-links">
                            {downloadInfo.downloadLinks.map((link, index) => (
                                <Button key={index} onClick={() => handleDownloadClick(link)} className="download-option">
                                    <span 
                                        className="quality-badge" 
                                        data-type={link.type}
                                    >
                                        {link.type === 'audio' ? '🎵' : '🎥'} {link.quality}
                                    </span>
                                    <span className="service-name">{link.format} • via {link.service}</span>
                                    <span className="download-icon">⬇️</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="youtube-downloader__info">
                <h4>ℹ️ How to use:</h4>
                <ol>
                    <li>Copy the YouTube video URL from your browser</li>
                    <li>Paste it in the input field above</li>
                    <li>Select your preferred quality</li>
                    <li>Click "Get Download Links"</li>
                    <li>Choose from available download options</li>
                </ol>

                <div className="disclaimer">
                    <p><strong>⚠️ Important:</strong></p>
                    <ul>
                        <li>Respect copyright laws and YouTube's Terms of Service</li>
                        <li>Only download content you have permission to download</li>
                        <li>This tool uses YT1D.net for download processing</li>
                        <li>Quality availability depends on the original video upload</li>
                        <li>Audio downloads are available in MP3 format (128kbps & 320kbps)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default YouTubeDownloader;
