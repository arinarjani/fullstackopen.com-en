const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

const noteAppURI = 'mongodb+srv://arin:arin123@udemy-web-dev-yelpcamp.zztje.mongodb.net/note-app?retryWrites=true&w=majority'

mongoose.connect(noteAppURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongoDB');
  }).catch(error => {
    console.error('couldn\'t connect', error.message);
  });

app.use(cors());
const port = 3001;

app.get('/user', (req, res) => {
    res.json([
        {id: 1, username: "arin"},
        {id: 2, username: 'eric'}
    ]);
});

app.listen(port, () => {console.log(`connected to ${port}`)});