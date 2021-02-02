import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const App = (props) => {
  // hold good feedback
  const [good, setGood] = useState(0);
  // hold neutral feedback
  const [neutral, setNeutral] = useState(0);
  // hold bad feeback
  const [bad, setBad] = useState(0);
  // holds index of anecdote to display
  const [selected, setSelected] = useState(0);
  // holds votes per anecdote
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const all = good + neutral + bad; // all votes counted
  const avg = (good + neutral + bad) / 3; // average of votes counted
  const positive = (good / (good + neutral + bad) * 100); // percentage of positive votes counted

  const selectAnecdote = () => {
    // 1. create a random number to select anecdote
    // 2. set selected to the random number
    const random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(random);
  }
  const voteAnecdote = () => {
    // 1. duplicate votes
    // 2. select duplicateedVotes[selected] and increase by 1 when voted on
    // 3. setVotes state to duplicateedVotes
    const duplicateedVotes = [...votes];
    duplicateedVotes[selected] += 1;
    setVotes(duplicateedVotes);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        text={'good'} 
        handleClick={() => setGood(good + 1)} 
      />
      <Button 
        text={'neutral'} 
        handleClick={() => setNeutral(neutral + 1)} 
      />
      <Button 
        text={'bad'} 
        handleClick={() => setBad(bad + 1)} 
      />
      <h2>Statistics</h2>
      {
        all === 0 && 
          <h3>No Feedback Given</h3>
      }
      {
        all > 0 && 
        <>
          <table>
            <tbody>
              <tr>
                <Statistics text={'Good'} value={good} />
              </tr>
              <tr>
                <Statistics text={'Neutral'} value={neutral} />
              </tr>
              <tr>
                <Statistics text={'Bad'} value={bad} />
              </tr>
              <tr>
                <td>All</td>
                <td>{all}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>{avg}</td>
              </tr>
              <tr>
                <td>Positive %</td>
                <td>{positive}</td>
              </tr>
            </tbody>
          </table>
        </>
      }
      <h2>Anecdotes</h2>
      <p>{props.anecdotes[selected]}</p>
      <Button text={'new anecdote'} handleClick={selectAnecdote} />
      <Button text={'vote'} handleClick={voteAnecdote} />
      <p>Votes: {votes[selected]}</p>
      <h2>Most Voted Anecdote</h2>
      {Math.max(...votes) > 0 &&
        <p>{Math.max(...votes)} vote(s): {props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, 
  document.getElementById('root')
)