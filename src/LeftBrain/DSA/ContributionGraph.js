import React from 'react';
import './ContributionGraph.css';

const ContributionGraph = () => {
    // Generate sample data for 2025 LeetCode solving activity
    const generateContributionData = () => {
        const contributions = [];
        const startDate = new Date('2025-01-01');
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        
        for (let d = new Date(startDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
            const dayOfYear = Math.floor((d - startDate) / oneDay);
            // Create realistic LeetCode solving pattern with higher activity in July
            let level = 0;
            
            if (d.getMonth() === 6) { // July (0-indexed)
                level = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
            } else {
                level = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
            }
            
            contributions.push({
                date: new Date(d),
                level: level,
                count: level > 0 ? Math.floor(Math.random() * 5) + 1 : 0 // 1-5 problems per active day
            });
        }
        
        return contributions;
    };

    const contributions = generateContributionData();
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

    return (
        <div className="contribution-graph-container">
            <div className="contribution-header">
                <div className="contribution-title">
                    <span className="contribution-icon">🔥</span>
                    <span className="contribution-count">{totalContributions} problems solved in 2025</span>
                </div>
                <div className="contribution-year">
                    <span className="info-icon">ⓘ</span>
                    <span>2025</span>
                </div>
            </div>
            
            <div className="contribution-graph">
                <div className="month-labels">
                    {months.map((month, index) => (
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