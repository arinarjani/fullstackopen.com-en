const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(response => {
            console.log('mongoDB is connected');
        }).catch(error => {
            console.log('Error:', error.message);
        });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
// });

module.exports = mongoose.model('Person', personSchema);