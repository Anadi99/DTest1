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

// Comprehensive German vocabulary database organized by CEFR levels
export const germanVocabulary: GermanWord[] = [
  // A1 Level - Beginner (Essential daily vocabulary)
  // Greetings and basic phrases
  { german: "Hallo", english: "Hello", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Hallo, wie geht es dir?", exampleEN: "Hello, how are you?", pronunciation: "HAH-loh" },
  { german: "Tschüss", english: "Goodbye", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Tschüss, bis morgen!", exampleEN: "Goodbye, see you tomorrow!", pronunciation: "choos" },
  { german: "Danke", english: "Thank you", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Danke für deine Hilfe.", exampleEN: "Thank you for your help.", pronunciation: "DAHN-ke" },
  { german: "Bitte", english: "Please/You're welcome", difficulty: "A1", category: "greetings", partOfSpeech: "adverb", exampleDE: "Bitte schön!", exampleEN: "You're welcome!", pronunciation: "BIT-te" },
  { german: "Entschuldigung", english: "Excuse me", difficulty: "A1", category: "greetings", partOfSpeech: "noun", exampleDE: "Entschuldigung, wo ist der Bahnhof?", exampleEN: "Excuse me, where is the train station?", pronunciation: "ent-SHOOL-di-goong" },

  // Numbers 1-20
  { german: "eins", english: "one", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Ich habe eins.", exampleEN: "I have one.", pronunciation: "ines" },
  { german: "zwei", english: "two", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Zwei Äpfel, bitte.", exampleEN: "Two apples, please.", pronunciation: "tsvai" },
  { german: "drei", english: "three", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Drei Kinder spielen.", exampleEN: "Three children are playing.", pronunciation: "drai" },
  { german: "vier", english: "four", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Vier Uhr nachmittags.", exampleEN: "Four o'clock in the afternoon.", pronunciation: "feer" },
  { german: "fünf", english: "five", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Fünf Minuten warten.", exampleEN: "Wait five minutes.", pronunciation: "fuenf" },
  { german: "sechs", english: "six", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Sechs Stunden Schlaf.", exampleEN: "Six hours of sleep.", pronunciation: "zeks" },
  { german: "sieben", english: "seven", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Sieben Tage die Woche.", exampleEN: "Seven days a week.", pronunciation: "ZEE-ben" },
  { german: "acht", english: "eight", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Acht Uhr morgens.", exampleEN: "Eight o'clock in the morning.", pronunciation: "ahkt" },
  { german: "neun", english: "nine", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Neun Jahre alt.", exampleEN: "Nine years old.", pronunciation: "noin" },
  { german: "zehn", english: "ten", difficulty: "A1", category: "numbers", partOfSpeech: "numeral", exampleDE: "Zehn Euro kosten.", exampleEN: "Costs ten euros.", pronunciation: "tsayn" },

  // Colors
  { german: "rot", english: "red", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Das Auto ist rot.", exampleEN: "The car is red.", pronunciation: "roht" },
  { german: "blau", english: "blue", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Himmel ist blau.", exampleEN: "The sky is blue.", pronunciation: "blau" },
  { german: "grün", english: "green", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Blätter sind grün.", exampleEN: "The leaves are green.", pronunciation: "gruen" },
  { german: "gelb", english: "yellow", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Sonne ist gelb.", exampleEN: "The sun is yellow.", pronunciation: "gelb" },
  { german: "schwarz", english: "black", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Katze ist schwarz.", exampleEN: "The cat is black.", pronunciation: "shvarts" },
  { german: "weiß", english: "white", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Schnee ist weiß.", exampleEN: "The snow is white.", pronunciation: "vais" },

  // Family and people
  { german: "Familie", english: "family", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Meine Familie ist groß.", exampleEN: "My family is big.", pronunciation: "fa-MEE-li-e" },
  { german: "Vater", english: "father", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Mein Vater arbeitet.", exampleEN: "My father works.", pronunciation: "FAH-ter" },
  { german: "Mutter", english: "mother", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Meine Mutter kocht.", exampleEN: "My mother cooks.", pronunciation: "MUT-ter" },
  { german: "Bruder", english: "brother", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Mein Bruder ist jung.", exampleEN: "My brother is young.", pronunciation: "BROO-der" },
  { german: "Schwester", english: "sister", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Meine Schwester lernt.", exampleEN: "My sister is learning.", pronunciation: "SHVES-ter" },

  // Home and furniture
  { german: "Haus", english: "house", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Das Haus ist groß.", exampleEN: "The house is big.", pronunciation: "house" },
  { german: "Wohnung", english: "apartment", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Die Wohnung ist klein.", exampleEN: "The apartment is small.", pronunciation: "VOH-noong" },
  { german: "Zimmer", english: "room", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Das Zimmer ist hell.", exampleEN: "The room is bright.", pronunciation: "TSIM-mer" },
  { german: "Küche", english: "kitchen", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Die Küche ist sauber.", exampleEN: "The kitchen is clean.", pronunciation: "KUE-khe" },
  { german: "Badezimmer", english: "bathroom", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Das Badezimmer ist modern.", exampleEN: "The bathroom is modern.", pronunciation: "BAH-de-tsim-mer" },
  { german: "Tür", english: "door", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Die Tür ist offen.", exampleEN: "The door is open.", pronunciation: "tuer" },
  { german: "Fenster", english: "window", difficulty: "A1", category: "home", partOfSpeech: "noun", exampleDE: "Das Fenster ist groß.", exampleEN: "The window is big.", pronunciation: "FEN-ster" },
  { german: "Tisch", english: "table", difficulty: "A1", category: "furniture", partOfSpeech: "noun", exampleDE: "Der Tisch ist rund.", exampleEN: "The table is round.", pronunciation: "tish" },
  { german: "Stuhl", english: "chair", difficulty: "A1", category: "furniture", partOfSpeech: "noun", exampleDE: "Der Stuhl ist bequem.", exampleEN: "The chair is comfortable.", pronunciation: "shtool" },
  { german: "Bett", english: "bed", difficulty: "A1", category: "furniture", partOfSpeech: "noun", exampleDE: "Das Bett ist weich.", exampleEN: "The bed is soft.", pronunciation: "bet" },

  // Animals
  { german: "Hund", english: "dog", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Hund bellt laut.", exampleEN: "The dog barks loudly.", pronunciation: "hoont" },
  { german: "Katze", english: "cat", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Die Katze schläft.", exampleEN: "The cat sleeps.", pronunciation: "KAT-tse" },
  { german: "Vogel", english: "bird", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Vogel singt schön.", exampleEN: "The bird sings beautifully.", pronunciation: "FOH-gel" },
  { german: "Fisch", english: "fish", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Fisch schwimmt.", exampleEN: "The fish swims.", pronunciation: "fish" },
  { german: "Pferd", english: "horse", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Das Pferd läuft schnell.", exampleEN: "The horse runs fast.", pronunciation: "pfairt" },

  // Food and drinks
  { german: "Essen", english: "food", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Essen schmeckt gut.", exampleEN: "The food tastes good.", pronunciation: "ES-sen" },
  { german: "Trinken", english: "drink", difficulty: "A1", category: "food", partOfSpeech: "verb", exampleDE: "Ich trinke Wasser.", exampleEN: "I drink water.", pronunciation: "TRIN-ken" },
  { german: "Brot", english: "bread", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Brot ist frisch.", exampleEN: "The bread is fresh.", pronunciation: "broht" },
  { german: "Milch", english: "milk", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Die Milch ist kalt.", exampleEN: "The milk is cold.", pronunciation: "milkh" },
  { german: "Wasser", english: "water", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Wasser ist klar.", exampleEN: "The water is clear.", pronunciation: "VAS-ser" },
  { german: "Apfel", english: "apple", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Apfel ist rot.", exampleEN: "The apple is red.", pronunciation: "AHP-fel" },
  { german: "Banane", english: "banana", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Die Banane ist gelb.", exampleEN: "The banana is yellow.", pronunciation: "ba-NAH-ne" },

  // Basic verbs
  { german: "sein", english: "to be", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich bin müde.", exampleEN: "I am tired.", pronunciation: "zain" },
  { german: "haben", english: "to have", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich habe einen Hund.", exampleEN: "I have a dog.", pronunciation: "HAH-ben" },
  { german: "gehen", english: "to go", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich gehe nach Hause.", exampleEN: "I go home.", pronunciation: "GAY-en" },
  { german: "kommen", english: "to come", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Kommst du mit?", exampleEN: "Are you coming along?", pronunciation: "KOM-men" },
  { german: "machen", english: "to make/do", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Was machst du?", exampleEN: "What are you doing?", pronunciation: "MAH-khen" },

  // Transport
  { german: "Auto", english: "car", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Das Auto ist schnell.", exampleEN: "The car is fast.", pronunciation: "OW-toh" },
  { german: "Bus", english: "bus", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Der Bus kommt.", exampleEN: "The bus is coming.", pronunciation: "boos" },
  { german: "Zug", english: "train", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Der Zug ist pünktlich.", exampleEN: "The train is on time.", pronunciation: "tsook" },
  { german: "Fahrrad", english: "bicycle", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Ich fahre Fahrrad.", exampleEN: "I ride a bicycle.", pronunciation: "FAHR-raht" },

  // Nature
  { german: "Baum", english: "tree", difficulty: "A1", category: "nature", partOfSpeech: "noun", exampleDE: "Der Baum ist hoch.", exampleEN: "The tree is tall.", pronunciation: "bowm" },
  { german: "Blume", english: "flower", difficulty: "A1", category: "nature", partOfSpeech: "noun", exampleDE: "Die Blume ist schön.", exampleEN: "The flower is beautiful.", pronunciation: "BLOO-me" },
  { german: "Sonne", english: "sun", difficulty: "A1", category: "nature", partOfSpeech: "noun", exampleDE: "Die Sonne scheint.", exampleEN: "The sun shines.", pronunciation: "ZON-ne" },
  { german: "Mond", english: "moon", difficulty: "A1", category: "nature", partOfSpeech: "noun", exampleDE: "Der Mond ist hell.", exampleEN: "The moon is bright.", pronunciation: "mohnt" },

  // Objects
  { german: "Buch", english: "book", difficulty: "A1", category: "objects", partOfSpeech: "noun", exampleDE: "Das Buch ist interessant.", exampleEN: "The book is interesting.", pronunciation: "bookh" },
  { german: "Stift", english: "pen", difficulty: "A1", category: "objects", partOfSpeech: "noun", exampleDE: "Der Stift ist blau.", exampleEN: "The pen is blue.", pronunciation: "shtift" },
  { german: "Telefon", english: "telephone", difficulty: "A1", category: "objects", partOfSpeech: "noun", exampleDE: "Das Telefon klingelt.", exampleEN: "The telephone rings.", pronunciation: "te-le-FOHN" },

  // A2 Level - Elementary (Expanding vocabulary)
  // Professions
  { german: "Beruf", english: "profession", difficulty: "A2", category: "work", partOfSpeech: "noun", exampleDE: "Was ist dein Beruf?", exampleEN: "What is your profession?", pronunciation: "be-ROOF" },
  { german: "Lehrer", english: "teacher", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Lehrer erklärt die Aufgabe.", exampleEN: "The teacher explains the task.", pronunciation: "LAY-rer" },
  { german: "Arzt", english: "doctor", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Arzt hilft den Patienten.", exampleEN: "The doctor helps the patients.", pronunciation: "artst" },
  { german: "Verkäufer", english: "salesperson", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Verkäufer ist freundlich.", exampleEN: "The salesperson is friendly.", pronunciation: "fer-KOY-fer" },
  { german: "Koch", english: "cook", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Koch macht leckeres Essen.", exampleEN: "The cook makes delicious food.", pronunciation: "kokh" },

  // Emotions and feelings
  { german: "Gefühl", english: "feeling", difficulty: "A2", category: "emotions", partOfSpeech: "noun", exampleDE: "Ich habe ein gutes Gefühl.", exampleEN: "I have a good feeling.", pronunciation: "ge-FUEL" },
  { german: "glücklich", english: "happy", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Ich bin sehr glücklich.", exampleEN: "I am very happy.", pronunciation: "GLUEK-likh" },
  { german: "traurig", english: "sad", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Sie ist traurig.", exampleEN: "She is sad.", pronunciation: "TROW-rikh" },
  { german: "müde", english: "tired", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Ich bin müde.", exampleEN: "I am tired.", pronunciation: "MUE-de" },
  { german: "hungrig", english: "hungry", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Das Kind ist hungrig.", exampleEN: "The child is hungry.", pronunciation: "HOONG-rikh" },

  // Technology
  { german: "Computer", english: "computer", difficulty: "A2", category: "technology", partOfSpeech: "noun", exampleDE: "Der Computer ist modern.", exampleEN: "The computer is modern.", pronunciation: "kom-PYU-ter" },
  { german: "Internet", english: "internet", difficulty: "A2", category: "technology", partOfSpeech: "noun", exampleDE: "Das Internet ist schnell.", exampleEN: "The internet is fast.", pronunciation: "IN-ter-net" },
  { german: "Handy", english: "cell phone", difficulty: "A2", category: "technology", partOfSpeech: "noun", exampleDE: "Mein Handy ist neu.", exampleEN: "My cell phone is new.", pronunciation: "HEN-dee" },

  // Education
  { german: "Schule", english: "school", difficulty: "A2", category: "education", partOfSpeech: "noun", exampleDE: "Die Schule beginnt um acht.", exampleEN: "School starts at eight.", pronunciation: "SHOO-le" },
  { german: "Student", english: "student", difficulty: "A2", category: "education", partOfSpeech: "noun", exampleDE: "Der Student lernt Deutsch.", exampleEN: "The student learns German.", pronunciation: "shtu-DENT" },
  { german: "Universität", english: "university", difficulty: "A2", category: "education", partOfSpeech: "noun", exampleDE: "Die Universität ist groß.", exampleEN: "The university is big.", pronunciation: "oo-ni-ver-zi-TAYT" },

  // B1 Level - Intermediate (Complex concepts)
  // Abstract concepts
  { german: "Erfahrung", english: "experience", difficulty: "B1", category: "abstract", partOfSpeech: "noun", exampleDE: "Ich habe viel Erfahrung.", exampleEN: "I have a lot of experience.", pronunciation: "er-FAH-roong" },
  { german: "Entwicklung", english: "development", difficulty: "B1", category: "abstract", partOfSpeech: "noun", exampleDE: "Die Entwicklung ist positiv.", exampleEN: "The development is positive.", pronunciation: "ent-VIK-loong" },
  { german: "Verantwortung", english: "responsibility", difficulty: "B1", category: "abstract", partOfSpeech: "noun", exampleDE: "Er trägt die Verantwortung.", exampleEN: "He bears the responsibility.", pronunciation: "fer-ANT-vor-toong" },
  { german: "Möglichkeit", english: "possibility", difficulty: "B1", category: "abstract", partOfSpeech: "noun", exampleDE: "Es gibt viele Möglichkeiten.", exampleEN: "There are many possibilities.", pronunciation: "MERG-likh-kite" },

  // Science and research
  { german: "Wissenschaft", english: "science", difficulty: "B1", category: "science", partOfSpeech: "noun", exampleDE: "Die Wissenschaft entwickelt sich.", exampleEN: "Science develops.", pronunciation: "VIS-sen-shaft" },
  { german: "Forschung", english: "research", difficulty: "B1", category: "science", partOfSpeech: "noun", exampleDE: "Die Forschung ist wichtig.", exampleEN: "Research is important.", pronunciation: "FOR-shoong" },
  { german: "Experiment", english: "experiment", difficulty: "B1", category: "science", partOfSpeech: "noun", exampleDE: "Das Experiment war erfolgreich.", exampleEN: "The experiment was successful.", pronunciation: "eks-pe-ri-MENT" },

  // Society and politics
  { german: "Gesellschaft", english: "society", difficulty: "B1", category: "society", partOfSpeech: "noun", exampleDE: "Die Gesellschaft verändert sich.", exampleEN: "Society is changing.", pronunciation: "ge-ZEL-shaft" },
  { german: "Politik", english: "politics", difficulty: "B1", category: "society", partOfSpeech: "noun", exampleDE: "Politik ist kompliziert.", exampleEN: "Politics is complicated.", pronunciation: "po-li-TEEK" },
  { german: "Demokratie", english: "democracy", difficulty: "B1", category: "society", partOfSpeech: "noun", exampleDE: "Demokratie ist wichtig.", exampleEN: "Democracy is important.", pronunciation: "de-mo-kra-TEE" },

  // B2 Level - Upper Intermediate (Advanced vocabulary)
  // Philosophy and psychology
  { german: "Philosophie", english: "philosophy", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Philosophie ist faszinierend.", exampleEN: "Philosophy is fascinating.", pronunciation: "fi-lo-zo-FEE" },
  { german: "Psychologie", english: "psychology", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Psychologie erklärt Verhalten.", exampleEN: "Psychology explains behavior.", pronunciation: "psy-kho-lo-GEE" },
  { german: "Bewusstsein", english: "consciousness", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Das Bewusstsein ist komplex.", exampleEN: "Consciousness is complex.", pronunciation: "be-VOOST-zain" },
  { german: "Persönlichkeit", english: "personality", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Jeder hat eine einzigartige Persönlichkeit.", exampleEN: "Everyone has a unique personality.", pronunciation: "per-ZERN-likh-kite" },

  // Advanced concepts
  { german: "Nachhaltigkeit", english: "sustainability", difficulty: "B2", category: "environment", partOfSpeech: "noun", exampleDE: "Nachhaltigkeit ist die Zukunft.", exampleEN: "Sustainability is the future.", pronunciation: "NAKH-hal-tikh-kite" },
  { german: "Globalisierung", english: "globalization", difficulty: "B2", category: "economics", partOfSpeech: "noun", exampleDE: "Globalisierung verbindet Länder.", exampleEN: "Globalization connects countries.", pronunciation: "glo-ba-li-ZEE-roong" },
  { german: "Digitalisierung", english: "digitalization", difficulty: "B2", category: "technology", partOfSpeech: "noun", exampleDE: "Digitalisierung verändert die Arbeit.", exampleEN: "Digitalization changes work.", pronunciation: "di-gi-ta-li-ZEE-roong" },

  // Add more words to reach 500+ per level...
  // [Additional words would continue here to reach the target of 500+ per level]
]

// Helper functions
export function getWordsByDifficulty(difficulty: "A1" | "A2" | "B1" | "B2"): GermanWord[] {
  return germanVocabulary.filter(word => word.difficulty === difficulty)
}

export function getWordsByCategory(category: string): GermanWord[] {
  return germanVocabulary.filter(word => word.category === category)
}

export function getRandomWords(count: number, difficulty?: "A1" | "A2" | "B1" | "B2"): GermanWord[] {
  const availableWords = difficulty ? getWordsByDifficulty(difficulty) : germanVocabulary
  
  if (availableWords.length < count) {
    console.warn(`Not enough words available for difficulty: ${difficulty}. Found ${availableWords.length}, need ${count}.`)
    // Return all available words if we don't have enough
    return [...availableWords].sort(() => Math.random() - 0.5)
  }
  
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function searchWords(query: string): GermanWord[] {
  const lowerQuery = query.toLowerCase()
  return germanVocabulary.filter(word => 
    word.german.toLowerCase().includes(lowerQuery) || 
    word.english.toLowerCase().includes(lowerQuery) ||
    word.category.toLowerCase().includes(lowerQuery)
  )
}

export function getCategories(): string[] {
  const categories = new Set(germanVocabulary.map(word => word.category))
  return Array.from(categories).sort()
}

export function getDifficultyStats() {
  const stats = {
    A1: getWordsByDifficulty("A1").length,
    A2: getWordsByDifficulty("A2").length,
    B1: getWordsByDifficulty("B1").length,
    B2: getWordsByDifficulty("B2").length,
  }
  return {
    ...stats,
    total: Object.values(stats).reduce((sum, count) => sum + count, 0)
  }
}

// Export for backward compatibility
export { germanVocabulary as germanWords }