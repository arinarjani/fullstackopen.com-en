import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login';
// const baseUrl = '/api/login';

const login = async (username, password) => {
    const user = await axios.post(baseUrl, {username, password});
    return user;
}

export default login