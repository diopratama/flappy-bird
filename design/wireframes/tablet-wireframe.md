# Wireframe: Tablet Layout (768px+)

## Screen Structure

```
┌─────────────────────────────────────────┐
│           Safe Area Top                 │
│  ┌─────────────────────────────────────┐ │
│  │                                     │ │
│  │              SCORE: 0               │ │  ← Score Display
│  │                                     │ │
│  │                                     │ │
│  │         ┌─────────┐                │ │
│  │         │░░░░░░░░░│                │ │  ← Top Pipe
│  │         │░░░░░░░░░│                │ │
│  │         │░░░░░░░░░│                │ │
│  │         │         │                │ │
│  │         │         │      ●         │ │  ← Bird
│  │         │         │     /          │ │
│  │         │░░░░░░░░░│                │ │
│  │         │░░░░░░░░░│                │ │  ← Bottom Pipe
│  │         │░░░░░░░░░│                │ │
│  │         │░░░░░░░░░│                │ │
│  │                                     │ │
│  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │  ← Ground
│  └─────────────────────────────────────┘ │
│              Safe Area Bottom            │
└─────────────────────────────────────────┘

Canvas: 500px × 800px (max)
Container: Rounded corners (16px), subtle border
```

## Responsive Adjustments

| Element | Mobile | Tablet |
|---------|--------|--------|
| Canvas | 100vw × 100vh | 500px × 800px max |
| Border | None | 4px solid rgba(255,255,255,0.2) |
| Border Radius | 0 | 16px |
| Title Size | 1.5rem | 2rem |
| Score Panel | 25px padding | 30px padding |

## Layout Considerations

```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │      Centered Game Container    │   │
│   │                                 │   │
│   │           500px max             │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│         Background: Gradient            │
│         (Desktop: Dark blue)            │
│                                         │
└─────────────────────────────────────────┘
```

## Touch Optimization

- Larger touch targets (minimum 44px)
- Increased spacing between interactive elements
- Enhanced visual feedback on touch
