import React from 'react';
import { useGameContext } from '../../models/GameContext';
import '../../styles/ScoreBoard.css';

const NewScoreBoard: React.FC = () => {
  const { game } = useGameContext();
  
  // Simple helper to format a roll value
  const formatRoll = (value: number | undefined): string => {
    if (value === undefined) return '';
    if (value === 10) return 'X';
    if (value === 0) return '-';
    return value.toString();
  };
  
  return (
    <div className="scoreboard-container">
      <h2 className="player-name">{game.playerName}</h2>
      <div className="frames-container">
        {game.frames.map((frame, frameIndex) => {
          // Check if each roll actually exists
          const hasFirstRoll = frame.rolls.length > 0;
          const hasSecondRoll = frame.rolls.length > 1;
          
          return (
            <div 
              key={frameIndex} 
              className={`frame ${frameIndex === game.currentFrame ? 'current-frame' : ''}`}
            >
              <div className="frame-header">Frame {frameIndex + 1}</div>
              <div className="rolls-container">
                {/* First roll */}
                <div className={`roll ${frame.isStrike ? 'strike' : ''} ${!hasFirstRoll ? 'empty-roll' : ''}`}>
                  {hasFirstRoll ? formatRoll(frame.rolls[0]) : ''}
                </div>
                
                {/* Second roll - explicitly empty when no second roll */}
                <div className={`roll ${frame.isSpare ? 'spare' : ''} ${!hasSecondRoll ? 'empty-roll' : ''}`}>
                  {hasSecondRoll ? (frame.isSpare ? '/' : formatRoll(frame.rolls[1])) : ''}
                </div>
                
                {/* Third roll for 10th frame */}
                {frameIndex === 9 && (frame.isStrike || frame.isSpare) && (
                  <div className={`roll ${frame.rolls.length > 2 ? '' : 'empty-roll'}`}>
                    {frame.rolls.length > 2 ? formatRoll(frame.rolls[2]) : ''}
                  </div>
                )}
              </div>
              
              {/* Only show score for completed frames */}
              <div className="frame-score">
                {frame.isComplete && frame.score}
              </div>
            </div>
          );
        })}
      </div>
      
      {game.gameComplete && (
        <div className="game-complete">
          <h3>Final Score: {game.frames[9].score}</h3>
        </div>
      )}
    </div>
  );
};

export default NewScoreBoard;