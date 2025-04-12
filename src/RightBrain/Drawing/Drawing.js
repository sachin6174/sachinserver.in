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
                    <h2 className="section-title">{selectedArtist.name}'s Paintings</h2>
                    <button className="back-button" onClick={() => setSelectedArtist(null)}>Back to Artists</button>
                    <div className="cards-container">
                        {selectedArtist.paintings.map((painting, index) => (
                            <div key={index} className="card hover-effect">
                                <h3>{painting.paintingName}</h3>
                                <img 
                                    src={painting.image} 
                                    alt={painting.paintingName}
                                    onError={handleImageError}
                                    onClick={() => handleImageClick(painting.image)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <p>{painting.description}</p>
                                <p><strong>Year:</strong> {painting.madeyear}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="section-title">Artists</h2>
                    <div className="cards-container">
                        {artists.map((artist, index) => (
                            <div key={index} className="card" onClick={() => handleArtistClick(artist)}>
                                <h3>{artist.name}</h3>
                                <p><strong>Years:</strong> {artist.years}</p>
                                <p><strong>Country:</strong> {artist.country}</p>
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
