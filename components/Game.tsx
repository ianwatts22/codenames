"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Card } from './Card'
import { Header } from './Header'
import { Scoreboard } from './Scoreboard'
import { TimeUpPopup } from './TimeUpPopup'

type Team = 'red' | 'blue' | 'neutral' | 'assassin'

const words = [
"AIRPLANE", "ANCHOR", "ANGEL", "ANT", "APPLE", "ARM", "ARMY", "ASH", "ASTRONAUT", "BABY",
"BALLOON", "BAND", "BANK", "BAR", "BARK", "BARREL", "BASE", "BASKET", "BATH", "BATTERY",
"BEACH", "BEAR", "BED", "BEE", "BELL", "BELT", "BENCH", "BERRY", "BIRD", "BISCUIT",
"BLANKET", "BOARD", "BOAT", "BOMB", "BONE", "BOOK", "BOOT", "BOTTLE", "BOW", "BOX",
"BRAIN", "BRIDGE", "BRUSH", "BUCKET", "BUG", "BULL", "BUTTON", "CAKE", "CAMERA", "CAMP",
"CANDLE", "CANNON", "CAP", "CAR", "CARD", "CASTLE", "CAT", "CHAIN", "CHAIR", "CHALK",
"CHAMPION", "CHEESE", "CHEST", "CHICKEN", "CHIMNEY", "CIRCLE", "CLOCK", "CLOUD", "CLOVER", "CLOWN",
"CLUB", "COAT", "COFFEE", "COIN", "COMB", "COMPUTER", "CONCERT", "COOKIE", "COTTON", "COW",
"CRAB", "CROWN", "CRYSTAL", "CUP", "CURTAIN", "DANCE", "DART", "DIAMOND", "DINOSAUR", "DISC",
"DOCTOR", "DOG", "DOLL", "DOLPHIN", "DONKEY", "DOOR", "DRAGON", "DRUM", "DUCK", "EAGLE",
"EARTH", "ELEPHANT", "ENGINE", "EYE", "FACE", "FACTORY", "FAIRY", "FEATHER", "FENCE", "FIELD",
"FIRE", "FISH", "FLAG", "FLOWER", "FLY", "FOOT", "FOREST", "FORK", "FOUNTAIN", "FOX",
"FRAME", "FROG", "GAME", "GARDEN", "GATE", "GHOST", "GIANT", "GIFT", "GLASS", "GLOBE",
"GLUE", "GOAT", "GOLD", "GRASS", "GUN", "HAIR", "HAMMER", "HAND", "HAT", "HEART",
"HELICOPTER", "HILL", "HONEY", "HOOK", "HORSE", "HOSPITAL", "ICE", "ISLAND", "JACK", "JEWEL",
"JUNGLE", "KANGAROO", "KEY", "KING", "KITE", "KNIFE", "KNIGHT", "LADDER", "LAMP", "LEAF",
"LEMON", "LIBRARY", "LIGHT", "LION", "LIZARD", "LOCK", "MAGNET", "MAP", "MASK", "MATCH",
"MILK", "MIRROR", "MOON", "MOUNTAIN", "MOUSE", "MUSIC", "NAIL", "NECKLACE", "NEEDLE", "NEST",
"NET", "NIGHT", "NOSE", "NUT", "OCEAN", "OIL", "OLIVE", "ONION", "ORANGE", "OWL",
"PAINT", "PALACE", "PANDA", "PAPER", "PARROT", "PEACOCK", "PEARL", "PENCIL", "PENGUIN", "PHONE",
"PIANO", "PICTURE", "PIG", "PILOT", "PINEAPPLE", "PIRATE", "PLANET", "PLATE", "PLUM", "POCKET",
"POOL", "POTATO", "PRINCESS", "PYRAMID", "QUEEN", "RABBIT", "RAINBOW", "RIVER", "ROAD", "ROBOT",
"ROCKET", "ROOF", "ROSE", "SAILOR", "SALT", "SAND", "SATELLITE", "SCARF", "SCHOOL", "SCISSORS",
"SEA", "SHARK", "SHEEP", "SHIELD", "SHIP", "SHOE", "SHOP", "SIGNAL", "SINGER", "SKY",
"SNAKE", "SNOW", "SOLDIER", "SPACE", "SPIDER", "SPOON", "SQUARE", "STAR", "STATUE", "STONE",
"STORM", "STREET", "STRING", "SUITCASE", "SUN", "SWAN", "SWORD", "TABLE", "TANK", "TEACHER",
"TEMPLE", "TENT", "THIEF", "TIGER", "TIME", "TIRE", "TOOL", "TOWER", "TRAIN", "TREASURE",
"TREE", "TRUCK", "TUNNEL", "UMBRELLA", "UNICORN", "VALLEY", "VASE", "VILLAGE", "VOLCANO", "WAGON",
"WALL", "WATCH", "WATER", "WHALE", "WHEEL", "WHISTLE", "WINDOW", "WING", "WITCH", "WOLF",
"WOOD", "WORM", "YACHT", "YARD", "ZEBRA", "ZIPPER"
]

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const generateTeams = (): Team[] => {
  const teams: Team[] = [
    ...Array(9).fill('red'),
    ...Array(8).fill('blue'),
    ...Array(7).fill('neutral'),
    'assassin'
  ]
  return shuffleArray(teams)
}

const selectRandomWords = (count: number): string[] => {
  return shuffleArray(words).slice(0, count)
}

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState(() => {
    const selectedWords = selectRandomWords(25)
    const teams = generateTeams()
    return {
      words: selectedWords,
      teams: teams,
      revealed: Array(25).fill(false),
      currentTeam: 'red' as 'red' | 'blue',
      redScore: teams.filter(team => team === 'red').length,
      blueScore: teams.filter(team => team === 'blue').length,
    }
  })
  const [isSpymasterView, setIsSpymasterView] = useState(false)
  const [timerDuration, setTimerDuration] = useState(180) // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isTimeUpPopupOpen, setIsTimeUpPopupOpen] = useState(false)

  const handleCardClick = useCallback((index: number) => {
    if (gameState.revealed[index] || isSpymasterView) return

    setGameState(prevState => {
      const newRevealed = [...prevState.revealed]
      newRevealed[index] = true

      const newRedScore = prevState.teams[index] === 'red' ? prevState.redScore - 1 : prevState.redScore
      const newBlueScore = prevState.teams[index] === 'blue' ? prevState.blueScore - 1 : prevState.blueScore

      return {
        ...prevState,
        revealed: newRevealed,
        redScore: newRedScore,
        blueScore: newBlueScore,
        currentTeam: prevState.teams[index] === prevState.currentTeam ? prevState.currentTeam : (prevState.currentTeam === 'red' ? 'blue' : 'red')
      }
    })

    // Reset the timer when a card is clicked
    setIsTimerRunning(false)
    setTimeout(() => {
      setIsTimerRunning(true)
    }, 0)
  }, [gameState.revealed, isSpymasterView])

  const toggleSpymasterView = useCallback(() => {
    setIsSpymasterView(prevState => !prevState)
  }, [])

  const startNewGame = useCallback(() => {
    const selectedWords = selectRandomWords(25)
    const teams = generateTeams()
    setGameState({
      words: selectedWords,
      teams: teams,
      revealed: Array(25).fill(false),
      currentTeam: 'red',
      redScore: teams.filter(team => team === 'red').length,
      blueScore: teams.filter(team => team === 'blue').length,
    })
    setIsSpymasterView(false)
    setIsTimerRunning(false)
  }, [])

  const toggleTimer = useCallback(() => {
    setIsTimerRunning(prevState => !prevState)
  }, [])

  const resetTimer = useCallback(() => {
    setIsTimerRunning(false)
    setTimeout(() => {
      setIsTimerRunning(true)
    }, 0)
  }, [])

  const handleTimeUp = useCallback(() => {
    setIsTimeUpPopupOpen(true)
    setIsTimerRunning(false)
  }, [])

  const closeTimeUpPopup = useCallback(() => {
    setIsTimeUpPopupOpen(false)
    setGameState(prevState => ({
      ...prevState,
      currentTeam: prevState.currentTeam === 'red' ? 'blue' : 'red'
    }))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <Header 
        isSpymasterView={isSpymasterView}
        onToggleSpymasterView={toggleSpymasterView}
        onNewGame={startNewGame}
      />
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <Scoreboard 
          currentTeam={gameState.currentTeam}
          redScore={gameState.redScore}
          blueScore={gameState.blueScore}
          timerDuration={timerDuration}
          isTimerRunning={isTimerRunning}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          onTimeUp={handleTimeUp}
          onDurationChange={setTimerDuration}
        />
      </div>
      <main className="container mx-auto px-4 sm:px-6 py-4 overflow-x-hidden">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {gameState.words.map((word, index) => (
            <Card
              key={index}
              word={word}
              revealed={gameState.revealed[index]}
              team={gameState.teams[index]}
              onClick={() => handleCardClick(index)}
              isSpymasterView={isSpymasterView}
            />
          ))}
        </div>
      </main>
      <TimeUpPopup
        isOpen={isTimeUpPopupOpen}
        onClose={closeTimeUpPopup}
        currentTeam={gameState.currentTeam}
      />
    </div>
  )
}

