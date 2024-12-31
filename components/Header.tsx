import React from 'react';

interface HeaderProps {
  isSpymasterView: boolean
  onToggleSpymasterView: () => void
  onNewGame: () => void
}

export const Header: React.FC<HeaderProps> = ({ 
  isSpymasterView, 
  onToggleSpymasterView,
  onNewGame
}) => {
  return (
    <div className="bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-1">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Codenames</h1>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onToggleSpymasterView}
              className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                isSpymasterView 
                  ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {isSpymasterView ? 'Spymaster View' : 'Player View'}
            </button>
            <button 
              onClick={onNewGame}
              className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-200 text-gray-700 transition-all duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

