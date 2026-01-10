import React from 'react';
import '../shared-styles.css';
import './YouTube.css';

const playlists = [
    {
        title: 'PHILOSOPHY OF MIND (English)',
        description: 'John Heil — English playlist',
        language: 'English',
        link: 'https://www.youtube.com/watch?v=yxeqr3wODmo&list=PLlp0i4AZX7Jh5NlMGAfr3AeX012fysGmv',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlp0i4AZX7Jh5NlMGAfr3AeX012fysGmv'
    },
    {
        title: 'PHILOSOPHY OF MIND (Hindi)',
        description: 'John Heil — Hindi playlist',
        language: 'Hindi',
        link: 'https://www.youtube.com/playlist?list=PLlp0i4AZX7JjRGzGIZJmSzM_OCp-KF5y7',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlp0i4AZX7JjRGzGIZJmSzM_OCp-KF5y7'
    },
    {
        title: 'Psychology of Love (English)',
        description: 'Robert J. Sternberg — English playlist',
        language: 'English',
        link: 'https://www.youtube.com/playlist?list=PLlp0i4AZX7JgY5wktetmEcIOO90ZjVzsS',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlp0i4AZX7JgY5wktetmEcIOO90ZjVzsS'
    },
    {
        title: 'Psychology of Love (Hindi)',
        description: 'Robert J. Sternberg — Hindi playlist',
        language: 'Hindi',
        link: 'https://www.youtube.com/playlist?list=PLlp0i4AZX7JjUjF7cZYcaFH2Qi9-fJnjF',
        embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlp0i4AZX7JjUjF7cZYcaFH2Qi9-fJnjF'
    }
];

const RightbrainYouTube = () => {
    const channelPreview = {
        title: 'RightBrainThings channel preview',
        description: 'Latest playlists from the channel.',
        link: 'https://www.youtube.com/@RightBrainThings',
        embedUrl: playlists[0]?.embedUrl || 'https://www.youtube.com/embed'
    };

    return (
        <div className="rightbrain-container">
            <div className="simple-header youtube-hero">
                <div>
                    <h1>YouTube</h1>
                    <p>RightBrain channel plus curated playlists you can watch inline.</p>
                </div>
                <a
                    href="https://www.youtube.com/@RightBrainThings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-channel-link"
                >
                    Visit channel ↗
                </a>
            </div>

            <div className="yt-hero-card">
                <div className="yt-hero-text">
                    <h2>{channelPreview.title}</h2>
                    <p>{channelPreview.description}</p>
                    <a
                        href={channelPreview.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yt-link"
                    >
                        Open channel ↗
                    </a>
                </div>
                <div className="yt-embed hero-embed">
                    <iframe
                        src={channelPreview.embedUrl}
                        title={channelPreview.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="yt-grid">
                {playlists.map((item) => (
                    <article key={item.title} className="yt-card">
                        <div className="yt-card-header">
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <span className="yt-pill">{item.language}</span>
                        </div>
                        <div className="yt-embed">
                            <iframe
                                src={item.embedUrl}
                                title={item.title}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="yt-links">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="yt-link"
                            >
                                Watch on YouTube ↗
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default RightbrainYouTube;
