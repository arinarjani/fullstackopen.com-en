const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user.js');

loginRouter.post('/', async (request, response) => {
  // grab body
  const { body } = request;

  // find user by username
  const user = await User.findOne({ username: body.username });

  // see if user exist, no false, yes compare user password with
  // body password using bcrypt
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);


  // if no user and no password correct, return 401 with { error: 'invalid username or password' }
  if (!(user && passwordCorrect)) {
    return response.status(404).json({
      error: 'incorrect username or password'
    });
  }

  // create userForToken with username and id from user
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // create token from jsonwebtoken that expires in 3 days
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '3d' });

  // response of 200 and send {token, username, name}
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;