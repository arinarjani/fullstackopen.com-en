import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm.js';
import Person from './components/Persons.js';
import Filter from './components/Filter.js';
import ShowCountryData from './components/ShowCountryData.js';
import ShowCountries from './components/ShowCountries.js';
import personServices from './services/person.js';
import Notification from './components/Notification.js';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);

  // 2.11: set the initial state of the application with useEffect and axios
  useEffect(() => {
    // grab persons
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('persons response successful');
        setPersons(response.data);
      }).catch(error => {
        console.log('error with fetching persons data in App.js:27')
        console.log(error);
      });

      // grab countries
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries response successful');
        setCountries(response.data)
      }).catch(error => {
        console.log('error with fetching persons data in App.js:36')
        console.log(error);
      });
  }, []);
  
  // 2.6: allow the user to add a name to persons
  const addNewName = (event) => {
    event.preventDefault();

    // 2.7: prevent the user from adding duplicate names to persons 
    // if this is [], then there is no duplicate names, but if it is [<data>]
    // then the name being added is a duplicate
    const isDuplicateName = persons.find(name => name.name.toLowerCase() === newName.toLowerCase()) || 'no duplicates';
    console.log('isDuplicateName:', isDuplicateName)
    if ( isDuplicateName === 'no duplicates' ) {
      // create an object of the new person being added to the db
      // for easy passing to functions
      const person = {
        name: newName,
        number: newNumber
      };

      // call f(x) to add person/number to db
      personServices
        .createPerson(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setErrorMessage(`${person.name} ${person.number} has been added`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
        .catch(error => console.log(error));
      
      // set newName and newNumber back to ''
      setNewName('');
      setNewNumber('');
    } else {
      // the name is a duplicate, so prompt the user to 
      // verify changing the number is what they want to do
      const result = window.confirm(`${newName} is already added to the phonebook, replace the old number with ${newNumber}?`);
      if (result) {
        personServices
          .updatePerson({...isDuplicateName, number: newNumber})
          .then(response => {
            console.log('updated person:', response);
            setPersons(persons.map(person => {
              return person.name.toLowerCase() !== newName.toLowerCase() ? person : response
            }))
           })
           .catch(error => console.log(error));
      }
      // set newName and newNumber back to ''
      setNewName('');
      setNewNumber('');
    }
  };

  // 2.12: allow the user to search for a country
  /**
   * Handle input text changes for countries by user and set the
   * correct state
   *
   * @param {Object} event The data input by the user
   */
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  }

  // 2.6: allow the user to add a name
  /**
   * Handle input text changes for add a name by user and set the
   * correct state
   *
   * @param {Object} event The data input by the user
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // 2.8: adding phone numbers to a person
  /**
   * Handle input text changes for add a number by user and set the
   * correct state
   *
   * @param {Object} event The data input by the user
   */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // 2.9: allow the user to search for names in persons
  /**
   * Handle input text changes for search for a name by user and set the
   * correct state
   *
   * @param {Object} event The data input by the user
   */
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  /**
   * 2.17: Handles the deletion of a person by using their id
   *
   * @param {Number} the id of the person to be deleted
   */
  const removePerson = (id) => {
    // find the person who's id matches the id in persons state
    const /** Object */ personToRemove = persons.find(person => person.id === id);

    // true if clicked 'ok', false if clicked 'cancel'
    const /** Bool */ result = window.confirm(`Do you want to remove '${personToRemove.name}'?`);

    if( result ) {
      // filtered array without the person's who has the id of the @param {id}
      const /** Array */ arrayWithRemovedPersons = persons.filter(person => person.id !== id);

      axios.delete(`http://localhost:3001/persons/${id}`)
        .catch(error => {
          console.log(error);
          setErrorMessage(`${personToRemove.name} ${personToRemove.number} has already been deleted`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        });
      
      setPersons(arrayWithRemovedPersons);
    }
  }
  
  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : [];
  
  // 2.12 filter the countries data to show matches for the user search input
  const filteredCountries = country ? countries.filter(data => data.name.toLowerCase().includes(country.toLowerCase())) : [];

  return (
    <div>
      <h2>Phonebook</h2>
      {/* 2.9: allow the user to search for a name in persons */}
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        personal_label={'Enter a name to search'}
      />
      {/* https://www.reddit.com/r/reactjs/comments/gjr1rq/usestate_filtering_names_always_one_step_behind/ */}
      {/* https://stackoverflow.com/questions/55600870/hooks-setstate-always-one-step-behind */}
      {/* search: 'why is my state 1 step behind reactjs' */}
      {/* show persons filtered */}
      {filteredPersons.map(person => (
        <Person name={person.name} number={person.number} />
      ))}
      {/* 2.6: adding names to the phonebook with a form */}
      <h1>Add a New</h1>
      <Notification message={errorMessage} />
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>
      {/* show all persons not filtered */}
      {persons.map(person => (
        <Person name={person.name} number={person.number} removePerson={removePerson} id={person.id} />
      ))}
      <h1>Countries</h1>
      <Filter
        filter={country}
        handleFilterChange={handleCountryChange}
        personal_label={'Enter a country name'}
      />
      {/* 
        2.12 - 2.13
            2.12: Filter the countries data to show matches for the user search input 
                  Also only show searches < 10 in length
                  If filteredCountries.length === 1, then show all that countries data
                    - name, capital, population, language(s), flag
            2.13: 
      */}
      {
        filteredCountries.length === 0
          ? null
          : filteredCountries.length === 1
            ? filteredCountries.map(data => (
                <ShowCountryData country={data} />
              ))
            : filteredCountries.length > 10 
              ? <p>There are too many matches, please specify another more specific filter.</p>
              : <ShowCountries filteredCountries={filteredCountries} />
      }
    </div>
  )
};

export default App