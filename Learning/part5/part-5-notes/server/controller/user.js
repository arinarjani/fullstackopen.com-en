const bcrypt = require('bcrypt');
const notesRouter = require('express').Router();
const User = require('../models/user.js');

notesRouter.get('/', async (request, response) => {
  // look at ./notes.js line 9 for difference in populate
  // https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
  const allUsers = await User.find({}).populate({
    path: 'notes',
    select: ['content', 'user', 'id'],
  });

  response.json(allUsers);
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const savedUser = await User.create({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  response.json(savedUser);
});

module.exports = notesRouter;