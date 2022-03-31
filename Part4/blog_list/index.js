const http = require('http')
const app = require('./app.js');
const logger = require('./utils/logger.js');
const config = require('./utils/config.js');

const server = http.createServer(app);

console.log('connected to server in react front-end')

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})