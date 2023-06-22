import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://ranekapilocal.local/wp-json/api'
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token

    if (token) {
      config.headers.Authorization = token
    }
    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)

export const api = {
  get(url) {
    return axiosInstance.get(url)
  },
  post(url, body) {
    return axiosInstance.post(url, body)
  },
  put(url, body) {
    return axiosInstance.put(url, body)
  },
  delete(url) {
    return axiosInstance.delete(url)
  },
  login(body) {
    return axios.post(`http://ranekapilocal.local/wp-json/jwt-auth/v1/token`, body)
  },
  validateToken() {
    return axios.post(`http://ranekapilocal.local/wp-json/jwt-auth/v1/token/validate`)
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
