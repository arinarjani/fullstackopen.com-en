const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

// 4.16*: bloglist expansion, step4 - username and password get 
//        more options 
const authorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minlength: 3
    },
    blogs: [
        {
            type: mongoose.ObjectId,
            ref: 'Blog'
        }
    ]
})

authorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })

  const Author = mongoose.model('Author', authorSchema)
  authorSchema.plugin(uniqueValidator);

  module.exports = Author