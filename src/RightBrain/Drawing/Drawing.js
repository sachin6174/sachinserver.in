import React, { useState, useEffect } from "react";
import artistsData from "./Artists.json";
import "./Drawing.css"; // Import the CSS file

const Drawing = () => {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        // Mimic API call
        setArtists(artistsData.artists);
    }, []);

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
    };

    return (
        <div>
            {selectedArtist ? (
                <div>
                    <h2>{selectedArtist.name}'s Paintings</h2>
                    <button onClick={() => setSelectedArtist(null)}>Back to Artists</button>
                    <div className="cards-container">
                        {selectedArtist.paintings.map((painting, index) => (
                            <div key={index} className="card">
                                <h3>{painting.paintingName}</h3>
                                <img src={painting.image} alt={painting.paintingName} />
                                <p>{painting.description}</p>
                                <p><strong>Year:</strong> {painting.madeyear}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Artists</h2>
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
