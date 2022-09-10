import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

   

    // SECOND ATTEMPT
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

  const handleLogin = async (event) => {
    event.preventDefault(); // stop page from refreshing

    try {
      const foundUser = await loginService(username, password)

      setUser(foundUser.data)
      localStorage.setItem('loggedinBlogUser', JSON.stringify(foundUser.data))
      console.log(user)
    } catch (error) {
      console.log(error)
      console.log(error.code)
    }
  }

  // 5.2 - create a way to logout
  const handleLogout = () => {
    // set the user back to null
    setUser(null)
    // erase local storage
    localStorage.clear();
  }

  // 5.1 make it so the user can login and only show the login form if the user is not logged in
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
            <Logout handleLogout={handleLogout} />
          </>
      }
    </div>
  )
}

export default App