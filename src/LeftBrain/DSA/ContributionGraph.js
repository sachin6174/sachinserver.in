import React, { useState, useEffect } from 'react';
import './ContributionGraph.css';

const ContributionGraph = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(() => {
        // Get username from localStorage or use default
        return localStorage.getItem('leetcode-username') || 'sachinkumar6174';
    });
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [tempUsername, setTempUsername] = useState(username);

    // Save username to localStorage
    const saveUsername = (newUsername) => {
        if (newUsername.trim()) {
            localStorage.setItem('leetcode-username', newUsername.trim());
            setUsername(newUsername.trim());
            setTempUsername(newUsername.trim());
            setIsEditingUsername(false);
            // Refetch data with new username
            fetchLeetCodeData(newUsername.trim());
        }
    };

    // Handle username edit
    const handleUsernameEdit = () => {
        setIsEditingUsername(true);
        setTempUsername(username);
    };

    const handleUsernameCancel = () => {
        setIsEditingUsername(false);
        setTempUsername(username);
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        if (tempUsername.trim() && tempUsername.trim() !== username) {
            saveUsername(tempUsername.trim());
        } else {
            setIsEditingUsername(false);
        }
    };

    // Fetch real LeetCode data for given username
    const fetchLeetCodeData = async (targetUsername = username) => {
        const apis = [
            // Try multiple LeetCode API endpoints
            `https://leetcode-stats-api.herokuapp.com/${targetUsername}`,
            `https://alfa-leetcode-api.onrender.com/${targetUsername}`,
            `https://alfa-leetcode-api.onrender.com/${targetUsername}/submission`
        ];

        setLoading(true);
        setError(null);

        // Try each LeetCode API endpoint
        for (let i = 0; i < apis.length; i++) {
            try {
                console.log(`Trying LeetCode API ${i + 1}:`, apis[i]);
                
                const response = await fetch(apis[i]);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('LeetCode API Response:', data);
                
                // Transform the data into contribution format
                const contributionData = generateContributionDataFromLeetCodeAPI(data, i);
                setContributions(contributionData);
                setError(null);
                setLoading(false);
                return; // Success, exit the loop
                
            } catch (err) {
                console.error(`LeetCode API ${i + 1} failed:`, err);
                if (i === apis.length - 1) {
                    // All APIs failed
                    setError('Unable to fetch LeetCode data from any API');
                    setContributions(generateFallbackData());
                }
            }
        }
        
        setLoading(false);
    };

    // Generate contribution data from LeetCode API response
    const generateContributionDataFromLeetCodeAPI = (apiData, apiIndex = 0) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        let submissionCalendar = {};
        
        // Handle different LeetCode API response formats
        if (apiIndex === 0) {
            // leetcode-stats-api.herokuapp.com format
            submissionCalendar = apiData.submissionCalendar || {};
        } else if (apiIndex === 1 || apiIndex === 2) {
            // alfa-leetcode-api.onrender.com format
            submissionCalendar = apiData.submissionCalendar || apiData.data?.submissionCalendar || {};
        }
        
        // If submissionCalendar is a string, parse it as JSON
        if (typeof submissionCalendar === 'string') {
            try {
                submissionCalendar = JSON.parse(submissionCalendar);
            } catch (e) {
                console.error('Failed to parse submission calendar:', e);
                submissionCalendar = {};
            }
        }
        
        console.log('Parsed LeetCode submission calendar:', submissionCalendar);
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            const dateKey = Math.floor(d.getTime() / 1000).toString();
            const count = parseInt(submissionCalendar[dateKey]) || 0;
            
            // Calculate level based on submission count
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
    };

    // Fallback data generation if API fails
    const generateFallbackData = () => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        // Create realistic LeetCode problem-solving patterns
        const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday (work days)
        const currentMonth = new Date().getMonth();
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            let level = 0;
            let count = 0;
            
            const dayOfWeek = d.getDay();
            const month = d.getMonth();
            
            // Higher activity on weekdays (typical coding practice pattern)
            const isWeekday = weekdays.includes(dayOfWeek);
            
            // Higher activity in current month
            const isCurrentMonth = month === currentMonth;
            
            // Generate realistic LeetCode solving patterns
            let activityChance = 0.20; // Base 20% chance
            if (isWeekday) activityChance += 0.40; // +40% on weekdays
            if (isCurrentMonth) activityChance += 0.25; // +25% in current month
            
            // Weekend practice sessions (less frequent but happen)
            if (!isWeekday && Math.random() < 0.35) {
                activityChance += 0.15;
            }
            
            if (Math.random() < activityChance) {
                // Determine problem count (1-12 problems per day)
                // Higher numbers represent intensive practice days
                if (Math.random() < 0.05) {
                    count = Math.floor(Math.random() * 5) + 8; // 8-12 (intensive days)
                } else if (Math.random() < 0.25) {
                    count = Math.floor(Math.random() * 4) + 4; // 4-7 (good practice days)
                } else {
                    count = Math.floor(Math.random() * 3) + 1; // 1-3 (regular days)
                }
                
                // Calculate level based on LeetCode problem-solving levels
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
    };

    // Fetch data on component mount or when username changes
    useEffect(() => {
        fetchLeetCodeData();
    }, [username]);
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
                        <span className="contribution-count">Loading LeetCode data...</span>
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
                    <div className="contribution-info">
                        <span className="contribution-count">
                            LeetCode Activity for {username}
                            {error && <span className="api-status"> (simulated data - API unavailable)</span>}
                        </span>
                        <div className="username-section">
                            {isEditingUsername ? (
                                <form onSubmit={handleUsernameSubmit} className="username-edit-form">
                                    <input
                                        type="text"
                                        value={tempUsername}
                                        onChange={(e) => setTempUsername(e.target.value)}
                                        className="username-input"
                                        placeholder="Enter LeetCode username"
                                        autoFocus
                                    />
                                    <button type="submit" className="username-save-btn" title="Save username">
                                        ✓
                                    </button>
                                    <button type="button" onClick={handleUsernameCancel} className="username-cancel-btn" title="Cancel">
                                        ✕
                                    </button>
                                </form>
                            ) : (
                                <div className="username-display">
                                    <span className="username-text">@{username}</span>
                                    <button onClick={handleUsernameEdit} className="username-edit-btn" title="Click to edit username">
                                        ✏️
                                    </button>
                                </div>
                            )}
                            <span className="username-hint">💡 Click the username to customize</span>
                        </div>
                    </div>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>2025</span>
                    {!error && <span className="live-indicator">●</span>}
                    <a 
                        href={`https://leetcode.com/${username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        title="View LeetCode Profile"
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
                                            title={`${contribution.count} ${contribution.count === 1 ? 'problem solved' : 'problems solved'} on ${formatDate(contribution.date)}`}
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