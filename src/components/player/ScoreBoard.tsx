import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../models/GameContext';
import { BowlingPinIcon, BowlingBallIcon, StrikeBadge, SpareBadge } from '../../assets/BowlingIcons';
import '../../styles/ScoreBoard.css';

// Add a simple turkey SVG (replace with GIF or better SVG as needed)
const TurkeySVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="50" fill="#8B4513" />
    <ellipse cx="60" cy="80" rx="30" ry="18" fill="#FFD700" />
    <ellipse cx="60" cy="50" rx="22" ry="28" fill="#fff" />
    <ellipse cx="50" cy="50" rx="5" ry="8" fill="#000" />
    <ellipse cx="70" cy="50" rx="5" ry="8" fill="#000" />
    <ellipse cx="60" cy="70" rx="8" ry="5" fill="#FF6347" />
    <text x="60" y="110" fontSize="22" textAnchor="middle" fill="#FF6347" fontWeight="bold">😂</text>
  </svg>
);

const TurkeyAnimation: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000); // Animation lasts 3s
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <div className="turkey-overlay">
      <div className="turkey-frame-explode">
        <TurkeySVG />
        <div className="turkey-text">TURKEY!!!</div>
      </div>
    </div>
  );
};

const ScoreBoard: React.FC = () => {
  const { game } = useGameContext();
  const [turkeyShown, setTurkeyShown] = useState(false);
  const [showTurkey, setShowTurkey] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Calculate individual frame scores (not cumulative)
  const calculateFrameScores = () => {
    const frameScores: number[] = [];
    let previousTotal = 0;
    
    for (let i = 0; i < game.frames.length; i++) {
      const frame = game.frames[i];
      
      if (frame.isComplete && frame.displayScore) {
        // Get individual frame score by subtracting previous total
        const individualScore = frame.score - previousTotal;
        frameScores.push(individualScore);
        previousTotal = frame.score;
      } else {
        frameScores.push(0); // Placeholder for incomplete frames
      }
    }
    
    return frameScores;
  };
  
  const frameScores = calculateFrameScores();
  
  // Calculate total score (last completed frame's cumulative score)
  const totalScore = game.frames.filter(frame => frame.isComplete && frame.displayScore)
                    .reduce((latest, frame) => Math.max(latest, frame.score), 0);
  
  // Function to render roll display
  const renderRollDisplay = (frameIndex: number, rollIndex: number) => {
    const frame = game.frames[frameIndex];
    
    if (frame.rolls.length <= rollIndex) {
      return <div className="roll empty"></div>;
    }
    
    const value = frame.rolls[rollIndex];
    
    // First roll strike
    if (rollIndex === 0 && value === 10) {
      return <div className="roll strike"><StrikeBadge width={30} height={30} /></div>;
    }
    
    // Spare
    if (rollIndex === 1 && frame.isSpare) {
      return <div className="roll spare"><SpareBadge width={30} height={30} /></div>;
    }
    
    // Strike in roll 2 or 3 (10th frame)
    if (value === 10 && rollIndex > 0) {
      return <div className="roll strike"><StrikeBadge width={30} height={30} /></div>;
    }
    
    // Miss
    if (value === 0) {
      return <div className="roll miss">-</div>;
    }
    
    // Regular roll
    return <div className="roll">{value}</div>;
  };

  // Function to handle auto-scrolling
  const scrollToFrame10 = React.useCallback(() => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  // Detect when frame 10 needs third roll and trigger scroll
  useEffect(() => {
    const frame10 = game.frames[9];
    if (frame10 && frame10.rolls.length === 2 && (frame10.isStrike || frame10.isSpare)) {
      // Slight delay to allow for expansion animation to start
      setTimeout(scrollToFrame10, 50);
    }
  }, [game.frames, scrollToFrame10]);

  // Detect turkey in 10th frame
  useEffect(() => {
    const frame10 = game.frames[9];
    if (
      frame10 &&
      frame10.rolls.length === 3 &&
      frame10.rolls[0] === 10 &&
      frame10.rolls[1] === 10 &&
      frame10.rolls[2] === 10 &&
      !turkeyShown
    ) {
      setShowTurkey(true);
      setTurkeyShown(true);
    }
  }, [game.frames, turkeyShown]);

  const handleTurkeyDone = () => setShowTurkey(false);
  
  return (
    <div className="scoreboard-container" ref={containerRef}>
      {showTurkey && <TurkeyAnimation onDone={handleTurkeyDone} />}
      <div className="header-with-pins">
        <BowlingPinIcon className="header-pin left" />
        <h2 className="player-name">{game.playerName}</h2>
        <BowlingPinIcon className="header-pin right" />
      </div>
      
      <div className="frames-container">
        {game.frames.map((frame, frameIndex) => {
          const isFrame10 = frameIndex === 9;
          const needsThirdRoll = isFrame10 && (frame.isStrike || frame.isSpare);
          
          return (
            <div 
              key={frameIndex} 
              className={`frame ${frameIndex === game.currentFrame ? 'current-frame' : ''}
                         ${isFrame10 && needsThirdRoll ? 'expanded' : ''}`}
            >
              <div className="frame-header">Frame {frameIndex + 1}</div>
              <div className="rolls-container">
                {/* First roll */}
                {renderRollDisplay(frameIndex, 0)}
                
                {/* Second roll */}
                {renderRollDisplay(frameIndex, 1)}
                
                {/* Third roll for 10th frame */}
                {isFrame10 && needsThirdRoll && (
                  <div className={`roll ${frame.rolls.length > 2 ? '' : 'empty'} ${frame.rolls.length === 3 ? 'spawn' : ''}`}>
                    {frame.rolls.length > 2 ? 
                      (frame.rolls[2] === 10 ? <StrikeBadge width={30} height={30} /> : 
                       frame.rolls[2] === 0 ? '-' : frame.rolls[2]) : ''}
                  </div>
                )}
              </div>
              <div className="frame-score">
                {frame.displayScore && frame.isComplete && frameScores[frameIndex] > 0 && 
                  frameScores[frameIndex]}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Total Score Display with bowling ball icon */}
      <div className="total-score-display">
        <BowlingBallIcon className="total-score-ball" />
        <div className="total-score-label">Total Current Score:</div>
        <div className="total-score-value">{totalScore}</div>
      </div>
      
      {game.gameComplete && (
        <div className="game-complete">
          <div className="final-score-badge">
            <h3>Final Score: {game.frames[9].score}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;