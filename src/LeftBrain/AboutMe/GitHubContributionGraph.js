import { useState, useEffect, useMemo } from 'react';
import '../DSA/ContributionGraph.css';

const GitHubContributionGraph = ({ username = 'sachin6174' }) => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useImageFallback, setUseImageFallback] = useState(false);

    const fetchGitHubData = async () => {
        setLoading(true);
        setError(null);
        setUseImageFallback(false);

        try {
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data?.contributions) {
                throw new Error('Missing contributions data');
            }

            const contributionData = generateContributionDataFromGitHubAPI(data.contributions);
            setContributions(contributionData);
            setLoading(false);
        } catch (err) {
            console.error('GitHub contributions API failed:', err);
            setError('API unavailable, showing live graph');
            setUseImageFallback(true);
            setLoading(false);
        }
    };

    const generateContributionDataFromGitHubAPI = (contributionCalendar) => {
        const contributions = [];
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 364);

        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startDate.getDate() - startDate.getDay());

        const getDateKey = (date) => {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            return utcDate.toISOString().split('T')[0];
        };

        for (let d = new Date(startOfWeek); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateKey = getDateKey(d);
            const count = parseInt(contributionCalendar[dateKey], 10) || 0;
            const isInRange = d >= startDate;

            let level = 0;
            if (isInRange && count > 0) {
                if (count >= 12) level = 4;
                else if (count >= 6) level = 3;
                else if (count >= 3) level = 2;
                else level = 1;
            }

            contributions.push({
                date: new Date(d),
                level,
                count: isInRange ? count : 0,
                isInRange
            });
        }

        return contributions;
    };

    useEffect(() => {
        fetchGitHubData();
    }, [username]);

    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
    
    // Calculate weeks for grid layout
    const weeks = [];
    let currentWeek = [];
    
    contributions.forEach((contribution, index) => {
        currentWeek.push(contribution);
        
        if (currentWeek.length === 7 || index === contributions.length - 1) {
            weeks.push([...currentWeek]);
            currentWeek = [];
        }
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayLabelIndexes = [1, 3, 5]; // Mon, Wed, Fri for GitHub-like labels

    const monthMarkers = useMemo(() => {
        const markers = [];
        let lastMonth = null;

        weeks.forEach((week, weekIndex) => {
            const weekStart = week.find(Boolean);
            if (!weekStart || !weekStart.date) return;
            const month = weekStart.date.getMonth();

            if (lastMonth !== month) {
                markers.push({
                    label: weekStart.date.toLocaleString('en-US', { month: 'short' }),
                    index: weekIndex + 1 // grid columns are 1-based
                });
                lastMonth = month;
            }
        });

        return markers;
    }, [weeks]);

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
                        <span>Last 12 months</span>
                    </div>
                </div>
                <div className="contribution-graph loading-skeleton">
                    <div className="skeleton-grid">
                        {Array.from({length: 53}, (_, i) => (
                            <div key={i} className="skeleton-week">
                                {Array.from({length: 7}, (_, j) => (
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
                        <span>Last 12 months</span>
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
                        src={`https://ghchart.rshah.org/${username}`}
                        alt={`GitHub contribution graph for ${username}`}
                        loading="lazy"
                    />
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
                        {totalContributions} contributions in the last year
                        {error && <span className="api-status"> ({error})</span>}
                    </span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>Last 12 months</span>
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
                        style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
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
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="week-column">
                                {Array.from({length: 7}, (_, dayIndex) => {
                                    const contribution = week[dayIndex];
                                    if (!contribution) {
                                        return (
                                            <div 
                                                key={dayIndex} 
                                                className="contribution-day level-0"
                                            />
                                        );
                                    }
                                    
                                    return (
                                        <div
                                            key={dayIndex}
                                            className={`contribution-day level-${contribution.level}`}
                                            title={`${contribution.count} ${contribution.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(contribution.date)}`}
                                        />
                                    );
                                })}
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
