import React, { useState } from "react";
import famousLiterature from "./FamousLiterature.json";
import famousNovelists from "./FamousNovelists.json";
import booksIRead from "./BooksIRead.json";
import defaultNovelistImage from "../../assets/images/Novelists/premchand.webp";
import "./Literature.css";

// Enhanced Image component with loading states
const EnhancedImage = ({ src, alt, className, fallback, onError }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = (e) => {
        setHasError(true);
        if (onError) {
            onError(e);
        }
    };

    return (
        <div className={`image-container ${className}`} style={{ position: 'relative' }}>
            {!isLoaded && !hasError && (
                <div className="image-loading" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '8px'
                }}>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${isLoaded ? 'loaded' : ''}`}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            />
        </div>
    );
};

const Literature = () => {
    const [activeSection, setActiveSection] = useState('famous-literature');
    const [selectedLanguage, setSelectedLanguage] = useState('hindi');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedNovelist, setSelectedNovelist] = useState(null);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSelectedItem(null);
        setSelectedNovelist(null);
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleNovelistClick = (novelist) => {
        setSelectedNovelist(novelist);
    };

    const handleImageError = (e) => {
        // Try a fallback to a more reliable placeholder
        if (e.target.src.includes('placeholder')) {
            e.target.src = "https://via.placeholder.com/200x300/2c3e50/ecf0f1?text=📚";
        } else {
            e.target.src = "https://via.placeholder.com/200x300/34495e/ecf0f1?text=Book+Cover";
        }
    };

    const handleAuthorImageError = (e) => {
        // Try fallback to default image first, then placeholder
        if (e.target.src === defaultNovelistImage) {
            e.target.src = "https://via.placeholder.com/200x250/2c3e50/ecf0f1?text=👤";
        } else {
            e.target.src = defaultNovelistImage;
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`star ${index < rating ? '' : 'empty'}`}>
                ★
            </span>
        ));
    };

    const renderFamousLiterature = () => {
        if (selectedItem) {
            return (
                <div className="detail-container">
                    <div className="detail-header">
                        <h2 className="section-title">{selectedItem.title}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={() => setSelectedItem(null)}>
                        ← Back to Literature
                    </button>
                    <div className="detail-content">
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <EnhancedImage
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                className="literature-image"
                                onError={handleImageError}
                            />
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3>{selectedItem.title}</h3>
                                <p><strong>Author:</strong> {selectedItem.author}</p>
                                <p><strong>Year:</strong> {selectedItem.year}</p>
                                <p><strong>Genre:</strong> {selectedItem.genre}</p>
                                <p><strong>Language:</strong> {selectedItem.language}</p>
                                <p><strong>Significance:</strong> {selectedItem.significance}</p>
                                <p>{selectedItem.description}</p>
                                {selectedItem.wikipedia && (
                                    <a href={selectedItem.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link">
                                        Read more on Wikipedia
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="section-header">
                    <h2 className="section-title">Famous Novels & Stories</h2>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Explore masterpieces of literature across different languages
                    </p>
                </div>

                <div className="language-tabs">
                    {Object.keys(famousLiterature.famousLiterature).map((language) => (
                        <button
                            key={language}
                            className={`language-tab ${selectedLanguage === language ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(language)}
                        >
                            {language.charAt(0).toUpperCase() + language.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="literature-grid">
                    {famousLiterature.famousLiterature[selectedLanguage]?.map((item) => (
                        <div key={item.id} className="literature-card" onClick={() => handleItemClick(item)}>
                            <EnhancedImage
                                src={item.image}
                                alt={item.title}
                                className="literature-image"
                                onError={handleImageError}
                            />
                            <h3>{item.title}</h3>
                            <p><strong>Author:</strong> {item.author}</p>
                            <p><strong>Year:</strong> {item.year}</p>
                            <p><strong>Genre:</strong> {item.genre}</p>
                            <p>{item.description.substring(0, 150)}...</p>
                            {item.wikipedia && (
                                <a href={item.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link" onClick={(e) => e.stopPropagation()}>
                                    Wikipedia
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderFamousNovelists = () => {
        if (selectedNovelist) {
            return (
                <div className="detail-container">
                    <div className="detail-header">
                        <h2 className="section-title">{selectedNovelist.name}</h2>
                        <div className="section-divider"></div>
                    </div>
                    <button className="back-button" onClick={() => setSelectedNovelist(null)}>
                        ← Back to Novelists
                    </button>
                    <div className="detail-content">
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            <EnhancedImage
                                src={selectedNovelist.image || defaultNovelistImage}
                                alt={selectedNovelist.name}
                                className="novelist-image-new"
                                onError={handleAuthorImageError}
                            />
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3>{selectedNovelist.name}</h3>
                                <p><strong>Years:</strong> {selectedNovelist.years}</p>
                                <p><strong>Country:</strong> {selectedNovelist.country}</p>
                                <p><strong>Languages:</strong> {selectedNovelist.languages?.join(', ')}</p>
                                <p><strong>Genre:</strong> {selectedNovelist.genre}</p>
                                <p><strong>Significance:</strong> {selectedNovelist.significance}</p>
                                <p>{selectedNovelist.description}</p>
                                {selectedNovelist.wikipedia && (
                                    <a href={selectedNovelist.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link">
                                        Read more on Wikipedia
                                    </a>
                                )}
                            </div>
                        </div>

                        {selectedNovelist.notableWorks && selectedNovelist.notableWorks.length > 0 && (
                            <>
                                <h3 style={{ marginTop: '2rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Notable Works:</h3>
                                <div className="literature-grid">
                                    {selectedNovelist.notableWorks.map((work, idx) => (
                                        <div className="literature-card" key={idx}>
                                            {work.image && (
                                                <EnhancedImage
                                                    src={work.image}
                                                    alt={work.title}
                                                    className="literature-image"
                                                    onError={handleImageError}
                                                />
                                            )}
                                            <h4>{work.title}</h4>
                                            <p>{work.description}</p>
                                            <p><strong>Publication Year:</strong> {work.publicationYear}</p>
                                            {work.wikipedia && (
                                                <a href={work.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link">
                                                    Wikipedia
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="section-header">
                    <h2 className="section-title">Famous Novelists</h2>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Discover the literary giants who shaped world literature
                    </p>
                </div>

                <div className="novelists-grid">
                    {famousNovelists.famousNovelists.map((novelist) => (
                        <div key={novelist.id} className="novelist-card-new" onClick={() => handleNovelistClick(novelist)}>
                            <EnhancedImage
                                src={novelist.image || defaultNovelistImage}
                                alt={novelist.name}
                                className="novelist-image-new"
                                onError={handleAuthorImageError}
                            />
                            <h3>{novelist.name}</h3>
                            <p><strong>Years:</strong> {novelist.years}</p>
                            <p><strong>Country:</strong> {novelist.country}</p>
                            <p><strong>Languages:</strong> {novelist.languages?.join(', ')}</p>
                            <p><strong>Genre:</strong> {novelist.genre}</p>
                            <p>{novelist.description.substring(0, 200)}...</p>
                            {novelist.wikipedia && (
                                <a href={novelist.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link" onClick={(e) => e.stopPropagation()}>
                                    Wikipedia
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderBooksIRead = () => {
        if (booksIRead.booksIRead.length === 0 || (booksIRead.booksIRead.length === 1 && booksIRead.booksIRead[0].id === 'example-book')) {
            return (
                <div className="empty-state">
                    <h3>Books I Read</h3>
                    <p>This section will be populated with books you've read. You can add your own books to the BooksIRead.json file.</p>
                </div>
            );
        }

        return (
            <div>
                <div className="section-header">
                    <h2 className="section-title">Books I Read</h2>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        My personal reading journey and book reviews
                    </p>
                </div>

                <div className="books-grid">
                    {booksIRead.booksIRead.map((book) => (
                        <div key={book.id} className="book-card">
                            <EnhancedImage
                                src={book.image}
                                alt={book.title}
                                className="book-image"
                                onError={handleImageError}
                            />
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Language:</strong> {book.language}</p>
                            <div className="rating-stars">
                                {renderStars(book.rating)}
                            </div>
                            <p><strong>Date Read:</strong> {book.dateRead}</p>
                            <p>{book.myReview}</p>
                            {book.tags && (
                                <div className="tags">
                                    {book.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                            {book.wikipedia && (
                                <a href={book.wikipedia} target="_blank" rel="noopener noreferrer" className="wikipedia-link">
                                    Wikipedia
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="literature-container">
            <div className="hero-section">
                <div className="section-header">
                    <h1 className="section-title">Literary World</h1>
                    <div className="section-divider"></div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Explore the rich tapestry of world literature and storytelling
                    </p>
                </div>
            </div>

            <div className="literature-nav">
                <button
                    className={`nav-button ${activeSection === 'famous-literature' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('famous-literature')}
                >
                    Famous Literature
                </button>
                <button
                    className={`nav-button ${activeSection === 'famous-novelists' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('famous-novelists')}
                >
                    Famous Novelists
                </button>
                <button
                    className={`nav-button ${activeSection === 'books-i-read' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('books-i-read')}
                >
                    Books I Read
                </button>
            </div>

            {activeSection === 'famous-literature' && renderFamousLiterature()}
            {activeSection === 'famous-novelists' && renderFamousNovelists()}
            {activeSection === 'books-i-read' && renderBooksIRead()}
        </div>
    );
};

export default Literature;
