require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

/** 3.8 - only shows on POST requests */
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

/** 3.7- morgan('tiny'), 3.8 - 'tiny' + :body */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456",
//       "id": 1
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345",
//       "id": 3
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122",
//       "id": 4
//     }
// ];

app.get('/', (req, res) => {
    res.send('the server is working');
});

/** 3.1, 3.13 */
app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people);
    })
});

/** 3.2 */
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`);
});

/** 3.3 */
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    console.log('person', person)

    if (person) {
        res.json(person)
    } else {
        res.status(404).json({
            error: `no person with that id: ${id}`
        })
    }
});

/** 3.4 */
app.delete('/api/persons/:id', (req, res) => {
    console.log('hit the delete route');
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log(persons);
    res.status(204).end();
});

/** 3.5, 3.14 */
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(404).json({
            error: 'No name was given to the person'
        })
    } 
    
    if (!body.number) {
        return res.status(404).json({
            error: 'No number was given to the person'
        })
    }

    const person = {
        name: body.name,
        number: body.number
    };

    Person.create(person).then(savedPerson => {
        res.json(savedPerson);
    })
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});