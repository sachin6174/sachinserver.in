import React, { useMemo } from 'react';
import '../shared-styles.css';
import './AppleDevelopmentPodcasts.css';
import {
    appleDevelopmentPodcasts,
    curatedPlaylists,
    listeningFramework
} from './data/podcasts';

const AppleDevelopmentPodcasts = () => {
    const stats = useMemo(() => {
        const focusAreas = new Set();
        const hosts = new Set();

        appleDevelopmentPodcasts.forEach((podcast) => {
            podcast.focusAreas.forEach((area) => focusAreas.add(area));
            podcast.hosts.forEach((host) => hosts.add(host));
        });

        return [
            { label: 'Shows Curated', value: appleDevelopmentPodcasts.length },
            { label: 'Distinct Focus Areas', value: focusAreas.size },
            { label: 'Community Hosts', value: hosts.size }
        ];
    }, []);

    const highlightEpisodes = useMemo(() => {
        return appleDevelopmentPodcasts
            .flatMap((podcast) =>
                podcast.bestEpisodes.map((episode) => ({ ...episode, podcast: podcast.title }))
            );
    }, []);

    const topicCloud = useMemo(() => {
        const cloud = new Map();

        appleDevelopmentPodcasts.forEach((podcast) => {
            podcast.focusAreas.forEach((topic) => {
                cloud.set(topic, (cloud.get(topic) || 0) + 1);
            });
        });

        return Array.from(cloud.entries())
            .map(([topic, count]) => ({ topic, count }))
            .sort((a, b) => b.count - a.count);
    }, []);

    return (
        <div className="leftbrain-container apple-podcasts-theme">
            <div className="simple-header">
                <h1>Apple Development Podcasts</h1>
                <p>Curated audio learning paths covering Swift, platform news, indie life, and product strategy for Apple developers.</p>
            </div>

            <div className="section podcast-overview">
                <div className="insight-card">
                    <h2>Why these shows</h2>
                    <p>
                        Each podcast blends technical deep dives with actionable career insight. Use this collection to stay current on Swift evolution,
                        shipping practices, and the indie business landscape without losing focus on your roadmap.
                    </p>
                    <div className="stat-grid">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-card compact">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="insight-card topic-card">
                    <h3>Topics you can track</h3>
                    <div className="topic-cloud">
                        {topicCloud.map(({ topic, count }) => (
                            <span key={topic} className="topic-chip" data-size={Math.min(count, 4)}>
                                {topic}
                            </span>
                        ))}
                    </div>
                    <p className="topic-footnote">Tap a show below to see how it supports your learning backlog.</p>
                </div>
            </div>

            <div className="section">
                <h2>Featured Podcasts</h2>
                <div className="podcast-grid">
                    {appleDevelopmentPodcasts.map((podcast) => (
                        <article key={podcast.id} className="podcast-card">
                            <header className="podcast-card__header">
                                <div className="podcast-card__meta">
                                    <h3>{podcast.title}</h3>
                                    <p className="podcast-tagline">{podcast.tagline}</p>
                                </div>
                                <div className="podcast-card__cadence">
                                    <span>{podcast.cadence}</span>
                                    <span>· {podcast.duration}</span>
                                </div>
                            </header>
                            <p className="podcast-description">{podcast.description}</p>
                            <div className="podcast-focus">
                                {podcast.focusAreas.map((area) => (
                                    <span key={area} className="focus-pill">{area}</span>
                                ))}
                            </div>
                            <div className="podcast-hosts">
                                <strong>Hosts:</strong> {podcast.hosts.join(', ')}
                            </div>
                            <div className="podcast-links">
                                <a href={podcast.links.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts ↗</a>
                                <a href={podcast.links.spotify} target="_blank" rel="noopener noreferrer">Spotify ↗</a>
                                <a href={podcast.links.website} target="_blank" rel="noopener noreferrer">Website ↗</a>
                            </div>
                            <div className="podcast-episodes">
                                <h4>Episode starting points</h4>
                                <ul>
                                    {podcast.bestEpisodes.map((episode) => (
                                        <li key={episode.url}>
                                            <a href={episode.url} target="_blank" rel="noopener noreferrer">{episode.title}</a>
                                            <span>{episode.takeaway}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Playlists for any sprint</h2>
                <div className="playlist-grid">
                    {curatedPlaylists.map((playlist) => (
                        <article key={playlist.id} className="playlist-card">
                            <header>
                                <h3>{playlist.title}</h3>
                                <p>{playlist.description}</p>
                            </header>
                            <div className="playlist-focus">
                                {playlist.focus.map((item) => (
                                    <span key={item} className="focus-pill subtle">{item}</span>
                                ))}
                            </div>
                            <ul className="playlist-episodes">
                                {playlist.episodes.map((episode) => (
                                    <li key={episode.url}>
                                        <div>
                                            <span className="playlist-episode__podcast">{episode.podcast}</span>
                                            <a href={episode.url} target="_blank" rel="noopener noreferrer">{episode.title}</a>
                                        </div>
                                        <span className="playlist-episode__takeaway">{episode.takeaway}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Make it actionable</h2>
                <div className="framework-grid">
                    {listeningFramework.map((frame) => (
                        <article key={frame.id} className="framework-card">
                            <h3>{frame.title}</h3>
                            <p>{frame.description}</p>
                            <ul>
                                {frame.recommendedActions.map((action) => (
                                    <li key={action}>{action}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>

            <div className="section episode-highlights">
                <h2>Backlog-friendly highlights</h2>
                <div className="highlight-grid">
                    {highlightEpisodes.map((episode) => (
                        <article key={episode.url} className="highlight-card">
                            <span className="highlight-card__podcast">{episode.podcast}</span>
                            <a href={episode.url} target="_blank" rel="noopener noreferrer" className="highlight-card__title">
                                {episode.title}
                            </a>
                            <p>{episode.takeaway}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppleDevelopmentPodcasts;
