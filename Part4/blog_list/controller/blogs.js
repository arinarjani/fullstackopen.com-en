const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const Author = require('../models/author.js');
const jwt = require('jsonwebtoken');

// f(x) for grabbing the token from request.headers.authorization
// const returnToken = (authorization) => {
//   if (authorization.toLowerCase().includes('bearer')) {
//     return authorization.slice(7);
//   }
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author');
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
  // grab the authorization from the header
  const { authorization } = request.headers;

  // token
  const token = request.token;

  // decode the token using jwt.verify(token, secretKey)
  // const decodedToken = await jwt.verify(token, process.env.SECRET) ORIGNAL
  let decodedToken = '';
  let decodedTokenError = '';
  try {
    decodedToken = await jwt.verify(token, process.env.SECRET)
  } catch(err) {
    decodedTokenError = err;
  }

  // if no authorization or bad token, return 401
  if (!(authorization || decodedToken) || decodedTokenError) {
    return response.status(401).json({ error: 'invalid or missing token' })
  }

  const { title, url, likes, author } = request.body;
  if (title === undefined && url === undefined) {
    response.status(404).end();
  } else if (likes === undefined) {
    likes = 0;
  }

  // find the user who created this blog
  const user = await Author.findById( decodedToken.id )

  const newBlog = await Blog.create({
    title,
    author: user._id,
    likes,
    url
  });

  // add blog to the user
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  response.status(201).json(newBlog);

  // const blog = new Blog(request.body);

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result);
  //   });
});

// delete a blog 
// 4.21*: bloglist expansion, step9 -> make it so deleting a blog is only possible
//        if the correct user, aka token, is sent with the header
blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request;
  // const decodedToken = await jwt.verify(token, process.env.SECRET)
  const decodedToken = await jwt.verify(token, process.env.SECRET, function(err, decoded) {
    return decoded
  });

  // find the blog with request.params.id
  const foundBlog = await Blog.findById(request.params.id)

  // console.log(foundBlog.author.toString() === decodedToken.id)

  if (foundBlog && decodedToken) {
    if ( foundBlog.author.toString() === decodedToken.id ) {
      await Blog.findByIdAndDelete(request.params.id);
      return response.status(204).end();
    } 
  } else {
    return response.status(401).json({ error: 'incorrect user trying to delete this blog post or incorrect blog id' })
  }

  // response.status(204).end();
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