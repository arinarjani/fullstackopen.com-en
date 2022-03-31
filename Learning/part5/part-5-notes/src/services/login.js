import axios from 'axios'
const baseURL = '/api/login';

const login = async (username, password) => {
    const response = await axios({
        method: 'post',
        url: baseURL,
        data: {
          username,
          password
        }
      });

      return response.data;
}

export default login