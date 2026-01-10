import React, { useEffect, useMemo, useState } from 'react';
import '../shared-styles.css';
import './GitHub.css';
import GitHubContributionGraph from '../AboutMe/GitHubContributionGraph';

const GitHub = () => {
    const username = 'sachin6174';
    const [repos, setRepos] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [repoError, setRepoError] = useState(null);

    useEffect(() => {
        const sampleRepos = [
            { id: 'sample-1', name: 'NotingDown', html_url: 'https://github.com/sachin6174/NotingDown', description: 'SwiftUI note-taking app', language: 'Swift', stargazers_count: 8, forks_count: 2, pushed_at: '2025-01-10T12:00:00Z' },
            { id: 'sample-2', name: 'Guitar-Utility', html_url: 'https://github.com/sachin6174/Guitar-Utility', description: 'iOS guitar tuner and metronome', language: 'Swift', stargazers_count: 5, forks_count: 1, pushed_at: '2025-01-05T09:00:00Z' },
            { id: 'sample-3', name: 'secure-text-chrome-extension', html_url: 'https://github.com/sachin6174/secure-text-chrome-extension', description: 'Chrome extension for secure text handling', language: 'JavaScript', stargazers_count: 4, forks_count: 1, pushed_at: '2025-01-02T14:00:00Z' }
        ];

        const fetchRepos = async () => {
            setLoadingRepos(true);
            setRepoError(null);
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setRepos(Array.isArray(data) ? data : sampleRepos);
            } catch (err) {
                setRepoError('Using cached snapshot');
                setRepos(sampleRepos);
            } finally {
                setLoadingRepos(false);
            }
        };

        fetchRepos();
    }, [username]);

    const totalRepos = repos.length;

    const topLanguages = useMemo(() => {
        const counts = repos.reduce((acc, repo) => {
            if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    }, [repos]);

    const mostActive = useMemo(() => {
        return [...repos]
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 5);
    }, [repos]);

    const highlightedRepos = useMemo(() => {
        return [...repos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
    }, [repos]);

    return (
        <div className="leftbrain-container github-theme">
            <div className="simple-header">
                <h1>GitHub</h1>
                <p>Open-source activity, repositories, and collaboration snapshots.</p>
            </div>

            <div className="grid-3 github-stats-grid">
                <div className="content-card github-profile-card">
                    <div className="github-card-header">
                        <h3>Profile</h3>
                        {repoError && <span className="subtle-text">{repoError}</span>}
                    </div>
                    <p>Track public projects, releases, and ongoing experiments.</p>
                    <div className="github-links">
                        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="github-link">
                            View Profile
                        </a>
                        <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="github-link">
                            Repositories
                        </a>
                        <a href={`https://gist.github.com/${username}`} target="_blank" rel="noopener noreferrer" className="github-link">
                            Gists
                        </a>
                    </div>
                </div>
                <div className="content-card github-focus-card">
                    <h3>Focus Areas</h3>
                    <ul className="github-focus-list">
                        <li>Swift and iOS tooling</li>
                        <li>Developer utilities and automation</li>
                        <li>Open-source experiments</li>
                    </ul>
                </div>
                <div className="content-card github-metrics-card">
                    <h3>Snapshot</h3>
                    <div className="metric-row">
                        <span>Total repos</span>
                        <strong>{loadingRepos ? '…' : totalRepos}</strong>
                    </div>
                    <div className="metric-row">
                        <span>Top languages</span>
                        <div className="metric-tags">
                            {topLanguages.length === 0 && <span className="subtle-text">—</span>}
                            {topLanguages.map(([lang, count]) => (
                                <span key={lang} className="focus-pill subtle">{lang} · {count}</span>
                            ))}
                        </div>
                    </div>
                    <div className="metric-row">
                        <span>Most active repo</span>
                        {mostActive.length > 0 ? (
                            <a href={mostActive[0].html_url} target="_blank" rel="noopener noreferrer" className="metric-link">
                                {mostActive[0].name}
                            </a>
                        ) : (
                            <span className="subtle-text">—</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="content-card github-graph-card">
                <h3>Contribution graph</h3>
                <GitHubContributionGraph username={username} />
            </div>

            <div className="section">
                <h2>Most active (recent commits)</h2>
                <div className="github-repo-grid">
                    {mostActive.map((repo) => (
                        <article key={repo.id} className="github-repo-card">
                            <div className="repo-header">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-title">
                                    {repo.name}
                                </a>
                                <span className="repo-lang">{repo.language || 'N/A'}</span>
                            </div>
                            <p className="repo-description">{repo.description || 'No description provided.'}</p>
                            <div className="repo-meta">
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>🍴 {repo.forks_count}</span>
                                <span>Updated {new Date(repo.pushed_at).toLocaleDateString()}</span>
                            </div>
                        </article>
                    ))}
                    {mostActive.length === 0 && !loadingRepos && (
                        <div className="subtle-text">No repositories found.</div>
                    )}
                </div>
            </div>

            <div className="section">
                <h2>Top starred</h2>
                <div className="github-repo-grid">
                    {highlightedRepos.map((repo) => (
                        <article key={repo.id} className="github-repo-card">
                            <div className="repo-header">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-title">
                                    {repo.name}
                                </a>
                                <span className="repo-lang">{repo.language || 'N/A'}</span>
                            </div>
                            <p className="repo-description">{repo.description || 'No description provided.'}</p>
                            <div className="repo-meta">
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>🍴 {repo.forks_count}</span>
                                <span>Updated {new Date(repo.pushed_at).toLocaleDateString()}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitHub;
