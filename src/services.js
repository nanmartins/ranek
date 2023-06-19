import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

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
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
