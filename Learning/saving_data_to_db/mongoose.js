const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

// you can create a new database by passing in a name where 'note-app' is
mongoose.connect(`mongodb+srv://arin:${password}@udemy-web-dev-yelpcamp.zztje.mongodb.net/note-app?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})
  
// it seems like the model is used to name the collection of data in the db 
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
});
const note2 = new Note({
    content: 'Mongoose makes using mongo easy',
    date: new Date(),
    important: true,
});
const note3 = new Note({
    content: 'callback functions suck',
    date: new Date(),
    important: true,
});

// delete everything from the collection
//Note.deleteMany({}).then(response => console.log(response));

// note.save().then(result => {
//     console.log('note saved!')
// })
// note2.save().then(result => {
//     console.log('note saved!')
// })
// note3.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(response => {
    response.map(note => console.log(note));
    mongoose.connection.close();
})