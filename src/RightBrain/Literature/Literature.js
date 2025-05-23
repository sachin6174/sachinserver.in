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
            <h2 className="section-title">Novelists</h2>
            {selectedNovelist ? (
                <div className="novelist-detail">
                    <button onClick={() => setSelectedNovelist(null)}>Back to Writers</button>
                    <div className="novelist-card">
                        <h2>{selectedNovelist.name}</h2>
                        <img src={selectedNovelist.image} alt={selectedNovelist.name} className="novelist-image" />
                        <p><strong>Years:</strong> {selectedNovelist.years}</p>
                        <p><strong>Country:</strong> {selectedNovelist.country}</p>
                        <p><strong>Genre:</strong> {selectedNovelist.genre}</p>
                        <p>{selectedNovelist.description}</p>
                        <h3>Notable Works:</h3>
                        <div className="novel-cards">
                            {selectedNovelist.notableWorks.map((work, idx) => (
                                <div className="novel-card" key={idx}>
                                    <h4>{work.title}</h4>
                                    <img src={work.image} alt={work.title} className="work-image" />
                                    <p>{work.description}</p>
                                    <p><strong>Publication Year:</strong> {work.publicationYear}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="novelist-cards">
                    {novelists.novelists.map((novelist, index) => (
                        <div className="novelist-card" key={index} onClick={() => handleNovelistClick(novelist)}>
                            <h2>{novelist.name}</h2>
                            <img src={novelist.image || defaultNovelistImage} alt={novelist.name} className="novelist-image" />
                            <p><strong>Years:</strong> {novelist.years}</p>
                            <p><strong>Country:</strong> {novelist.country}</p>
                            <p><strong>Genre:</strong> {novelist.genre}</p>
                            <p>{novelist.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Literature;
