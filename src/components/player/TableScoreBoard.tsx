import React from 'react';
import { useGameContext } from '../../models/GameContext';
import '../../styles/TableScoreBoard.css';

const TableScoreBoard: React.FC = () => {
  const { game } = useGameContext();
  
  // Simple debug function to show exactly what's in each frame
  const debugRolls = (frameIndex: number) => {
    const frame = game.frames[frameIndex];
    console.log(`Frame ${frameIndex + 1} rolls:`, frame.rolls);
    return null;
  };
  
  return (
    <div className="table-scoreboard">
      <h2>{game.playerName}</h2>
      <table>
        <thead>
          <tr>
            {Array.from({ length: 10 }, (_, i) => (
              <th key={i} className={game.currentFrame === i ? 'current-frame' : ''}>
                Frame {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Roll cells */}
          <tr>
            {Array.from({ length: 10 }, (_, frameIndex) => (
              <td key={frameIndex} className="rolls-cell">
                {debugRolls(frameIndex)}
                <table className="rolls-table">
                  <tbody>
                    <tr>
                      {/* First roll */}
                      <td className={game.frames[frameIndex].isStrike ? 'strike' : ''}>
                        {game.frames[frameIndex].rolls[0] === 10 ? 'X' : 
                         game.frames[frameIndex].rolls[0] === 0 && game.frames[frameIndex].rolls.length > 0 ? '-' : 
                         game.frames[frameIndex].rolls.length > 0 ? game.frames[frameIndex].rolls[0] : ''}
                      </td>
                      
                      {/* Second roll */}
                      <td className={game.frames[frameIndex].isSpare ? 'spare' : ''}>
                        {game.frames[frameIndex].isSpare ? '/' :
                         game.frames[frameIndex].rolls[1] === 10 ? 'X' :
                         game.frames[frameIndex].rolls[1] === 0 && game.frames[frameIndex].rolls.length > 1 ? '-' :
                         game.frames[frameIndex].rolls.length > 1 ? game.frames[frameIndex].rolls[1] : ''}
                      </td>
                      
                      {/* Third roll (only for 10th frame) */}
                      {frameIndex === 9 && (
                        <td>
                          {game.frames[frameIndex].rolls[2] === 10 ? 'X' :
                           game.frames[frameIndex].rolls[2] === 0 && game.frames[frameIndex].rolls.length > 2 ? '-' :
                           game.frames[frameIndex].rolls.length > 2 ? game.frames[frameIndex].rolls[2] : ''}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
          
          {/* Score cells */}
          <tr>
            {Array.from({ length: 10 }, (_, frameIndex) => (
              <td key={frameIndex} className="score-cell">
                {game.frames[frameIndex].isComplete ? game.frames[frameIndex].score : ''}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      
      {game.gameComplete && (
        <div className="final-score">
          Final Score: {game.frames[9].score}
        </div>
      )}
    </div>
  );
};

export default TableScoreBoard;