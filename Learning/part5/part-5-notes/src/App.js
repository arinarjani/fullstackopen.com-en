import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/note'
import login from './services/login'

function App( { note }) {
  const [notes, setNotes] = useState([]);
  const [newNote,setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.loggedNoteAppUser);

    if (user) {
      setUser(user);
      noteService.setToken(user.token) 
    }
  }, [])

  // add a new note via input on app
  const addNote = (event) => {
    event.preventDefault();

    const newNoteObj = {
      content: newNote, // why not event.value or something?
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(newNoteObj)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))

          setNewNote('')
        })
  }

  const toggleImportanceOf = id => {
    // find the note based on its' id
    const note = notes.find(note => note.id === id);
    // take all the note date and chanage the importance
    const changedNote = { ...note, important: !note.important };

    // update the note based on its id using update from noteService
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })  
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password);
    try {
      const user = await login(username, password)

      setUser(user) 
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token)     
      setUsername('')      
      setPassword('')
    } catch (error) {
      console.log('error:', error);
    }

    // setUsername('');
    // setPassword('');
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const addNoteForm = () => (
    <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
  )

  console.log('user', user)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <h2>Login</h2>
      { user === null
        ? loginForm()
        : <>
          <p>{user.name} logged in</p>
          { addNoteForm() }
          </>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App;
