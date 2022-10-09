import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import AddBlog from './components/AddBlog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  console.log('user', user)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // const controller = new AbortController();
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      }).catch(err => {
        if (err.name === 'AbortError') {
          console.log('error aborted')
        }
      })

    

    // return () => {
    //   controller.abort()
    // }


    // OLD CODE WITH CALLBACKS
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )  
  }, [])


  // 5.2 - make the login permanent
  useEffect(() => {
    // FIRST ATTEMPT
    // const user = JSON.parse(localStorage.loggedinBlogUser) || null;

    // if (user) {
    //   setUser(user);
    //   blogService.setToken(user.token) 
    // }


    // second attempt
    // let unmounted = false;
    // const userFromLocalStorage = JSON.parse(localStorage.loggedinBlogUser)

    // if (!unmounted) {
    //   if (userFromLocalStorage) {
    //     setUser(userFromLocalStorage);
    //     blogService.setToken(userFromLocalStorage.token);
    //     // noteService.setToken(user.token) 
    //   }
    // }
    // if (userFromLocalStorage) {
    //   setUser(userFromLocalStorage);
    //   blogService.setToken(userFromLocalStorage.token);
    //   // noteService.setToken(user.token) 
    // }

    // return () => {
    //   unmounted = true;
    // }

    // THIRD ATTEMPT
    try {
      const user = JSON.parse(localStorage.loggedinBlogUser);
      setUser(user);
      blogService.setToken(user.token) 
    } catch (err) {
      console.log(err)
    }
  }, [])

  // 5.1 - implement a way to login
  const handleLogin = async (event) => {
    event.preventDefault(); // stop page from refreshing

    // TODO: figure out how to get the error object or something 
    //       to then be able to show something like, 'incorrect usename' or 'incorrect password'
    try {
      const loginAttempt = await loginService(username, password);
      console.log('loginAttempt:', loginAttempt);
      const { data: foundUser } = await loginService(username, password);
      console.log('got here')
      setUser(foundUser)
      localStorage.setItem('loggedinBlogUser', JSON.stringify(foundUser));
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    } catch (error) {
      console.log('error:', error)

      // part 5.4 - creating a message system to show error in logging in or a success in adding a new blog
      setNotification('wrong username or password...try again');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  }

  // 5.2 - handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  }

  // 5.3 handle a way to add a new blog
  const handleNewBlogTitle = async (e) => {
    e.preventDefault();

    const body = {
      title: newBlogTitle,
      author: user.username,
    }

    // use blogServices to add a new blog
    try {
      const createdTitle = await blogService.create(body);
      console.log('createdTitle:', createdTitle);

      // part 5.4 - creating a message system to show error in logging in or a success in adding a new blog
      setNotification(`a new blog titled '${body.title}' was created by '${body.author}'`);
      setTimeout(() => {
        setNotification('');
      }, 3000)
    } catch (err) {
      console.log('error in creating new blog:', err);
    }
    // const createdTitle = await blogService.create(body);

    // console.log('createdTitle:', createdTitle);
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null || user === undefined
        ? 
          <Login 
            handleLogin={handleLogin} 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        : 
          <>
            <p>logged in as {user.name}</p>
            <h2>all blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
            <AddBlog 
              handleNewBlogTitle={handleNewBlogTitle} 
              newBlogTitle={newBlogTitle}
              setNewBlogTitle={setNewBlogTitle}
            />
            <Logout
              logOut={handleLogout}
            />
          </>
      }
    </div>
  )
}

export default App