const express = require('express');
const router = express.Router();
const webRouter = require('./web');

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/', webRouter);

// Mount more feature routes here
// e.g., router.use('/users', usersRouter);



module.exports = router;
