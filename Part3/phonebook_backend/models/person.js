const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(response => {
            console.log('mongoDB is connected');
        }).catch(error => {
            console.log('Error:', error.message);
        });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
});

personSchema.plugin(uniqueValidator);

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
// });

module.exports = mongoose.model('Person', personSchema);