import React, { useState } from "react";
import novelists from "./Novelist.json";
import defaultNovelistImage from "../../assets/images/Novelists/premchand.webp";
import "./Literature.css"; // Assuming you have a CSS file for styling

const Literature = () => {
    const [selectedNovelist, setSelectedNovelist] = useState(null);

    const handleNovelistClick = (novelist) => {
        setSelectedNovelist(novelist);
    };

    return (
        <div className="literature-container">
            {selectedNovelist ? (
                <div className="novelist-detail">
                    <div className="section-header">
                        <h2 className="section-title">{selectedNovelist.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={() => setSelectedNovelist(null)}>
                        ← Back to Writers
                    </button>
                    <div className="novelist-card">
                        <h3>{selectedNovelist.name}</h3>
                        <img src={selectedNovelist.image || defaultNovelistImage} alt={selectedNovelist.name} className="novelist-image" />
                        <p><strong>Years:</strong> {selectedNovelist.years}</p>
                        <p><strong>Country:</strong> {selectedNovelist.country}</p>
                        <p><strong>Genre:</strong> {selectedNovelist.genre}</p>
                        <p>{selectedNovelist.description}</p>

                        {selectedNovelist.notableWorks && selectedNovelist.notableWorks.length > 0 && (
                            <>
                                <h3 style={{ marginTop: '2rem', color: 'var(--primary-color)' }}>Notable Works:</h3>
                                <div className="novel-cards">
                                    {selectedNovelist.notableWorks.map((work, idx) => (
                                        <div className="novel-card" key={idx}>
                                            <h4>{work.title}</h4>
                                            {work.image && (
                                                <img src={work.image} alt={work.title} className="work-image" />
                                            )}
                                            <p>{work.description}</p>
                                            <p><strong>Publication Year:</strong> {work.publicationYear}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Literary Masters</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Discover the works of literary giants who shaped the world of storytelling
                            </p>
                        </div>
                    </div>
                    <div className="novelist-cards">
                        {novelists.novelists.map((novelist, index) => (
                            <div className="novelist-card" key={index} onClick={() => handleNovelistClick(novelist)}>
                                <h3>{novelist.name}</h3>
                                <img src={novelist.image || defaultNovelistImage} alt={novelist.name} className="novelist-image" />
                                <p><strong>Years:</strong> {novelist.years}</p>
                                <p><strong>Country:</strong> {novelist.country}</p>
                                <p><strong>Genre:</strong> {novelist.genre}</p>
                                <p>{novelist.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Literature;
