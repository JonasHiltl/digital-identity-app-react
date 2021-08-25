import axios from 'axios'

const api = axios.create({
  baseURL: 'https://digital-identity-nestjs.herokuapp.com',
})

export default api
