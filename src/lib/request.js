import axios from 'axios'
import { beforeRequestInterceptors, beforeResponseInterceptors } from './hooks'

export class Request {
  instance = null
  options = {}
  isRefreshing = false
  refreshRequest = []
  constructor(options) {
    this.options = options
    this.instance = axios.create(this.options)
    this.setupInsanceInterceptors()
  }

  setupInsanceInterceptors() {
    this.instance.interceptors.request.use(beforeRequestInterceptors)
    this.instance.interceptors.response.use(beforeResponseInterceptors.bind(this))
  }

  request(options) {
    return new Promise((resolve, reject) => {
      return this.instance
        .request(options)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export const http = new Request({
  baseURL: process.env.VUE_APP_BASE_API
})
