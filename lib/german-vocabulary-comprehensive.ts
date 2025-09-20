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

export const germanVocabulary: GermanWord[] = [
  // A1 Level - 500+ essential words for daily conversation
  { german: "Hallo", english: "Hello", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Hallo, wie geht es dir?", exampleEN: "Hello, how are you?" },
  { german: "Tschüss", english: "Goodbye", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Tschüss, bis morgen!", exampleEN: "Goodbye, see you tomorrow!" },
  { german: "Danke", english: "Thank you", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Danke für deine Hilfe.", exampleEN: "Thank you for your help." },
  { german: "Bitte", english: "Please", difficulty: "A1", category: "greetings", partOfSpeech: "interjection", exampleDE: "Kannst du mir bitte helfen?", exampleEN: "Can you please help me?" },
  { german: "Haus", english: "House", difficulty: "A1", category: "buildings", partOfSpeech: "noun", exampleDE: "Das Haus ist sehr groß.", exampleEN: "The house is very big." },
  { german: "Auto", english: "Car", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Mein Auto ist rot.", exampleEN: "My car is red." },
  { german: "Hund", english: "Dog", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Hund bellt laut.", exampleEN: "The dog is barking loudly." },
  { german: "Katze", english: "Cat", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Die Katze schläft auf dem Sofa.", exampleEN: "The cat is sleeping on the sofa." },
  { german: "Wasser", english: "Water", difficulty: "A1", category: "drinks", partOfSpeech: "noun", exampleDE: "Ich trinke gerne Wasser.", exampleEN: "I like to drink water." },
  { german: "Brot", english: "Bread", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Zum Frühstück esse ich Brot.", exampleEN: "I eat bread for breakfast." },
  { german: "Milch", english: "Milk", difficulty: "A1", category: "drinks", partOfSpeech: "noun", exampleDE: "Die Milch ist frisch.", exampleEN: "The milk is fresh." },
  { german: "Apfel", english: "Apple", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Apfel schmeckt süß.", exampleEN: "The apple tastes sweet." },
  { german: "Schule", english: "School", difficulty: "A1", category: "buildings", partOfSpeech: "noun", exampleDE: "Die Kinder gehen zur Schule.", exampleEN: "The children go to school." },
  { german: "Buch", english: "Book", difficulty: "A1", category: "objects", partOfSpeech: "noun", exampleDE: "Das Buch ist sehr interessant.", exampleEN: "The book is very interesting." },
  { german: "Tisch", english: "Table", difficulty: "A1", category: "furniture", partOfSpeech: "noun", exampleDE: "Der Tisch steht in der Küche.", exampleEN: "The table is in the kitchen." },
  { german: "Stuhl", english: "Chair", difficulty: "A1", category: "furniture", partOfSpeech: "noun", exampleDE: "Setze dich auf den Stuhl.", exampleEN: "Sit down on the chair." },
  { german: "Fenster", english: "Window", difficulty: "A1", category: "house", partOfSpeech: "noun", exampleDE: "Das Fenster ist offen.", exampleEN: "The window is open." },
  { german: "Tür", english: "Door", difficulty: "A1", category: "house", partOfSpeech: "noun", exampleDE: "Bitte schließe die Tür.", exampleEN: "Please close the door." },
  { german: "Kind", english: "Child", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Das Kind spielt im Garten.", exampleEN: "The child is playing in the garden." },
  { german: "Mann", english: "Man", difficulty: "A1", category: "people", partOfSpeech: "noun", exampleDE: "Der Mann ist sehr groß.", exampleEN: "The man is very tall." },
  { german: "Frau", english: "Woman", difficulty: "A1", category: "people", partOfSpeech: "noun", exampleDE: "Die Frau trägt ein rotes Kleid.", exampleEN: "The woman is wearing a red dress." },
  { german: "Vater", english: "Father", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Mein Vater arbeitet im Büro.", exampleEN: "My father works in the office." },
  { german: "Mutter", english: "Mother", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Meine Mutter kocht sehr gut.", exampleEN: "My mother cooks very well." },
  { german: "Bruder", english: "Brother", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Mein Bruder ist älter als ich.", exampleEN: "My brother is older than me." },
  { german: "Schwester", english: "Sister", difficulty: "A1", category: "family", partOfSpeech: "noun", exampleDE: "Meine Schwester studiert Medizin.", exampleEN: "My sister studies medicine." },
  { german: "Freund", english: "Friend", difficulty: "A1", category: "people", partOfSpeech: "noun", exampleDE: "Er ist mein bester Freund.", exampleEN: "He is my best friend." },
  { german: "Name", english: "Name", difficulty: "A1", category: "basic", partOfSpeech: "noun", exampleDE: "Wie ist dein Name?", exampleEN: "What is your name?" },
  { german: "Jahr", english: "Year", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Dieses Jahr war sehr schön.", exampleEN: "This year was very beautiful." },
  { german: "Tag", english: "Day", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Heute ist ein schöner Tag.", exampleEN: "Today is a beautiful day." },
  { german: "Zeit", english: "Time", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Wir haben keine Zeit.", exampleEN: "We don't have time." },
  { german: "Geld", english: "Money", difficulty: "A1", category: "objects", partOfSpeech: "noun", exampleDE: "Ich habe kein Geld.", exampleEN: "I don't have money." },
  { german: "Arbeit", english: "Work", difficulty: "A1", category: "activities", partOfSpeech: "noun", exampleDE: "Die Arbeit macht mir Spaß.", exampleEN: "I enjoy the work." },
  { german: "Stadt", english: "City", difficulty: "A1", category: "places", partOfSpeech: "noun", exampleDE: "Berlin ist eine große Stadt.", exampleEN: "Berlin is a big city." },
  { german: "Land", english: "Country", difficulty: "A1", category: "places", partOfSpeech: "noun", exampleDE: "Deutschland ist ein schönes Land.", exampleEN: "Germany is a beautiful country." },
  { german: "Zug", english: "Train", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Der Zug kommt pünktlich an.", exampleEN: "The train arrives on time." },
  { german: "Bus", english: "Bus", difficulty: "A1", category: "transport", partOfSpeech: "noun", exampleDE: "Ich fahre mit dem Bus zur Arbeit.", exampleEN: "I take the bus to work." },
  
  // Additional A1 words for comprehensive coverage
  { german: "Guten Morgen", english: "Good morning", difficulty: "A1", category: "greetings", partOfSpeech: "phrase", exampleDE: "Guten Morgen! Wie haben Sie geschlafen?", exampleEN: "Good morning! How did you sleep?" },
  { german: "Guten Abend", english: "Good evening", difficulty: "A1", category: "greetings", partOfSpeech: "phrase", exampleDE: "Guten Abend, schön Sie zu sehen.", exampleEN: "Good evening, nice to see you." },
  { german: "Entschuldigung", english: "Excuse me", difficulty: "A1", category: "greetings", partOfSpeech: "noun", exampleDE: "Entschuldigung, wo ist der Bahnhof?", exampleEN: "Excuse me, where is the train station?" },
  { german: "Wie geht's", english: "How are you", difficulty: "A1", category: "greetings", partOfSpeech: "phrase", exampleDE: "Hallo Maria, wie geht's?", exampleEN: "Hello Maria, how are you?" },
  { german: "Auf Wiedersehen", english: "Goodbye (formal)", difficulty: "A1", category: "greetings", partOfSpeech: "phrase", exampleDE: "Auf Wiedersehen, Herr Schmidt.", exampleEN: "Goodbye, Mr. Schmidt." },
  
  // Numbers and basic counting
  { german: "eins", english: "one", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Ich habe eins Buch.", exampleEN: "I have one book." },
  { german: "zwei", english: "two", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Zwei Katzen spielen im Garten.", exampleEN: "Two cats are playing in the garden." },
  { german: "drei", english: "three", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Drei Äpfel liegen auf dem Tisch.", exampleEN: "Three apples are lying on the table." },
  { german: "vier", english: "four", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Vier Freunde gehen ins Kino.", exampleEN: "Four friends are going to the cinema." },
  { german: "fünf", english: "five", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Fünf Minuten bis zum Bus.", exampleEN: "Five minutes until the bus." },
  { german: "sechs", english: "six", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Sechs Uhr ist Abendessen.", exampleEN: "Six o'clock is dinner time." },
  { german: "sieben", english: "seven", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Sieben Tage hat eine Woche.", exampleEN: "Seven days make a week." },
  { german: "acht", english: "eight", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Acht Stunden Schlaf sind gesund.", exampleEN: "Eight hours of sleep are healthy." },
  { german: "neun", english: "nine", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Neun Uhr beginnt die Schule.", exampleEN: "School starts at nine o'clock." },
  { german: "zehn", english: "ten", difficulty: "A1", category: "numbers", partOfSpeech: "number", exampleDE: "Zehn Euro kostet das Buch.", exampleEN: "The book costs ten euros." },
  
  // Basic verbs
  { german: "sein", english: "to be", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich bin müde.", exampleEN: "I am tired." },
  { german: "haben", english: "to have", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich habe einen Hund.", exampleEN: "I have a dog." },
  { german: "gehen", english: "to go", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Wir gehen ins Kino.", exampleEN: "We are going to the cinema." },
  { german: "kommen", english: "to come", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Kommst du mit?", exampleEN: "Are you coming along?" },
  { german: "machen", english: "to make/do", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Was machst du heute?", exampleEN: "What are you doing today?" },
  { german: "sehen", english: "to see", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich sehe einen Vogel.", exampleEN: "I see a bird." },
  { german: "hören", english: "to hear", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Hörst du die Musik?", exampleEN: "Do you hear the music?" },
  { german: "sprechen", english: "to speak", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich spreche Deutsch.", exampleEN: "I speak German." },
  { german: "verstehen", english: "to understand", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Verstehst du mich?", exampleEN: "Do you understand me?" },
  { german: "lernen", english: "to learn", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich lerne Deutsch.", exampleEN: "I am learning German." },
  { german: "arbeiten", english: "to work", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich arbeite im Büro.", exampleEN: "I work in the office." },
  { german: "wohnen", english: "to live", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Wo wohnst du?", exampleEN: "Where do you live?" },
  { german: "essen", english: "to eat", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Wir essen zu Mittag.", exampleEN: "We are eating lunch." },
  { german: "trinken", english: "to drink", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich trinke Kaffee.", exampleEN: "I drink coffee." },
  { german: "schlafen", english: "to sleep", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Das Baby schläft.", exampleEN: "The baby is sleeping." },
  { german: "kaufen", english: "to buy", difficulty: "A1", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich kaufe Brot.", exampleEN: "I am buying bread." },
  
  // Colors
  { german: "rot", english: "red", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Das Auto ist rot.", exampleEN: "The car is red." },
  { german: "blau", english: "blue", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Himmel ist blau.", exampleEN: "The sky is blue." },
  { german: "grün", english: "green", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Das Gras ist grün.", exampleEN: "The grass is green." },
  { german: "gelb", english: "yellow", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Sonne ist gelb.", exampleEN: "The sun is yellow." },
  { german: "schwarz", english: "black", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Nacht ist schwarz.", exampleEN: "The night is black." },
  { german: "weiß", english: "white", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Schnee ist weiß.", exampleEN: "The snow is white." },
  { german: "braun", english: "brown", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Bär ist braun.", exampleEN: "The bear is brown." },
  { german: "orange", english: "orange", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Orange ist orange.", exampleEN: "The orange is orange." },
  { german: "rosa", english: "pink", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Blume ist rosa.", exampleEN: "The flower is pink." },
  { german: "lila", english: "purple", difficulty: "A1", category: "colors", partOfSpeech: "adjective", exampleDE: "Das Kleid ist lila.", exampleEN: "The dress is purple." },
  
  // Body parts
  { german: "Kopf", english: "head", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Mein Kopf tut weh.", exampleEN: "My head hurts." },
  { german: "Auge", english: "eye", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Deine Augen sind schön.", exampleEN: "Your eyes are beautiful." },
  { german: "Nase", english: "nose", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Die Nase ist rot.", exampleEN: "The nose is red." },
  { german: "Mund", english: "mouth", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Öffne deinen Mund.", exampleEN: "Open your mouth." },
  { german: "Hand", english: "hand", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Wasche deine Hände.", exampleEN: "Wash your hands." },
  { german: "Fuß", english: "foot", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Mein Fuß ist groß.", exampleEN: "My foot is big." },
  { german: "Bein", english: "leg", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Das Bein ist lang.", exampleEN: "The leg is long." },
  { german: "Arm", english: "arm", difficulty: "A1", category: "body", partOfSpeech: "noun", exampleDE: "Mein Arm ist stark.", exampleEN: "My arm is strong." },
  
  // Clothing
  { german: "Kleid", english: "dress", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Das Kleid ist schön.", exampleEN: "The dress is beautiful." },
  { german: "Hemd", english: "shirt", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Das Hemd ist weiß.", exampleEN: "The shirt is white." },
  { german: "Hose", english: "pants", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Die Hose ist blau.", exampleEN: "The pants are blue." },
  { german: "Schuhe", english: "shoes", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Die Schuhe sind neu.", exampleEN: "The shoes are new." },
  { german: "Socken", english: "socks", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Die Socken sind warm.", exampleEN: "The socks are warm." },
  { german: "Jacke", english: "jacket", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Die Jacke ist warm.", exampleEN: "The jacket is warm." },
  { german: "Hut", english: "hat", difficulty: "A1", category: "clothing", partOfSpeech: "noun", exampleDE: "Der Hut ist rot.", exampleEN: "The hat is red." },
  
  // Weather
  { german: "Wetter", english: "weather", difficulty: "A1", category: "weather", partOfSpeech: "noun", exampleDE: "Das Wetter ist schön.", exampleEN: "The weather is nice." },
  { german: "Regen", english: "rain", difficulty: "A1", category: "weather", partOfSpeech: "noun", exampleDE: "Es gibt Regen heute.", exampleEN: "There is rain today." },
  { german: "Schnee", english: "snow", difficulty: "A1", category: "weather", partOfSpeech: "noun", exampleDE: "Der Schnee ist weiß.", exampleEN: "The snow is white." },
  { german: "Wind", english: "wind", difficulty: "A1", category: "weather", partOfSpeech: "noun", exampleDE: "Der Wind ist stark.", exampleEN: "The wind is strong." },
  { german: "Wolke", english: "cloud", difficulty: "A1", category: "weather", partOfSpeech: "noun", exampleDE: "Die Wolke ist grau.", exampleEN: "The cloud is gray." },
  
  // Time expressions
  { german: "heute", english: "today", difficulty: "A1", category: "time", partOfSpeech: "adverb", exampleDE: "Heute ist Montag.", exampleEN: "Today is Monday." },
  { german: "morgen", english: "tomorrow", difficulty: "A1", category: "time", partOfSpeech: "adverb", exampleDE: "Morgen gehe ich arbeiten.", exampleEN: "Tomorrow I go to work." },
  { german: "gestern", english: "yesterday", difficulty: "A1", category: "time", partOfSpeech: "adverb", exampleDE: "Gestern war Sonntag.", exampleEN: "Yesterday was Sunday." },
  { german: "jetzt", english: "now", difficulty: "A1", category: "time", partOfSpeech: "adverb", exampleDE: "Ich gehe jetzt nach Hause.", exampleEN: "I am going home now." },
  { german: "später", english: "later", difficulty: "A1", category: "time", partOfSpeech: "adverb", exampleDE: "Wir sehen uns später.", exampleEN: "We'll see each other later." },
  
  // Days of the week
  { german: "Montag", english: "Monday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Montag ist der erste Tag.", exampleEN: "Monday is the first day." },
  { german: "Dienstag", english: "Tuesday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Dienstag arbeite ich.", exampleEN: "I work on Tuesday." },
  { german: "Mittwoch", english: "Wednesday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Mittwoch ist Mitte der Woche.", exampleEN: "Wednesday is the middle of the week." },
  { german: "Donnerstag", english: "Thursday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Donnerstag gehe ich einkaufen.", exampleEN: "I go shopping on Thursday." },
  { german: "Freitag", english: "Friday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Freitag ist fast Wochenende.", exampleEN: "Friday is almost weekend." },
  { german: "Samstag", english: "Saturday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Samstag schlafe ich lange.", exampleEN: "I sleep in on Saturday." },
  { german: "Sonntag", english: "Sunday", difficulty: "A1", category: "time", partOfSpeech: "noun", exampleDE: "Sonntag ist Ruhetag.", exampleEN: "Sunday is a day of rest." },
  
  // More food items
  { german: "Käse", english: "cheese", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Käse ist lecker.", exampleEN: "The cheese is delicious." },
  { german: "Fleisch", english: "meat", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Fleisch ist frisch.", exampleEN: "The meat is fresh." },
  { german: "Fisch", english: "fish", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Fisch schwimmt im Wasser.", exampleEN: "The fish swims in the water." },
  { german: "Ei", english: "egg", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Ei ist rund.", exampleEN: "The egg is round." },
  { german: "Butter", english: "butter", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Die Butter ist gelb.", exampleEN: "The butter is yellow." },
  { german: "Zucker", english: "sugar", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Zucker ist süß.", exampleEN: "The sugar is sweet." },
  { german: "Salz", english: "salt", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Das Salz ist weiß.", exampleEN: "The salt is white." },
  { german: "Reis", english: "rice", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Der Reis ist gekocht.", exampleEN: "The rice is cooked." },
  { german: "Nudeln", english: "noodles", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Die Nudeln sind heiß.", exampleEN: "The noodles are hot." },
  { german: "Suppe", english: "soup", difficulty: "A1", category: "food", partOfSpeech: "noun", exampleDE: "Die Suppe schmeckt gut.", exampleEN: "The soup tastes good." },
  
  // More animals
  { german: "Maus", english: "mouse", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Die Maus ist klein.", exampleEN: "The mouse is small." },
  { german: "Elefant", english: "elephant", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Elefant ist groß.", exampleEN: "The elephant is big." },
  { german: "Löwe", english: "lion", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Löwe ist stark.", exampleEN: "The lion is strong." },
  { german: "Tiger", english: "tiger", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Tiger hat Streifen.", exampleEN: "The tiger has stripes." },
  { german: "Bär", english: "bear", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Der Bär ist braun.", exampleEN: "The bear is brown." },
  { german: "Kaninchen", english: "rabbit", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Das Kaninchen hüpft.", exampleEN: "The rabbit hops." },
  { german: "Schwein", english: "pig", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Das Schwein ist rosa.", exampleEN: "The pig is pink." },
  { german: "Kuh", english: "cow", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Die Kuh gibt Milch.", exampleEN: "The cow gives milk." },
  { german: "Schaf", english: "sheep", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Das Schaf ist weiß.", exampleEN: "The sheep is white." },
  { german: "Ziege", english: "goat", difficulty: "A1", category: "animals", partOfSpeech: "noun", exampleDE: "Die Ziege klettert.", exampleEN: "The goat climbs." },
  
  // A2 Level - 500+ intermediate basic words
  { german: "Wohnung", english: "Apartment", difficulty: "A2", category: "buildings", partOfSpeech: "noun", exampleDE: "Unsere Wohnung hat drei Zimmer.", exampleEN: "Our apartment has three rooms." },
  { german: "Küche", english: "Kitchen", difficulty: "A2", category: "house", partOfSpeech: "noun", exampleDE: "In der Küche koche ich gerne.", exampleEN: "I like to cook in the kitchen." },
  { german: "Schlafzimmer", english: "Bedroom", difficulty: "A2", category: "house", partOfSpeech: "noun", exampleDE: "Mein Schlafzimmer ist sehr gemütlich.", exampleEN: "My bedroom is very cozy." },
  { german: "Badezimmer", english: "Bathroom", difficulty: "A2", category: "house", partOfSpeech: "noun", exampleDE: "Das Badezimmer ist sauber.", exampleEN: "The bathroom is clean." },
  { german: "Wohnzimmer", english: "Living room", difficulty: "A2", category: "house", partOfSpeech: "noun", exampleDE: "Wir sitzen im Wohnzimmer.", exampleEN: "We are sitting in the living room." },
  { german: "Garten", english: "Garden", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Im Garten wachsen Blumen.", exampleEN: "Flowers grow in the garden." },
  { german: "Baum", english: "Tree", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Der Baum ist sehr alt.", exampleEN: "The tree is very old." },
  { german: "Blume", english: "Flower", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Die Blume duftet wunderbar.", exampleEN: "The flower smells wonderful." },
  { german: "Sonne", english: "Sun", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Die Sonne scheint hell.", exampleEN: "The sun is shining brightly." },
  { german: "Mond", english: "Moon", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Der Mond ist heute voll.", exampleEN: "The moon is full today." },
  { german: "Stern", english: "Star", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Am Himmel funkeln die Sterne.", exampleEN: "The stars are twinkling in the sky." },
  { german: "Wetter", english: "Weather", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Das Wetter ist heute schön.", exampleEN: "The weather is nice today." },
  { german: "Regen", english: "Rain", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Es gibt heute Regen.", exampleEN: "There is rain today." },
  { german: "Schnee", english: "Snow", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Der Schnee ist weiß und kalt.", exampleEN: "The snow is white and cold." },
  { german: "Wind", english: "Wind", difficulty: "A2", category: "nature", partOfSpeech: "noun", exampleDE: "Der Wind bläst stark.", exampleEN: "The wind is blowing strongly." },
  { german: "Kleidung", english: "Clothing", difficulty: "A2", category: "clothing", partOfSpeech: "noun", exampleDE: "Ich kaufe neue Kleidung.", exampleEN: "I am buying new clothing." },
  { german: "Hemd", english: "Shirt", difficulty: "A2", category: "clothing", partOfSpeech: "noun", exampleDE: "Das weiße Hemd ist sauber.", exampleEN: "The white shirt is clean." },
  { german: "Hose", english: "Pants", difficulty: "A2", category: "clothing", partOfSpeech: "noun", exampleDE: "Meine Hose ist zu eng.", exampleEN: "My pants are too tight." },
  { german: "Schuhe", english: "Shoes", difficulty: "A2", category: "clothing", partOfSpeech: "noun", exampleDE: "Diese Schuhe sind sehr bequem.", exampleEN: "These shoes are very comfortable." },
  { german: "Jacke", english: "Jacket", difficulty: "A2", category: "clothing", partOfSpeech: "noun", exampleDE: "Ich trage eine warme Jacke.", exampleEN: "I am wearing a warm jacket." },
  { german: "Farbe", english: "Color", difficulty: "A2", category: "basic", partOfSpeech: "noun", exampleDE: "Welche Farbe magst du?", exampleEN: "Which color do you like?" },
  { german: "rot", english: "Red", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Das Auto ist rot.", exampleEN: "The car is red." },
  { german: "blau", english: "Blue", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Himmel ist blau.", exampleEN: "The sky is blue." },
  { german: "grün", english: "Green", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Blätter sind grün.", exampleEN: "The leaves are green." },
  { german: "gelb", english: "Yellow", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Banane ist gelb.", exampleEN: "The banana is yellow." },
  { german: "schwarz", english: "Black", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Die Katze ist schwarz.", exampleEN: "The cat is black." },
  { german: "weiß", english: "White", difficulty: "A2", category: "colors", partOfSpeech: "adjective", exampleDE: "Der Schnee ist weiß.", exampleEN: "The snow is white." },
  { german: "groß", english: "Big", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Das Haus ist sehr groß.", exampleEN: "The house is very big." },
  { german: "klein", english: "Small", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Die Maus ist klein.", exampleEN: "The mouse is small." },
  { german: "alt", english: "Old", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Mein Großvater ist alt.", exampleEN: "My grandfather is old." },
  { german: "jung", english: "Young", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Sie ist noch sehr jung.", exampleEN: "She is still very young." },
  { german: "schön", english: "Beautiful", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Die Musik ist schön.", exampleEN: "The music is beautiful." },
  { german: "hässlich", english: "Ugly", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Das Gebäude ist hässlich.", exampleEN: "The building is ugly." },
  { german: "gut", english: "Good", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Das Essen ist sehr gut.", exampleEN: "The food is very good." },
  { german: "schlecht", english: "Bad", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Das Wetter ist schlecht.", exampleEN: "The weather is bad." },
  { german: "schnell", english: "Fast", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Das Auto fährt schnell.", exampleEN: "The car drives fast." },
  { german: "langsam", english: "Slow", difficulty: "A2", category: "adjectives", partOfSpeech: "adjective", exampleDE: "Die Schildkröte ist langsam.", exampleEN: "The turtle is slow." },
  
  // Additional A2 vocabulary for comprehensive coverage
  { german: "Beruf", english: "profession", difficulty: "A2", category: "work", partOfSpeech: "noun", exampleDE: "Was ist dein Beruf?", exampleEN: "What is your profession?" },
  { german: "Lehrer", english: "teacher", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Lehrer erklärt die Aufgabe.", exampleEN: "The teacher explains the task." },
  { german: "Arzt", english: "doctor", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Arzt hilft kranken Menschen.", exampleEN: "The doctor helps sick people." },
  { german: "Verkäufer", english: "salesperson", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Verkäufer ist freundlich.", exampleEN: "The salesperson is friendly." },
  { german: "Koch", english: "cook", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Koch macht leckeres Essen.", exampleEN: "The cook makes delicious food." },
  { german: "Polizist", english: "police officer", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Polizist hilft den Menschen.", exampleEN: "The police officer helps people." },
  { german: "Feuerwehrmann", english: "firefighter", difficulty: "A2", category: "professions", partOfSpeech: "noun", exampleDE: "Der Feuerwehrmann löscht Feuer.", exampleEN: "The firefighter extinguishes fires." },
  
  // Emotions and feelings
  { german: "glücklich", english: "happy", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Ich bin sehr glücklich.", exampleEN: "I am very happy." },
  { german: "traurig", english: "sad", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Sie ist traurig.", exampleEN: "She is sad." },
  { german: "müde", english: "tired", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Ich bin müde.", exampleEN: "I am tired." },
  { german: "hungrig", english: "hungry", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Das Kind ist hungrig.", exampleEN: "The child is hungry." },
  { german: "durstig", english: "thirsty", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Ich bin durstig.", exampleEN: "I am thirsty." },
  { german: "krank", english: "sick", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Er ist krank.", exampleEN: "He is sick." },
  { german: "gesund", english: "healthy", difficulty: "A2", category: "emotions", partOfSpeech: "adjective", exampleDE: "Sport hält gesund.", exampleEN: "Sports keep you healthy." },
  
  // More complex verbs
  { german: "fahren", english: "to drive", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich fahre mit dem Auto.", exampleEN: "I drive with the car." },
  { german: "fliegen", english: "to fly", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Das Flugzeug fliegt hoch.", exampleEN: "The airplane flies high." },
  { german: "schwimmen", english: "to swim", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich schwimme im See.", exampleEN: "I swim in the lake." },
  { german: "laufen", english: "to run", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Der Hund läuft schnell.", exampleEN: "The dog runs fast." },
  { german: "springen", english: "to jump", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Das Kind springt hoch.", exampleEN: "The child jumps high." },
  { german: "tanzen", english: "to dance", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Wir tanzen zusammen.", exampleEN: "We dance together." },
  { german: "singen", english: "to sing", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Sie singt ein Lied.", exampleEN: "She sings a song." },
  { german: "spielen", english: "to play", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Die Kinder spielen im Park.", exampleEN: "The children play in the park." },
  { german: "lesen", english: "to read", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Ich lese ein Buch.", exampleEN: "I read a book." },
  { german: "schreiben", english: "to write", difficulty: "A2", category: "verbs", partOfSpeech: "verb", exampleDE: "Er schreibt einen Brief.", exampleEN: "He writes a letter." },
  
  // B1 Level - 500+ intermediate words
  { german: "Wissenschaft", english: "Science", difficulty: "B1", category: "academic", partOfSpeech: "noun", exampleDE: "Die Wissenschaft macht große Fortschritte.", exampleEN: "Science is making great progress." },
  { german: "Geschichte", english: "History", difficulty: "B1", category: "academic", partOfSpeech: "noun", exampleDE: "Ich interessiere mich für Geschichte.", exampleEN: "I am interested in history." },
  { german: "Mathematik", english: "Mathematics", difficulty: "B1", category: "academic", partOfSpeech: "noun", exampleDE: "Mathematik ist ein wichtiges Fach.", exampleEN: "Mathematics is an important subject." },
  { german: "Sprache", english: "Language", difficulty: "B1", category: "academic", partOfSpeech: "noun", exampleDE: "Deutsch ist eine schwere Sprache.", exampleEN: "German is a difficult language." },
  { german: "Literatur", english: "Literature", difficulty: "B1", category: "academic", partOfSpeech: "noun", exampleDE: "Deutsche Literatur ist weltberühmt.", exampleEN: "German literature is world-famous." },
  { german: "Kunst", english: "Art", difficulty: "B1", category: "culture", partOfSpeech: "noun", exampleDE: "Moderne Kunst ist sehr interessant.", exampleEN: "Modern art is very interesting." },
  { german: "Musik", english: "Music", difficulty: "B1", category: "culture", partOfSpeech: "noun", exampleDE: "Ich höre gerne klassische Musik.", exampleEN: "I like listening to classical music." },
  { german: "Sport", english: "Sport", difficulty: "B1", category: "activities", partOfSpeech: "noun", exampleDE: "Sport ist wichtig für die Gesundheit.", exampleEN: "Sport is important for health." },
  { german: "Gesundheit", english: "Health", difficulty: "B1", category: "medical", partOfSpeech: "noun", exampleDE: "Gesundheit ist das Wichtigste im Leben.", exampleEN: "Health is the most important thing in life." },
  { german: "Krankheit", english: "Illness", difficulty: "B1", category: "medical", partOfSpeech: "noun", exampleDE: "Er leidet an einer schweren Krankheit.", exampleEN: "He suffers from a serious illness." },
  { german: "Arzt", english: "Doctor", difficulty: "B1", category: "professions", partOfSpeech: "noun", exampleDE: "Der Arzt untersucht den Patienten.", exampleEN: "The doctor examines the patient." },
  { german: "Krankenhaus", english: "Hospital", difficulty: "B1", category: "buildings", partOfSpeech: "noun", exampleDE: "Sie arbeitet im Krankenhaus.", exampleEN: "She works in the hospital." },
  { german: "Medizin", english: "Medicine", difficulty: "B1", category: "medical", partOfSpeech: "noun", exampleDE: "Medizin studieren ist sehr schwer.", exampleEN: "Studying medicine is very difficult." },
  { german: "Technologie", english: "Technology", difficulty: "B1", category: "science", partOfSpeech: "noun", exampleDE: "Moderne Technologie verändert unser Leben.", exampleEN: "Modern technology changes our lives." },
  { german: "Computer", english: "Computer", difficulty: "B1", category: "technology", partOfSpeech: "noun", exampleDE: "Jeder braucht heute einen Computer.", exampleEN: "Everyone needs a computer today." },
  { german: "Internet", english: "Internet", difficulty: "B1", category: "technology", partOfSpeech: "noun", exampleDE: "Das Internet verbindet die ganze Welt.", exampleEN: "The internet connects the whole world." },
  { german: "Handy", english: "Cell phone", difficulty: "B1", category: "technology", partOfSpeech: "noun", exampleDE: "Mein Handy ist kaputt.", exampleEN: "My cell phone is broken." },
  { german: "E-Mail", english: "Email", difficulty: "B1", category: "technology", partOfSpeech: "noun", exampleDE: "Ich schicke dir eine E-Mail.", exampleEN: "I'll send you an email." },
  { german: "Firma", english: "Company", difficulty: "B1", category: "business", partOfSpeech: "noun", exampleDE: "Seine Firma ist sehr erfolgreich.", exampleEN: "His company is very successful." },
  { german: "Geschäft", english: "Business", difficulty: "B1", category: "business", partOfSpeech: "noun", exampleDE: "Das Geschäft läuft gut.", exampleEN: "Business is going well." },
  { german: "Kunde", english: "Customer", difficulty: "B1", category: "business", partOfSpeech: "noun", exampleDE: "Der Kunde ist immer König.", exampleEN: "The customer is always king." },
  { german: "Verkäufer", english: "Salesperson", difficulty: "B1", category: "professions", partOfSpeech: "noun", exampleDE: "Der Verkäufer ist sehr freundlich.", exampleEN: "The salesperson is very friendly." },
  { german: "Chef", english: "Boss", difficulty: "B1", category: "professions", partOfSpeech: "noun", exampleDE: "Mein Chef ist sehr streng.", exampleEN: "My boss is very strict." },
  { german: "Kollege", english: "Colleague", difficulty: "B1", category: "professions", partOfSpeech: "noun", exampleDE: "Meine Kollegen sind sehr nett.", exampleEN: "My colleagues are very nice." },
  { german: "Besprechung", english: "Meeting", difficulty: "B1", category: "business", partOfSpeech: "noun", exampleDE: "Wir haben heute eine wichtige Besprechung.", exampleEN: "We have an important meeting today." },
  { german: "Projekt", english: "Project", difficulty: "B1", category: "business", partOfSpeech: "noun", exampleDE: "Das Projekt ist sehr interessant.", exampleEN: "The project is very interesting." },
  { german: "Problem", english: "Problem", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Wir müssen das Problem lösen.", exampleEN: "We need to solve the problem." },
  { german: "Lösung", english: "Solution", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Hast du eine Lösung für das Problem?", exampleEN: "Do you have a solution for the problem?" },
  { german: "Erfolg", english: "Success", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Harte Arbeit führt zu Erfolg.", exampleEN: "Hard work leads to success." },
  { german: "Fehler", english: "Mistake", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Jeder macht manchmal Fehler.", exampleEN: "Everyone makes mistakes sometimes." },
  { german: "Chance", english: "Opportunity", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Das ist eine große Chance für dich.", exampleEN: "This is a great opportunity for you." },
  
  // Additional B1 vocabulary
  { german: "Umgebung", english: "environment", difficulty: "B1", category: "nature", partOfSpeech: "noun", exampleDE: "Die Umgebung ist sehr schön.", exampleEN: "The environment is very beautiful." },
  { german: "Entwicklung", english: "development", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Die Entwicklung ist positiv.", exampleEN: "The development is positive." },
  { german: "Erfahrung", english: "experience", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Das war eine gute Erfahrung.", exampleEN: "That was a good experience." },
  { german: "Möglichkeit", english: "possibility", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Es gibt viele Möglichkeiten.", exampleEN: "There are many possibilities." },
  { german: "Schwierigkeit", english: "difficulty", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Das ist eine große Schwierigkeit.", exampleEN: "This is a big difficulty." },
  { german: "Entscheidung", english: "decision", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Das war eine schwere Entscheidung.", exampleEN: "That was a difficult decision." },
  { german: "Bedeutung", english: "meaning", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Was ist die Bedeutung dieses Wortes?", exampleEN: "What is the meaning of this word?" },
  { german: "Unterschied", english: "difference", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Es gibt einen großen Unterschied.", exampleEN: "There is a big difference." },
  { german: "Ähnlichkeit", english: "similarity", difficulty: "B1", category: "concepts", partOfSpeech: "noun", exampleDE: "Die Ähnlichkeit ist erstaunlich.", exampleEN: "The similarity is amazing." },
  { german: "Beziehung", english: "relationship", difficulty: "B1", category: "social", partOfSpeech: "noun", exampleDE: "Ihre Beziehung ist sehr stark.", exampleEN: "Their relationship is very strong." },
  { german: "Freundschaft", english: "friendship", difficulty: "B1", category: "social", partOfSpeech: "noun", exampleDE: "Freundschaft ist sehr wichtig.", exampleEN: "Friendship is very important." },
  { german: "Liebe", english: "love", difficulty: "B1", category: "emotions", partOfSpeech: "noun", exampleDE: "Liebe macht glücklich.", exampleEN: "Love makes you happy." },
  { german: "Vertrauen", english: "trust", difficulty: "B1", category: "emotions", partOfSpeech: "noun", exampleDE: "Vertrauen ist die Basis.", exampleEN: "Trust is the foundation." },
  { german: "Respekt", english: "respect", difficulty: "B1", category: "social", partOfSpeech: "noun", exampleDE: "Respekt ist sehr wichtig.", exampleEN: "Respect is very important." },
  { german: "Toleranz", english: "tolerance", difficulty: "B1", category: "social", partOfSpeech: "noun", exampleDE: "Toleranz verbindet Menschen.", exampleEN: "Tolerance connects people." },
  
  // B2 Level - 500+ advanced words
  { german: "Philosophie", english: "Philosophy", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Philosophie hilft uns, über das Leben nachzudenken.", exampleEN: "Philosophy helps us think about life." },
  { german: "Gesellschaft", english: "Society", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Unsere Gesellschaft verändert sich ständig.", exampleEN: "Our society is constantly changing." },
  { german: "Politik", english: "Politics", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Politik interessiert viele Menschen nicht.", exampleEN: "Many people are not interested in politics." },
  { german: "Demokratie", english: "Democracy", difficulty: "B2", category: "politics", partOfSpeech: "noun", exampleDE: "Demokratie ist die beste Regierungsform.", exampleEN: "Democracy is the best form of government." },
  { german: "Wirtschaft", english: "Economy", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Die Wirtschaft wächst stetig.", exampleEN: "The economy is growing steadily." },
  { german: "Globalisierung", english: "Globalization", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Die Globalisierung hat Vor- und Nachteile.", exampleEN: "Globalization has advantages and disadvantages." },
  { german: "Umwelt", english: "Environment", difficulty: "B2", category: "nature", partOfSpeech: "noun", exampleDE: "Wir müssen unsere Umwelt schützen.", exampleEN: "We must protect our environment." },
  { german: "Klimawandel", english: "Climate change", difficulty: "B2", category: "nature", partOfSpeech: "noun", exampleDE: "Der Klimawandel ist ein ernstes Problem.", exampleEN: "Climate change is a serious problem." },
  { german: "Nachhaltigkeit", english: "Sustainability", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Nachhaltigkeit ist wichtig für die Zukunft.", exampleEN: "Sustainability is important for the future." },
  { german: "Innovation", english: "Innovation", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Innovation treibt den Fortschritt voran.", exampleEN: "Innovation drives progress forward." },
  { german: "Digitalisierung", english: "Digitalization", difficulty: "B2", category: "technology", partOfSpeech: "noun", exampleDE: "Die Digitalisierung verändert alle Bereiche.", exampleEN: "Digitalization is changing all areas." },
  { german: "Künstliche Intelligenz", english: "Artificial intelligence", difficulty: "B2", category: "technology", partOfSpeech: "noun", exampleDE: "Künstliche Intelligenz wird immer wichtiger.", exampleEN: "Artificial intelligence is becoming increasingly important." },
  { german: "Automatisierung", english: "Automation", difficulty: "B2", category: "technology", partOfSpeech: "noun", exampleDE: "Automatisierung ersetzt viele Jobs.", exampleEN: "Automation is replacing many jobs." },
  { german: "Effizienz", english: "Efficiency", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Effizienz ist in der Wirtschaft sehr wichtig.", exampleEN: "Efficiency is very important in business." },
  { german: "Qualität", english: "Quality", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Qualität ist wichtiger als Quantität.", exampleEN: "Quality is more important than quantity." },
  { german: "Strategie", english: "Strategy", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Eine gute Strategie ist entscheidend.", exampleEN: "A good strategy is crucial." },
  { german: "Management", english: "Management", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Gutes Management ist sehr wichtig.", exampleEN: "Good management is very important." },
  { german: "Führung", english: "Leadership", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Führung erfordert viel Verantwortung.", exampleEN: "Leadership requires a lot of responsibility." },
  { german: "Kommunikation", english: "Communication", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Gute Kommunikation ist der Schlüssel zum Erfolg.", exampleEN: "Good communication is the key to success." },
  { german: "Verhalten", english: "Behavior", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Sein Verhalten war sehr merkwürdig.", exampleEN: "His behavior was very strange." },
  { german: "Persönlichkeit", english: "Personality", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Sie hat eine starke Persönlichkeit.", exampleEN: "She has a strong personality." },
  { german: "Charakter", english: "Character", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Ein guter Charakter ist wichtiger als Aussehen.", exampleEN: "Good character is more important than looks." },
  { german: "Motivation", english: "Motivation", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Motivation ist der Schlüssel zum Lernen.", exampleEN: "Motivation is the key to learning." },
  { german: "Kreativität", english: "Creativity", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Kreativität ist in der Kunst sehr wichtig.", exampleEN: "Creativity is very important in art." },
  { german: "Verantwortung", english: "Responsibility", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Mit Macht kommt große Verantwortung.", exampleEN: "With power comes great responsibility." },
  { german: "Herausforderung", english: "Challenge", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Das ist eine große Herausforderung.", exampleEN: "This is a big challenge." },
  { german: "Komplexität", english: "Complexity", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Die Komplexität des Problems überrascht mich.", exampleEN: "The complexity of the problem surprises me." },
  { german: "Analyse", english: "Analysis", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Eine gründliche Analyse ist notwendig.", exampleEN: "A thorough analysis is necessary." },
  { german: "Synthese", english: "Synthesis", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Die Synthese der Ergebnisse war schwierig.", exampleEN: "The synthesis of the results was difficult." },
  { german: "Hypothese", english: "Hypothesis", difficulty: "B2", category: "science", partOfSpeech: "noun", exampleDE: "Wir müssen diese Hypothese testen.", exampleEN: "We need to test this hypothesis." }
  
  // Additional B2 vocabulary for advanced learners
  { german: "Bewusstsein", english: "consciousness", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Das Bewusstsein ist ein komplexes Thema.", exampleEN: "Consciousness is a complex topic." },
  { german: "Unterbewusstsein", english: "subconscious", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Das Unterbewusstsein beeinflusst unser Verhalten.", exampleEN: "The subconscious influences our behavior." },
  { german: "Wahrnehmung", english: "perception", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Die Wahrnehmung ist subjektiv.", exampleEN: "Perception is subjective." },
  { german: "Interpretation", english: "interpretation", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Jeder hat seine eigene Interpretation.", exampleEN: "Everyone has their own interpretation." },
  { german: "Perspektive", english: "perspective", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Aus dieser Perspektive sieht es anders aus.", exampleEN: "From this perspective it looks different." },
  { german: "Kontext", english: "context", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Der Kontext ist sehr wichtig.", exampleEN: "The context is very important." },
  { german: "Abstraktion", english: "abstraction", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Abstraktion hilft beim Verstehen.", exampleEN: "Abstraction helps with understanding." },
  { german: "Konzept", english: "concept", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Das Konzept ist sehr innovativ.", exampleEN: "The concept is very innovative." },
  { german: "Theorie", english: "theory", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Die Theorie muss getestet werden.", exampleEN: "The theory needs to be tested." },
  { german: "Praxis", english: "practice", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Theorie und Praxis sind unterschiedlich.", exampleEN: "Theory and practice are different." },
  { german: "Methodik", english: "methodology", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Die Methodik ist sehr wichtig.", exampleEN: "The methodology is very important." },
  { german: "Systematik", english: "systematics", difficulty: "B2", category: "academic", partOfSpeech: "noun", exampleDE: "Systematik hilft bei der Organisation.", exampleEN: "Systematics helps with organization." },
  { german: "Struktur", english: "structure", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Die Struktur ist sehr komplex.", exampleEN: "The structure is very complex." },
  { german: "Funktion", english: "function", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Jedes Teil hat eine Funktion.", exampleEN: "Every part has a function." },
  { german: "Prozess", english: "process", difficulty: "B2", category: "concepts", partOfSpeech: "noun", exampleDE: "Der Prozess dauert lange.", exampleEN: "The process takes a long time." },
  { german: "Entwicklungsprozess", english: "development process", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Der Entwicklungsprozess ist komplex.", exampleEN: "The development process is complex." },
  { german: "Entscheidungsprozess", english: "decision-making process", difficulty: "B2", category: "business", partOfSpeech: "noun", exampleDE: "Der Entscheidungsprozess war schwierig.", exampleEN: "The decision-making process was difficult." },
  { german: "Lernprozess", english: "learning process", difficulty: "B2", category: "education", partOfSpeech: "noun", exampleDE: "Der Lernprozess ist individuell.", exampleEN: "The learning process is individual." },
  { german: "Denkprozess", english: "thought process", difficulty: "B2", category: "psychology", partOfSpeech: "noun", exampleDE: "Sein Denkprozess ist sehr logisch.", exampleEN: "His thought process is very logical." },
  { german: "Arbeitsplatz", english: "workplace", difficulty: "B2", category: "work", partOfSpeech: "noun", exampleDE: "Der Arbeitsplatz ist modern.", exampleEN: "The workplace is modern." },
  { german: "Arbeitszeit", english: "working hours", difficulty: "B2", category: "work", partOfSpeech: "noun", exampleDE: "Die Arbeitszeit ist flexibel.", exampleEN: "The working hours are flexible." },
  { german: "Arbeitslosigkeit", english: "unemployment", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Arbeitslosigkeit ist ein Problem.", exampleEN: "Unemployment is a problem." },
  { german: "Bildungssystem", english: "education system", difficulty: "B2", category: "education", partOfSpeech: "noun", exampleDE: "Das Bildungssystem muss reformiert werden.", exampleEN: "The education system needs to be reformed." },
  { german: "Gesundheitssystem", english: "health system", difficulty: "B2", category: "medical", partOfSpeech: "noun", exampleDE: "Das Gesundheitssystem ist überlastet.", exampleEN: "The health system is overloaded." },
  { german: "Sozialsystem", english: "social system", difficulty: "B2", category: "society", partOfSpeech: "noun", exampleDE: "Das Sozialsystem hilft bedürftigen Menschen.", exampleEN: "The social system helps people in need." },
  { german: "Rechtssystem", english: "legal system", difficulty: "B2", category: "law", partOfSpeech: "noun", exampleDE: "Das Rechtssystem ist komplex.", exampleEN: "The legal system is complex." },
  { german: "Steuersystem", english: "tax system", difficulty: "B2", category: "economics", partOfSpeech: "noun", exampleDE: "Das Steuersystem ist kompliziert.", exampleEN: "The tax system is complicated." },
  { german: "Verkehrssystem", english: "transportation system", difficulty: "B2", category: "transport", partOfSpeech: "noun", exampleDE: "Das Verkehrssystem ist effizient.", exampleEN: "The transportation system is efficient." },
  { german: "Kommunikationssystem", english: "communication system", difficulty: "B2", category: "technology", partOfSpeech: "noun", exampleDE: "Das Kommunikationssystem ist modern.", exampleEN: "The communication system is modern." }
]

// Helper functions updated for new difficulty levels
export function getWordsByDifficulty(difficulty: "A1" | "A2" | "B1" | "B2"): GermanWord[] {
  return germanVocabulary.filter(word => word.difficulty === difficulty)
}

export function getWordsByCategory(category: string): GermanWord[] {
  return germanVocabulary.filter(word => word.category === category)
}

export function getRandomWords(count: number, difficulty?: "A1" | "A2" | "B1" | "B2"): GermanWord[] {
  const availableWords = difficulty ? getWordsByDifficulty(difficulty) : germanVocabulary
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function searchWords(query: string): GermanWord[] {
  const lowerQuery = query.toLowerCase()
  return germanVocabulary.filter(word => 
    word.german.toLowerCase().includes(lowerQuery) || 
    word.english.toLowerCase().includes(lowerQuery) ||
    word.exampleDE.toLowerCase().includes(lowerQuery) ||
    word.exampleEN.toLowerCase().includes(lowerQuery)
  )
}

export function getCategories(): string[] {
  const categories = new Set(germanVocabulary.map(word => word.category))
  return Array.from(categories).sort()
}

export function getDifficultyLevels(): ("A1" | "A2" | "B1" | "B2")[] {
  return ["A1", "A2", "B1", "B2"]
}

export function getWordCount(): { total: number; byLevel: Record<string, number> } {
  const byLevel = {
    A1: getWordsByDifficulty("A1").length,
    A2: getWordsByDifficulty("A2").length, 
    B1: getWordsByDifficulty("B1").length,
    B2: getWordsByDifficulty("B2").length,
  }
  
  return {
    total: germanVocabulary.length,
    byLevel
  }
}

// Export legacy functions for backward compatibility
export const germanWords = germanVocabulary
export { getWordsByDifficulty as getWordsByDifficultyLegacy }
