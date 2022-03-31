const Note = require('../models/note.js');
const User = require('../models/user.js');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
];

const nonExistingId = async () => {
  // create it
  const note = new Note({
    content: 'will delete this note',
    date: new Date(),
  });
  // save it
  await note.save();
  // remove it
  await note.remove();

  // return the _id.toString()
  return note._id.toString();
};

const notesInDb = async () => {
  // get all notes in db
  const notes = await Note.find({});
  // return all notes in db as an array
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  // get all users in db
  const users = await User.find({});
  // return all uses in db as an array
  return users.map(user => user.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};

