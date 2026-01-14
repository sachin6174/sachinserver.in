import React from 'react';
import './Games.css';
import { gamesData } from './gamesData';

const Games = () => {
    const openGame = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="games-container">
            <h1 className="games-header">All games</h1>
            <div className="games-grid">
                {gamesData.map((game) => (
                    <div key={game.id} className="game-card" onClick={() => openGame(game.url)}>
                        <div className="game-image-container">
                            {/* Using a placeholder if image fails or for init */}
                            <img
                                src={game.image}
                                alt={game.title}
                                className="game-image"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=' + game.title }}
                            />
                        </div>
                        <div className="game-info">
                            <h3 className="game-title">{game.title}</h3>
                            <p className="game-category">{game.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Games;
