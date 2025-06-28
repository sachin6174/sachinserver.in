import React, { useState, useEffect } from "react";
import musicData from "./Music.json";
import "./Music.css";

const Music = () => {
    const [musicGenres, setMusicGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [playingTrack, setPlayingTrack] = useState(null);

    useEffect(() => {
        // Mimic API call with artificial delay
        setTimeout(() => {
            setMusicGenres(musicData.genres);
            setIsLoading(false);
        }, 800);
    }, []);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    const handlePlayTrack = (track) => {
        if (playingTrack === track.id) {
            setPlayingTrack(null); // Stop playing
        } else {
            setPlayingTrack(track.id); // Start playing
        }
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="music-container">
            {selectedGenre ? (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedGenre.name} Collection</h2>
                        <div className="section-divider"></div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                            {selectedGenre.description}
                        </p>
                    </div>
                    <button className="back-button" onClick={() => setSelectedGenre(null)}>
                        ← Back to Genres
                    </button>

                    {/* Artists section */}
                    {selectedGenre.artists && selectedGenre.artists.length > 0 && (
                        <div className="music-section">
                            <h3 className="subsection-title">Featured Artists</h3>
                            <div className="cards-container">
                                {selectedGenre.artists.map((artist, index) => (
                                    <div key={index} className="music-card artist-card hover-effect">
                                        <div className="artist-header">
                                            <div className="artist-avatar">🎤</div>
                                            <h4>{artist.name}</h4>
                                        </div>
                                        <p><strong>Origin:</strong> {artist.origin}</p>
                                        <p><strong>Active:</strong> {artist.activeYears}</p>
                                        <p className="artist-bio">{artist.bio}</p>
                                        {artist.notableSongs && (
                                            <div className="notable-songs">
                                                <strong>Notable Songs:</strong>
                                                <ul>
                                                    {artist.notableSongs.map((song, idx) => (
                                                        <li key={idx}>{song}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tracks section */}
                    {selectedGenre.tracks && selectedGenre.tracks.length > 0 && (
                        <div className="music-section">
                            <h3 className="subsection-title">Recommended Tracks</h3>
                            <div className="track-list">
                                {selectedGenre.tracks.map((track, index) => (
                                    <div
                                        key={index}
                                        className={`track-item hover-effect ${playingTrack === track.id ? 'playing' : ''}`}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`${track.title} by ${track.artist}, duration ${formatDuration(track.duration)}`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handlePlayTrack(track);
                                            }
                                        }}
                                    >
                                        <div className="track-info">
                                            <button
                                                className="play-button"
                                                onClick={() => handlePlayTrack(track)}
                                                aria-label={playingTrack === track.id ? "Pause" : "Play"}
                                            >
                                                {playingTrack === track.id ? "⏸️" : "▶️"}
                                            </button>
                                            <div className="track-details">
                                                <h4 className="track-title">{track.title}</h4>
                                                <p className="track-artist">{track.artist}</p>
                                            </div>
                                        </div>
                                        <div className="track-meta">
                                            <span className="track-duration">{formatDuration(track.duration)}</span>
                                            {track.year && <span className="track-year">{track.year}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instruments section */}
                    {selectedGenre.instruments && selectedGenre.instruments.length > 0 && (
                        <div className="music-section">
                            <h3 className="subsection-title">Common Instruments</h3>
                            <div className="instruments-grid">
                                {selectedGenre.instruments.map((instrument, index) => (
                                    <div key={index} className="instrument-card hover-effect">
                                        <div className="instrument-icon">{instrument.icon}</div>
                                        <h4>{instrument.name}</h4>
                                        <p>{instrument.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Musical Journey</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Explore diverse musical genres, discover amazing artists, and dive into the rich world of music theory and composition
                            </p>
                        </div>
                    </div>
                    <div className="cards-container">
                        {musicGenres.map((genre, index) => (
                            <div
                                key={index}
                                className="music-card genre-card hover-effect"
                                onClick={() => handleGenreClick(genre)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleGenreClick(genre);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label={`Explore ${genre.name} music genre`}
                            >
                                <div className="genre-icon">{genre.icon}</div>
                                <h3>{genre.name}</h3>
                                <p><strong>Origin:</strong> {genre.origin}</p>
                                <p><strong>Era:</strong> {genre.era}</p>
                                <p className="genre-description">{genre.description}</p>
                                <div className="genre-characteristics">
                                    <strong>Key Features:</strong>
                                    <ul>
                                        {genre.characteristics?.slice(0, 3).map((char, idx) => (
                                            <li key={idx}>{char}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Music;
