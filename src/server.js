const http = require('http');
const createApp = require('./app');
const { loadEnv } = require('./config/env');
const { connectDB } = require('./config/db');

(async () => {
  const env = loadEnv();
  const app = createApp();
  app.locals.env = env;

  try {
    const db = await connectDB(env.dbUrl);
    app.locals.db = db;
  } catch (err) {
    console.error('[db] Connection failed:', err);
    process.exitCode = 1;
  }

  const server = http.createServer(app);
  server.listen(env.port, () => {
    console.log(`Server listening on http://localhost:${env.port}`);
  });
})();
