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
                        background: transparent;
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
            setError('The tutorial portal is currently undergoing maintenance. Please try again shortly.');
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
            <div className="drawing-container reveal">
                <div className="section-header">
                    <h2 className="section-title">Drawing Lab</h2>
                    <div className="section-subtitle">Something went wrong while initializing the lab.</div>
                </div>
                <button className="back-button" onClick={onBack}>
                    ← Back to Exploration Center
                </button>
                <div className="card" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
                    <span className="card-icon">🏗️</span>
                    <h3>Initialization Interrupted</h3>
                    <p>{error}</p>
                    <button
                        className="wikipedia-button"
                        style={{ margin: '1rem auto' }}
                        onClick={() => window.location.reload()}
                    >
                        🔄 Re-Initialize Lab
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="drawing-container reveal">
            <div className="tutorials-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1.5rem 2rem',
                backgroundColor: 'color-mix(in srgb, var(--surface) 60%, transparent)',
                backdropFilter: 'blur(20px)',
                borderRadius: '2rem',
                border: '1px solid color-mix(in srgb, var(--border-color) 40%, transparent)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
                <div>
                    <h2 style={{
                        margin: 0,
                        color: 'var(--text-primary)',
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em'
                    }}>
                        Tutorial Lab
                    </h2>
                    <p style={{
                        margin: '0.25rem 0 0 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem'
                    }}>
                        294+ curated мастер-классы for creative minds
                    </p>
                </div>
                <button
                    className="back-button"
                    onClick={onBack}
                    style={{ margin: 0 }}
                >
                    ← Exit Lab
                </button>
            </div>

            {isLoading && (
                <div className="loading-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '400px',
                    color: 'var(--text-secondary)',
                    animation: 'fadeIn 0.6s ease-out'
                }}>
                    <div className="loading-spinner" style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid var(--border-color)',
                        borderTop: '4px solid var(--rb-primary)',
                        borderRadius: '50%',
                        animation: 'rightBrainSpin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                        marginBottom: '1.5rem'
                    }}></div>
                    <p style={{ fontWeight: '500', letterSpacing: '0.05em' }}>PREPARING WORKSPACE...</p>
                </div>
            )}

            <div className={`iframe-container ${isLoading ? 'hidden' : 'reveal'}`} style={{
                position: 'relative',
                width: '100%',
                height: isLoading ? '0' : '100vh',
                border: '1px solid color-mix(in srgb, var(--border-color) 40%, transparent)',
                borderRadius: '2rem',
                overflow: 'hidden',
                backgroundColor: '#f8fafc',
                boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
            }}>
                <iframe
                    ref={iframeRef}
                    src={`${process.env.PUBLIC_URL || ''}/drawing-tutorials/index.html`}
                    title="Drawing Tutorials Hub"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{
                        border: 'none',
                        display: isLoading ? 'none' : 'block'
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                />
            </div>

            {/* Tutorial Info Panel */}
            <div className="tutorial-info reveal" style={{
                marginTop: '2rem',
                padding: '2rem',
                backgroundColor: 'color-mix(in srgb, var(--surface) 60%, transparent)',
                backdropFilter: 'blur(10px)',
                borderRadius: '2rem',
                border: '1px solid color-mix(in srgb, var(--border-color) 40%, transparent)',
                animationDelay: '0.4s'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    <div className="info-item" style={{ background: 'transparent', border: 'none' }}>
                        <span className="info-label" style={{ fontSize: '0.9rem' }}>Curated Lessons</span>
                        <strong style={{ color: 'var(--rb-primary)', fontSize: '2.5rem', display: 'block' }}>294</strong>
                    </div>
                    <div className="info-item" style={{ background: 'transparent', border: 'none' }}>
                        <span className="info-label" style={{ fontSize: '0.9rem' }}>Artistic Disciplines</span>
                        <strong style={{ color: 'var(--rb-secondary)', fontSize: '2.5rem', display: 'block' }}>12</strong>
                    </div>
                    <div className="info-item" style={{ background: 'transparent', border: 'none' }}>
                        <span className="info-label" style={{ fontSize: '0.9rem' }}>Expert Knowledge</span>
                        <strong style={{ color: 'var(--rb-accent)', fontSize: '2.5rem', display: 'block' }}>∞</strong>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hidden { opacity: 0; pointer-events: none; }
                .reveal { animation: fadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
                
                @keyframes rightBrainSpin {
                    0% { transform: rotate(0deg); border-top-width: 4px; }
                    50% { transform: rotate(180deg); border-top-width: 1px; }
                    100% { transform: rotate(360deg); border-top-width: 4px; }
                }
                
                @media (max-width: 480px) {
                    .tutorials-header {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default DrawingTutorials;