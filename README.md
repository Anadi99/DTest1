# Deutchnames 🇩🇪

A web-based Codenames-style game designed for learning German vocabulary from A1 to B2 CEFR levels. Master German through strategic team gameplay!

## Features

- **Strategic Gameplay**: Classic Codenames mechanics adapted for German vocabulary learning
- **Comprehensive Word Banks**: 500+ words per CEFR level (A1, A2, B1, B2)
- **Multiple Game Modes**: Local hot-seat and online multiplayer
- **Real-time Multiplayer**: Powered by Supabase for seamless online play
- **Learning Tools**: Hover translations, example sentences, pronunciation guides
- **Accessibility**: High contrast options, colorblind-friendly palettes, keyboard navigation
- **Game Features**: Configurable timers, comprehensive game logs, rules panel
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for multiplayer features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd deutchnames
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure Supabase (optional for local play):
   - Create a new Supabase project
   - Copy your project URL and anon key to `.env.local`
   - Run the database migrations in the `scripts/` folder

5. Start the development server:
```bash
npm run dev
```

## Game Modes

### Local Hot-Seat Mode
- Perfect for family game nights or classroom use
- Pass the device between spymasters and operatives
- No internet connection required
- Automatic role transition prompts

### Online Multiplayer
- Create or join rooms with unique codes
- Real-time synchronization across all devices
- Persistent game state and history
- Chat and communication features

## Learning Features

### Difficulty Levels
- **A1 (Beginner)**: Basic everyday words (Haus, Auto, Katze)
- **A2 (Elementary)**: Common vocabulary expansion
- **B1 (Intermediate)**: Complex concepts and abstract terms
- **B2 (Upper Intermediate)**: Advanced vocabulary and specialized terms

### Educational Tools
- **Hover Translations**: See English meanings instantly
- **Example Sentences**: Context for proper usage
- **Pronunciation Guides**: Audio or phonetic transcriptions
- **Category Learning**: Words grouped by themes (animals, food, travel, etc.)

## Accessibility

- High contrast text options
- Colorblind-friendly card patterns
- Keyboard navigation support
- Screen reader compatibility
- Adjustable font sizes
- Multiple color schemes

## Technology Stack

- **Frontend**: React 18, Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Vercel (Frontend), Supabase (Backend)
- **Styling**: Tailwind CSS with custom German-themed color palette

## Development

### Project Structure
```
deutchnames/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── game/             # Game-specific components
│   ├── ui/               # Reusable UI components
│   └── vocabulary/       # Vocabulary management
├── lib/                  # Utilities and game logic
├── hooks/                # Custom React hooks
├── scripts/              # Database migrations
└── public/               # Static assets
```

### Key Components

- **GameBoard**: 5×5 grid with flip animations and team colors
- **Lobby**: Team selection, role assignment, game configuration
- **GameTimer**: Configurable countdown with visual/audio alerts
- **GameLog**: Comprehensive event tracking with export functionality
- **RulesModal**: Complete game rules and learning tips
- **VocabularyList**: Word bank management and learning tools

### Game Logic

The core game logic follows standard Codenames rules:
- 25 cards: 9 red, 8 blue, 7 neutral, 1 assassin
- Red team always starts (they have one extra card)
- Spymasters give one-word clues + numbers
- Operatives get (clue number + 1) guesses maximum
- Game ends when all team cards found or assassin revealed

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. In your Supabase dashboard, go to Settings > API to get:
   - Project URL
   - Anon public key

3. Add these to your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Run the database setup scripts in order:
   - `scripts/001_create_tables.sql`
   - `scripts/002_seed_word_bank.sql`

5. Enable real-time for the following tables in Supabase dashboard:
   - `games`
   - `game_players`
   - `word_cards`
   - `clues`
   - `game_events`

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database (Supabase)
- Supabase handles hosting automatically
- Configure production environment variables
- Set up proper RLS policies for security

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Word Bank Contributions

We welcome contributions to expand our German vocabulary database:

1. Follow the existing word format in `lib/german-vocabulary-comprehensive.ts`
2. Include proper CEFR level classification
3. Provide accurate translations and example sentences
4. Test words in actual gameplay

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Inspired by the original Codenames board game by Vlaada Chvátil
- German vocabulary sourced from CEFR-aligned language learning resources
- Built with modern web technologies for optimal learning experience

---

**Viel Spaß beim Deutschlernen! (Have fun learning German!)**