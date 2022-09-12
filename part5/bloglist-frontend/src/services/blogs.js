import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log('token', token)
}

const getAll = () => {
  const controller = new AbortController();

  const request = axios.get(
    baseUrl, {
    signal: controller.signal
  })
  controller.abort()
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }

  console.log('config',config)

  const request = await axios.post(baseUrl, newObject, config);

  return request.data;
}

export default { getAll, setToken, create }