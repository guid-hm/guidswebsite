const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/test', (req, res) => {
  const rootDir = path.join(__dirname, '..', '..', 'public');
  res.sendFile('index.html', { root: rootDir });
});

// Mount more feature routes here
// e.g., router.use('/users', usersRouter);



module.exports = router;
