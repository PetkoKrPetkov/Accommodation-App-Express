const express = require('express');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

async function start() {
  const app = express();

  expressConfig(app);
  routesConfig(app);
  app.listen(3000, () => console.log('Server is listening on port 3000...'));
}

start();
