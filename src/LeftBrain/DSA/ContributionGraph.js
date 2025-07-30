import React, { useState, useEffect } from 'react';
import './ContributionGraph.css';

const ContributionGraph = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch real LeetCode data for sachinkumar6174
    const fetchLeetCodeData = async () => {
        const apis = [
            // Try multiple LeetCode API endpoints
            'https://leetcode-stats-api.herokuapp.com/sachinkumar6174',
            'https://alfa-leetcode-api.onrender.com/sachinkumar6174',
            'https://alfa-leetcode-api.onrender.com/sachinkumar6174/submission',
            'https://leetcode.com/graphql'
        ];

        setLoading(true);
        setError(null);

        // Try each API endpoint
        for (let i = 0; i < apis.length; i++) {
            try {
                console.log(`Trying API ${i + 1}:`, apis[i]);
                
                let response;
                let data;

                if (apis[i].includes('graphql')) {
                    // GraphQL request for official LeetCode API
                    response = await fetch(apis[i], {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                                query userPublicProfile($username: String!) {
                                    matchedUser(username: $username) {
                                        username
                                        submissionCalendar
                                        profile {
                                            realName
                                            aboutMe
                                        }
                                    }
                                }
                            `,
                            variables: {
                                username: "sachinkumar6174"
                            }
                        })
                    });
                } else {
                    // Regular REST API call
                    response = await fetch(apis[i]);
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                data = await response.json();
                console.log('API Response:', data);
                
                // Transform the data into contribution format
                const contributionData = generateContributionDataFromAPI(data, i);
                setContributions(contributionData);
                setError(null);
                setLoading(false);
                return; // Success, exit the loop
                
            } catch (err) {
                console.error(`API ${i + 1} failed:`, err);
                if (i === apis.length - 1) {
                    // All APIs failed
                    setError('Unable to fetch LeetCode data from any API');
                    setContributions(generateFallbackData());
                }
            }
        }
        
        setLoading(false);
    };

    // Generate contribution data from API response
    const generateContributionDataFromAPI = (apiData, apiIndex = 0) => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        
        let submissionCalendar = {};
        
        // Handle different API response formats
        if (apiIndex === 0) {
            // leetcode-stats-api.herokuapp.com format
            submissionCalendar = apiData.submissionCalendar || {};
        } else if (apiIndex === 1 || apiIndex === 2) {
            // alfa-leetcode-api.onrender.com format
            submissionCalendar = apiData.submissionCalendar || apiData.data?.submissionCalendar || {};
        } else if (apiIndex === 3) {
            // GraphQL API format
            submissionCalendar = apiData.data?.matchedUser?.submissionCalendar || {};
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
        
        console.log('Parsed submission calendar:', submissionCalendar);
        
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
        
        // Create more realistic patterns based on typical coding habits
        const weekdays = [0, 1, 2, 3, 4]; // Monday to Friday
        const currentMonth = new Date().getMonth();
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            let level = 0;
            let count = 0;
            
            const dayOfWeek = d.getDay();
            const month = d.getMonth();
            
            // Higher activity on weekdays
            const isWeekday = weekdays.includes(dayOfWeek);
            
            // Higher activity in current month (July)
            const isCurrentMonth = month === currentMonth;
            
            // Generate realistic activity patterns
            let activityChance = 0.2; // Base 20% chance
            if (isWeekday) activityChance += 0.3; // +30% on weekdays
            if (isCurrentMonth) activityChance += 0.4; // +40% in current month
            
            if (Math.random() < activityChance) {
                // Determine problem count (1-8 problems)
                count = Math.floor(Math.random() * 8) + 1;
                
                // Calculate level based on count
                if (count >= 6) level = 4;
                else if (count >= 4) level = 3;
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
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchLeetCodeData();
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
                    <span className="contribution-count">
                        {totalContributions} problems solved in 2025
                        {error && <span className="api-status"> (simulated data - API unavailable)</span>}
                    </span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>2025</span>
                    {!error && <span className="live-indicator">●</span>}
                    <a 
                        href="https://leetcode.com/sachinkumar6174" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="leetcode-profile-link"
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
                                            title={`${contribution.count} ${contribution.count === 1 ? 'problem' : 'problems'} solved on ${formatDate(contribution.date)}`}
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