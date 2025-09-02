import React, { useEffect, useRef, useState } from 'react';
import './Drawing.css';

const DrawingTutorials = ({ onBack }) => {
    const iframeRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            setIsLoading(false);
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // Inject additional styles to better integrate with the parent theme
                const style = iframeDoc.createElement('style');
                style.textContent = `
                    body {
                        margin: 0;
                        padding: 0;
                        overflow-x: hidden;
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        .nav__container {
                            padding: 0 1rem;
                        }
                        
                        .hero {
                            padding: 80px 0 2rem;
                        }
                        
                        .hero__title {
                            font-size: 2rem;
                        }
                    }
                `;
                iframeDoc.head.appendChild(style);
            } catch (e) {
                console.warn('Could not inject styles into iframe:', e);
            }
        };

        const handleError = () => {
            setIsLoading(false);
            setError('Failed to load drawing tutorials');
        };

        iframe.addEventListener('load', handleLoad);
        iframe.addEventListener('error', handleError);

        return () => {
            iframe.removeEventListener('load', handleLoad);
            iframe.removeEventListener('error', handleError);
        };
    }, []);

    if (error) {
        return (
            <div className="drawing-container">
                <div className="section-header">
                    <h2 className="section-title">Drawing Tutorials</h2>
                    <div className="section-divider"></div>
                </div>
                <button className="back-button" onClick={onBack}>
                    ← Back to Drawing Gallery
                </button>
                <div className="error-container" style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: 'var(--text-secondary)'
                }}>
                    <h3>⚠️ Unable to Load Tutorials</h3>
                    <p>{error}</p>
                    <button 
                        className="btn-primary"
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="drawing-container">
            <div className="tutorials-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
            }}>
                <div>
                    <h2 style={{ 
                        margin: 0, 
                        color: 'var(--text-primary)',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        🎨 Drawing Tutorials - ArtVault
                    </h2>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        Master drawing with 294+ expert YouTube tutorials
                    </p>
                </div>
                <button 
                    className="back-button"
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        color: 'var(--accent-color)',
                        border: '1px solid var(--accent-color)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--accent-color)';
                        e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--accent-color)';
                    }}
                >
                    ← Back to Gallery
                </button>
            </div>

            {isLoading && (
                <div className="loading-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '400px',
                    color: 'var(--text-secondary)'
                }}>
                    <div className="loading-spinner" style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid var(--border-color)',
                        borderTop: '4px solid var(--accent-color)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '1rem'
                    }}></div>
                    <p>Loading Drawing Tutorials...</p>
                </div>
            )}

            <div className="iframe-container" style={{
                position: 'relative',
                width: '100%',
                height: isLoading ? '0' : '100vh',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <iframe
                    ref={iframeRef}
                    src={`${process.env.PUBLIC_URL || ''}/drawing-tutorials/index.html`}
                    title="Drawing Tutorials - ArtVault"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{
                        border: 'none',
                        borderRadius: '8px',
                        display: isLoading ? 'none' : 'block'
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                />
            </div>

            {/* Tutorial Info Panel */}
            <div className="tutorial-info" style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--background-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <strong style={{ color: 'var(--accent-color)', fontSize: '1.5rem' }}>294+</strong>
                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Expert Tutorials
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--accent-color)', fontSize: '1.5rem' }}>12+</strong>
                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Categories
                        </p>
                    </div>
                    <div>
                        <strong style={{ color: 'var(--accent-color)', fontSize: '1.5rem' }}>∞</strong>
                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Creative Possibilities
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default DrawingTutorials;