import React, { useState, useEffect } from "react";
import PhilosophyCard from "./PhilosophyCard";
import philosophyData from "./Philosophy.json";
import "./Philosophy.css";

const Philosophy = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSubjects(philosophyData.PhilosophySubjects);
            setIsLoading(false);
        }, 800);
    }, []);

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
    };

    if (isLoading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="philosophy-container">
            {selectedSubject ? (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedSubject.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={() => setSelectedSubject(null)}>
                        ← Back to Subjects
                    </button>
                    <div className="cards-container">
                        <PhilosophyCard subject={selectedSubject} />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Philosophy Domains</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Explore the fundamental questions that have shaped human thought and understanding
                            </p>
                        </div>
                    </div>
                    <div className="cards-container">
                        {subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="card hover-effect"
                                onClick={() => handleSubjectClick(subject)}
                            >
                                <h3>{subject.name}</h3>
                                {subject.question && (
                                    <div className="card-question">
                                        Key Question: {subject.question}
                                    </div>
                                )}
                                {subject.themes && (
                                    <p><strong>Core Themes:</strong> {subject.themes.slice(0, 3).join(', ')}{subject.themes.length > 3 ? '...' : ''}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Philosophy;
