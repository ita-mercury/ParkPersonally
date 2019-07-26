import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.timeout = 5000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
  }
)

export default axios
