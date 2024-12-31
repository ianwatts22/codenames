import React from 'react';
import { Timer } from './Timer';

interface ScoreboardProps {
  currentTeam: 'red' | 'blue'
  redScore: number
  blueScore: number
  timerDuration: number
  isTimerRunning: boolean
  onToggleTimer: () => void
  onResetTimer: () => void
  onTimeUp: () => void
  onDurationChange: (duration: number) => void
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  currentTeam,
  redScore,
  blueScore,
  timerDuration,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onTimeUp,
  onDurationChange
}) => {
  return (
    <div className="bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-2 max-w-xl mx-auto">
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
        <div className="flex gap-6 text-3xl sm:text-4xl font-bold">
          <span className={`${currentTeam === 'red' ? 'text-red-600 dark:text-red-500' : 'text-red-400 dark:text-red-400'}`}>{redScore}</span>
          <span className={`${currentTeam === 'blue' ? 'text-blue-600 dark:text-blue-500' : 'text-blue-400 dark:text-blue-400'}`}>{blueScore}</span>
        </div>
        <Timer 
          duration={timerDuration}
          onTimeUp={onTimeUp}
          isRunning={isTimerRunning}
          onToggleTimer={onToggleTimer}
          onResetTimer={onResetTimer}
          onDurationChange={onDurationChange}
        />
      </div>
    </div>
  );
};

