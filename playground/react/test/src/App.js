import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(async () => {
    const route = await fetch('/user');
    const response = await route.json();
    setDataFromServer(response);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {dataFromServer.map(user => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
}

export default App;
