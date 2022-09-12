import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
<<<<<<< HEAD
import AddBlog from './components/AddBlog'
=======
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
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

<<<<<<< HEAD
  // 5.2 - make the login permanent with local storage
  useEffect(() => {
    // third attempt
    try {
      setUser(JSON.parse(localStorage.loggedinBlogUser));
      // blogService.setToken(user.token);
    } catch (error) {
      console.log(error)
    }

    // first attempt
=======

  // 5.2 - make the login permanent
  useEffect(() => {
    // FIRST ATTEMPT
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
    // const user = JSON.parse(localStorage.loggedinBlogUser) || null;

    // if (user) {
    //   setUser(user);
    //   blogService.setToken(user.token) 
    // }


<<<<<<< HEAD
    // second attempt
=======
    // SECOND ATTEMPT
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
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

<<<<<<< HEAD
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

=======
  // 5.2 - create a way to logout
  const handleLogout = () => {
    // set the user back to null
    setUser(null)
    // erase local storage
    localStorage.clear();
  }

  // 5.1 make it so the user can login and only show the login form if the user is not logged in
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
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
<<<<<<< HEAD
            <AddBlog 
              handleNewBlog={handleNewBlog} 
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
            <Logout
              logOut={handleLogout}
            />
=======
            <Logout handleLogout={handleLogout} />
>>>>>>> 52855bb09e4a1eeeab55c545f55630c25783f85d
          </>
      }
    </div>
  )
}

export default App