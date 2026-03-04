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
        </div>
    );
};

export default AppleDevelopmentPodcasts;
