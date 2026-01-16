import React from 'react';
import '../shared-styles.css';
import './AppleDevelopmentPodcasts.css';
import { youtubePlaylists } from './data/podcasts';

const AppleDevelopmentPodcasts = () => {
    return (
        <div className="leftbrain-container apple-podcasts-theme">
            <div className="simple-header">
                <h1>YouTube</h1>
                <p>Watch concise Apple development walkthroughs and discussions on YouTube.</p>
            </div>

            <div className="section">
                <h2>YouTube playlists</h2>
                <div className="playlist-grid">
                    {youtubePlaylists.map((playlist) => (
                        <article key={playlist.id} className="playlist-card">
                            <header>
                                <h3>{playlist.title}</h3>
                                <p>{playlist.description}</p>
                            </header>
                            <div className="playlist-focus">
                                <span className="focus-pill subtle">{playlist.language}</span>
                            </div>
                            <div className="podcast-links">
                                <a href={playlist.url} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="video-section">
                <h2>🎓 Generics Deep Dive</h2>
                <div className="videos-grid">
                    {[
                        {
                            title: "Any vs AnyObject in Swift",
                            url: "https://www.youtube.com/embed/SPhATsEQR74",
                            desc: "Understanding the difference between Any and AnyObject"
                        },
                        {
                            title: "Opaque Types & Protocols",
                            url: "https://www.youtube.com/embed/hfGtp-t6lJg",
                            desc: "Deep dive into Opaque Types, Associated Types, and Protocols"
                        },
                        {
                            title: "Advanced Generics",
                            url: "https://www.youtube.com/embed/33QD6GtQnbI",
                            desc: "Mastering Generics in Swift"
                        }
                    ].map((video, idx) => (
                        <div key={idx} className="video-card">
                            <div className="video-wrapper">
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>{video.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppleDevelopmentPodcasts;
