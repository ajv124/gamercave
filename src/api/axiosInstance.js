import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://gamercave-server.onrender.com',
  timeout: 10000
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        localStorage.removeItem('user')
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance