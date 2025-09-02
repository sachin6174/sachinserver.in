import React, { useState, useMemo, useCallback, memo } from 'react';
import '../shared-styles.css';
import './DSA.css';
import ContributionGraph from './ContributionGraph';
import { top150Data } from './data/top150.js';

const DSA = memo(() => {
    const [selectedTopic, setSelectedTopic] = useState('top150');

    // Memoize topic selection handler
    const handleTopicChange = useCallback((topicId) => {
        setSelectedTopic(topicId);
    }, []);

    // Memoize DSA topics to prevent recreation on every render
    const dsaTopics = useMemo(() => ({
        top150: top150Data
    }), []);


    // Memoize topics array - Now only showing Top 150
    const topics = useMemo(() => [
        { id: 'top150', name: 'Top 150 Interview Questions' }
    ], []);

    // Memoize current topic calculation
    const currentTopic = useMemo(() => dsaTopics[selectedTopic], [dsaTopics, selectedTopic]);

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
                                <span className="profile-name">sachinkumar6174</span>
                            </div>
                            <a 
                                href="https://leetcode.com/sachinkumar6174" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="leetcode-compact-link"
                            >
                                View Profile ↗
                            </a>
                        </div>
                        <div className="leetcode-compact-stats">
                            <img 
                                src="https://leetcard.jacoblin.cool/sachinkumar6174?theme=dark&font=Karma" 
                                alt="LeetCode Stats"
                                className="leetcode-compact-card"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="compact-fallback-stats" style={{display: 'none'}}>
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
                    
                    <h3>{currentTopic.title}</h3>
                    <p>{currentTopic.description}</p>
                    
                    {currentTopic.questions && (
                        <div className="info-section">
                            <h4>🎯 Practice Problems</h4>
                            <div className="questions-grid">
                                {currentTopic.questions.map((question, index) => {
                                    if (question.startsWith('---')) {
                                        return <h3 key={index} className="separator">{question.replaceAll('---', '').trim()}</h3>;
                                    }
                                    
                                    // Parse question text, difficulty, and URL
                                    const parts = question.split(' - https://');
                                    const titleAndDifficulty = parts[0];
                                    const leetcodeUrl = parts[1] ? `https://${parts[1]}` : null;
                                    
                                    // Only render LeetCode problems, skip concept questions
                                    if (!leetcodeUrl) return null;
                                    
                                    // Extract difficulty from title
                                    const difficultyMatch = titleAndDifficulty.match(/\[(Easy|Medium|Hard)\]$/);
                                    const difficulty = difficultyMatch ? difficultyMatch[1] : 'Medium';
                                    const questionTitle = titleAndDifficulty.replace(/\s*\[(Easy|Medium|Hard)\]$/, '');
                                    
                                    return (
                                        <div key={index} className="question-card">
                                            <div className="question-card-header">
                                                <span className="question-number">#{index + 1}</span>
                                                <span className={`question-difficulty difficulty-${difficulty.toLowerCase()}`}>
                                                    {difficulty}
                                                </span>
                                            </div>
                                            <h3 className="question-title">{questionTitle}</h3>
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
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    
                    {currentTopic.explanation && (
                        <div className="info-section">
                            <h4>📚 Fundamentals & Syntax</h4>
                            <div className="explanation-content">
                                <div dangerouslySetInnerHTML={{ 
                                    __html: currentTopic.explanation
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
