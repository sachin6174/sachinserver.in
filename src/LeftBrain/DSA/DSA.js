import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
import '../shared-styles.css';
import './DSA.css';
import ContributionGraph from './ContributionGraph';
import { leetcode150Data } from './data/leetcode150.js';
import { oneDDPData } from './data/1ddp.js';
import { getSolutionData, hasSolutionVideo, getYouTubeThumbnail } from './data/solutionLinks.js';

const DSA = memo(() => {
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('leetcode-username') || 'sachinkumar6174';
    });

    // Listen for username changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const newUsername = localStorage.getItem('leetcode-username') || 'sachinkumar6174';
            setUsername(newUsername);
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check for updates from the same window
        const interval = setInterval(() => {
            const newUsername = localStorage.getItem('leetcode-username') || 'sachinkumar6174';
            if (newUsername !== username) {
                setUsername(newUsername);
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [username]);



    return (
        <div className="leftbrain-container dsa-theme">
            <div className="simple-header">
                <h1>Data Structures & Algorithms</h1>
                <p>Master problem-solving with curated LeetCode challenges and comprehensive Swift programming guides</p>
            </div>


            <div className="grid-2">
                <div className="content-card">
                    {/* LeetCode Stats Section - Compact */}
                    <div className="leetcode-compact-section">
                        <div className="leetcode-compact-header">
                            <div className="profile-compact">
                                <span className="leetcode-icon">🔥</span>
                                <span className="profile-name">{username}</span>
                            </div>
                            <a
                                href={`https://leetcode.com/${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="leetcode-compact-link"
                            >
                                View Profile ↗
                            </a>
                        </div>
                        <div className="leetcode-compact-stats">
                            <img
                                src={`https://leetcard.jacoblin.cool/${username}?theme=dark&font=Karma`}
                                alt="LeetCode Stats"
                                className="leetcode-compact-card"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="compact-fallback-stats" style={{ display: 'none' }}>
                                <div className="compact-stat">
                                    <span className="compact-number">30</span>
                                    <span className="compact-label">Total Contributions</span>
                                </div>
                                <div className="compact-stat">
                                    <span className="compact-number">Active</span>
                                    <span className="compact-label">July Streak</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* LeetCode Contribution Graph */}
                    <ContributionGraph />

                    {/* Playlists Section */}
                    <div className="info-section">
                        <h4>📺 Recommended Playlists</h4>
                        <div className="playlists-grid">
                            {oneDDPData.playlists.map((playlist, index) => {
                                const thumbnailUrl = getYouTubeThumbnail(playlist.url);
                                return (
                                    <a
                                        key={index}
                                        href={playlist.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="playlist-card"
                                    >
                                        <div className="playlist-thumbnail-container">
                                            <img
                                                src={thumbnailUrl}
                                                alt={playlist.title}
                                                className="playlist-thumbnail"
                                            />
                                            <div className="playlist-play-overlay">▶</div>
                                        </div>
                                        <div className="playlist-info">
                                            <h5 className="playlist-title">{playlist.title}</h5>
                                            <span className="playlist-author">{playlist.author}</span>
                                        </div>
                                        <div className="external-icon">↗</div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <h3>LeetCode Top 150 Interview Questions</h3>
                    <p>{leetcode150Data.description}</p>

                    {leetcode150Data.questions && (
                        <div className="info-section">
                            <h4>🎯 Practice Problems</h4>
                            <div className="questions-grid">
                                {(() => {
                                    let questionNumber = 0;
                                    return leetcode150Data.questions.map((question, index) => {
                                        if (question.startsWith('---')) {
                                            return <h3 key={index} className="separator">{question.replaceAll('---', '').trim()}</h3>;
                                        }

                                        // Parse question text, difficulty, and URL
                                        const parts = question.split(' - https://');
                                        const titleAndDifficulty = parts[0];
                                        const leetcodeUrl = parts[1] ? `https://${parts[1]}` : null;

                                        // Only render LeetCode problems, skip concept questions
                                        if (!leetcodeUrl) return null;

                                        // Increment question number only for actual questions
                                        questionNumber++;

                                        // Extract difficulty from title
                                        const difficultyMatch = titleAndDifficulty.match(/\[(Easy|Medium|Hard)\]$/);
                                        const difficulty = difficultyMatch ? difficultyMatch[1] : 'Medium';
                                        const questionTitle = titleAndDifficulty.replace(/\s*\[(Easy|Medium|Hard)\]$/, '');

                                        const hasSolution = hasSolutionVideo(questionTitle);
                                        const solutionData = hasSolution ? getSolutionData(questionTitle) : null;

                                        return (
                                            <div key={index} className="question-card">
                                                <div className="question-card-header">
                                                    <span className="question-number">#{questionNumber}</span>
                                                    <span className={`question-difficulty difficulty-${difficulty.toLowerCase()}`}>
                                                        {difficulty}
                                                    </span>
                                                </div>
                                                <h3 className="question-title">{questionTitle}</h3>

                                                <div className="question-actions">
                                                    <a
                                                        href={leetcodeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="leetcode-link"
                                                    >
                                                        <span>{leetcodeUrl.includes('hackerrank') ? 'Solve on HackerRank' : 'Solve on LeetCode'}</span>
                                                        <span className="external-icon">↗</span>
                                                    </a>
                                                </div>

                                                {hasSolution && (
                                                    <div className="solution-section">
                                                        {Array.isArray(solutionData.videoUrl) ? (
                                                            solutionData.videoUrl.map((url, index) => (
                                                                <a
                                                                    key={index}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="solution-link"
                                                                    title={`Watch solution video ${index + 1}`}
                                                                >
                                                                    <span>📺 Solution {index + 1}</span>
                                                                </a>
                                                            ))
                                                        ) : (
                                                            <a
                                                                href={solutionData.videoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="solution-link"
                                                                title="Watch solution video"
                                                            >
                                                                <span>📺 Solution</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    )}

                    {leetcode150Data.explanation && (
                        <div className="info-section">
                            <h4>📚 Fundamentals & Syntax</h4>
                            <div className="explanation-content">
                                <div dangerouslySetInnerHTML={{
                                    __html: leetcode150Data.explanation
                                        .replace(/\n/g, '<br/>')
                                        .replace(/## (.*)/g, '<h3>$1</h3>')
                                        .replace(/### (.*)/g, '<h4>$1</h4>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/`([^`]+)`/g, '<code>$1</code>')
                                        .replace(/```swift\n([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
                                        .replace(/\| (.*) \|/g, '<tr><td>$1</td></tr>')
                                        .replace(/\|---/g, '<table class="complexity-table">')
                                        .replace(/✅ \*\*(.*?)\*\*/g, '<div class="pro-tip">✅ <strong>$1</strong>')
                                        .replace(/❌ \*\*(.*?)\*\*/g, '<div class="con-tip">❌ <strong>$1</strong>')
                                }} />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
});

DSA.displayName = 'DSA';

export default DSA;
