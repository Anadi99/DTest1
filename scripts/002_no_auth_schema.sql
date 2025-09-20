-- Drop existing tables and policies if they exist
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view games they're in" ON public.games;
DROP POLICY IF EXISTS "Users can create games" ON public.games;
DROP POLICY IF EXISTS "Players can update games they're in" ON public.games;
DROP POLICY IF EXISTS "Users can view players in their games" ON public.game_players;
DROP POLICY IF EXISTS "Users can join games" ON public.game_players;
DROP POLICY IF EXISTS "Users can leave games" ON public.game_players;
DROP POLICY IF EXISTS "Players can view cards in their games" ON public.word_cards;
DROP POLICY IF EXISTS "System can manage word cards" ON public.word_cards;
DROP POLICY IF EXISTS "Players can view clues in their games" ON public.clues;
DROP POLICY IF EXISTS "Spymasters can create clues" ON public.clues;
DROP POLICY IF EXISTS "Everyone can view word bank" ON public.word_bank;
DROP POLICY IF EXISTS "Authenticated users can add words" ON public.word_bank;

DROP TABLE IF EXISTS public.clues CASCADE;
DROP TABLE IF EXISTS public.word_cards CASCADE;
DROP TABLE IF EXISTS public.game_players CASCADE;
DROP TABLE IF EXISTS public.games CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.word_bank CASCADE;

-- Create games table (no auth required)
CREATE TABLE IF NOT EXISTS public.games (
  id TEXT PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed')),
  current_turn TEXT CHECK (current_turn IN ('red', 'blue')),
  red_spymaster TEXT,
  blue_spymaster TEXT,
  red_score INTEGER DEFAULT 0,
  blue_score INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  creator_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_players table (no auth required)
CREATE TABLE IF NOT EXISTS public.game_players (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  game_id TEXT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  team TEXT CHECK (team IN ('red', 'blue')),
  role TEXT CHECK (role IN ('spymaster', 'operative')),
  is_creator BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, player_id)
);

-- Create word_cards table for the game board
CREATE TABLE IF NOT EXISTS public.word_cards (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  game_id TEXT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  german_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  card_type TEXT NOT NULL CHECK (card_type IN ('red', 'blue', 'neutral', 'assassin')),
  position INTEGER NOT NULL,
  revealed BOOLEAN DEFAULT FALSE,
  revealed_at TIMESTAMP WITH TIME ZONE,
  revealed_by TEXT
);

-- Create clues table for spymaster clues
CREATE TABLE IF NOT EXISTS public.clues (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  game_id TEXT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  spymaster_id TEXT NOT NULL,
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  clue_word TEXT NOT NULL,
  clue_number INTEGER NOT NULL,
  turn_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create word_bank table for German vocabulary
CREATE TABLE IF NOT EXISTS public.word_bank (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  german_word TEXT UNIQUE NOT NULL,
  english_translation TEXT NOT NULL,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable Row Level Security for all tables (no auth required)
ALTER TABLE public.games DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_players DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clues DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_bank DISABLE ROW LEVEL SECURITY;

-- Insert sample German vocabulary
INSERT INTO public.word_bank (german_word, english_translation, difficulty_level, category) VALUES
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
('Orange', 'Orange', 'beginner', 'food'),
('Kaffee', 'Coffee', 'beginner', 'food'),
('Tee', 'Tea', 'beginner', 'food'),
('Zucker', 'Sugar', 'beginner', 'food'),
('Salz', 'Salt', 'beginner', 'food'),
('Flugzeug', 'Airplane', 'intermediate', 'transport'),
('Krankenhaus', 'Hospital', 'intermediate', 'places'),
('Universität', 'University', 'intermediate', 'places'),
('Regenschirm', 'Umbrella', 'intermediate', 'objects'),
('Schokolade', 'Chocolate', 'intermediate', 'food'),
('Verantwortung', 'Responsibility', 'advanced', 'abstract'),
('Wissenschaft', 'Science', 'advanced', 'academic'),
('Philosophie', 'Philosophy', 'advanced', 'academic'),
('Demokratie', 'Democracy', 'advanced', 'politics'),
('Nachhaltigkeit', 'Sustainability', 'advanced', 'environment')
ON CONFLICT (german_word) DO NOTHING;
