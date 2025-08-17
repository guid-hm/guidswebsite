const express = require('express');
const path = require('path');
const webRoutes = require('./routes');

function createApp() {
  const app = express();

  // Core middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '..', 'public') });
  });

  // Routes
  app.use('/', webRoutes);


  return app;
}

module.exports = createApp;
