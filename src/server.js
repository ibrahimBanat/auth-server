'use strict';

// require express
const express = require('express');
const mongoose = require('mongoose');
const rootRoute = require('../src/routes/rootRoute');
const router = require('./auth/router');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const cors = require('cors');
// prepare the express app
const app = express();
app.use(cors());
// Process JSON input and put the data on req.body
app.use(express.json());
app.use('/', rootRoute);
app.use(router);
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || 3000;
    app.listen(PORT, () => {
      console.log('app is working . . .');
      console.log(`app is running http://localhost:${PORT}`);
    });
  },
};
