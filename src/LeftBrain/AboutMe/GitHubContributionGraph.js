import { useState, useEffect } from 'react';
import '../DSA/ContributionGraph.css';

const GitHubContributionGraph = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch real GitHub data for sachin6174
    const fetchGitHubData = async () => {
        const apis = [
            // Try GitHub contributions API
            'https://github-contributions-api.jogruber.de/v4/sachin6174',
            // Try GitHub API for user events
            'https://api.github.com/users/sachin6174/events',
            // Alternative GitHub stats API
            'https://github-readme-stats.vercel.app/api?username=sachin6174&show_icons=true&count_private=true'
        ];

        setLoading(true);
        setError(null);

        // Try each GitHub API endpoint
        for (let i = 0; i < apis.length; i++) {
            try {
                console.log(`Trying GitHub API ${i + 1}:`, apis[i]);
                
                const response = await fetch(apis[i]);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('GitHub API Response:', data);
                
                // Transform the data into contribution format
                const contributionData = generateContributionDataFromGitHubAPI(data, i);
                setContributions(contributionData);
                setError(null);
                setLoading(false);
                return; // Success, exit the loop
                
            } catch (err) {
                console.error(`GitHub API ${i + 1} failed:`, err);
                if (i === apis.length - 1) {
                    // All APIs failed
                    setError('Unable to fetch GitHub data from any API');
                    setContributions(generateFallbackData());
                }
            }
        }
        
        setLoading(false);
    };

    // Generate contribution data from GitHub API response
    const generateContributionDataFromGitHubAPI = (apiData, apiIndex = 0) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        let contributionCalendar = {};
        
        // Handle different GitHub API response formats
        if (apiIndex === 0) {
            // github-contributions-api.jogruber.de format
            if (apiData.contributions) {
                Object.keys(apiData.contributions).forEach(date => {
                    const dateObj = new Date(date);
                    const dateKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
                    contributionCalendar[dateKey] = apiData.contributions[date];
                });
            }
        } else if (apiIndex === 1) {
            // GitHub events API format - process events into daily counts
            if (Array.isArray(apiData)) {
                apiData.forEach(event => {
                    const eventDate = new Date(event.created_at);
                    const dateKey = eventDate.toISOString().split('T')[0]; // YYYY-MM-DD format
                    contributionCalendar[dateKey] = (contributionCalendar[dateKey] || 0) + 1;
                });
            }
        }
        
        console.log('Parsed GitHub contribution calendar:', contributionCalendar);
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0]; // YYYY-MM-DD format
            const count = parseInt(contributionCalendar[dateKey]) || 0;
            
            // Calculate level based on contribution count
            let level = 0;
            if (count > 0) {
                if (count >= 12) level = 4;
                else if (count >= 6) level = 3;
                else if (count >= 3) level = 2;
                else level = 1;
            }
            
            contributions.push({
                date: new Date(d),
                level: level,
                count: count
            });
        }
        
        return contributions;
    };

    // Fallback data generation if API fails
    const generateFallbackData = () => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        // Create realistic GitHub contribution patterns
        const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday (work days)
        const currentMonth = new Date().getMonth();
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            let level = 0;
            let count = 0;
            
            const dayOfWeek = d.getDay();
            const month = d.getMonth();
            
            // Higher activity on weekdays (typical developer pattern)
            const isWeekday = weekdays.includes(dayOfWeek);
            
            // Higher activity in current month
            const isCurrentMonth = month === currentMonth;
            
            // Generate realistic GitHub activity patterns
            let activityChance = 0.25; // Base 25% chance for active developer
            if (isWeekday) activityChance += 0.35; // +35% on weekdays
            if (isCurrentMonth) activityChance += 0.20; // +20% in current month
            
            // Weekend coding sessions (less frequent but happen)
            if (!isWeekday && Math.random() < 0.4) {
                activityChance += 0.15;
            }
            
            if (Math.random() < activityChance) {
                // Determine contribution count (1-15 contributions)
                // Higher numbers represent commit streaks or major coding days
                if (Math.random() < 0.1) {
                    count = Math.floor(Math.random() * 8) + 8; // 8-15 (major work days)
                } else if (Math.random() < 0.3) {
                    count = Math.floor(Math.random() * 5) + 3; // 3-7 (productive days)
                } else {
                    count = Math.floor(Math.random() * 3) + 1; // 1-3 (regular days)
                }
                
                // Calculate level based on GitHub's typical contribution levels
                if (count >= 12) level = 4;
                else if (count >= 6) level = 3;
                else if (count >= 3) level = 2;
                else level = 1;
            }
            
            contributions.push({
                date: new Date(d),
                level: level,
                count: count
            });
        }
        
        return contributions;
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchGitHubData();
    }, []);

    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
    
    // Calculate weeks for grid layout
    const weeks = [];
    let currentWeek = [];
    
    // Start from first Sunday of the year
    const startDate = new Date('2025-01-01');
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());
    
    contributions.forEach((contribution, index) => {
        currentWeek.push(contribution);
        
        if (currentWeek.length === 7 || index === contributions.length - 1) {
            weeks.push([...currentWeek]);
            currentWeek = [];
        }
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Show loading state
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
                        <span>2025</span>
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

    return (
        <div className="contribution-graph-container">
            <div className="contribution-header">
                <div className="contribution-title">
                    <span className="contribution-icon">🔥</span>
                    <span className="contribution-count">
                        {totalContributions} total contributions
                        {error && <span className="api-status"> (simulated data - API unavailable)</span>}
                    </span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>2025</span>
                    {!error && <span className="live-indicator">●</span>}
                    <a 
                        href="https://github.com/sachin6174" 
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
                <div className="month-labels">
                    {months.map((month) => (
                        <span key={month} className="month-label">{month}</span>
                    ))}
                </div>
                
                <div className="graph-content">
                    <div className="day-labels">
                        {days.map((day, index) => (
                            index % 2 === 0 && (
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