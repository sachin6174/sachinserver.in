import React, { useState, useEffect } from "react";
import famousArtsData from "./FamousArts.json";
import famousArtistsData from "./FamousArtists.json";
import artFormsData from "./ArtForms.json";
import myPortraitsData from "./MyPortraits.json";
import "./Drawing.css";

const Drawing = () => {
    const [currentSection, setCurrentSection] = useState('main');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        famousArts: [],
        famousArtists: [],
        artForms: [],
        myPortraits: []
    });

    useEffect(() => {
        // Load all data with artificial delay
        setTimeout(() => {
            setData({
                famousArts: famousArtsData.famous_arts,
                famousArtists: famousArtistsData.famous_artists,
                artForms: artFormsData.art_forms,
                myPortraits: myPortraitsData.my_portraits
            });
            setIsLoading(false);
        }, 800);
    }, []);

    const handleSectionClick = (section) => {
        setCurrentSection(section);
        setSelectedItem(null);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleBackToSection = () => {
        setSelectedItem(null);
    };

    const handleBackToMain = () => {
        setCurrentSection('main');
        setSelectedItem(null);
    };

    const handleImageError = (e) => {
        e.target.src = "/fallback-image.png";
    };

    const handleImageClick = (image) => {
        setPreviewImage(image);
    };

    const closePreview = () => {
        setPreviewImage(null);
    };

    const openWikipedia = (url) => {
        window.open(url, '_blank');
    };

    if (isLoading) {
        return <div className="loading-spinner"></div>;
    }

    // Main sections view
    const renderMainSections = () => (
        <div>
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">Art Gallery & Collection</h1>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Explore the world of art through different perspectives and forms
                    </p>
                </div>
            </div>
            <div className="cards-container">
                <div className="card hover-effect" onClick={() => handleSectionClick('famous-arts')}>
                    <h3>🎨 Famous Arts</h3>
                    <p>Discover iconic masterpieces that have shaped art history. Each artwork comes with detailed descriptions, historical context, and links to learn more.</p>
                    <p><strong>Includes:</strong> Mona Lisa, Starry Night, Guernica, and more...</p>
                </div>
                <div className="card hover-effect" onClick={() => handleSectionClick('famous-artists')}>
                    <h3>👨‍🎨 Famous Artists</h3>
                    <p>Meet the legendary artists who created timeless works. Learn about their lives, techniques, and contributions to art history.</p>
                    <p><strong>Features:</strong> Leonardo da Vinci, Van Gogh, Picasso, and more...</p>
                </div>
                <div className="card hover-effect" onClick={() => handleSectionClick('art-forms')}>
                    <h3>🖼️ Different Art Forms</h3>
                    <p>Explore various artistic mediums and techniques. From traditional painting to modern digital art, discover the diversity of artistic expression.</p>
                    <p><strong>Covers:</strong> Painting, Sculpture, Drawing, Digital Art, and more...</p>
                </div>
                <div className="card hover-effect" onClick={() => handleSectionClick('my-portraits')}>
                    <h3>🎭 My Portraits</h3>
                    <p>Personal portrait collection and artwork. This section will showcase original portrait work and artistic experiments.</p>
                    <p><strong>Status:</strong> Coming soon - More content will be added...</p>
                </div>
            </div>
        </div>
    );

    // Famous Arts section
    const renderFamousArts = () => (
        <div>
            <div className="section-header">
                <h2 className="section-title">Famous Arts</h2>
                <div className="section-divider"></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                    Iconic masterpieces that have defined art history
                </p>
            </div>
            <button className="back-button" onClick={handleBackToMain}>
                ← Back to Sections
            </button>
            <div className="cards-container">
                {data.famousArts.map((art) => (
                    <div key={art.id} className="card hover-effect" onClick={() => handleItemClick(art)}>
                        <h3>{art.name}</h3>
                        {art.image && (
                            <img
                                src={art.image}
                                alt={art.name}
                                onError={handleImageError}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageClick(art.image);
                                }}
                            />
                        )}
                        <p><strong>Artist:</strong> {art.artist}</p>
                        <p><strong>Year:</strong> {art.year}</p>
                        <p>{art.description.substring(0, 150)}...</p>
                        <button
                            className="wikipedia-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openWikipedia(art.wikipedia);
                            }}
                        >
                            📖 Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    // Famous Artists section
    const renderFamousArtists = () => (
        <div>
            <div className="section-header">
                <h2 className="section-title">Famous Artists</h2>
                <div className="section-divider"></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                    Legendary artists who shaped the world of visual arts
                </p>
            </div>
            <button className="back-button" onClick={handleBackToMain}>
                ← Back to Sections
            </button>
            <div className="cards-container">
                {data.famousArtists.map((artist) => (
                    <div key={artist.id} className="card hover-effect" onClick={() => handleItemClick(artist)}>
                        <h3>{artist.name}</h3>
                        {artist.image && (
                            <img
                                src={artist.image}
                                alt={artist.name}
                                onError={handleImageError}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageClick(artist.image);
                                }}
                            />
                        )}
                        <p><strong>Period:</strong> {artist.years}</p>
                        <p><strong>Origin:</strong> {artist.country}</p>
                        <p><strong>Movement:</strong> {artist.movement}</p>
                        <p>{artist.description.substring(0, 150)}...</p>
                        <button
                            className="wikipedia-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openWikipedia(artist.wikipedia);
                            }}
                        >
                            📖 Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    // Art Forms section
    const renderArtForms = () => (
        <div>
            <div className="section-header">
                <h2 className="section-title">Different Art Forms</h2>
                <div className="section-divider"></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                    Explore various artistic mediums and techniques
                </p>
            </div>
            <button className="back-button" onClick={handleBackToMain}>
                ← Back to Sections
            </button>
            <div className="cards-container">
                {data.artForms.map((form) => (
                    <div key={form.id} className="card hover-effect" onClick={() => handleItemClick(form)}>
                        <h3>{form.name}</h3>
                        {form.image && (
                            <img
                                src={form.image}
                                alt={form.name}
                                onError={handleImageError}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageClick(form.image);
                                }}
                            />
                        )}
                        <p>{form.description.substring(0, 200)}...</p>
                        <p><strong>Techniques:</strong> {form.techniques.length} different methods</p>
                        <button
                            className="wikipedia-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openWikipedia(form.wikipedia);
                            }}
                        >
                            📖 Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    // My Portraits section
    const renderMyPortraits = () => (
        <div>
            <div className="section-header">
                <h2 className="section-title">My Portraits</h2>
                <div className="section-divider"></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                    Personal portrait collection - Coming Soon
                </p>
            </div>
            <button className="back-button" onClick={handleBackToMain}>
                ← Back to Sections
            </button>
            <div className="cards-container">
                <div className="card">
                    <h3>🎨 Portrait Collection</h3>
                    <p>This section will showcase personal portrait artwork and creative experiments.</p>
                    <p><strong>Coming Soon:</strong> Original portraits, sketches, and artistic studies will be added here.</p>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>
                        Check back later for updates!
                    </p>
                </div>
            </div>
        </div>
    );

    // Detailed view for selected items
    const renderDetailedView = () => {
        if (currentSection === 'famous-arts') {
            return (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedItem.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={handleBackToSection}>
                        ← Back to Famous Arts
                    </button>
                    <div className="detailed-view">
                        <div className="detailed-card">
                            {selectedItem.image && (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    onClick={() => handleImageClick(selectedItem.image)}
                                    className="detailed-image"
                                />
                            )}
                            <div className="detailed-info">
                                <h3>{selectedItem.name}</h3>
                                <p><strong>Artist:</strong> {selectedItem.artist}</p>
                                <p><strong>Year:</strong> {selectedItem.year}</p>
                                <p><strong>Medium:</strong> {selectedItem.medium}</p>
                                <p><strong>Dimensions:</strong> {selectedItem.dimensions}</p>
                                <p><strong>Location:</strong> {selectedItem.location}</p>
                                <p><strong>Description:</strong> {selectedItem.description}</p>
                                <p><strong>Significance:</strong> {selectedItem.significance}</p>
                                <button
                                    className="wikipedia-button"
                                    onClick={() => openWikipedia(selectedItem.wikipedia)}
                                >
                                    📖 Read More on Wikipedia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (currentSection === 'famous-artists') {
            return (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedItem.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={handleBackToSection}>
                        ← Back to Famous Artists
                    </button>
                    <div className="detailed-view">
                        <div className="detailed-card">
                            {selectedItem.image && (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    onClick={() => handleImageClick(selectedItem.image)}
                                    className="detailed-image"
                                />
                            )}
                            <div className="detailed-info">
                                <h3>{selectedItem.name}</h3>
                                <p><strong>Period:</strong> {selectedItem.years}</p>
                                <p><strong>Country:</strong> {selectedItem.country}</p>
                                <p><strong>Movement:</strong> {selectedItem.movement}</p>
                                <p><strong>Description:</strong> {selectedItem.description}</p>
                                <p><strong>Notable Works:</strong> {selectedItem.notable_works.join(", ")}</p>
                                <p><strong>Techniques:</strong> {selectedItem.techniques.join(", ")}</p>
                                <p><strong>Contributions:</strong> {selectedItem.contributions}</p>
                                <button
                                    className="wikipedia-button"
                                    onClick={() => openWikipedia(selectedItem.wikipedia)}
                                >
                                    📖 Read More on Wikipedia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (currentSection === 'art-forms') {
            return (
                <div>
                    <div className="section-header">
                        <h2 className="section-title">{selectedItem.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={handleBackToSection}>
                        ← Back to Art Forms
                    </button>
                    <div className="detailed-view">
                        <div className="detailed-card">
                            {selectedItem.image && (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    onClick={() => handleImageClick(selectedItem.image)}
                                    className="detailed-image"
                                />
                            )}
                            <div className="detailed-info">
                                <h3>{selectedItem.name}</h3>
                                <p><strong>Description:</strong> {selectedItem.description}</p>
                                <p><strong>Famous Examples:</strong> {selectedItem.famous_examples.join(", ")}</p>

                                <h4>Techniques:</h4>
                                {selectedItem.techniques.map((technique, index) => (
                                    <div key={index} className="technique-card">
                                        <h5>{technique.name}</h5>
                                        <p>{technique.description}</p>
                                        <p><em>Example: {technique.example}</em></p>
                                    </div>
                                ))}

                                <button
                                    className="wikipedia-button"
                                    onClick={() => openWikipedia(selectedItem.wikipedia)}
                                >
                                    📖 Read More on Wikipedia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

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

            {selectedItem ? (
                renderDetailedView()
            ) : currentSection === 'main' ? (
                renderMainSections()
            ) : currentSection === 'famous-arts' ? (
                renderFamousArts()
            ) : currentSection === 'famous-artists' ? (
                renderFamousArtists()
            ) : currentSection === 'art-forms' ? (
                renderArtForms()
            ) : currentSection === 'my-portraits' ? (
                renderMyPortraits()
            ) : (
                renderMainSections()
            )}
        </div>
    );
};

export default Drawing;
