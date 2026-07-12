# Wireframe: Mobile Layout (320px+)

## Screen Structure

```
┌─────────────────────────────┐
│      Safe Area Top          │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │      SCORE: 0         │  │  ← Score Display
│  │                       │  │
│  │                       │  │
│  │    ┌─────┐            │  │
│  │    │░░░░░│            │  │  ← Top Pipe
│  │    │░░░░░│            │  │
│  │    │     │            │  │
│  │    │     │     ●      │  │  ← Bird
│  │    │     │    /       │  │
│  │    │░░░░░│            │  │
│  │    │░░░░░│            │  │  ← Bottom Pipe
│  │    │░░░░░│            │  │
│  │                       │  │
│  ├───────────────────────┤  │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │  ← Ground
│  └───────────────────────┘  │
│      Safe Area Bottom       │
└─────────────────────────────┘

Canvas: 288px × 512px (3:5 ratio, scalable)
Background: Sky gradient #70c5ce → #87CEEB
```

## Start Screen Overlay

```
┌─────────────────────────────┐
│                             │
│       FLAPPY BIRD           │  ← Title (animated)
│                             │
│           ●                 │  ← Bird (floating)
│          /                  │
│                             │
│      TAP TO START           │  ← Instruction (pulse)
│                             │
└─────────────────────────────┘
```

## Game Over Screen

```
┌─────────────────────────────┐
│                             │
│        GAME OVER            │  ← Title
│                             │
│   ┌─────────────────────┐   │
│   │       🥇             │   │  ← Medal
│   │       SCORE          │   │
│   │        42            │   │  ← Final Score
│   │   ★ BEST: 100        │   │
│   └─────────────────────┘   │
│                             │
│     [ TAP TO RESTART ]      │  ← Button
│                             │
└─────────────────────────────┘
```

## Touch Zones

```
┌─────────────────────────────┐
│  ← No action zone (20px) →  │
│  ← Full screen tap zone →   │
│                             │
│  TAP ANYWHERE = FLAP        │
└─────────────────────────────┘
```

## Score Display Position

```
┌─────────────────────────────┐
│                             │
│          ┌────┐             │
│          │ 12 │             │  ← 60px from top
│          └────┘             │
│                             │
│  Centered horizontally      │
└─────────────────────────────┘
```
