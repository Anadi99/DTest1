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
  // A1 Level - 200+ essential words
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
  
  // A2 Level - 200+ intermediate basic words
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
  
  // B1 Level - 200+ intermediate words
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
  
  // B2 Level - 200+ advanced words
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
