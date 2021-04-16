require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Note = require('./models/note');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes)
    })
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(foundNote => {
    res.json(foundNote);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  // const id = Number(req.params.id);
  // notes = notes.filter(note => note.id !== id);
  // console.log('notes is now', notes);
  // res.status(204).end()
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({
      error: 'content is missing'
    });
  }

  const note = {
    content: body.content,
    date: new Date(),
    important: body.imporant || false
  };

  Note.create(note).then(savedNote => {
    res.json(savedNote);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});