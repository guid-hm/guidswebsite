# Minimal Node.js + Express App

## Scripts
- `npm start` — runs the server with Node
- `npm run dev` — runs the server with nodemon (auto-reloads on changes)

## Structure
- `src/server.js` — entry point that starts the HTTP server
- `src/app.js` — Express app setup (routes, middleware, static)
- `public/` — static assets and basic `index.html`

## Quick start
1. Initialize and install deps:
   ```bash
   npm init -y
   npm install express
   npm install -D nodemon
   ```
2. Add scripts to `package.json`:
   ```json
   {
     "scripts": {
       "start": "node src/server.js",
       "dev": "nodemon --ext js,json --watch src --watch public src/server.js"
     }
   }
   ```
3. Run in dev mode:
   ```bash
   npm run dev
   ```
4. Open: http://localhost:3000

## Environment
- Uses `PORT` env var if provided, otherwise defaults to `3000`.
- No extra modules like dotenv by default. Add if needed later.
