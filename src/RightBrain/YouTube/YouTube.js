import React from 'react';
import '../shared-styles.css';
import './YouTube.css';

const playlists = [
    {
        title: 'Channel',
        description: 'Right Brain Things on YouTube',
        links: [
            {
                label: 'Visit channel',
                url: 'https://www.youtube.com/@RightBrainThings'
            }
        ]
    },
    {
        title: 'Book Playlist (English)',
        description: 'PHILOSOPHY OF MIND by John Heil',
        links: [
            {
                label: 'Watch playlist',
                url: 'https://www.youtube.com/watch?v=yxeqr3wODmo&list=PLlp0i4AZX7Jh5NlMGAfr3AeX012fysGmv'
            }
        ]
    },
    {
        title: 'Book Playlist (Hindi)',
        description: 'PHILOSOPHY OF MIND by John Heil (Hindi)',
        links: [
            {
                label: 'Watch playlist',
                url: 'https://www.youtube.com/playlist?list=PLlp0i4AZX7JjRGzGIZJmSzM_OCp-KF5y7'
            }
        ]
    }
];

const RightbrainYouTube = () => {
    return (
        <div className="rightbrain-container">
            <div className="simple-header">
                <h1>YouTube</h1>
                <p>Curated RightBrain channel and playlists for reading and philosophy.</p>
            </div>

            <div className="yt-grid">
                {playlists.map((item) => (
                    <article key={item.title} className="yt-card">
                        <div className="yt-card-header">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="yt-links">
                            {item.links.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="yt-link"
                                >
                                    {link.label} ↗
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default RightbrainYouTube;
