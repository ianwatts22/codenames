import React from 'react'

interface TimeUpPopupProps {
  isOpen: boolean
  onClose: () => void
  currentTeam: 'red' | 'blue'
}

export const TimeUpPopup: React.FC<TimeUpPopupProps> = ({ isOpen, onClose, currentTeam }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Time's Up!
        </h2>
        <p className="text-lg mb-6 text-center text-gray-700 dark:text-gray-300">
          It's now the {currentTeam === 'red' ? 'Blue' : 'Red'} team's turn.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
}

