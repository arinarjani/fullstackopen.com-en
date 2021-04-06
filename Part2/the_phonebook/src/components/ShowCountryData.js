import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowCountryData = ( {country} ) => {
    console.log('ShowCountryData.js - country:', country)

    // store the countries capital data
    const [ capitalData, setCapitalData ] = useState(0);

    const buildWeatherURL = 
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`;

    // console.log('api-key:', process.env.REACT_APP_WEATHER_API_KEY);
    // console.log('buildWeatherURL:', buildWeatherURL);

    /**
     * Get the weather data for a country's capital city
     */
    // useEffect(() => {
    //     axios.get(buildWeatherURL)
    //         .then(response => {
    //             setCapitalData(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, []);
    // console.log('capitalData', capitalData);

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            {
                country.languages.map(language => (
                <p>{language.name}</p>
                ))
            }
            <img src={country.flag} />
            {/* { capitalData && 
                <>
                    <h2>Weather in {country.capital}</h2>
                    <p><b>temperature:</b> {capitalData.currrent.temperature} [insert unit]</p>
                    <img src={capitalData.currrent.weather_icons} />
                    <p><b>Wind:</b> {capitalData.current.wind_speed} [insert unit] - direction {capitalData.current.wind_dir}</p>
                </>
            } */}
        </div>
    )
};

export default ShowCountryData;