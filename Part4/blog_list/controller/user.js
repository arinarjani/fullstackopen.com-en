const User = require('../models/author.js')
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

// 4.15: bloglist expansion, step3
// create a user with a username and a password
usersRouter.post('/', async (request, response) => {
    // grab the body from request to get all the data passed
    const { body } = request;
    // get the password, username, name from body
    const { username, password, name } = body;

    // take the password in body and hash it with bcypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a user and store it in the db, also save the user to respond at the end
    const savedUser = await User.create({
        username,
        name,
        passwordHash: hashedPassword
    });

    response.json(savedUser);
});

module.exports = usersRouter;