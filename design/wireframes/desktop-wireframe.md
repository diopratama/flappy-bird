# Wireframe: Desktop Layout (1024px+)

## Screen Structure

```
┌───────────────────────────────────────────────────┐
│                                                   │
│              Background: #1a1a2e                  │
│                                                   │
│         ┌─────────────────────────────┐           │
│         │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│           │
│         │▓                       ▓▓▓│           │
│         │▓     ┌─────────┐      ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     │         │   ●  ▓▓▓│           │
│         │▓     │         │  /   ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     │░░░░░░░░░│      ▓▓▓│           │
│         │▓     └─────────┘      ▓▓▓│           │
│         │▓     SCORE: 0        ▓▓▓│           │
│         │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│           │
│         └─────────────────────────────┘           │
│                                                   │
│              Game Container:                      │
│              404px × 720px                       │
│              Border-radius: 20px                  │
│              Shadow: Glow effect                  │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Desktop Enhancements

| Feature | Implementation |
|---------|----------------|
| Background | Dark gradient (#1a1a2e → #16213e) |
| Container | 6px border, rounded corners |
| Shadow | Glowing effect (rgba(112, 197, 206, 0.3)) |
| Cursor | Custom bird cursor on canvas hover |

## Custom Cursor

```svg
data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" 
  width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="8" fill="%23f7dc6f" 
    stroke="%23e67e22" stroke-width="2"/>
</svg>
```

## Keyboard Controls

| Key | Action |
|-----|--------|
| Space | Flap / Start / Restart |
| Enter | Start / Restart |
| Escape | Pause |
| P | Pause |

## Layout Composition

```
┌───────────────────────────────────────────────────┐
│                                                   │
│  ┌───────────────────────────────────────────┐    │
│  │            VIEWPORT (full)                │    │
│  │                                           │    │
│  │     ┌─────────────────────────────┐      │    │
│  │     │                           │      │    │
│  │     │    Game Container (404px)  │      │    │
│  │     │                           │      │    │
│  │     │    Sky gradient bg        │      │    │
│  │     │                           │      │    │
│  │     │    Canvas (404 × 720)     │      │    │
│  │     │                           │      │    │
│  │     │                           │      │    │
│  │     └─────────────────────────────┘      │    │
│  │                                           │    │
│  │         Centered with glow shadow        │    │
│  └───────────────────────────────────────────┘    │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Breakpoint Thresholds

```
Mobile (< 768px)    → Full viewport
Tablet (768-1023px) → Max 500px width
Desktop (≥ 1024px)  → 404px width, dark background
```
