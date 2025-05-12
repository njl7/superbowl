# SuperBowl - Bowling Score Tracker

A modern, interactive bowling score tracking application built with React, TypeScript, and Vite. Keep track of your bowling games with a beautiful, responsive interface and real-time score calculations.

## Features

- 🎳 Real-time score tracking and calculation
- 🎯 Support for strikes, spares, and open frames
- 🏆 Special animations for strikes, spares, and turkeys
- 👥 Player name customization
- 🎮 Interactive pin controls for easy score input
- 📱 Responsive design that works on all devices
- 🌟 Beautiful animations and transitions
- 🎨 Stylish bowling-themed UI

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd bowling
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. **Start a New Game**
   - Enter your name in the player input field
   - Click "New Game" to begin

2. **Record Your Rolls**
   - Use the numbered buttons (0-10) to record how many pins you knocked down
   - The interface automatically handles strikes and spares
   - The 10th frame allows bonus rolls for strikes and spares

3. **Track Your Score**
   - Watch your score update in real-time
   - Special animations play for strikes, spares, and turkeys!
   - View your running total and frame-by-frame breakdown

## Technical Details

### Built With
- React 19
- TypeScript
- Vite 6
- Custom SVG Animations
- CSS3 with Modern Features

### Project Structure
```
src/
├── assets/          # Icons and static assets
├── components/      # React components
│   ├── admin/      # Game control components
│   └── player/     # Scoreboard components
├── models/         # Game logic and state management
└── styles/         # CSS stylesheets
```

### Key Components

- `BowlingModel`: Core game logic and score calculation
- `GameContext`: Global game state management
- `ScoreBoard`: Visual score display
- `AdminPanel`: Game controls and pin input
- `Layout`: Main application layout

## Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License].
```
