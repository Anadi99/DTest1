interface GameSession {
  id: string
  name: string
  createdAt: string
  players: string[]
  isActive: boolean
}

interface VocabularyWord {
  id: string
  german: string
  english: string
  difficulty: "A1" | "A2" | "B1" | "B2"
  createdAt: string
}

export const gameStorage = {
  // Game Sessions
  getSessions: (): GameSession[] => {
    const sessions = localStorage.getItem("vocabulary-game-sessions")
    return sessions ? JSON.parse(sessions) : []
  },

  saveSession: (session: GameSession) => {
    const sessions = gameStorage.getSessions()
    const existingIndex = sessions.findIndex((s) => s.id === session.id)

    if (existingIndex >= 0) {
      sessions[existingIndex] = session
    } else {
      sessions.push(session)
    }

    localStorage.setItem("vocabulary-game-sessions", JSON.stringify(sessions))
  },

  deleteSession: (sessionId: string) => {
    const sessions = gameStorage.getSessions().filter((s) => s.id !== sessionId)
    localStorage.setItem("vocabulary-game-sessions", JSON.stringify(sessions))
  },

  // Vocabulary Words
  getWords: (): VocabularyWord[] => {
    const words = localStorage.getItem("vocabulary-words")
    return words ? JSON.parse(words) : []
  },

  saveWord: (word: VocabularyWord) => {
    const words = gameStorage.getWords()
    const existingIndex = words.findIndex((w) => w.id === word.id)

    if (existingIndex >= 0) {
      words[existingIndex] = word
    } else {
      words.push(word)
    }

    localStorage.setItem("vocabulary-words", JSON.stringify(words))
  },

  deleteWord: (wordId: string) => {
    const words = gameStorage.getWords().filter((w) => w.id !== wordId)
    localStorage.setItem("vocabulary-words", JSON.stringify(words))
  },

  // Initialize with sample data if empty
  initializeSampleData: () => {
    const existingWords = gameStorage.getWords()
    if (existingWords.length === 0) {
      const sampleWords: VocabularyWord[] = [
        { id: "1", german: "Hallo", english: "Hello", difficulty: "A1", createdAt: new Date().toISOString() },
        { id: "2", german: "Danke", english: "Thank you", difficulty: "A1", createdAt: new Date().toISOString() },
        { id: "3", german: "Wasser", english: "Water", difficulty: "A1", createdAt: new Date().toISOString() },
        { id: "4", german: "Haus", english: "House", difficulty: "A1", createdAt: new Date().toISOString() },
        { id: "5", german: "Freund", english: "Friend", difficulty: "A2", createdAt: new Date().toISOString() },
        { id: "6", german: "Arbeit", english: "Work", difficulty: "A2", createdAt: new Date().toISOString() },
        { id: "7", german: "Verstehen", english: "Understand", difficulty: "B1", createdAt: new Date().toISOString() },
        { id: "8", german: "Erfahrung", english: "Experience", difficulty: "B2", createdAt: new Date().toISOString() },
      ]

      sampleWords.forEach((word) => gameStorage.saveWord(word))
    }
  },
}
