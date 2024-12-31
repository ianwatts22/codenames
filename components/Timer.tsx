import React, { useState, useEffect, useCallback } from 'react'
import { Pause, Play, RotateCcw, Pen } from 'lucide-react'

interface TimerProps {
  duration: number
  onTimeUp: () => void
  isRunning: boolean
  onToggleTimer: () => void
  onResetTimer: () => void
  onDurationChange: (newDuration: number) => void
}

export const Timer: React.FC<TimerProps> = ({ 
  duration, 
  onTimeUp, 
  isRunning, 
  onToggleTimer, 
  onResetTimer,
  onDurationChange
}) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [showPopup, setShowPopup] = useState(false)
  const [inputDuration, setInputDuration] = useState(duration)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            onTimeUp()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft, onTimeUp])

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration, isRunning])

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [])

  const handleDurationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onDurationChange(inputDuration)
    setShowPopup(false)
  }

  return (
    <div className="relative flex items-center space-x-4">
      <div 
        className="text-3xl font-bold cursor-pointer flex items-center gap-2" 
        onClick={() => setShowPopup(true)}
      >
        {formatTime(timeLeft)}
        <Pen size={16} className="text-gray-500" />
      </div>
      <button
        onClick={onToggleTimer}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        onClick={onResetTimer}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
      >
        <RotateCcw size={24} />
      </button>
      {showPopup && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleDurationSubmit}>
            <input
              type="number"
              min="1"
              max="600"
              value={inputDuration}
              onChange={(e) => setInputDuration(Math.max(1, Math.min(600, parseInt(e.target.value))))}
              className="w-16 px-2 py-1 border rounded mr-2"
            />
            <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded">
              Set
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

