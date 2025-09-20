-- Create users table for profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed')),
  current_turn TEXT CHECK (current_turn IN ('red', 'blue')),
  red_spymaster UUID REFERENCES public.profiles(id),
  blue_spymaster UUID REFERENCES public.profiles(id),
  red_score INTEGER DEFAULT 0,
  blue_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_players table for tracking who's in each game
CREATE TABLE IF NOT EXISTS public.game_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  role TEXT NOT NULL CHECK (role IN ('spymaster', 'operative')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, player_id)
);

-- Create word_cards table for the game board
CREATE TABLE IF NOT EXISTS public.word_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  german_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  card_type TEXT NOT NULL CHECK (card_type IN ('red', 'blue', 'neutral', 'assassin')),
  position INTEGER NOT NULL,
  revealed BOOLEAN DEFAULT FALSE,
  revealed_at TIMESTAMP WITH TIME ZONE,
  revealed_by UUID REFERENCES public.profiles(id)
);

-- Create clues table for spymaster clues
CREATE TABLE IF NOT EXISTS public.clues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  spymaster_id UUID NOT NULL REFERENCES public.profiles(id),
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  clue_word TEXT NOT NULL,
  clue_number INTEGER NOT NULL,
  turn_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create word_bank table for German vocabulary
CREATE TABLE IF NOT EXISTS public.word_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  german_word TEXT UNIQUE NOT NULL,
  english_translation TEXT NOT NULL,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_bank ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for games
CREATE POLICY "Users can view games they're in" ON public.games FOR SELECT USING (
  id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid())
);
CREATE POLICY "Users can create games" ON public.games FOR INSERT WITH CHECK (true);
CREATE POLICY "Players can update games they're in" ON public.games FOR UPDATE USING (
  id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid())
);

-- RLS Policies for game_players
CREATE POLICY "Users can view players in their games" ON public.game_players FOR SELECT USING (
  game_id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid())
);
CREATE POLICY "Users can join games" ON public.game_players FOR INSERT WITH CHECK (player_id = auth.uid());
CREATE POLICY "Users can leave games" ON public.game_players FOR DELETE USING (player_id = auth.uid());

-- RLS Policies for word_cards
CREATE POLICY "Players can view cards in their games" ON public.word_cards FOR SELECT USING (
  game_id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid())
);
CREATE POLICY "System can manage word cards" ON public.word_cards FOR ALL USING (true);

-- RLS Policies for clues
CREATE POLICY "Players can view clues in their games" ON public.clues FOR SELECT USING (
  game_id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid())
);
CREATE POLICY "Spymasters can create clues" ON public.clues FOR INSERT WITH CHECK (
  spymaster_id = auth.uid() AND
  game_id IN (SELECT game_id FROM public.game_players WHERE player_id = auth.uid() AND role = 'spymaster')
);

-- RLS Policies for word_bank
CREATE POLICY "Everyone can view word bank" ON public.word_bank FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add words" ON public.word_bank FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
