const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./blogs_helper');
const Blog = require('../models/blog.js');

beforeEach(async () => {
  // clears all data from DB
  await Blog.deleteMany({});

  // create array of Blogs
  const createBlogs = helper.blogs.map(blog => new Blog(blog));

  // save createdBlogs to DB
  const savedBlogs = createBlogs.map(blog => blog.save());

  await Promise.all(savedBlogs);
});

/** 4.3 */
test('dummy returns one', () => {
  const blogs = [];

  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

/** 4.4 */
test('of empty list is zero', () => {
  const blogs = [];

  const result = helper.totalLikes(blogs);
  expect(result).toBe(0);
});

/** 4.4 */
test('when list only has one blog post the likes of that', () => {
  const listWithOneBlog = helper.blogs.slice(0,1);

  const result = helper.totalLikes(listWithOneBlog);
  expect(result).toBe(7);
});

/** 4.4 */
test('of a bigger list is calculated right', () => {
  const listWithThreeBlogs = helper.blogs.slice(0,3);

  const result = helper.totalLikes(listWithThreeBlogs);
  expect(result).toBe(69);
});

/** 4.5 */
test('most likes from a blog is', () => {
  expect(helper.favoriteBlog(helper.blogs)).toEqual({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 50,
  });
});

/** 4.6 */
test('find author with most blogs', () => {
  expect(helper.mostBlogs(helper.authors)).toEqual({
    author: 'Laz-lo',
    blogs: 80,
  });
});

/** 4.7 */
test('find author with most likes', () => {
  expect(helper.mostBlogs(helper.authorsWithLikes)).toEqual({
    author: 'Laz-lo',
    likes: 80,
  });
});

/** 4.8 */
test('can get all blogs from db', async () => {
  await api.get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(200);
});

/** 4.9 */
test('each blog has an identifier of id', async () => {
  const request = await api.get('/api/blogs');

  expect(request.body[0].id).toBeDefined();
  //mongoose.connection.close();
});

/** 4.10 */
test('can POST to /api/blogs successfully', async () => {
  const newBlog = {
    title: 'Rhino',
    author: 'Rockstar',
    url: 'https://reactpatterns.com/',
    likes: 1001,
  };

  // get length of current blogs on db
  const blogsStart = await api.get('/api/blogs');

  // post data to db
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201);

  // see if db length has increased by one
  const blogsEnd = await api.get('/api/blogs');
  
  // see if db length has increased by one
  expect(blogsEnd.body).toHaveLength(blogsStart.body.length + 1);

  // create an array of blog titles from lasted db change
  const titles = blogsEnd.body.map(title => title.title);

  // see if titles contains the title of the blog added to the db
  expect(titles).toContain(newBlog.title);

  // mongoose.connection.close();
});

/** 4.11 */
test('if likes are missing, defaults to 0', async () => {
  const newBlog = {
    title: 'Rhino',
    author: 'Rockstar',
    url: 'https://reactpatterns.com/',
  };

  // get length of current blogs on db
  const blogsStart = await api.get('/api/blogs');

  // post data to db
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201);

  // see if db length has increased by one
  const blogsEnd = await api.get('/api/blogs');

  // see if db length has increased by one
  expect(blogsEnd.body).toHaveLength(blogsStart.body.length + 1);

  // create an array of blog likes from lasted db change
  const likes = blogsEnd.body.map(likes => likes.likes);

  // see if likes contains the default value 0 if no likes supplied
  // I chose likes.length - 1 because the test db will always have the 
  // added blog at the end because of beforeEach() on line 8
  expect(likes[likes.length - 1]).toBe(0);

  // mongoose.connection.close();  
});

/** 4.12 */
test('no title or url in blog through POST request responds with 404', async () => {
  const noTitleNoURL = {
    author: 'niko bellic'
  };

  await api.post('/api/blogs')
    .send(noTitleNoURL)
    .expect(404);
});

/** 4.13 */
test('can delete a note', async () => {
  // get all blogs from db to choose which on to delete
  const blogsAtStart = await api.get('/api/blogs');

  // select the first blog to delete
  const blogToDelete = blogsAtStart.body[0];

  // delete blogsToDelete from DB
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  // grab all blogs from db to see if a blogToDelete was deleted
  const blogsAtEnd = await api.get('/api/blogs');

  // compare blogsAtStart and blogsAtEnd lengths
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

  // create an array of titles from blogsAtEnd
  const titles = blogsAtEnd.body.map(title => title.title);
  // see if db end contains the same title as deleted blog
  expect(titles).not.toContain(blogToDelete.title);

  // mongoose.connection.close();
});

/** 4.14 */
test('can update a specific blog post by its id', async () => {
  // grab all blogs from db
  const blogsAtStart = await api.get('/api/blogs');

  // create a blog that is updated
  const update = {
    title: 'PCJ 600',
    author: 'Tommy Vercetti',
    url: 'https://www.fullstackopen.com.en',
    likes: 50,
  };

  // select a blog to update from blogsAtStart
  const blogToUpdate = blogsAtStart.body[0];

  // update blogToUpdate in db
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(update)
    .expect('Content-Type', /application\/json/);

  // mongoose.connection.close();
});

afterAll(() => {
  // close mongoose connection after all tests are ran
  mongoose.connection.close();
});

/** BIG ISSUE */
// if you get an error like "You are trying to `import` a file after the Jest environment has been torn down."
// then some "right this right that" stuff, try launching the server outside of a test env to populate data
// then run the server and hopeully it all works
// YOU ALSO NEED TO CLOSE THE MONGOOSE CONNECTION AT THE END OF THE TEST FILE, OR AFTER EACH TEST IF
// RUNNING INDIVIDUALLY
