import React, { useState, useEffect } from 'react';
import Note from './components/Note.js';
import noteServices from './services/notes.js';


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  /**
   * Gets all the notes from the server: http://localhost:3001/notes
   */
  const hook = () => {
    console.log('effect');
    noteServices
      .getAll()
      .then(initalNotes => {
        console.log('promise fulfilled');
        setNotes(initalNotes);
      })
      .catch(error => console.log(error));
  };
  
  useEffect(hook, [])

  console.log('render', notes.length, 'notes');

  /**
   * Takes the new note added by the user and updates both the server
   * and the state with that new note
   * 
   * @param {Object} event The event object created by user input
   */
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    noteServices
      .create(noteObject)
      .then(returnedNote => {
        console.log('note added to db:', returnedNote);
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
      .catch(error => {
        console.log(error)
      })
  }

  /**
   * Updates newNote state with user input of a new note
   * 
   * @param {Object} event The event object created by user input
   */
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  /**
   * Toggles between true/false for each note based on if the user clicks
   * the toggle button
   * 
   * @param {Number} id The event object created by user input
   */
  const toggleImportanceOf =(id) => {
    console.log('note id', id)
    // grab the note with the id of id
    const note = notes.find(note => note.id === id);
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/#update-properties
    const changedNote = {...note, important: !note.important}

    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => {
          return note.id !== id ? note : returnedNote
        }));
      })
      .catch(error => {
        console.log(`${note.content} was already deleted from the server`);
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  /**
   * Either shows all notes if showAll is true or shows notes that
   * have their important value to true
   */
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
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
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App;
