import React, { useState } from 'react';
import ShowCountryData from './ShowCountryData.js';

const ShowCountries = ( {filteredCountries} ) => {
    //console.log('ShowCountries.js - filteredCountries:', filteredCountries);
    const [ showCountryData, setShowCountryData ] = useState(false);

    const handleShowCountryData = () => {
        setShowCountryData(!showCountryData);
    };

    // TODO: make each country result it's own component so it can have it's own state
    //       b/c right now, each button has the same state, so each button can change
    //       the state of another button
    return (
        <div>
            {filteredCountries.map(data => (
                <>
                    <p>{data.name} <button onClick={handleShowCountryData}>show country data</button></p>
                    <ShowCountryData country={data} />
                </>
            ))}
        </div>
    )
};

export default ShowCountries;