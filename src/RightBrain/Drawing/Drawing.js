import React, { useState, useEffect, useMemo } from "react";
import famousArtsData from "./FamousArts.json";
import famousArtistsData from "./FamousArtists.json";
import artFormsData from "./ArtForms.json";
import myPortraitsData from "./MyPortraits.json";
import DrawingTutorials from "./DrawingTutorials";
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
        // Load data instantly but with a fast fadeIn for premium feel
        setData({
            famousArts: famousArtsData.famous_arts,
            famousArtists: famousArtistsData.famous_artists,
            artForms: artFormsData.art_forms,
            myPortraits: myPortraitsData.my_portraits
        });

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300); // 300ms for a quick "reveal" rather than an 800ms artificial delay

        return () => clearTimeout(timer);
    }, []);

    const handleSectionClick = (section) => {
        setCurrentSection(section);
        setSelectedItem(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return (
            <div className="drawing-container">
                <div className="loading-skeleton">
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                </div>
            </div>
        );
    }

    // Main sections view
    const renderMainSections = () => (
        <div className="reveal">
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">Creative Brain</h1>
                    <div className="section-subtitle">
                        An artistic exploration of masterpieces, legendary creators, and the diverse forms of human expression.
                    </div>
                </div>
            </div>

            <div className="cards-container">
                <div className="card" onClick={() => handleSectionClick('famous-arts')}>
                    <div>
                        <span className="card-icon">🎨</span>
                        <h3>Famous Arts</h3>
                        <p>Iconic masterpieces that defined eras. Explore detailed histories, contexts, and visual studies of the world's most renowned works.</p>
                        <p><strong>Masterpieces:</strong> Starry Night, Mona Lisa, Guernica...</p>
                    </div>
                </div>

                <div className="card" onClick={() => handleSectionClick('famous-artists')}>
                    <div>
                        <span className="card-icon">👨‍🎨</span>
                        <h3>Famous Artists</h3>
                        <p>Meet the visionaries behind the canvas. Learn about the lives, movements, and revolutionary techniques of legendary artists.</p>
                        <p><strong>Icons:</strong> Da Vinci, Picasso, Van Gogh...</p>
                    </div>
                </div>

                <div className="card" onClick={() => handleSectionClick('art-forms')}>
                    <div>
                        <span className="card-icon">🖼️</span>
                        <h3>Art Forms</h3>
                        <p>Discover the vast spectrum of artistic expression. From classical sculpture and painting to cutting-edge digital creations.</p>
                        <p><strong>Forms:</strong> Digital Art, Cubism, Impressionism...</p>
                    </div>
                </div>

                <div className="card" onClick={() => handleSectionClick('drawing-tutorials')}>
                    <div>
                        <span className="card-icon">📽️</span>
                        <h3>Drawing Lab</h3>
                        <p>Master the art of drawing with 294+ curated professional tutorials. Step-by-step guidance for every skill level.</p>
                        <p><strong>Resources:</strong> Video tutorials, Progress tracking...</p>
                    </div>
                </div>

                <div className="card" onClick={() => handleSectionClick('my-portraits')}>
                    <div>
                        <span className="card-icon">🎭</span>
                        <h3>Gallery Vault</h3>
                        <p>A personal collection of original sketches and portraits. Explore the journey of lines and shadows through personal studies.</p>
                        <p><strong>Status:</strong> Collection updating soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // List view for sub-sections
    const renderListView = (items, title, subtitle, type) => (
        <div className="reveal">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <div className="section-subtitle">{subtitle}</div>
            </div>

            <button className="back-button" onClick={handleBackToMain}>
                ← Back to Explorations
            </button>

            <div className="cards-container">
                {items.map((item, idx) => (
                    <div key={item.id} className="card reveal" style={{ animationDelay: `${idx * 0.05}s` }} onClick={() => handleItemClick(item)}>
                        <div className="card-image-wrapper" style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', height: '220px' }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={handleImageError}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageClick(item.image);
                                }}
                            />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.description.substring(0, 100)}...</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--rb-primary)' }}>
                                {type === 'art' ? item.artist : type === 'artist' ? item.country : 'Technique Hub'}
                            </span>
                            <button className="wikipedia-button">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Detailed view for selected items
    const renderDetailedView = () => {
        if (!selectedItem) return null;

        const isArt = currentSection === 'famous-arts';
        const isArtist = currentSection === 'famous-artists';
        const isForm = currentSection === 'art-forms';

        return (
            <div className="detailed-view">
                <button className="back-button" onClick={handleBackToSection}>
                    ← Back to List
                </button>

                <div className="detailed-card">
                    <div className="detailed-image-container">
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="detailed-image"
                            onClick={() => handleImageClick(selectedItem.image)}
                        />
                    </div>

                    <div className="detailed-info">
                        <h3>{selectedItem.name}</h3>

                        <div className="info-grid">
                            {isArt && (
                                <>
                                    <div className="info-item"><span className="info-label">Artist</span><span className="info-value">{selectedItem.artist}</span></div>
                                    <div className="info-item"><span className="info-label">Year</span><span className="info-value">{selectedItem.year}</span></div>
                                    <div className="info-item"><span className="info-label">Medium</span><span className="info-value">{selectedItem.medium}</span></div>
                                    <div className="info-item"><span className="info-label">Location</span><span className="info-value">{selectedItem.location}</span></div>
                                </>
                            )}
                            {isArtist && (
                                <>
                                    <div className="info-item"><span className="info-label">Period</span><span className="info-value">{selectedItem.years}</span></div>
                                    <div className="info-item"><span className="info-label">Country</span><span className="info-value">{selectedItem.country}</span></div>
                                    <div className="info-item"><span className="info-label">Movement</span><span className="info-value">{selectedItem.movement}</span></div>
                                </>
                            )}
                            {isForm && (
                                <>
                                    <div className="info-item"><span className="info-label">Famous For</span><span className="info-value">{selectedItem.famous_examples[0]}</span></div>
                                    <div className="info-item"><span className="info-label">Techniques</span><span className="info-value">{selectedItem.techniques.length} Methods</span></div>
                                </>
                            )}
                        </div>

                        <p><strong>Context & Story:</strong> {selectedItem.description}</p>

                        {isArt && <p><strong>Significance:</strong> {selectedItem.significance}</p>}
                        {isArtist && (
                            <>
                                <p><strong>Notable Works:</strong> {selectedItem.notable_works.join(", ")}</p>
                                <p><strong>Techniques:</strong> {selectedItem.techniques.join(", ")}</p>
                                <p><strong>Contribution:</strong> {selectedItem.contributions}</p>
                            </>
                        )}

                        {isForm && (
                            <div className="techniques-section">
                                <h4>Techniques Involved</h4>
                                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                    {selectedItem.techniques.map((t, i) => (
                                        <div key={i} style={{ padding: '1rem', background: 'var(--surface-2)', borderRadius: '1rem', borderLeft: '4px solid var(--rb-primary)' }}>
                                            <h5 style={{ color: 'var(--rb-primary)', marginBottom: '0.25rem' }}>{t.name}</h5>
                                            <p style={{ fontSize: '0.9rem', margin: 0 }}>{t.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className="wikipedia-button"
                            style={{ marginTop: '2rem' }}
                            onClick={() => openWikipedia(selectedItem.wikipedia)}
                        >
                            🔗 Full Repository on Wikipedia
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="drawing-container">
            {previewImage && (
                <div className="image-preview-overlay" onClick={closePreview}>
                    <img src={previewImage} alt="Preview" className="preview-image" />
                    <button className="close-preview" onClick={closePreview}>×</button>
                </div>
            )}

            {selectedItem ? (
                renderDetailedView()
            ) : currentSection === 'main' ? (
                renderMainSections()
            ) : currentSection === 'drawing-tutorials' ? (
                <DrawingTutorials onBack={handleBackToMain} />
            ) : currentSection === 'famous-arts' ? (
                renderListView(data.famousArts, 'Artistic Masterpieces', 'Iconic works that have defined human history and visual culture.', 'art')
            ) : currentSection === 'famous-artists' ? (
                renderListView(data.famousArtists, 'Legendary Masters', 'The visionaries whose imagination and skill transformed the world.', 'artist')
            ) : currentSection === 'art-forms' ? (
                renderListView(data.artForms, 'Expression Variations', 'Exploring the diverse mediums and methods of creative communication.', 'form')
            ) : currentSection === 'my-portraits' ? (
                <div className="reveal">
                    <div className="section-header">
                        <h2 className="section-title">Gallery Vault</h2>
                        <div className="section-subtitle">Original works and creative studies.</div>
                    </div>
                    <button className="back-button" onClick={handleBackToMain}>← Back</button>
                    <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                        <span className="card-icon">🏗️</span>
                        <h3>Collection Under Curation</h3>
                        <p>I am currently organizing my personal portrait collection. New digital and traditional works will be released soon.</p>
                        <p style={{ fontStyle: 'italic' }}>Check back for the next iteration.</p>
                    </div>
                </div>
            ) : (
                renderMainSections()
            )}
        </div>
    );
};

export default Drawing;
