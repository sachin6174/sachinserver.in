import { useState, useEffect, useMemo } from 'react';
import '../DSA/ContributionGraph.css';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LABEL_INDEXES = [1, 3, 5];

const toDateKey = (date) => date.toISOString().slice(0, 10);

const levelFromCount = (count) => {
    if (count <= 0) return 0;
    if (count >= 12) return 4;
    if (count >= 6) return 3;
    if (count >= 3) return 2;
    return 1;
};

const groupByWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }
    return weeks;
};

const buildCalendarFromDailyMap = (dailyMap, year) => {
    const today = new Date();
    const jan1 = new Date(Date.UTC(year, 0, 1));
    const start = new Date(jan1);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());

    const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const endPadding = new Date(end);
    endPadding.setUTCDate(endPadding.getUTCDate() + (6 - endPadding.getUTCDay()));

    const allDays = [];
    let totalContributions = 0;

    for (let day = new Date(start); day <= endPadding; day.setUTCDate(day.getUTCDate() + 1)) {
        const date = new Date(day);
        const dateKey = toDateKey(date);
        const value = dailyMap.get(dateKey) || { count: 0, level: 0 };

        if (date >= jan1 && date <= end) {
            totalContributions += value.count;
        }

        allDays.push({
            date,
            count: value.count,
            level: value.level || levelFromCount(value.count)
        });
    }

    return {
        weeks: groupByWeeks(allDays),
        totalContributions
    };
};

const fetchPublicContributions = async (username, year) => {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
    if (!response.ok) {
        throw new Error(`Public API ${response.status}`);
    }

    const json = await response.json();
    if (!Array.isArray(json?.contributions)) {
        throw new Error('Invalid public API response');
    }

    const dailyMap = new Map();
    json.contributions.forEach((item) => {
        const count = Number(item.count) || 0;
        const level = typeof item.level === 'number' ? item.level : levelFromCount(count);
        dailyMap.set(item.date, { count, level });
    });

    return buildCalendarFromDailyMap(dailyMap, year);
};

const fetchGraphQLContributions = async (username, year) => {
    if (!GITHUB_TOKEN) {
        throw new Error('No GraphQL token configured');
    }

    const now = new Date();
    const from = `${year}-01-01T00:00:00Z`;
    const to = now.toISOString();

    const query = `
        query($userName: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $userName) {
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
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

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { userName: username, from, to }
        })
    });

    if (!response.ok) {
        throw new Error(`GraphQL API ${response.status}`);
    }

    const json = await response.json();
    const days = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
        ?.flatMap((week) => week.contributionDays) || [];

    if (!days.length) {
        throw new Error('Empty GraphQL contribution data');
    }

    const dailyMap = new Map();
    days.forEach((item) => {
        const count = Number(item.contributionCount) || 0;
        dailyMap.set(item.date, { count, level: levelFromCount(count) });
    });

    return buildCalendarFromDailyMap(dailyMap, year);
};

const GitHubContributionGraph = ({ username = 'sachin6174' }) => {
    const currentYear = new Date().getFullYear();
    const [data, setData] = useState({ weeks: [], totalContributions: 0 });
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('public');
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError('');

            try {
                const publicData = await fetchPublicContributions(username, currentYear);
                if (!cancelled) {
                    setData(publicData);
                    setSource('public');
                    setLoading(false);
                }
                return;
            } catch (publicErr) {
                try {
                    const graphQLData = await fetchGraphQLContributions(username, currentYear);
                    if (!cancelled) {
                        setData(graphQLData);
                        setSource('graphql');
                        setError('');
                        setLoading(false);
                    }
                    return;
                } catch (graphQLErr) {
                    if (!cancelled) {
                        setSource('image');
                        setError(publicErr?.message || graphQLErr?.message || 'Failed to load live contributions');
                        setLoading(false);
                    }
                }
            }
        };

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [username, currentYear]);

    const monthMarkers = useMemo(() => {
        let previousMonth = -1;
        const markers = [];
        const today = new Date();

        data.weeks.forEach((week, weekIndex) => {
            const labelDay = week.find((day) => day.date.getUTCFullYear() === currentYear && day.date <= today);
            if (!labelDay) return;

            const month = labelDay.date.getUTCMonth();
            if (month !== previousMonth) {
                markers.push({
                    label: labelDay.date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
                    index: weekIndex + 1
                });
                previousMonth = month;
            }
        });

        return markers;
    }, [data.weeks, currentYear]);

    const formatDate = (date) => date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    if (loading) {
        return (
            <div className="contribution-graph-container github-graph">
                <div className="contribution-header">
                    <div className="contribution-title">
                        <span className="contribution-icon">🐙</span>
                        <span className="contribution-count">Loading GitHub contribution data...</span>
                    </div>
                    <div className="contribution-year">
                        <span className="info-icon">i</span>
                        <span>{currentYear}</span>
                    </div>
                </div>
                <div className="contribution-graph loading-skeleton">
                    <div className="skeleton-grid">
                        {Array.from({ length: 53 }, (_, week) => (
                            <div key={week} className="skeleton-week">
                                {Array.from({ length: 7 }, (_, day) => (
                                    <div key={day} className="skeleton-day" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (source === 'image') {
        return (
            <div className="contribution-graph-container github-graph">
                <div className="contribution-header">
                    <div className="contribution-title">
                        <span className="contribution-icon">🐙</span>
                        <span className="contribution-count">GitHub contributions</span>
                    </div>
                    <div className="contribution-year">
                        <span className="info-icon">i</span>
                        <span>{currentYear}</span>
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
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
                    {error && (
                        <p className="subtle-text" style={{ marginTop: '0.6rem' }}>
                            Live API unavailable, showing image fallback.
                        </p>
                    )}
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
                        {data.totalContributions} contributions in {currentYear}
                        {source === 'graphql' && <span className="api-status"> (GraphQL)</span>}
                    </span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">i</span>
                    <span>{currentYear}</span>
                    <span className="live-indicator">●</span>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
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
                        style={{ gridTemplateColumns: `repeat(${data.weeks.length || 1}, 1fr)` }}
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
                        {DAYS.map((day, index) => (
                            DAY_LABEL_INDEXES.includes(index) ? <span key={day} className="day-label">{day}</span> : null
                        ))}
                    </div>

                    <div className="contribution-grid">
                        {data.weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="week-column">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
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
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div key={level} className={`legend-square level-${level}`} />
                    ))}
                </div>
                <span className="legend-text">More</span>
            </div>
        </div>
    );
};

export default GitHubContributionGraph;
