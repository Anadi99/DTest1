-- Function to create a new game with word cards
CREATE OR REPLACE FUNCTION create_game_with_cards(
  p_room_code TEXT,
  p_creator_id UUID,
  p_creator_team TEXT DEFAULT 'red'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_game_id UUID;
  v_word RECORD;
  v_position INTEGER := 0;
  v_card_types TEXT[] := ARRAY['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                               'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                               'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
                               'assassin'];
  v_shuffled_types TEXT[];
BEGIN
  -- Create the game
  INSERT INTO public.games (room_code, status)
  VALUES (p_room_code, 'waiting')
  RETURNING id INTO v_game_id;
  
  -- Add creator as player
  INSERT INTO public.game_players (game_id, player_id, team, role)
  VALUES (v_game_id, p_creator_id, p_creator_team, 'operative');
  
  -- Shuffle card types
  SELECT array_agg(card_type ORDER BY random()) INTO v_shuffled_types
  FROM unnest(v_card_types) AS card_type;
  
  -- Select 25 random words and create cards
  FOR v_word IN (
    SELECT german_word, english_translation
    FROM public.word_bank
    ORDER BY random()
    LIMIT 25
  ) LOOP
    v_position := v_position + 1;
    
    INSERT INTO public.word_cards (
      game_id, 
      word, 
      german_word, 
      english_translation, 
      card_type, 
      position
    ) VALUES (
      v_game_id,
      v_word.german_word,
      v_word.german_word,
      v_word.english_translation,
      v_shuffled_types[v_position],
      v_position
    );
  END LOOP;
  
  RETURN v_game_id;
END;
$$;

-- Function to join a game
CREATE OR REPLACE FUNCTION join_game(
  p_room_code TEXT,
  p_player_id UUID,
  p_team TEXT,
  p_role TEXT DEFAULT 'operative'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_game_id UUID;
  v_player_count INTEGER;
BEGIN
  -- Find the game
  SELECT id INTO v_game_id
  FROM public.games
  WHERE room_code = p_room_code AND status = 'waiting';
  
  IF v_game_id IS NULL THEN
    RAISE EXCEPTION 'Game not found or already started';
  END IF;
  
  -- Check if player is already in game
  IF EXISTS (
    SELECT 1 FROM public.game_players 
    WHERE game_id = v_game_id AND player_id = p_player_id
  ) THEN
    RAISE EXCEPTION 'Player already in game';
  END IF;
  
  -- Count current players
  SELECT COUNT(*) INTO v_player_count
  FROM public.game_players
  WHERE game_id = v_game_id;
  
  IF v_player_count >= 8 THEN
    RAISE EXCEPTION 'Game is full';
  END IF;
  
  -- Add player to game
  INSERT INTO public.game_players (game_id, player_id, team, role)
  VALUES (v_game_id, p_player_id, p_team, p_role);
  
  RETURN v_game_id;
END;
$$;
