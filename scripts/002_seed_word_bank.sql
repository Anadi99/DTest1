-- Insert sample German vocabulary for the game
INSERT INTO public.word_bank (german_word, english_translation, difficulty_level, category) VALUES
-- Beginner words
('Haus', 'House', 'beginner', 'home'),
('Auto', 'Car', 'beginner', 'transport'),
('Katze', 'Cat', 'beginner', 'animals'),
('Hund', 'Dog', 'beginner', 'animals'),
('Baum', 'Tree', 'beginner', 'nature'),
('Wasser', 'Water', 'beginner', 'nature'),
('Brot', 'Bread', 'beginner', 'food'),
('Milch', 'Milk', 'beginner', 'food'),
('Schule', 'School', 'beginner', 'places'),
('Buch', 'Book', 'beginner', 'objects'),
('Tisch', 'Table', 'beginner', 'furniture'),
('Stuhl', 'Chair', 'beginner', 'furniture'),
('Fenster', 'Window', 'beginner', 'home'),
('Tür', 'Door', 'beginner', 'home'),
('Sonne', 'Sun', 'beginner', 'nature'),
('Mond', 'Moon', 'beginner', 'nature'),
('Stern', 'Star', 'beginner', 'nature'),
('Blume', 'Flower', 'beginner', 'nature'),
('Apfel', 'Apple', 'beginner', 'food'),
('Banane', 'Banana', 'beginner', 'food'),

-- Intermediate words
('Flugzeug', 'Airplane', 'intermediate', 'transport'),
('Krankenhaus', 'Hospital', 'intermediate', 'places'),
('Universität', 'University', 'intermediate', 'places'),
('Bibliothek', 'Library', 'intermediate', 'places'),
('Regenschirm', 'Umbrella', 'intermediate', 'objects'),
('Schlüssel', 'Key', 'intermediate', 'objects'),
('Handschuh', 'Glove', 'intermediate', 'clothing'),
('Brille', 'Glasses', 'intermediate', 'objects'),
('Zeitung', 'Newspaper', 'intermediate', 'objects'),
('Briefkasten', 'Mailbox', 'intermediate', 'objects'),
('Kühlschrank', 'Refrigerator', 'intermediate', 'appliances'),
('Waschmaschine', 'Washing machine', 'intermediate', 'appliances'),
('Fernseher', 'Television', 'intermediate', 'appliances'),
('Computer', 'Computer', 'intermediate', 'technology'),
('Telefon', 'Telephone', 'intermediate', 'technology'),

-- Advanced words
('Verantwortung', 'Responsibility', 'advanced', 'abstract'),
('Gerechtigkeit', 'Justice', 'advanced', 'abstract'),
('Wissenschaft', 'Science', 'advanced', 'academic'),
('Philosophie', 'Philosophy', 'advanced', 'academic'),
('Demokratie', 'Democracy', 'advanced', 'politics'),
('Umweltschutz', 'Environmental protection', 'advanced', 'environment'),
('Nachhaltigkeit', 'Sustainability', 'advanced', 'environment'),
('Globalisierung', 'Globalization', 'advanced', 'economics'),
('Technologie', 'Technology', 'advanced', 'science'),
('Innovation', 'Innovation', 'advanced', 'business')

ON CONFLICT (german_word) DO NOTHING;
