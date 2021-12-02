const _ = require('lodash');

const blogs = [

  {
    title: "tokenExtractor for the winn!!!!!",
    author: "arin",
    url: "https://www.fullstackopen.com.en",
    likes: 50
  },
];

const authors = [
  {
    username: "arin",
    name: "arin",
    password: "password"
  },
];

const authorsWithLikes = [
  {
    author: "Robert C. Martin",
    likes: 3
  },
  {
    author: "Eric Sparrow",
    likes: 30
  },
  {
    author: "Tommy Vercetti",
    likes: 9
  },
  {
    author: "Laz-lo",
    likes: 80
  },
];

/**
	 * 4.3 - Dummy test function to see if Jest testing works
	 *
	 * @param {Object} blogs not important due to return value being constant
	 * @returns {Number} always returns 1
	 */
const dummy = () => {
  return 1;
};

/**
	 * 4.4 - Finds the total likes from 0 or more blog posts
	 *
	 * @param {Object} posts Either 0 or many posts from blogs
	 * @returns {Number} 0 if no posts or the sum of all likes from posts
	 */
const totalLikes = (posts) => {
  const totalLikesSum = posts.reduce((accumulator, post) => {
    return accumulator + post.likes
  }, 0) ;

  return totalLikesSum;
};

/**
	 * 4.5 - Finds the most liked blog from a set of blogs given
	 *
	 * @param {Object} blogs All the blogs given to test for most liked
	 * @returns {Object} The blog that has the most likes
	 */
const favoriteBlog = (blogs) => {
  /** find the most liked out of all blogs */
  const mostLikes = Math.max(...blogs.map(blog => blog.likes));
  /** find the blog with the most likes */
  const mostLikedBlog = blogs.find(blog => blog.likes === mostLikes);
  /** return the most liked blog object */
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

/**
	 * 4.6 - Finds the author with the most blogs and number of blogs 
	 *
	 * @param {Object} blogs A bunch of blogs
	 * @returns {Object} author who has the largest amount of blogs, and the number of blogs for author
	 */
const mostBlogs = (blogs) => {
  return _.reduce(blogs, (accum, blogs)=> accum.blogs> blogs.blogs ? accum : blogs);
};

/**
	 * 4.7 - Finds the author with the most likes and number of likes from a blog post
	 *
	 * @param {Object} blogs A bunch of likes
	 * @returns {Object} author who has the largest amount of likes, and the number of likes for author
	 */
 const mostLikes = (blogs) => {
  return _.reduce(blogs, (accum, blogs)=> accum.likes> blogs.likes ? accum : blogs);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
  authors,
  authorsWithLikes,
};