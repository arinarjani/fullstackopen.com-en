import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login';
// const baseUrl = '/api/login';

const login = async (username, password) => {
    console.log('got here in part5/controller/login.js')
    try {
        return await axios.post(baseUrl, {username, password});
    } catch (error) {
        return error;
    }
    // console.log('user in part5/controller/login.js', user);
    // return user;
}

export default login