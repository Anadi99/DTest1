export interface GermanWord {
  german: string
  english: string
  difficulty: "A1" | "A2" | "B1" | "B2"
  category: string
  partOfSpeech: string
  exampleDE: string
  exampleEN: string
  pronunciation?: string // IPA or simplified
}

export const germanWords: GermanWord[] = [
  // Beginner Level (A1-A2) - Common everyday words
  { german: "Haus", english: "House", difficulty: "beginner", category: "buildings" },
  { german: "Auto", english: "Car", difficulty: "beginner", category: "transport" },
  { german: "Katze", english: "Cat", difficulty: "beginner", category: "animals" },
  { german: "Hund", english: "Dog", difficulty: "beginner", category: "animals" },
  { german: "Baum", english: "Tree", difficulty: "beginner", category: "nature" },
  { german: "Wasser", english: "Water", difficulty: "beginner", category: "elements" },
  { german: "Brot", english: "Bread", difficulty: "beginner", category: "food" },
  { german: "Milch", english: "Milk", difficulty: "beginner", category: "food" },
  { german: "Schule", english: "School", difficulty: "beginner", category: "buildings" },
  { german: "Buch", english: "Book", difficulty: "beginner", category: "objects" },
  { german: "Tisch", english: "Table", difficulty: "beginner", category: "furniture" },
  { german: "Stuhl", english: "Chair", difficulty: "beginner", category: "furniture" },
  { german: "Fenster", english: "Window", difficulty: "beginner", category: "house" },
  { german: "Tür", english: "Door", difficulty: "beginner", category: "house" },
  { german: "Sonne", english: "Sun", difficulty: "beginner", category: "nature" },
  { german: "Mond", english: "Moon", difficulty: "beginner", category: "nature" },
  { german: "Stern", english: "Star", difficulty: "beginner", category: "nature" },
  { german: "Blume", english: "Flower", difficulty: "beginner", category: "nature" },
  { german: "Apfel", english: "Apple", difficulty: "beginner", category: "food" },
  { german: "Banane", english: "Banana", difficulty: "beginner", category: "food" },
  { german: "Orange", english: "Orange", difficulty: "beginner", category: "food" },
  { german: "Kaffee", english: "Coffee", difficulty: "beginner", category: "drinks" },
  { german: "Tee", english: "Tea", difficulty: "beginner", category: "drinks" },
  { german: "Zucker", english: "Sugar", difficulty: "beginner", category: "food" },
  { german: "Salz", english: "Salt", difficulty: "beginner", category: "food" },
  { german: "Bett", english: "Bed", difficulty: "beginner", category: "furniture" },
  { german: "Sofa", english: "Sofa", difficulty: "beginner", category: "furniture" },
  { german: "Küche", english: "Kitchen", difficulty: "beginner", category: "house" },
  { german: "Bad", english: "Bathroom", difficulty: "beginner", category: "house" },
  { german: "Garten", english: "Garden", difficulty: "beginner", category: "nature" },
  { german: "Park", english: "Park", difficulty: "beginner", category: "places" },
  { german: "Stadt", english: "City", difficulty: "beginner", category: "places" },
  { german: "Land", english: "Country", difficulty: "beginner", category: "places" },
  { german: "Meer", english: "Sea", difficulty: "beginner", category: "nature" },
  { german: "Berg", english: "Mountain", difficulty: "beginner", category: "nature" },
  { german: "Wald", english: "Forest", difficulty: "beginner", category: "nature" },
  { german: "Fluss", english: "River", difficulty: "beginner", category: "nature" },
  { german: "Brücke", english: "Bridge", difficulty: "beginner", category: "structures" },
  { german: "Straße", english: "Street", difficulty: "beginner", category: "places" },
  { german: "Platz", english: "Square", difficulty: "beginner", category: "places" },
  { german: "Markt", english: "Market", difficulty: "beginner", category: "places" },
  { german: "Laden", english: "Shop", difficulty: "beginner", category: "buildings" },
  { german: "Hotel", english: "Hotel", difficulty: "beginner", category: "buildings" },
  { german: "Bank", english: "Bank", difficulty: "beginner", category: "buildings" },
  { german: "Post", english: "Post Office", difficulty: "beginner", category: "buildings" },
  { german: "Kino", english: "Cinema", difficulty: "beginner", category: "buildings" },
  { german: "Theater", english: "Theater", difficulty: "beginner", category: "buildings" },
  { german: "Museum", english: "Museum", difficulty: "beginner", category: "buildings" },
  { german: "Kirche", english: "Church", difficulty: "beginner", category: "buildings" },
  { german: "Krankenhaus", english: "Hospital", difficulty: "beginner", category: "buildings" },
  { german: "Bahnhof", english: "Train Station", difficulty: "beginner", category: "transport" },
  { german: "Flughafen", english: "Airport", difficulty: "beginner", category: "transport" },
  { german: "Bus", english: "Bus", difficulty: "beginner", category: "transport" },
  { german: "Zug", english: "Train", difficulty: "beginner", category: "transport" },
  { german: "Flugzeug", english: "Airplane", difficulty: "beginner", category: "transport" },
  { german: "Fahrrad", english: "Bicycle", difficulty: "beginner", category: "transport" },
  { german: "Pferd", english: "Horse", difficulty: "beginner", category: "animals" },
  { german: "Kuh", english: "Cow", difficulty: "beginner", category: "animals" },
  { german: "Schwein", english: "Pig", difficulty: "beginner", category: "animals" },
  { german: "Schaf", english: "Sheep", difficulty: "beginner", category: "animals" },
  { german: "Vogel", english: "Bird", difficulty: "beginner", category: "animals" },
  { german: "Fisch", english: "Fish", difficulty: "beginner", category: "animals" },
  { german: "Käse", english: "Cheese", difficulty: "beginner", category: "food" },
  { german: "Fleisch", english: "Meat", difficulty: "beginner", category: "food" },
  { german: "Gemüse", english: "Vegetable", difficulty: "beginner", category: "food" },
  { german: "Obst", english: "Fruit", difficulty: "beginner", category: "food" },
  { german: "Reis", english: "Rice", difficulty: "beginner", category: "food" },
  { german: "Nudel", english: "Noodle", difficulty: "beginner", category: "food" },
  { german: "Suppe", english: "Soup", difficulty: "beginner", category: "food" },
  { german: "Salat", english: "Salad", difficulty: "beginner", category: "food" },
  { german: "Kuchen", english: "Cake", difficulty: "beginner", category: "food" },
  { german: "Eis", english: "Ice cream", difficulty: "beginner", category: "food" },

  // Intermediate Level (B1-B2) - More complex vocabulary
  { german: "Wissenschaft", english: "Science", difficulty: "intermediate", category: "academic" },
  { german: "Geschichte", english: "History", difficulty: "intermediate", category: "academic" },
  { german: "Mathematik", english: "Mathematics", difficulty: "intermediate", category: "academic" },
  { german: "Literatur", english: "Literature", difficulty: "intermediate", category: "academic" },
  { german: "Philosophie", english: "Philosophy", difficulty: "intermediate", category: "academic" },
  { german: "Politik", english: "Politics", difficulty: "intermediate", category: "society" },
  { german: "Wirtschaft", english: "Economy", difficulty: "intermediate", category: "society" },
  { german: "Gesellschaft", english: "Society", difficulty: "intermediate", category: "society" },
  { german: "Kultur", english: "Culture", difficulty: "intermediate", category: "society" },
  { german: "Tradition", english: "Tradition", difficulty: "intermediate", category: "society" },
  { german: "Revolution", english: "Revolution", difficulty: "intermediate", category: "history" },
  { german: "Demokratie", english: "Democracy", difficulty: "intermediate", category: "politics" },
  { german: "Technologie", english: "Technology", difficulty: "intermediate", category: "science" },
  { german: "Computer", english: "Computer", difficulty: "intermediate", category: "technology" },
  { german: "Internet", english: "Internet", difficulty: "intermediate", category: "technology" },
  { german: "Telefon", english: "Telephone", difficulty: "intermediate", category: "technology" },
  { german: "Energie", english: "Energy", difficulty: "intermediate", category: "science" },
  { german: "Umwelt", english: "Environment", difficulty: "intermediate", category: "nature" },
  { german: "Klima", english: "Climate", difficulty: "intermediate", category: "nature" },
  { german: "Natur", english: "Nature", difficulty: "intermediate", category: "nature" },
  { german: "Universum", english: "Universe", difficulty: "intermediate", category: "science" },
  { german: "Planet", english: "Planet", difficulty: "intermediate", category: "science" },
  { german: "Rakete", english: "Rocket", difficulty: "intermediate", category: "technology" },
  { german: "Satellit", english: "Satellite", difficulty: "intermediate", category: "technology" },
  { german: "Mikroskop", english: "Microscope", difficulty: "intermediate", category: "science" },
  { german: "Teleskop", english: "Telescope", difficulty: "intermediate", category: "science" },
  { german: "Labor", english: "Laboratory", difficulty: "intermediate", category: "science" },
  { german: "Experiment", english: "Experiment", difficulty: "intermediate", category: "science" },
  { german: "Forschung", english: "Research", difficulty: "intermediate", category: "academic" },
  { german: "Erfindung", english: "Invention", difficulty: "intermediate", category: "science" },
  { german: "Entdeckung", english: "Discovery", difficulty: "intermediate", category: "science" },
  { german: "Theorie", english: "Theory", difficulty: "intermediate", category: "academic" },
  { german: "Praxis", english: "Practice", difficulty: "intermediate", category: "academic" },
  { german: "Methode", english: "Method", difficulty: "intermediate", category: "academic" },
  { german: "System", english: "System", difficulty: "intermediate", category: "concepts" },
  { german: "Struktur", english: "Structure", difficulty: "intermediate", category: "concepts" },
  { german: "Organisation", english: "Organization", difficulty: "intermediate", category: "concepts" },
  { german: "Institution", english: "Institution", difficulty: "intermediate", category: "society" },
  { german: "Unternehmen", english: "Company", difficulty: "intermediate", category: "business" },
  { german: "Fabrik", english: "Factory", difficulty: "intermediate", category: "business" },
  { german: "Industrie", english: "Industry", difficulty: "intermediate", category: "business" },
  { german: "Handel", english: "Trade", difficulty: "intermediate", category: "business" },
  { german: "Markt", english: "Market", difficulty: "intermediate", category: "business" },
  { german: "Konkurrenz", english: "Competition", difficulty: "intermediate", category: "business" },
  { german: "Erfolg", english: "Success", difficulty: "intermediate", category: "concepts" },
  { german: "Niederlage", english: "Defeat", difficulty: "intermediate", category: "concepts" },
  { german: "Sieg", english: "Victory", difficulty: "intermediate", category: "concepts" },
  { german: "Kampf", english: "Fight", difficulty: "intermediate", category: "actions" },
  { german: "Frieden", english: "Peace", difficulty: "intermediate", category: "concepts" },
  { german: "Krieg", english: "War", difficulty: "intermediate", category: "history" },
  { german: "Soldat", english: "Soldier", difficulty: "intermediate", category: "military" },
  { german: "General", english: "General", difficulty: "intermediate", category: "military" },
  { german: "Armee", english: "Army", difficulty: "intermediate", category: "military" },
  { german: "Schlacht", english: "Battle", difficulty: "intermediate", category: "military" },

  // Advanced Level - Complex and abstract concepts
  { german: "Metaphysik", english: "Metaphysics", difficulty: "advanced", category: "philosophy" },
  { german: "Epistemologie", english: "Epistemology", difficulty: "advanced", category: "philosophy" },
  { german: "Phänomenologie", english: "Phenomenology", difficulty: "advanced", category: "philosophy" },
  { german: "Existentialismus", english: "Existentialism", difficulty: "advanced", category: "philosophy" },
  { german: "Relativismus", english: "Relativism", difficulty: "advanced", category: "philosophy" },
  { german: "Absolutismus", english: "Absolutism", difficulty: "advanced", category: "philosophy" },
  { german: "Dialektik", english: "Dialectics", difficulty: "advanced", category: "philosophy" },
  { german: "Hermeneutik", english: "Hermeneutics", difficulty: "advanced", category: "philosophy" },
  { german: "Paradigma", english: "Paradigm", difficulty: "advanced", category: "academic" },
  { german: "Hypothese", english: "Hypothesis", difficulty: "advanced", category: "science" },
  { german: "Axiom", english: "Axiom", difficulty: "advanced", category: "mathematics" },
  { german: "Theorem", english: "Theorem", difficulty: "advanced", category: "mathematics" },
  { german: "Algorithm", english: "Algorithm", difficulty: "advanced", category: "mathematics" },
  { german: "Statistik", english: "Statistics", difficulty: "advanced", category: "mathematics" },
  { german: "Wahrscheinlichkeit", english: "Probability", difficulty: "advanced", category: "mathematics" },
  { german: "Quantenmechanik", english: "Quantum Mechanics", difficulty: "advanced", category: "physics" },
  { german: "Relativitätstheorie", english: "Theory of Relativity", difficulty: "advanced", category: "physics" },
  { german: "Thermodynamik", english: "Thermodynamics", difficulty: "advanced", category: "physics" },
  { german: "Elektromagnetismus", english: "Electromagnetism", difficulty: "advanced", category: "physics" },
  { german: "Biochemie", english: "Biochemistry", difficulty: "advanced", category: "science" },
  { german: "Molekularbiologie", english: "Molecular Biology", difficulty: "advanced", category: "science" },
  { german: "Genetik", english: "Genetics", difficulty: "advanced", category: "science" },
  { german: "Evolution", english: "Evolution", difficulty: "advanced", category: "science" },
  { german: "Neurologie", english: "Neurology", difficulty: "advanced", category: "medicine" },
  { german: "Psychologie", english: "Psychology", difficulty: "advanced", category: "science" },
  { german: "Soziologie", english: "Sociology", difficulty: "advanced", category: "social science" },
  { german: "Anthropologie", english: "Anthropology", difficulty: "advanced", category: "social science" },
  { german: "Archäologie", english: "Archaeology", difficulty: "advanced", category: "social science" },
  { german: "Linguistik", english: "Linguistics", difficulty: "advanced", category: "academic" },
  { german: "Semantik", english: "Semantics", difficulty: "advanced", category: "linguistics" },
  { german: "Syntax", english: "Syntax", difficulty: "advanced", category: "linguistics" },
  { german: "Pragmatik", english: "Pragmatics", difficulty: "advanced", category: "linguistics" },
  { german: "Morphologie", english: "Morphology", difficulty: "advanced", category: "linguistics" },
  { german: "Phonologie", english: "Phonology", difficulty: "advanced", category: "linguistics" }
]

// Helper functions to get words by criteria
export function getWordsByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): GermanWord[] {
  return germanWords.filter(word => word.difficulty === difficulty)
}

export function getWordsByCategory(category: string): GermanWord[] {
  return germanWords.filter(word => word.category === category)
}

export function getRandomWords(count: number, difficulty?: "beginner" | "intermediate" | "advanced"): GermanWord[] {
  const availableWords = difficulty ? getWordsByDifficulty(difficulty) : germanWords
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function searchWords(query: string): GermanWord[] {
  const lowerQuery = query.toLowerCase()
  return germanWords.filter(word => 
    word.german.toLowerCase().includes(lowerQuery) || 
    word.english.toLowerCase().includes(lowerQuery)
  )
}

// Get all available categories
export function getCategories(): string[] {
  const categories = new Set(germanWords.map(word => word.category))
  return Array.from(categories).sort()
}
