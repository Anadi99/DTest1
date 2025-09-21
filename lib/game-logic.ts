import type { WordCard, Game, GamePlayer, Clue } from "./types"
import { getRandomWords, getWordsByDifficulty, type GermanWord } from "./german-vocabulary-comprehensive"

export interface GameState {
  game: Game
  players: GamePlayer[]
  wordCards: WordCard[]
  clues: Clue[]
  currentClue?: Clue
  guessesRemaining: number
  gamePhase: "waiting" | "clue_giving" | "guessing" | "game_over"
  winner?: "red" | "blue"
}

export class GameLogic {
  static validateClue(clueWord: string, clueNumber: number, wordCards: WordCard[]): boolean {
    // Clue word cannot be empty or contain numbers
    if (!clueWord.trim() || /\d/.test(clueWord)) return false

    // Clue number must be between 1 and 9
    if (clueNumber < 1 || clueNumber > 9) return false

    // Clue word cannot be any of the words on the board
    const boardWords = wordCards.map((card) => card.german_word.toLowerCase())
    if (boardWords.includes(clueWord.toLowerCase())) return false

    return true
  }

  static giveClue(
    gameState: GameState,
    spymasterId: string,
    clueWord: string,
    clueNumber: number,
  ): { success: boolean; error?: string; newState?: GameState } {
    const { game, players, wordCards } = gameState

    // Validate it's the spymaster's turn
    const spymaster = players.find((p) => p.player_id === spymasterId && p.role === "spymaster")
    if (!spymaster || spymaster.team !== game.current_turn) {
      return { success: false, error: "Not your turn or not a spymaster" }
    }

    // Validate clue
    if (!this.validateClue(clueWord, clueNumber, wordCards)) {
      return { success: false, error: "Invalid clue" }
    }

    const newClue: Clue = {
      id: `clue_${Date.now()}`,
      game_id: game.id,
      spymaster_id: spymasterId,
      team: game.current_turn!,
      clue_word: clueWord,
      clue_number: clueNumber,
      turn_number: (gameState.clues.length || 0) + 1,
      created_at: new Date().toISOString(),
    }

    const newState: GameState = {
      ...gameState,
      clues: [...gameState.clues, newClue],
      currentClue: newClue,
      guessesRemaining: clueNumber + 1, // +1 for bonus guess
      gamePhase: "guessing",
    }

    return { success: true, newState }
  }

  static makeGuess(
    gameState: GameState,
    playerId: string,
    cardId: string,
  ): { success: boolean; error?: string; newState?: GameState } {
    const { game, players, wordCards } = gameState

    // Validate it's an operative's turn
    const player = players.find((p) => p.player_id === playerId && p.role === "operative")
    if (!player || player.team !== game.current_turn) {
      return { success: false, error: "Not your turn or not an operative" }
    }

    // Find the card
    const card = wordCards.find((c) => c.id === cardId)
    if (!card || card.revealed) {
      return { success: false, error: "Invalid card selection" }
    }

    // Reveal the card
    const updatedCards = wordCards.map((c) =>
      c.id === cardId ? { ...c, revealed: true, revealed_at: new Date().toISOString(), revealed_by: playerId } : c,
    )

    let newGamePhase = gameState.gamePhase
    let newCurrentTurn = game.current_turn
    let newGuessesRemaining = gameState.guessesRemaining - 1
    let winner: "red" | "blue" | undefined

    // Check what type of card was revealed
    if (card.card_type === "assassin") {
      // Game over - other team wins
      winner = game.current_turn === "red" ? "blue" : "red"
      newGamePhase = "game_over"
    } else if (card.card_type === game.current_turn) {
      // Correct guess - check for win condition
      const remainingTeamCards = updatedCards.filter((c) => c.card_type === game.current_turn && !c.revealed)

      if (remainingTeamCards.length === 0) {
        // Team found all their words - they win!
        winner = game.current_turn
        newGamePhase = "game_over"
      } else if (newGuessesRemaining <= 0) {
        // No more guesses - end turn
        newCurrentTurn = game.current_turn === "red" ? "blue" : "red"
        newGamePhase = "clue_giving"
        newGuessesRemaining = 0
      }
      // Otherwise continue guessing
    } else {
      // Wrong guess (neutral or other team) - end turn
      newCurrentTurn = game.current_turn === "red" ? "blue" : "red"
      newGamePhase = "clue_giving"
      newGuessesRemaining = 0
    }

    // Calculate scores
    const redScore = updatedCards.filter((c) => c.card_type === "red" && c.revealed).length
    const blueScore = updatedCards.filter((c) => c.card_type === "blue" && c.revealed).length

    const updatedGame: Game = {
      ...game,
      current_turn: newCurrentTurn,
      red_score: redScore,
      blue_score: blueScore,
      status: winner ? "completed" : "in_progress",
      updated_at: new Date().toISOString(),
    }

    const newState: GameState = {
      ...gameState,
      game: updatedGame,
      wordCards: updatedCards,
      guessesRemaining: newGuessesRemaining,
      gamePhase: newGamePhase,
      winner,
    }

    return { success: true, newState }
  }

  static endTurn(gameState: GameState, playerId: string): { success: boolean; error?: string; newState?: GameState } {
    const { game, players } = gameState

    // Validate it's the player's turn
    const player = players.find((p) => p.player_id === playerId)
    if (!player || player.team !== game.current_turn) {
      return { success: false, error: "Not your turn" }
    }

    const newCurrentTurn = game.current_turn === "red" ? "blue" : "red"
    const updatedGame: Game = {
      ...game,
      current_turn: newCurrentTurn,
      updated_at: new Date().toISOString(),
    }

    const newState: GameState = {
      ...gameState,
      game: updatedGame,
      gamePhase: "clue_giving",
      guessesRemaining: 0,
      currentClue: undefined,
    }

    return { success: true, newState }
  }

  static getGameStats(gameState: GameState) {
    const { wordCards } = gameState

    const redCards = wordCards.filter((c) => c.card_type === "red")
    const blueCards = wordCards.filter((c) => c.card_type === "blue")
    const neutralCards = wordCards.filter((c) => c.card_type === "neutral")
    const assassinCards = wordCards.filter((c) => c.card_type === "assassin")

    return {
      red: {
        total: redCards.length,
        revealed: redCards.filter((c) => c.revealed).length,
        remaining: redCards.filter((c) => !c.revealed).length,
      },
      blue: {
        total: blueCards.length,
        revealed: blueCards.filter((c) => c.revealed).length,
        remaining: blueCards.filter((c) => !c.revealed).length,
      },
      neutral: {
        total: neutralCards.length,
        revealed: neutralCards.filter((c) => c.revealed).length,
        remaining: neutralCards.filter((c) => !c.revealed).length,
      },
      assassin: {
        total: assassinCards.length,
        revealed: assassinCards.filter((c) => c.revealed).length,
        remaining: assassinCards.filter((c) => !c.revealed).length,
      },
    }
  }

  static canPlayerAct(
    gameState: GameState,
    playerId: string,
    action: "give_clue" | "make_guess" | "end_turn",
  ): boolean {
    const { game, players, gamePhase } = gameState

    const player = players.find((p) => p.player_id === playerId)
    if (!player || player.team !== game.current_turn) return false

    switch (action) {
      case "give_clue":
        return gamePhase === "clue_giving" && player.role === "spymaster"
      case "make_guess":
        return gamePhase === "guessing" && player.role === "operative"
      case "end_turn":
        return gamePhase === "guessing" && player.role === "operative"
      default:
        return false
    }
  }

  static generateRoomCode(): string {
    const words = ["HAUS", "AUTO", "KATZE", "HUND", "BAUM", "WASSER", "BROT", "MILCH", "SCHULE", "BUCH"]
    const numbers = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    const word = words[Math.floor(Math.random() * words.length)]
    return `${word}${numbers}`
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  static createGameBoard(
    difficulty: "A1" | "A2" | "B1" | "B2" = "A1",
    gameId?: string
  ): WordCard[] {
    // Get words for the specified difficulty level
    const availableWords = getWordsByDifficulty(difficulty)
    
    if (availableWords.length < 25) {
      // If not enough words for this difficulty, mix with easier levels
      console.warn(`Not enough ${difficulty} words, mixing with other levels`)
      const allWords = getRandomWords(25) // Get from all levels
      return this.createGameBoardFromWords(allWords, gameId)
    }
    
    const words = getRandomWords(25, difficulty)
    
    if (words.length < 25) {
      throw new Error(`Not enough words available for difficulty: ${difficulty}. Found ${words.length}, need 25.`)
    }

    // Define card types distribution (standard Codenames rules)
    const cardTypes: ("red" | "blue" | "neutral" | "assassin")[] = [
      ...Array(9).fill("red"),    // 9 red cards
      ...Array(8).fill("blue"),   // 8 blue cards (red team starts first)
      ...Array(7).fill("neutral"), // 7 neutral cards
      "assassin",                  // 1 assassin card
    ]

    const shuffledTypes = this.shuffleArray(cardTypes)
    const selectedWords = this.shuffleArray(words).slice(0, 25)

    return selectedWords.map((word, index) => ({
      id: `card_${index + 1}`,
      game_id: gameId || "", 
      word: word.german,
      german_word: word.german,
      english_translation: word.english,
      card_type: shuffledTypes[index],
      position: index + 1,
      revealed: false,
    }))
  }

  static validateGameBoard(wordCards: WordCard[]): boolean {
    if (wordCards.length !== 25) return false
    
    const redCards = wordCards.filter(c => c.card_type === "red").length
    const blueCards = wordCards.filter(c => c.card_type === "blue").length
    const neutralCards = wordCards.filter(c => c.card_type === "neutral").length
    const assassinCards = wordCards.filter(c => c.card_type === "assassin").length
    
    return redCards === 9 && blueCards === 8 && neutralCards === 7 && assassinCards === 1
  }
  static createGameBoardFromWords(words: GermanWord[], gameId?: string): WordCard[] {
    if (words.length < 25) {
      throw new Error(`Need at least 25 words to create a game board. Provided: ${words.length}`)
    }

    // Define card types distribution (standard Codenames rules)
    const cardTypes: ("red" | "blue" | "neutral" | "assassin")[] = [
      ...Array(9).fill("red"),    // 9 red cards
      ...Array(8).fill("blue"),   // 8 blue cards (red team starts first)
      ...Array(7).fill("neutral"), // 7 neutral cards
      "assassin",                  // 1 assassin card
    ]

    const shuffledTypes = this.shuffleArray(cardTypes)
    const selectedWords = this.shuffleArray(words).slice(0, 25)

    return selectedWords.map((word, index) => ({
      id: `card_${index + 1}`,
      game_id: gameId || "",
      word: word.german,
      german_word: word.german,
      english_translation: word.english,
      card_type: shuffledTypes[index],
      position: index + 1,
      revealed: false,
    }))
  }

  static calculateGameScore(gameState: GameState): { red: number; blue: number } {
    const redScore = gameState.wordCards.filter(c => c.card_type === "red" && c.revealed).length
    const blueScore = gameState.wordCards.filter(c => c.card_type === "blue" && c.revealed).length
    return { red: redScore, blue: blueScore }
  }

  static isGameComplete(gameState: GameState): { isComplete: boolean; winner?: "red" | "blue" } {
    // Check for assassin reveal
    const assassinRevealed = gameState.wordCards.some(c => c.card_type === "assassin" && c.revealed)
    if (assassinRevealed) {
      // Find who revealed the assassin
      const assassinCard = gameState.wordCards.find(c => c.card_type === "assassin" && c.revealed)
      if (assassinCard?.revealed_by) {
        const revealingPlayer = gameState.players.find(p => p.player_id === assassinCard.revealed_by)
        const winner = revealingPlayer?.team === "red" ? "blue" : "red"
        return { isComplete: true, winner }
      }
    }

    // Check for team completion
    const redRemaining = gameState.wordCards.filter(c => c.card_type === "red" && !c.revealed).length
    const blueRemaining = gameState.wordCards.filter(c => c.card_type === "blue" && !c.revealed).length

    if (redRemaining === 0) return { isComplete: true, winner: "red" }
    if (blueRemaining === 0) return { isComplete: true, winner: "blue" }

    return { isComplete: false }
  }
}
