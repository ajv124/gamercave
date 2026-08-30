import axiosInstance from './axiosInstance'

const axiosService = async (httpMethod, url, reqBody = null, headers = {}) => {
  try {
    const config = {
      method: httpMethod,
      url,
      data: reqBody,
      headers
    }
    const response = await axiosInstance(config)
    return response
  } catch (err) {
    throw err
  }
}

export default axiosService