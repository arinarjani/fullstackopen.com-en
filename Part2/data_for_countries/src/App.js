import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter.js';
import ShowCountryData from './components/ShowCountryData.js';
import ShowCountries from './components/ShowCountries.js';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('');

  // 2.11: set the initial state of the application with useEffect and axios
  useEffect(() => {
      // grab countries
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries response successful');
        setCountries(response.data)
      }).catch(error => {
        console.log(error);
      });
  }, []);

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

  // 2.12 filter the countries data to show matches for the user search input
  const filteredCountries = country ? countries.filter(data => data.name.toLowerCase().includes(country.toLowerCase())) : [];

  return (
    <div>
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