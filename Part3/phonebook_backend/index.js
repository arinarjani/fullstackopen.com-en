require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const axios = require('axios'); // use for app.post('/api/persons'...) on line 72
const Person = require('./models/person.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

/** 3.8 - only shows on POST requests */
// I think I need res due to Express, so I'll ignore this error for now.
morgan.token('body', (req, res) => { JSON.stringify(req.body); });

/** 3.7- morgan('tiny'), 3.8 - 'tiny' + :body */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
  res.send('the server is working');
});

/** 3.1, 3.13 */
app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

/** 3.2 */
app.get('/info', (req, res, next) => {
  Person.find({})
    .then((allPeople) => {
      res.send(`<p>Phonebook has info for ${allPeople.length} people</p> <p>${new Date()}</p>`);
    })
    .catch((error) => next(error));
});

/** 3.3, 3.18 */
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((foundPerson) => {
      if (foundPerson) {
        res.json(foundPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(`no person with that id: ${req.params.id}`);
      next(error)
    });
});

/** 3.4, 3.15 */
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) => {
      console.log(`${deletedPerson} was deleted successfully`);
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

/** 3.5, 3.14, 3.17 (lines: 123 - 140), 3.19 (lines: 142 - 149) */
// not sure what to return from this function to get rid of the error.
// Why this function wants a return statement, when others don't?
app.post('/api/persons', (req, res, next) => {
  // destructuring did not work to get this error away -> undefined
  const body = req.body;

  // Mongoose-uique-validator does the checking now, so no need for this.
  // if (!body.name && !body.number) {
  //   return res.status(404).json({
  //     error: 'No name or number was given. Please provide a name and a number.',
  //   });
  // }

  // if (!body.name) {
  //   return res.status(404).json({
  //     error: 'No name was given. Please provide a name.',
  //   });
  // }

  // if (!body.number) {
  //   return res.status(404).json({
  //     error: 'No number was given. Please provide a number.',
  //   });
  // }

  // 3.17 and 3.19 seem to want similar things, but 3.19 seems
  // add onto 3.17, so I took out this code. It might still be
  // needed if I misinterpreted the instruction, so I'll leave it
  // for now.
  // Person.find({ name: body.name })
  //       .then(foundPerson => {
  //           if (foundPerson.length > 0) {
  //               axios.put(`http://localhost:3001/api/persons/${foundPerson[0].id}`,
  //                         { name: body.name, number: body.number })
  //                    .then(response => console.log('update successful'))
  //                    .catch(error => console.log(error));
  //           } else {
  //             const person = {
  //                 name: body.name,
  //                 number: body.number
  //             };

  //             Person.create(person).then(savedPerson => {
  //                 res.json(savedPerson);
  //             });
  //           }
  //       })

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.create(person)
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

/** 3.17, 3.20 (update validators) */
app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { runValidators: true, context: 'query', new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

/** 3.16 */
// not sure what to return from this function to get rid of the error.
// Why this function wants a return statement, when others don't?
const handleError = (error, req, res, next) => {
  console.log('Error.message:', error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(handleError);

// destructuring did not work to get this error away -> undefined
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});