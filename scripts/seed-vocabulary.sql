-- Seed vocabulary words for different difficulty levels

-- Beginner level words
INSERT INTO vocabulary_words (german_word, english_translation, difficulty_level, category, pronunciation, example_sentence) VALUES
-- Animals
('Hund', 'Dog', 'beginner', 'animals', 'hoont', 'Der Hund bellt. (The dog barks.)'),
('Katze', 'Cat', 'beginner', 'animals', 'KAT-tse', 'Die Katze schläft. (The cat sleeps.)'),
('Vogel', 'Bird', 'beginner', 'animals', 'FOH-gel', 'Der Vogel singt. (The bird sings.)'),
('Fisch', 'Fish', 'beginner', 'animals', 'fish', 'Der Fisch schwimmt. (The fish swims.)'),
('Pferd', 'Horse', 'beginner', 'animals', 'pfairt', 'Das Pferd läuft. (The horse runs.)'),

-- Home & Family
('Haus', 'House', 'beginner', 'home', 'house', 'Das Haus ist groß. (The house is big.)'),
('Tür', 'Door', 'beginner', 'home', 'tuer', 'Die Tür ist offen. (The door is open.)'),
('Fenster', 'Window', 'beginner', 'home', 'FEN-ster', 'Das Fenster ist sauber. (The window is clean.)'),
('Tisch', 'Table', 'beginner', 'home', 'tish', 'Der Tisch ist rund. (The table is round.)'),
('Stuhl', 'Chair', 'beginner', 'home', 'shtool', 'Der Stuhl ist bequem. (The chair is comfortable.)'),
('Bett', 'Bed', 'beginner', 'home', 'bet', 'Das Bett ist weich. (The bed is soft.)'),

-- Food & Drink
('Brot', 'Bread', 'beginner', 'food', 'broht', 'Das Brot ist frisch. (The bread is fresh.)'),
('Milch', 'Milk', 'beginner', 'food', 'milkh', 'Die Milch ist kalt. (The milk is cold.)'),
('Wasser', 'Water', 'beginner', 'food', 'VAS-ser', 'Das Wasser ist klar. (The water is clear.)'),
('Apfel', 'Apple', 'beginner', 'food', 'AHP-fel', 'Der Apfel ist rot. (The apple is red.)'),
('Banane', 'Banana', 'beginner', 'food', 'ba-NAH-ne', 'Die Banane ist gelb. (The banana is yellow.)'),
('Orange', 'Orange', 'beginner', 'food', 'o-RAHN-zhe', 'Die Orange ist süß. (The orange is sweet.)'),

-- Nature
('Baum', 'Tree', 'beginner', 'nature', 'bowm', 'Der Baum ist hoch. (The tree is tall.)'),
('Blume', 'Flower', 'beginner', 'nature', 'BLOO-me', 'Die Blume ist schön. (The flower is beautiful.)'),
('Sonne', 'Sun', 'beginner', 'nature', 'ZON-ne', 'Die Sonne scheint. (The sun shines.)'),
('Mond', 'Moon', 'beginner', 'nature', 'mohnt', 'Der Mond ist hell. (The moon is bright.)'),
('Stern', 'Star', 'beginner', 'nature', 'shtern', 'Der Stern funkelt. (The star twinkles.)'),

-- Transport
('Auto', 'Car', 'beginner', 'transport', 'OW-toh', 'Das Auto ist schnell. (The car is fast.)'),
('Bus', 'Bus', 'beginner', 'transport', 'boos', 'Der Bus ist voll. (The bus is full.)'),
('Zug', 'Train', 'beginner', 'transport', 'tsook', 'Der Zug ist pünktlich. (The train is on time.)'),

-- Objects
('Buch', 'Book', 'beginner', 'objects', 'bookh', 'Das Buch ist interessant. (The book is interesting.)'),
('Stift', 'Pen', 'beginner', 'objects', 'shtift', 'Der Stift ist blau. (The pen is blue.)'),
('Uhr', 'Clock', 'beginner', 'objects', 'oor', 'Die Uhr zeigt drei. (The clock shows three.)');

-- Intermediate level words
INSERT INTO vocabulary_words (german_word, english_translation, difficulty_level, category, pronunciation, example_sentence) VALUES
-- Animals
('Schmetterling', 'Butterfly', 'intermediate', 'animals', 'SHMET-ter-ling', 'Der Schmetterling ist bunt. (The butterfly is colorful.)'),
('Eichhörnchen', 'Squirrel', 'intermediate', 'animals', 'AYKH-hern-khen', 'Das Eichhörnchen sammelt Nüsse. (The squirrel collects nuts.)'),
('Schildkröte', 'Turtle', 'intermediate', 'animals', 'SHILT-krer-te', 'Die Schildkröte ist langsam. (The turtle is slow.)'),

-- Transport
('Flugzeug', 'Airplane', 'intermediate', 'transport', 'FLOOK-tsoyk', 'Das Flugzeug fliegt hoch. (The airplane flies high.)'),
('Fahrrad', 'Bicycle', 'intermediate', 'transport', 'FAHR-raht', 'Das Fahrrad ist umweltfreundlich. (The bicycle is environmentally friendly.)'),
('Motorrad', 'Motorcycle', 'intermediate', 'transport', 'mo-TOR-raht', 'Das Motorrad ist laut. (The motorcycle is loud.)'),

-- Places
('Krankenhaus', 'Hospital', 'intermediate', 'places', 'KRAN-ken-house', 'Das Krankenhaus ist neu. (The hospital is new.)'),
('Bibliothek', 'Library', 'intermediate', 'places', 'bib-li-o-TAYK', 'Die Bibliothek ist ruhig. (The library is quiet.)'),
('Supermarkt', 'Supermarket', 'intermediate', 'places', 'ZOO-per-markt', 'Der Supermarkt ist groß. (The supermarket is big.)'),

-- Food & Drink
('Schokolade', 'Chocolate', 'intermediate', 'food', 'sho-ko-LAH-de', 'Die Schokolade ist süß. (The chocolate is sweet.)'),
('Kaffee', 'Coffee', 'intermediate', 'food', 'ka-FAY', 'Der Kaffee ist heiß. (The coffee is hot.)'),
('Marmelade', 'Jam', 'intermediate', 'food', 'mar-me-LAH-de', 'Die Marmelade ist lecker. (The jam is delicious.)'),

-- Objects
('Computer', 'Computer', 'intermediate', 'objects', 'kom-PYU-ter', 'Der Computer ist modern. (The computer is modern.)'),
('Telefon', 'Telephone', 'intermediate', 'objects', 'te-le-FOHN', 'Das Telefon klingelt. (The telephone rings.)'),
('Fernseher', 'Television', 'intermediate', 'objects', 'FERN-zay-er', 'Der Fernseher ist groß. (The television is big.)');

-- Advanced level words
INSERT INTO vocabulary_words (german_word, english_translation, difficulty_level, category, pronunciation, example_sentence) VALUES
-- Abstract concepts
('Verantwortung', 'Responsibility', 'advanced', 'abstract', 'fer-ANT-vor-toong', 'Er trägt die Verantwortung. (He bears the responsibility.)'),
('Gerechtigkeit', 'Justice', 'advanced', 'abstract', 'ge-REKH-tikh-kite', 'Gerechtigkeit ist wichtig. (Justice is important.)'),
('Nachhaltigkeit', 'Sustainability', 'advanced', 'abstract', 'NAKH-hal-tikh-kite', 'Nachhaltigkeit schützt die Umwelt. (Sustainability protects the environment.)'),
('Meinungsfreiheit', 'Freedom of speech', 'advanced', 'abstract', 'MY-noonks-fry-hite', 'Meinungsfreiheit ist ein Grundrecht. (Freedom of speech is a fundamental right.)'),

-- Complex objects/concepts
('Wissenschaft', 'Science', 'advanced', 'abstract', 'VIS-sen-shaft', 'Die Wissenschaft entwickelt sich. (Science develops.)'),
('Technologie', 'Technology', 'advanced', 'objects', 'tekh-no-lo-GEE', 'Die Technologie verändert sich schnell. (Technology changes quickly.)'),
('Architektur', 'Architecture', 'advanced', 'abstract', 'ar-khi-tek-TOOR', 'Die Architektur ist beeindruckend. (The architecture is impressive.)'),

-- Professional/Academic
('Universität', 'University', 'advanced', 'places', 'oo-ni-ver-zi-TAYT', 'Die Universität ist renommiert. (The university is renowned.)'),
('Forschung', 'Research', 'advanced', 'abstract', 'FOR-shoong', 'Die Forschung ist wichtig. (Research is important.)'),
('Entwicklung', 'Development', 'advanced', 'abstract', 'ent-VIK-loong', 'Die Entwicklung ist positiv. (The development is positive.)');
