import axios from 'axios';
const baseURL = '/api/notes';

/**
 * Gets all the notes from the baseURL
 * 
 * @returns {Promise} all the notes on the server
 */
const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

/**
 * Takes a new note created by the user and updates the 
 * notes data on baseURL
 * 
 * @returns {Promise} new note created
 */
const create = (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data);
};

/**
 * Allows the user to update an individual note's important property
 * by making important equal true or false
 * 
 * @returns {Promise} new note updated
 */
const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => {
        console.log('update response',response); 
        return response.data;
    });
};

export default { getAll, create, update }