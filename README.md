# Happy Birthday ♡

A soft, single-page birthday surprise: gift-box intro → hero → note → 7 reasons → photo board → cake with candles → handwritten letter.

## Make it yours (2 minutes)

1. **Text** — open `src/config.js` and change `name`, `from`, the date, the reasons, and the `letter`.
2. **Photos** — drop images into `public/photos/`:
   - `hero.jpg` → the big arch photo at the top
   - `01.jpg` … `08.jpg` → the polaroid board (captions live in `src/config.js`)
   - Missing photos show a cute placeholder, so nothing ever looks broken.
   - Different file names or `.png`/`.jpeg`? Just update the paths in `src/config.js`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to `main`; Vercel builds it with `npm run build` and serves `dist/`.
