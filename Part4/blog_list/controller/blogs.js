const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));

  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs);
  //   });
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }

  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     response.json(blog);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
});

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body;
  if (title === undefined && url === undefined) {
    response.status(404).end();
  } else if (likes === undefined) {
    request.body.likes = 0;
  }

  const newBlog = await Blog.create(request.body);
  response.status(201).json(newBlog);

  // const blog = new Blog(request.body);

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result);
  //   });
});

// delete a blog 
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// update a blog
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const newBlog = {
    title,
    author,
    url, 
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true});
  response.json(updatedBlog);
});

module.exports = blogsRouter;