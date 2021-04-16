const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(result => {
            console.log('connected to mongoDB');
        }).catch(error => {
            console.log('couldn\'t connect', error.message);
        });

const noteSchema = new mongoose.Schema({
    content: String, 
    date: Date,
    important: Boolean 
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
});

module.exports = mongoose.model('Note', noteSchema);