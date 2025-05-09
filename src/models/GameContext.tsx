import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BowlingGame, BowlingModel } from './BowlingModel';

interface GameContextType {
  game: BowlingGame;
  rollBall: (pins: number) => void;
  startNewGame: (playerName?: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game, setGame] = useState<BowlingGame>(BowlingModel.initializeGame());

  const rollBall = (pins: number) => {
    setGame(prevGame => BowlingModel.roll(prevGame, pins));
  };

  const startNewGame = (playerName?: string) => {
    setGame(BowlingModel.initializeGame(playerName));
  };

  return (
    <GameContext.Provider value={{ game, rollBall, startNewGame }}>
      {children}
    </GameContext.Provider>
  );
};