import React, { useState } from 'react';
import { useGameContext } from '../../models/GameContext';
import { BowlingBallIcon, BowlingPinIcon } from '../../assets/BowlingIcons';
import '../../styles/AdminPanel.css';

const AdminPanel: React.FC = () => {
  const { game, startNewGame, rollBall } = useGameContext();
  const [playerName, setPlayerName] = useState(game.playerName);
  
  const handleRoll = (pins: number) => {
    rollBall(pins);
  };
  
  const handleReset = () => {
    startNewGame(playerName);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  // Determine which pins are available for the current roll
  const getAvailablePins = () => {
    // For the first roll of a frame, all 10 pins are available
    if (game.currentRoll === 0) return 10;
    
    // For the second roll, only remaining pins are available (except in 10th frame)
    const currentFrame = game.frames[game.currentFrame];
    if (game.currentFrame < 9 || (game.currentFrame === 9 && !currentFrame.isStrike && !currentFrame.isSpare)) {
      return 10 - currentFrame.rolls[0];
    }
    
    // Special case for 10th frame after a strike or spare
    return 10;
  };
  
  const availablePins = getAvailablePins();
  
  return (
    <div className="admin-panel" style={{ position: 'relative', overflow: 'visible' }}>
      <div className="panel-header">
        <BowlingPinIcon className="panel-icon" width={24} height={24} />
        <h3>Game Controls</h3>
      </div>
      
      <div className="player-section">
        <label htmlFor="playerName">Player Name:</label>
        <div className="player-input-container">
          <input 
            type="text" 
            id="playerName" 
            value={playerName} 
            onChange={handleNameChange} 
            className="player-input"
          />
        </div>
      </div>
      
      <div className="controls-section" style={{ position: 'relative' }}>
        <h4>
          <BowlingBallIcon className="control-icon" width={20} height={20} />
          Roll pins:
        </h4>
        <div className="pins-grid" style={{ minHeight: '70px' }}>
          {Array.from({ length: availablePins + 1 }, (_, i) => (
            <button 
              key={i} 
              onClick={() => handleRoll(i)} 
              disabled={game.gameComplete}
              className="pin-button"
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      
      <div className="footer-section">
        <button onClick={handleReset} className="reset-button">
          New Game
        </button>
        
        <div className="game-status">
          {game.gameComplete ? (
            <span className="complete-status">Game Complete!</span>
          ) : (
            <span className="current-status">
              Frame: {game.currentFrame + 1}, Roll: {game.currentRoll + 1}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;