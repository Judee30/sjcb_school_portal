# SJCB Icons — Pixel School Portal Demo

A front-end-only React + TypeScript + Tailwind CSS + Vite demo inspired by the supplied retro pixel-art school portal reference.

## Features
- Start screen and animated loading screen
- Interactive school portal menu
- Clickable month folders with sample content
- School events, rules, Grade 11 subjects, and reminders
- CSS character/cloud animations and generated retro UI sound effects
- Responsive layout
- No database, backend, API, or credentials

## Run locally
Install Node.js (LTS), then open this folder in a terminal:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for presentation
```bash
npm run build
npm run preview
```

The build output is placed in `dist/`. Internet access is only needed to install npm packages and to load the optional Google Fonts; the rest of the demo runs locally.

## Customization
- Edit sample event data and subjects in `src/App.tsx`.
- Adjust colors, layout, animations, and responsive behavior in `src/index.css`.
- The character art is currently CSS-drawn placeholder pixel art. Replace it with your own sprites in `public/images/` for a closer match to your reference.
