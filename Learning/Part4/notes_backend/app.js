const config = require('./utils/config.js');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controller/notes.js');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger.js');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to mongoDB');
  }).catch(error => {
    logger.error('couldn\'t connect', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;