const config = require('./utils/config.js');
const logger = require('./utils/logger.js');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controller/blogs.js');
const usersRouter = require('./controller/user.js');
const loginRouter = require('./controller/login.js');
const { tokenExtractor } = require('./utils/middleware')
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//   .then(() => {
//     logger.info('connected to mongoDB');
//   }).catch(error => {
//     logger.error('couldn\'t connect', error.message);
//   });

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to mongoDB');
  }).catch(error => {
    logger.error('couldn\'t connect', error.message);
  });

app.use(cors());
app.use(express.json());  

// use middleware
app.use(tokenExtractor)

// localhost:{PORT}/api/blogs/<path>
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;