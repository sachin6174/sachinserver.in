import React, { useState, useEffect } from "react";
import musicData from "./Music.json";
import "./Music.css";

const Music = () => {
    const [musicGenres, setMusicGenres] = useState([]);
    const [personalPlaylist, setPersonalPlaylist] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [playingTrack, setPlayingTrack] = useState(null);

    useEffect(() => {
        // Mimic API call with artificial delay
        setTimeout(() => {
            setMusicGenres(musicData.genres);
            setPersonalPlaylist(musicData.personalPlaylist || []);
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

                    {/* Vocals sections */}
                    {selectedGenre.sections && selectedGenre.sections.length > 0 && (
                        <div className="music-section">
                            <h3 className="subsection-title">Vocal Training Sections</h3>
                            {selectedGenre.sections.map((section, index) => (
                                <div key={index} className="vocals-section">
                                    <h4 className="vocals-section-title">{section.title}</h4>

                                    {/* Basic Swar System */}
                                    {section.content.swars && (
                                        <div className="swars-grid">
                                            {section.content.swars.map((swar, idx) => (
                                                <div key={idx} className="swar-card">
                                                    <div className="swar-symbol">{swar.symbol}</div>
                                                    <div className="swar-name">{swar.name}</div>
                                                    <div className="swar-note">{swar.note}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Saptak System */}
                                    {section.content.saptaks && (
                                        <div className="saptaks-container">
                                            {section.content.saptaks.map((saptak, idx) => (
                                                <div key={idx} className="saptak-card">
                                                    <h5>{saptak.name}</h5>
                                                    <div className="saptak-symbol">{saptak.symbol}</div>
                                                    <p><strong>Range:</strong> {saptak.range}</p>
                                                    <p>{saptak.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Alankaar Patterns */}
                                    {section.content.patterns && (
                                        <div className="patterns-container">
                                            {section.content.patterns.map((pattern, idx) => (
                                                <div key={idx} className="pattern-card">
                                                    <h5>{pattern.number}</h5>
                                                    <div className="pattern-notation">{pattern.pattern}</div>
                                                    <p>{pattern.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Raga Details */}
                                    {section.content.details && (
                                        <div className="raga-details">
                                            <div className="raga-info-grid">
                                                <div className="raga-info-item">
                                                    <strong>Varjit Swar:</strong> {section.content.details.varjit_swar}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Aaroh:</strong> {section.content.details.aaroh}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Avroh:</strong> {section.content.details.avroh}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Pakad:</strong> {section.content.details.pakad}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Singing Time:</strong> {section.content.details.singing_time}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Vadi Swar:</strong> {section.content.details.vadi_swar}
                                                </div>
                                                <div className="raga-info-item">
                                                    <strong>Samvadi Swar:</strong> {section.content.details.samvadi_swar}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Learning Steps */}
                                    {section.content.steps && (
                                        <div className="learning-steps">
                                            {section.content.steps.map((step, idx) => (
                                                <div key={idx} className="step-card">
                                                    <div className="step-number">{step.step}</div>
                                                    <div className="step-content">
                                                        <h5>{step.title}</h5>
                                                        <p>{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Practice Songs */}
                                    {section.content.songs && (
                                        <div className="practice-songs">
                                            {section.content.songs.map((song, idx) => (
                                                <div key={idx} className="song-card">
                                                    <h5>{song.title}</h5>
                                                    <div className="song-lyrics">
                                                        {Array.isArray(song.lyrics) ? (
                                                            song.lyrics.map((line, lineIdx) => (
                                                                <div key={lineIdx} className="lyrics-line">{line}</div>
                                                            ))
                                                        ) : (
                                                            <div className="lyrics-text">{song.lyrics}</div>
                                                        )}
                                                    </div>
                                                    <p className="song-description">{song.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <p className="section-description">{section.content.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {/* Personal Playlist Section */}
                    <div className="hero-section" style={{ marginBottom: '2rem' }}>
                        <div className="section-header">
                            <h1 className="section-title">My Playlist</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                A curated collection of songs that resonate with me.
                            </p>
                        </div>
                    </div>

                    {personalPlaylist.map((category, index) => (
                        <div key={index} className="music-section" style={{ marginBottom: '3rem' }}>
                            <h3 className="subsection-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                {category.category}
                            </h3>
                            <div className="track-list">
                                {category.songs.map((song, songIndex) => (
                                    <a
                                        key={songIndex}
                                        href={song.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="track-item hover-effect"
                                        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                                    >
                                        <div className="track-info">
                                            <span className="play-button" style={{ fontSize: '1.2rem' }}>🔗</span>
                                            <div className="track-details">
                                                <h4 className="track-title">{song.title}</h4>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Musical Journey</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Explore diverse musical genres, discover amazing artists, and dive into the rich world of music theory and composition. Updated with VOCALS section!
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
