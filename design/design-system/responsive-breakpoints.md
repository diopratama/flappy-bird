# Responsive Design System - Flappy Bird

## Overview
Mobile-first responsive design for Flappy Bird game with adaptive layouts for mobile, tablet, and desktop.

---

## Breakpoints

| Breakpoint | Width | Canvas Size | Features |
|------------|-------|-------------|----------|
| **Mobile** | 320px+ | Full viewport (max 404x720) | Touch-optimized, full-screen |
| **Tablet** | 768px+ | 500x800 max | Larger UI, rounded container |
| **Desktop** | 1024px+ | 404x720 | Custom cursor, enhanced shadows |

---

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Sky Top | `#70c5ce` | Gradient start |
| Sky Bottom | `#87CEEB` | Gradient end |
| Ground | `#ded895` | Ground pattern |
| Pipe | `#73bf2e` | Pipes |
| Pipe Dark | `#5a9a24` | Pipe shadows |
| Bird | `#f7dc6f` | Bird body |
| Bird Accent | `#e67e22` | Bird beak/wing |

### UI Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#ffffff` | Scores, labels |
| Text Shadow | `rgba(0,0,0,0.3)` | Text shadows |
| Overlay BG | `rgba(0,0,0,0.5)` | Screen overlays |

---

## Typography

### Font Family
```css
--font-game: 'Press Start 2P', 'Courier New', monospace;
```

### Font Sizes (Responsive with clamp)
| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Game Title | 1.5rem (6vw) | 2rem | 2.5rem |
| Score | 2rem (10vw) | 3rem | 4rem |
| Tap Instruction | 0.7rem (3vw) | 0.8rem | 1rem |
| Button Text | 0.6rem (2.5vw) | 0.7rem | 0.8rem |

---

## Components

### 1. Game Container
- **Mobile**: Full viewport, no border
- **Tablet**: Rounded corners (16px), subtle border
- **Desktop**: Enhanced shadow, custom cursor

### 2. Start Screen
- Animated title with bounce effect
- Bird preview with fly animation
- Pulsing "TAP TO START" instruction

### 3. Score Display
- Fixed position top-center
- Appears only during gameplay
- Retro pixel font with shadow

### 4. Game Over Panel
- Gold medal animation
- Score with shadow
- Best score indicator
- Styled restart button with press effect

### 5. Loading Screen
- Spinning loader
- Gradient background

---

## Mobile Optimizations

### Touch Handling
```css
touch-action: manipulation; /* No delay on touch */
-webkit-tap-highlight-color: transparent;
user-select: none;
```

### Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, 
     maximum-scale=1.0, user-scalable=no">
```

### Safe Area (Notch Support)
```css
padding: env(safe-area-inset-top) env(safe-area-inset-right) 
         env(safe-area-inset-bottom) env(safe-area-inset-left);
```

### Prevent Zoom
- `user-scalable=no` in viewport
- `touch-action: manipulation` on interactive elements
- No pinch-zoom on canvas

---

## Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    /* Disable animations */
}
```

### High Contrast
```css
@media (prefers-contrast: high) {
    /* Remove shadows, add borders */
}
```

### Focus Indicators
- Visible focus states on buttons
- Keyboard navigation support

---

## Animation Specs

| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|---------|
| Title Bounce | 2s | ease-in-out | Loop |
| Tap Pulse | 1.5s | ease-in-out | Loop |
| Bird Preview | 0.8s | ease-in-out | Alternate |
| Medal Pop | 0.5s | cubic-bezier(0.68, -0.55, 0.265, 1.55) | One-shot |
| Slide In | 0.5s | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Game Over |
| Button Press | 150ms | ease | Active state |

---

## CSS Custom Properties (Design Tokens)

```css
:root {
    --sky-top: #70c5ce;
    --sky-bottom: #87CEEB;
    --ground-color: #ded895;
    --pipe-color: #73bf2e;
    --bird-color: #f7dc6f;
    --bird-accent: #e67e22;
    --text-primary: #ffffff;
    --font-game: 'Press Start 2P', monospace;
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
}
```

---

## File Structure

```
/workspace/projects/myapp/
├── css/
│   └── style.css          # Responsive CSS
├── design/
│   ├── wireframes/        # Wireframe documentation
│   ├── mockups/           # UI mockups
│   ├── prototypes/        # Interactive prototypes
│   └── design-system/     # Design tokens & specs
│       └── responsive-breakpoints.md
└── index.html             # Game HTML with overlays
```
