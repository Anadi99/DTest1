// Database types for Supabase integration
export interface Game {
  id: string
  room_code: string
  status: "waiting" | "in_progress" | "completed"
  current_turn?: "red" | "blue"
  red_spymaster?: string
  blue_spymaster?: string
  red_score: number
  blue_score: number
  difficulty_level: "beginner" | "intermediate" | "advanced"
  created_at: string
  updated_at: string
}

export interface GamePlayer {
  id: string
  game_id: string
  player_id: string
  team: "red" | "blue"
  role: "spymaster" | "operative"
  joined_at: string
}

export interface WordCard {
  id: string
  game_id: string
  word: string
  german_word: string
  english_translation: string
  card_type: "red" | "blue" | "neutral" | "assassin"
  position: number
  revealed: boolean
  revealed_at?: string
  revealed_by?: string
}

export interface Clue {
  id: string
  game_id: string
  spymaster_id: string
  team: "red" | "blue"
  clue_word: string
  clue_number: number
  turn_number: number
  created_at: string
}

export interface VocabularyWord {
  id: string
  german_word: string
  english_translation: string
  difficulty_level: "beginner" | "intermediate" | "advanced"
  category: string
  pronunciation?: string
  example_sentence?: string
  created_at: string
  created_by?: string
}

export interface Player {
  id: string
  name: string
  email?: string
  created_at: string
}

export interface GameEvent {
  id: string
  game_id: string
  event_type: "player_joined" | "player_left" | "clue_given" | "card_revealed" | "turn_ended" | "game_ended"
  player_id: string
  event_data: Record<string, any>
  created_at: string
}
