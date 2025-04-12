import React from 'react';
import "./PhilosophyCard.css";

const PhilosophyCard = ({ subject }) => {
    return (
        <div className="philosophy-card">
            <h3 className="card-title">{subject.name}</h3>
            {subject.question && (
                <p className="card-question">Key Question: {subject.question}</p>
            )}
            
            {subject.themes && (
                <div className="card-section">
                    <h4>Themes:</h4>
                    <ul>{subject.themes.map((theme, i) => <li key={i}>{theme}</li>)}</ul>
                </div>
            )}
            
            {subject.subfields && (
                <div className="card-section">
                    <h4>Subfields:</h4>
                    <ul>{subject.subfields.map((field, i) => <li key={i}>{field}</li>)}</ul>
                </div>
            )}
            
            {subject.examples && (
                <div className="card-section">
                    <h4>Examples:</h4>
                    <ul>{subject.examples.map((example, i) => <li key={i}>{example}</li>)}</ul>
                </div>
            )}

            {subject.topics && (
                <div className="card-section">
                    <h4>Topics:</h4>
                    <ul>
                        {subject.topics.map((topic, i) => (
                            <li key={i}>{topic.name}: {topic.focus}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PhilosophyCard;
