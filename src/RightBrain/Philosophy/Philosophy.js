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
                    <h2 className="section-title">{selectedSubject.name}</h2>
                    <button className="back-button" onClick={() => setSelectedSubject(null)}>
                        Back to Subjects
                    </button>
                    <div className="cards-container">
                        <PhilosophyCard subject={selectedSubject} />
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="section-title">Philosophy Subjects</h2>
                    <div className="cards-container">
                        {subjects.map((subject, index) => (
                            <div 
                                key={index} 
                                className="card hover-effect"
                                onClick={() => handleSubjectClick(subject)}
                            >
                                <h3>{subject.name}</h3>
                                {subject.question && <p>{subject.question}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Philosophy;
