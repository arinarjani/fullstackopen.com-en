const User = require('../models/user.js');
const mongoose = require('mongoose');
const helper = require('./test_helper.js');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    // clear all users from db
    await User.deleteMany({});

    // create a password with bcypt
    const passwordHash = await bcrypt.hash('sekret', 10);

    // create a User
    await User.create({ username: 'eric', passwordHash });
  });

  test('a user can be added to the db', async () => {
    // get all users from db -> usersAtStart
    const usersAtStart = await helper.usersInDb();

    // create a user
    const newUser = {
      username: 'arnold',
      name: 'arnold \'the football head\'',
      password: 'password',
    };

    // post user to db
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // grab users after posting a new user to the db -> usersAtEnd
    const usersAtEnd = await helper.usersInDb();

    // see if usersAtEnd has increased in length
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    // grab usernames from usersAtEnd with map
    const usernames = usersAtEnd.map(user => user.username);

    // see if usersAtEnd contains user.username
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    // grab all users in db
    const usersAtStart = await helper.usersInDb();

    // create a user object with the same username in line 18
    const user = {
      username: 'eric',
      name: 'eric sparrow',
      password: 'password123',
    };

    // post user to db
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed: username: Error, expected `username` to be unique.');

    // grab all users after posting new user to verify it did not work
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});