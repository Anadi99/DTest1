-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables for Deutchnames game

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('waiting', 'in_progress', 'completed')),
  current_turn TEXT CHECK (current_turn IN ('red', 'blue')),
  red_spymaster UUID REFERENCES players(id),
  blue_spymaster UUID REFERENCES players(id),
  red_score INTEGER DEFAULT 0,
  blue_score INTEGER DEFAULT 0,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game players table (junction table for players in games)
CREATE TABLE IF NOT EXISTS game_players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  role TEXT NOT NULL CHECK (role IN ('spymaster', 'operative')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, player_id)
);

-- Vocabulary words table
CREATE TABLE IF NOT EXISTS vocabulary_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  german_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT NOT NULL,
  pronunciation TEXT,
  example_sentence TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES players(id),
  UNIQUE(german_word, english_translation)
);

-- Word cards table (cards for each game)
CREATE TABLE IF NOT EXISTS word_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  german_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  card_type TEXT NOT NULL CHECK (card_type IN ('red', 'blue', 'neutral', 'assassin')),
  position INTEGER NOT NULL,
  revealed BOOLEAN DEFAULT FALSE,
  revealed_at TIMESTAMP WITH TIME ZONE,
  revealed_by UUID REFERENCES players(id)
);

-- Clues table
CREATE TABLE IF NOT EXISTS clues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  spymaster_id UUID NOT NULL REFERENCES players(id),
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  clue_word TEXT NOT NULL,
  clue_number INTEGER NOT NULL CHECK (clue_number >= 1 AND clue_number <= 9),
  turn_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game events table (for real-time updates and history)
CREATE TABLE IF NOT EXISTS game_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('player_joined', 'player_left', 'clue_given', 'card_revealed', 'turn_ended', 'game_ended')),
  player_id UUID NOT NULL REFERENCES players(id),
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_room_code ON games(room_code);
CREATE INDEX IF NOT EXISTS idx_game_players_game_id ON game_players(game_id);
CREATE INDEX IF NOT EXISTS idx_word_cards_game_id ON word_cards(game_id);
CREATE INDEX IF NOT EXISTS idx_word_cards_position ON word_cards(game_id, position);
CREATE INDEX IF NOT EXISTS idx_clues_game_id ON clues(game_id);
CREATE INDEX IF NOT EXISTS idx_game_events_game_id ON game_events(game_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_difficulty ON vocabulary_words(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON vocabulary_words(category);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE clues ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - can be made more restrictive)
CREATE POLICY "Public read access" ON players FOR SELECT USING (true);
CREATE POLICY "Public read access" ON games FOR SELECT USING (true);
CREATE POLICY "Public read access" ON game_players FOR SELECT USING (true);
CREATE POLICY "Public read access" ON vocabulary_words FOR SELECT USING (true);
CREATE POLICY "Public read access" ON word_cards FOR SELECT USING (true);
CREATE POLICY "Public read access" ON clues FOR SELECT USING (true);
CREATE POLICY "Public read access" ON game_events FOR SELECT USING (true);

-- Allow inserts for authenticated users (you can make this more restrictive)
CREATE POLICY "Authenticated insert" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON games FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON game_players FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON vocabulary_words FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON word_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON clues FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert" ON game_events FOR INSERT WITH CHECK (true);

-- Allow updates for authenticated users
CREATE POLICY "Authenticated update" ON games FOR UPDATE USING (true);
CREATE POLICY "Authenticated update" ON game_players FOR UPDATE USING (true);
CREATE POLICY "Authenticated update" ON word_cards FOR UPDATE USING (true);

-- Allow deletes for authenticated users
CREATE POLICY "Authenticated delete" ON game_players FOR DELETE USING (true);
