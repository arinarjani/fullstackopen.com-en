import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import AddBlog from './components/AddBlog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState('');

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

    try {
      const foundUser = await loginService(username, password)

      // TODO: user is not being set for some reason!!!!!
      //       - I tried await
      //       - foundUser is working and showing a user just fine -> foundUser.data is the user
      setUser(JSON.stringify(foundUser.data))
      console.log('user', user)
      localStorage.setItem('loggedinBlogUser', JSON.stringify(foundUser.data))
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    } catch (error) {
      console.log(error)
      console.log(error.code)
    }
  }

  // 5.2 - handle logout
  // TODO: maybe redirect to the login page, but HOW? 
  //       for now you have to refresh the page to login again
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  }

  // 5.3 handle a way to add a new blog
  const handleNewBlog = (e) => {
    e.preventDefault();

    // use blogServices to add a new blog
    blogService.create(newBlog);
  }

  return (
    <div>
      {user === null
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
              handleNewBlog={handleNewBlog} 
              newBlog={newBlog}
              setNewBlog={setNewBlog}
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