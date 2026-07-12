# Flappy Bird Game

A classic Flappy Bird game built with vanilla JavaScript and HTML5 Canvas.

## 🎮 Game Features

- **Responsive Canvas** - Adapts to any screen size
- **Cross-Platform** - Works on desktop and mobile devices
- **Multiple Input Support** - Keyboard (Spacebar), Mouse (Click), Touch (Tap)
- **Game States** - START, PLAYING, GAME_OVER with smooth transitions
- **Score Tracking** - Real-time score display
- **Collision Detection** - Accurate box collision for pipes and boundaries
- **Visual Feedback** - Bird rotation based on velocity, animated elements

## 📁 Project Structure

```
/workspace/projects/myapp/
├── index.html          # Main HTML5 file with canvas
├── css/
│   └── style.css       # Responsive styling
├── js/
│   ├── game.js         # Main game loop and state management
│   ├── bird.js         # Bird class with physics
│   ├── pipe.js         # Pipe class with random gaps
│   └── input.js        # Input handling (keyboard/mouse/touch)
├── assets/
│   ├── images/         # Image assets (future use)
│   └── sounds/         # Sound effects (future use)
└── README.md
```

## 🚀 How to Play

1. Open `index.html` in any modern browser
2. Click **START** or press **Spacebar** to begin
3. Tap/click/press Spacebar to make the bird flap
4. Navigate through the pipes without hitting them
5. Avoid hitting the ground or ceiling

## 🎯 Controls

| Input | Action |
|-------|--------|
| Spacebar | Flap |
| Arrow Up | Flap |
| Mouse Click | Flap |
| Touch Tap | Flap |

## ⚙️ Game Configuration

Key constants in `js/game.js`:

```javascript
const PIPE_SPAWN_INTERVAL = 1500;  // ms between pipe spawns
const PIPE_SPEED = 3;              // pixels per frame
const PIPE_GAP_SIZE = 120;         // pixels
const BIRD_GRAVITY = 0.5;          // velocity added per frame
const BIRD_JUMP_STRENGTH = -8;     // velocity on flap
```

## 🛠️ Technical Details

- **Pure JavaScript** - No external dependencies
- **ES6 Classes** - Clean, object-oriented code
- **HTML5 Canvas** - Hardware accelerated rendering
- **RequestAnimationFrame** - Smooth 60fps game loop
- **Mobile Optimized** - Touch events, viewport meta tags, safe area support

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

To run locally:

```bash
# Clone or navigate to project
cd /workspace/projects/myapp/

# Open in browser
open index.html
# or
python -m http.server 8000  # then visit http://localhost:8000
```

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for fun!
