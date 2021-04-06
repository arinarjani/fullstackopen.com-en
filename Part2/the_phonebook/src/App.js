import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm.js';
import Persons from './components/Persons.js';
import Filter from './components/Filter.js';
import ShowCountryData from './components/ShowCountryData.js';
import ShowCountries from './components/ShowCountries.js';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('');

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
  }, []);

  
  useEffect(() => {
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
    const isDuplicateName = persons.filter(name => name.name.toLowerCase() === newName.toLowerCase());

    if ( isDuplicateName.length === 0 ) {
      // the name being added is not a duplicate
      // add new name to the persons array
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }));
      // set newName and newNumber back to ''
      setNewName('');
      setNewNumber('');
    } else {
      // the name is a duplicate
      alert(`${newName} has already been added. Please enter a new name`);
      // set newName back to ''
      setNewName('');
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
  
  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : []
  // 2.12 filter the countries data to show matches for the user search input
  const filteredCountries = country ? countries.filter(data => data.name.toLowerCase().includes(country.toLowerCase())) : []

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
      <Persons persons={filteredPersons} />
      {/* 2.6: adding names to the phonebook with a form */}
      <h2>Add a New</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* show all persons not filtered */}
      <Persons persons={persons} />
      <h2>Countries</h2>
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