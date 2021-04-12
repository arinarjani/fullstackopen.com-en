import axios from 'axios';

// url for the server with all the persons data
const /** string */ baseURL = 'http://localhost:3001/persons';

/**
 * Adds a person and associated number to the db
 * 
 * @param {person} A person with associated number being added to the db
 * @returns {Promise} person data
 */
const createPerson = (person) => {
    const request = axios.post(baseURL, person);
    return request.then(response => response.data);
}

/**
 * Updates a person in the db according to their id
 * 
 * @param {person} A person with associated id in the db
 * @returns {Promise} updated persons data
 */
const updatePerson = (person) => {
    const request = axios.put(`${baseURL}/${person.id}`, person);
    return request.then(response => response.data);
}

export default { createPerson, updatePerson };