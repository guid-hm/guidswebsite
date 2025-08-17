let cached = null;

async function connectDB(dbUrl) {
  if (!dbUrl) {
    console.warn('[db] DB_URL is not set. Skipping database connection.');
    return null;
  }
  if (cached) return cached;

  console.log(`[db] Connecting to ${mask(dbUrl)} ...`);
  // Placeholder connection. Replace with a real client, e.g.:
  // - MongoDB (mongoose): await mongoose.connect(dbUrl)
  // - Postgres (pg): const pool = new Pool({ connectionString: dbUrl })
  // - MySQL (mysql2): const pool = createPool(dbUrl)
  cached = {
    url: dbUrl,
    client: null,
    async close() {
      cached = null;
      console.log('[db] Disconnected');
    },
  };
  console.log('[db] Connected (placeholder). Replace with a real client.');
  return cached;
}

function mask(url) {
  try {
    const u = new URL(url);
    if (u.password) u.password = '***';
    if (u.username) u.username = '***';
    return u.toString();
  } catch {
    return '***';
  }
}

module.exports = { connectDB };
