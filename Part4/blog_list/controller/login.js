const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Author = require('../models/author.js');
const loginRouter = require('express').Router();

// 4.18: bloglist expansion, step6 -> token authentication
loginRouter.post('/', async (request, response) => {
    // grab the body's username and password
    const { username, password } = request.body

    // find the author with the provided username
    const user = await Author.findOne({ username });
    console.log('found user:', user);

    // if user is not found, return error
    if (!user) {
        return response.status(404).json({ error: 'user not found' })
    }

    // verify the password matches the one in the db
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    console.log('correct password?', passwordCorrect);

    // if password is incorrect, return error
    if (!passwordCorrect) {
        return response.status(401).json({ error: 'incorrect password' });
    }

    // create a obj with the username and user._id
    const userForToken = {
        username,
        id: user._id
    };

    // create the token with jwt
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: '3d'});

    // send the token, the username, and name as a response
    response
        .status(200)
        .json({ username, name: user.name, token })
})

module.exports = loginRouter;

