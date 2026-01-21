import { useState, useEffect, useMemo } from 'react';
import '../DSA/ContributionGraph.css';

// GitHub GraphQL API Configuration
// To use GitHub's official GraphQL API, you need a Personal Access Token
// 1. Go to https://github.com/settings/tokens
// 2. Generate a new token with 'read:user' scope
// 3. Create a .env file in your project root with: REACT_APP_GITHUB_TOKEN=your_token_here
// 4. Restart your development server

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GitHubContributionGraph = ({ username = 'sachin6174' }) => {
    const [contributionData, setContributionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useImageFallback, setUseImageFallback] = useState(false);

    // GraphQL query as described in the article
    const CONTRIBUTION_QUERY = `
        query($userName: String!, $from: DateTime!, $to: DateTime!) { 
            user(login: $userName) {
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `;

    const fetchGitHubContributions = async () => {
        setLoading(true);
        setError(null);
        setUseImageFallback(false);

        // Check if token is configured
        if (!GITHUB_TOKEN) {
            console.warn('GitHub token not configured. Using image fallback.');
            setError('Configure GitHub token for interactive graph');
            setUseImageFallback(true);
            setLoading(false);
            return;
        }

        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            const from = `${currentYear}-01-01T00:00:00Z`;
            const to = now.toISOString();

            const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: CONTRIBUTION_QUERY,
                    variables: {
                        userName: username,
                        from,
                        to
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const result = await response.json();

            if (result.errors) {
                throw new Error(result.errors[0].message);
            }

            if (!result.data?.user?.contributionsCollection?.contributionCalendar) {
                throw new Error('Invalid response structure');
            }

            setContributionData(result.data.user.contributionsCollection.contributionCalendar);
            setLoading(false);
        } catch (err) {
            console.error('GitHub GraphQL API failed:', err);
            setError(err.message || 'API unavailable, showing live graph');
            setUseImageFallback(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHubContributions();
    }, [username]);

    // Process contribution data for visualization
    const processedData = useMemo(() => {
        if (!contributionData) return { weeks: [], totalContributions: 0 };

        const { weeks, totalContributions } = contributionData;

        // Calculate contribution levels (0-4) based on count
        const processedWeeks = weeks.map(week => ({
            days: week.contributionDays.map(day => {
                const count = day.contributionCount;
                let level = 0;

                if (count > 0) {
                    if (count >= 12) level = 4;
                    else if (count >= 6) level = 3;
                    else if (count >= 3) level = 2;
                    else level = 1;
                }

                return {
                    date: new Date(day.date),
                    count,
                    level
                };
            })
        }));

        return { weeks: processedWeeks, totalContributions };
    }, [contributionData]);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayLabelIndexes = [1, 3, 5]; // Mon, Wed, Fri
    const currentYear = new Date().getFullYear();

    const monthMarkers = useMemo(() => {
        const markers = [];
        let lastMonth = null;

        processedData.weeks.forEach((week, weekIndex) => {
            const firstDay = week.days[0];
            if (!firstDay) return;

            const month = firstDay.date.getMonth();

            if (lastMonth !== month) {
                markers.push({
                    label: firstDay.date.toLocaleString('en-US', { month: 'short' }),
                    index: weekIndex + 1
                });
                lastMonth = month;
            }
        });

        return markers;
    }, [processedData.weeks]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="contribution-graph-container">
                <div className="contribution-header">
                    <div className="contribution-title">
                        <span className="contribution-icon">🔄</span>
                        <span className="contribution-count">Loading GitHub data...</span>
                    </div>
                    <div className="contribution-year">
                        <span className="info-icon">ⓘ</span>
                        <span>{currentYear}</span>
                    </div>
                </div>
                <div className="contribution-graph loading-skeleton">
                    <div className="skeleton-grid">
                        {Array.from({ length: 53 }, (_, i) => (
                            <div key={i} className="skeleton-week">
                                {Array.from({ length: 7 }, (_, j) => (
                                    <div key={j} className="skeleton-day" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (useImageFallback) {
        return (
            <div className="contribution-graph-container github-graph">
                <div className="contribution-header">
                    <div className="contribution-title">
                        <span className="contribution-icon">🐙</span>
                        <span className="contribution-count">
                            GitHub contributions
                            {error && <span className="api-status"> ({error})</span>}
                        </span>
                    </div>
                    <div className="contribution-year">
                        <span className="info-icon">ⓘ</span>
                        <span>{currentYear}</span>
                        <span className="live-indicator">●</span>
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
                            title="View GitHub Profile"
                        >
                            View Profile ↗
                        </a>
                    </div>
                </div>
                <div className="github-image-graph">
                    <img
                        src={`https://ghchart.rshah.org/${currentYear}/${username}`}
                        alt={`GitHub contribution graph for ${username}`}
                        loading="lazy"
                    />
                    <p style={{
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        textAlign: 'center'
                    }}>
                        💡 To see an interactive graph, configure your GitHub token in <code>.env</code>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="contribution-graph-container github-graph">
            <div className="contribution-header">
                <div className="contribution-title">
                    <span className="contribution-icon">🐙</span>
                    <span className="contribution-count">
                        {processedData.totalContributions} contributions in {new Date().getFullYear()}
                    </span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>{new Date().getFullYear()}</span>
                    <span className="live-indicator">●</span>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        title="View GitHub Profile"
                    >
                        View Profile ↗
                    </a>
                </div>
            </div>

            <div className="contribution-graph">
                <div className="month-labels github-month-labels">
                    <span className="month-label-offset" />
                    <div
                        className="github-month-labels-row"
                        style={{ gridTemplateColumns: `repeat(${processedData.weeks.length}, 1fr)` }}
                    >
                        {monthMarkers.map((marker) => (
                            <span
                                key={`${marker.label}-${marker.index}`}
                                className="month-label"
                                style={{ gridColumnStart: marker.index }}
                            >
                                {marker.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="graph-content">
                    <div className="day-labels">
                        {days.map((day, index) => (
                            dayLabelIndexes.includes(index) && (
                                <span key={day} className="day-label">{day}</span>
                            )
                        ))}
                    </div>

                    <div className="contribution-grid">
                        {processedData.weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="week-column">
                                {week.days.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`contribution-day level-${day.level}`}
                                        title={`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(day.date)}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="contribution-legend">
                <span className="legend-text">Less</span>
                <div className="legend-squares">
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`legend-square level-${level}`} />
                    ))}
                </div>
                <span className="legend-text">More</span>
            </div>
        </div>
    );
};

export default GitHubContributionGraph;
