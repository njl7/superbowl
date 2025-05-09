// Bowling score model that handles the game logic and score calculation
export interface Frame {
  rolls: number[];
  score: number;
  isSpare: boolean;
  isStrike: boolean;
  isComplete: boolean;
  displayScore: boolean; // Added to control when to show the score
}

export interface BowlingGame {
  frames: Frame[];
  currentFrame: number;
  currentRoll: number;
  gameComplete: boolean;
  playerName: string;
}

export class BowlingModel {
  // Initialize a new game with empty frames
  static initializeGame(playerName: string = 'Player 1'): BowlingGame {
    return {
      frames: Array(10).fill(null).map(() => ({
        rolls: [],
        score: 0,
        isSpare: false,
        isStrike: false,
        isComplete: false,
        displayScore: false
      })),
      currentFrame: 0,
      currentRoll: 0,
      gameComplete: false,
      playerName
    };
  }

  // Record a roll and update scores
  static roll(game: BowlingGame, pins: number): BowlingGame {
    if (game.gameComplete) {
      return game; // Game is already complete
    }

    // This is a deep clone to avoid affecting the original game state
    const newGame = JSON.parse(JSON.stringify(game));
    const frame = newGame.frames[newGame.currentFrame];
    const isLastFrame = newGame.currentFrame === 9;
    
    // FIXED: Directly set the roll at the correct index rather than pushing to avoid duplicates
    if (newGame.currentRoll === 0) {
      frame.rolls = [pins]; // First roll, create new array with just this roll
    } else {
      frame.rolls.push(pins); // Add to existing rolls
    }
    
    // Check if strike
    if (newGame.currentRoll === 0 && pins === 10) {
      frame.isStrike = true;
      
      if (!isLastFrame) {
        frame.isComplete = true;
        newGame.currentFrame++;
        newGame.currentRoll = 0;
      } else {
        newGame.currentRoll = 1; // Move to the second roll in the 10th frame
      }
    } 
    // Check if frame is complete with 2 rolls or handle 10th frame special rules
    else if (newGame.currentRoll === 1) {
      // Check if spare
      if (frame.rolls[0] + pins === 10) {
        frame.isSpare = true;
      }
      
      if (!isLastFrame) {
        // Regular frame ends after 2 rolls
        frame.isComplete = true;
        newGame.currentFrame++;
        newGame.currentRoll = 0;
      } else {
        // 10th frame special handling
        if (frame.isStrike || frame.isSpare) {
          newGame.currentRoll = 2; // Move to the third roll in the 10th frame
        } else {
          frame.isComplete = true;
          newGame.gameComplete = true;
        }
      }
    } 
    // 10th frame third roll
    else if (isLastFrame && newGame.currentRoll === 2) {
      frame.isComplete = true;
      newGame.gameComplete = true;
    }
    // First roll of any other frame
    else {
      newGame.currentRoll = 1; // Move to second roll
    }
    
    // Calculate scores
    return this.calculateScore(newGame);
  }
  
  // Calculate the score of the game based on the current rolls
  private static calculateScore(game: BowlingGame): BowlingGame {
    // This is a deep clone to avoid affecting the original game state
    const newGame = JSON.parse(JSON.stringify(game));
    let totalScore = 0;
    
    for (let i = 0; i < 10; i++) {
      const frame = newGame.frames[i];
      
      // Only calculate and display score when we have enough information
      if (this.canCalculateFrameScore(newGame, i)) {
        // Strike
        if (frame.isStrike) {
          // Get the next two rolls for strike bonus
          const bonus = this.getStrikeBonusRolls(newGame, i);
          totalScore += 10 + bonus.reduce((sum, pins) => sum + pins, 0);
        }
        // Spare
        else if (frame.isSpare) {
          // Get the next roll for spare bonus
          const bonus = this.getSpareBonusRoll(newGame, i);
          totalScore += 10 + bonus;
        } 
        // Open frame
        else {
          totalScore += frame.rolls.reduce((sum, pins) => sum + pins, 0);
        }
        
        frame.score = totalScore;
        frame.displayScore = true; // Only display score when calculation is complete
      } else {
        // For frames where we can't calculate the final score yet,
        // don't show potentially incorrect partial scores
        frame.displayScore = false;
      }
    }
    
    return newGame;
  }
  
  // Check if we can calculate the score for a frame
  private static canCalculateFrameScore(game: BowlingGame, frameIndex: number): boolean {
    const frame = game.frames[frameIndex];
    
    // Open frame - need both rolls
    if (!frame.isStrike && !frame.isSpare) {
      return frame.rolls.length === 2;
    }
    
    // Last frame - need all rolls
    if (frameIndex === 9) {
      if (frame.isStrike || frame.isSpare) {
        return frame.rolls.length === 3;
      }
      return frame.rolls.length === 2;
    }
    
    // Strike - need next two rolls
    if (frame.isStrike) {
      const strikeBonusRolls = this.getStrikeBonusRolls(game, frameIndex);
      return strikeBonusRolls.length === 2;
    }
    
    // Spare - need next roll
    if (frame.isSpare) {
      const spareBonusRoll = this.getSpareBonusRoll(game, frameIndex);
      return spareBonusRoll !== null;
    }
    
    return false;
  }
  
  // Get the next roll for spare bonus
  private static getSpareBonusRoll(game: BowlingGame, frameIndex: number): number | null {
    // Last frame - bonus roll is the third roll of the frame
    if (frameIndex === 9) {
      const frame = game.frames[9];
      return frame.rolls.length > 2 ? frame.rolls[2] : null;
    }
    
    // Regular frame - bonus roll is the first roll of the next frame
    if (frameIndex < 9 && game.frames[frameIndex + 1].rolls.length > 0) {
      return game.frames[frameIndex + 1].rolls[0];
    }
    
    return null; // No next roll available yet
  }
  
  // Get the next two rolls for strike bonus
  private static getStrikeBonusRolls(game: BowlingGame, frameIndex: number): number[] {
    const result: number[] = [];
    
    // Last frame - bonus rolls are the 2nd and 3rd rolls of the frame
    if (frameIndex === 9) {
      const frame = game.frames[9];
      if (frame.rolls.length > 1) result.push(frame.rolls[1]);
      if (frame.rolls.length > 2) result.push(frame.rolls[2]);
      return result;
    }
    
    // Regular frames
    const nextFrame = game.frames[frameIndex + 1];
    
    // If next frame is a strike, need the roll after that too
    if (nextFrame.rolls.length > 0) {
      result.push(nextFrame.rolls[0]);
      
      // Next frame is a strike (except in 9th frame)
      if (nextFrame.rolls[0] === 10 && frameIndex < 8) {
        const nextNextFrame = game.frames[frameIndex + 2];
        if (nextNextFrame.rolls.length > 0) {
          result.push(nextNextFrame.rolls[0]);
        }
      } 
      // Next frame is not a strike or it's the 9th frame
      else if (nextFrame.rolls.length > 1) {
        result.push(nextFrame.rolls[1]);
      }
    }
    
    return result;
  }
  
  // Format display string for a roll
  static formatRoll(pins: number | undefined, index: number, isStrike: boolean, isSpare: boolean): string {
    if (pins === undefined) return '';
    if (index === 0 && pins === 10) return 'X';  // Strike on first roll
    if (index === 1 && isSpare) return '/';      // Spare
    if (pins === 10) return 'X';                 // Strike on bonus roll
    if (pins === 0) return '-';                  // Miss
    return pins.toString();                      // Regular roll
  }
}