require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Note = require('./models/note');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());


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

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
      .then(foundNote => {
        if (foundNote) {
          res.json(foundNote);
        } else {
          res.status(404).end();
        }
        
      })
      .catch(error => next(error));
});

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  }).catch(error => {
    next(error)
  })
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
       .then(updatedNote => {
         res.json(updatedNote);
       })
       .catch(error => {
         next(error);
       })
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

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } 

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});