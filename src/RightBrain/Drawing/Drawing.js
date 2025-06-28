import React, { useState, useEffect } from "react";
import artistsData from "./Artists.json";
import "./Drawing.css";

const Drawing = () => {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        // Mimic API call with artificial delay
        setTimeout(() => {
            setArtists(artistsData.artists);
            setIsLoading(false);
        }, 800);
    }, []);

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
    };

    const handleImageError = (e) => {
        e.target.src = "/fallback-image.png"; // Add a fallback image
    };

    const handleImageClick = (image) => {
        setPreviewImage(image);
    };

    const closePreview = () => {
        setPreviewImage(null);
    };

    if (isLoading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="drawing-container">
            {previewImage && (
                <div className="image-preview-overlay" onClick={closePreview}>
                    <div className="image-preview-container">
                        <img src={previewImage} alt="Preview" className="preview-image" />
                        <button className="close-preview" onClick={closePreview}>×</button>
                    </div>
                </div>
            )}

            {selectedArtist ? (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedArtist.name}'s Masterpieces</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={() => setSelectedArtist(null)}>
                        ← Back to Artists
                    </button>
                    <div className="cards-container">
                        {selectedArtist.paintings?.map((painting, index) => (
                            <div key={index} className="card hover-effect">
                                <h3>{painting.paintingName}</h3>
                                {painting.image && (
                                    <img
                                        src={painting.image}
                                        alt={painting.paintingName}
                                        onError={handleImageError}
                                        onClick={() => handleImageClick(painting.image)}
                                    />
                                )}
                                <p>{painting.description}</p>
                                <p><strong>Year:</strong> {painting.madeyear}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hero-section">
                        <div className="section-header">
                            <h1 className="section-title">Masters of Art</h1>
                            <div className="section-divider"></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                                Explore the works of legendary artists who shaped the world of visual arts
                            </p>
                        </div>
                    </div>
                    <div className="cards-container">
                        {artists.map((artist, index) => (
                            <div key={index} className="card hover-effect" onClick={() => handleArtistClick(artist)}>
                                <h3>{artist.name}</h3>
                                <p><strong>Period:</strong> {artist.years}</p>
                                <p><strong>Origin:</strong> {artist.country}</p>
                                <p>{artist.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drawing;
