const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

// Get all notes
notesRouter.get('/', async (request, response) => {
  // look at ./user.js line 8 for difference in populate
  // https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
  const notes = await Note.find({}).populate('user', { content: 1, name: 1 });
  response.json(notes.map(note => note.toJSON()));
});

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Add a new note to DB
notesRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(decodedToken);

  if (!token || !decodedToken) {
    return response.status(401).json({
      error: 'token missing or invalid'
    });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();

  // add savedNotes._id to user in the DB
  // pass in ._id's to associate two models in the db
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.json(savedNote.toJSON());
});

// Get a specific note by its id
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note.toJSON());
  } else {
    response.status(404).end();
  }
});

// Delete a note by its id
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// Update a note by its id
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON());
    })
    .catch(error => next(error));
});

module.exports = notesRouter;