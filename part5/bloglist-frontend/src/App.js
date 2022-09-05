import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
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

  useEffect(() => {
    // const user = JSON.parse(localStorage.loggedinBlogUser) || null;

    // if (user) {
    //   setUser(user);
    //   blogService.setToken(user.token) 
    // }

   

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
    }
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
          </>
      }
    </div>
  )
}

export default App