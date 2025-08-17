const dotenv = require('dotenv');

function loadEnv() {
  const result = dotenv.config();
  if (result.error && process.env.NODE_ENV !== 'production') {
    console.warn('[env] .env not found, relying on existing environment variables');
  }

  const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || '',
  };

  return config;
}

module.exports = { loadEnv };
