const config = require('./utils/config.js');
const logger = require('./utils/logger.js');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controller/blogs.js');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to mongoDB');
  }).catch(error => {
    logger.error('couldn\'t connect', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;