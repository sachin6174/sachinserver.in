import React, { useState, useEffect } from 'react';
import './ContributionGraph.css';

const ContributionGraph = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch real GitHub data for sachin6174
    const fetchGitHubData = async () => {
        const apis = [
            // Try multiple GitHub API endpoints
            'https://api.github.com/users/sachin6174/events?per_page=100',
            'https://github-contributions-api.jogruber.de/v4/sachin6174',
            'https://github-readme-stats.vercel.app/api?username=sachin6174&show_icons=true&theme=radical&count_private=true'
        ];

        setLoading(true);
        setError(null);

        // Try GitHub contributions API first (doesn't require auth)
        try {
            console.log('Trying GitHub contributions API...');
            
            const response = await fetch('https://github-contributions-api.jogruber.de/v4/sachin6174?y=2025');
            
            if (response.ok) {
                const data = await response.json();
                console.log('GitHub Contributions API Response:', data);
                const contributionData = generateContributionDataFromGitHubContributions(data);
                setContributions(contributionData);
                setError(null);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.error('GitHub Contributions API failed:', err);
        }

        // Fallback to other APIs
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

    // Generate contribution data from GitHub Contributions API
    const generateContributionDataFromGitHubContributions = (apiData) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        try {
            const contributionData = apiData.contributions || [];
            const contributionMap = {};
            
            // Build a map of date -> contribution count
            contributionData.forEach(day => {
                contributionMap[day.date] = day.count;
            });
            
            for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0]; // YYYY-MM-DD format
                const count = contributionMap[dateKey] || 0;
                
                // Calculate level based on contribution count (GitHub style)
                let level = 0;
                if (count > 0) {
                    if (count >= 10) level = 4;
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
        } catch (error) {
            console.error('Error processing GitHub Contributions API data:', error);
            return generateFallbackData();
        }
    };

    // Generate contribution data from GitHub GraphQL API
    const generateContributionDataFromGitHub = (apiData) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        try {
            const weeks = apiData.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
            const contributionMap = {};
            
            // Build a map of date -> contribution count
            weeks.forEach(week => {
                week.contributionDays.forEach(day => {
                    contributionMap[day.date] = day.contributionCount;
                });
            });
            
            for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0]; // YYYY-MM-DD format
                const count = contributionMap[dateKey] || 0;
                
                // Calculate level based on contribution count (GitHub style)
                let level = 0;
                if (count > 0) {
                    if (count >= 10) level = 4;
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
        } catch (error) {
            console.error('Error processing GitHub GraphQL data:', error);
            return generateFallbackData();
        }
    };

    // Generate contribution data from GitHub REST APIs
    const generateContributionDataFromGitHubAPI = (apiData, apiIndex = 0) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        try {
            let contributionMap = {};
            
            if (apiIndex === 0) {
                // GitHub Events API format
                const events = Array.isArray(apiData) ? apiData : [];
                events.forEach(event => {
                    const eventDate = new Date(event.created_at).toISOString().split('T')[0];
                    contributionMap[eventDate] = (contributionMap[eventDate] || 0) + 1;
                });
            } else if (apiIndex === 1) {
                // GitHub Contributions API format
                const contributionData = apiData.contributions || [];
                contributionData.forEach(day => {
                    contributionMap[day.date] = day.count;
                });
            }
            
            for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0];
                const count = contributionMap[dateKey] || 0;
                
                // Calculate level based on contribution count
                let level = 0;
                if (count > 0) {
                    if (count >= 8) level = 4;
                    else if (count >= 5) level = 3;
                    else if (count >= 2) level = 2;
                    else level = 1;
                }
                
                contributions.push({
                    date: new Date(d),
                    level: level,
                    count: count
                });
            }
            
            return contributions;
        } catch (error) {
            console.error('Error processing GitHub API data:', error);
            return generateFallbackData();
        }
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
            let activityChance = 0.15; // Base 15% chance
            if (isWeekday) activityChance += 0.45; // +45% on weekdays
            if (isCurrentMonth) activityChance += 0.25; // +25% in current month
            
            // Weekend coding sessions (less frequent but happen)
            if (!isWeekday && Math.random() < 0.3) {
                activityChance += 0.2;
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
                        {totalContributions} contributions in 2025
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

export default ContributionGraph;