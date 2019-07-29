import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.baseURL = 'http://10.222.232.11:8888'
axios.defaults.timeout = 5000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default axios
