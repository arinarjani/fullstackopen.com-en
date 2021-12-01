const logger = require('./logger.js');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// 4.20*: bloglist expansion, step8 -> create a middleware to grab the token from 
//        the Authorization header on Request
const tokenExtractor = (request, response, next) => {
    // grab the token from the header
    const { authorization } = request.headers
  
    if (authorization && authorization.toLowerCase().includes('bearer')) {
      request.token = authorization.slice(7);
    }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};