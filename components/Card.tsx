import React, { useState, useEffect } from 'react'

interface CardProps {
  word: string
  revealed: boolean
  team: 'red' | 'blue' | 'neutral' | 'assassin'
  onClick: () => void
  isSpymasterView: boolean
}

export const Card: React.FC<CardProps> = ({ word, revealed, team, onClick, isSpymasterView }) => {
  const [isAssassinRevealed, setIsAssassinRevealed] = useState(false)
  
  useEffect(() => {
    if (revealed && team === 'assassin') {
      setIsAssassinRevealed(true)
      // Reset the animation after it completes
      const timer = setTimeout(() => setIsAssassinRevealed(false), 500)
      return () => clearTimeout(timer)
    }
  }, [revealed, team])

  const baseClasses = "w-full aspect-[3/2] rounded-lg shadow-lg flex items-center justify-center text-center p-1 text-[11px] sm:text-sm md:text-base lg:text-lg font-bold transition-all duration-300 cursor-pointer break-words hover:scale-[1.02]"
  
  const getTeamClasses = () => {
    const teamColors = {
      red: revealed || isSpymasterView ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100',
      blue: revealed || isSpymasterView ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100',
      neutral: revealed || isSpymasterView ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100',
      assassin: revealed || isSpymasterView ? 'bg-black text-white dark:bg-gray-950 dark:text-gray-100' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100'
    }

    return teamColors[team]
  }

  const cardClass = `${baseClasses} ${getTeamClasses()} ${isSpymasterView && !revealed ? 'opacity-70' : ''} ${isAssassinRevealed ? 'scale-125 z-10' : ''}`

  return (
    <div className={cardClass} onClick={onClick}>
      <span>{word}</span>
    </div>
  )
}

