const config = require('./utils/config.js');
const logger = require('./utils/logger.js');
const express = require('express');
require('express-async-errors');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const blogsRouter = require('./controller/blogs.js');
const usersRouter = require('./controller/user.js');
const loginRouter = require('./controller/login.js');
const { tokenExtractor, userExtractor } = require('./utils/middleware')
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
app.use(userExtractor)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // also got this from stackoverflow..saying bodyParser is not in Express by default

// parse application/json
app.use(bodyParser.json()) // not sure what this does, but if I comment it out, the app still works fine, I got this from stackoverflow

// localhost:{PORT}/api/blogs/<path>
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;