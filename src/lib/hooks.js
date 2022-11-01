import router from '@/router'
import store from '@/store'
import { refreshToken, removeToken, setToken } from './refreshToken'

// 请求之前的拦截
export const beforeRequestInterceptors = config => {
  const userInfo = store.getters.userInfo || {}

  const accessToken = userInfo.accessToken

  if (accessToken) config.headers.Token = accessToken

  return config
}

// 重试状态
let refreshFlag = false
// 重试队列
let refreshMap = []

// 响应之前的拦截
export const beforeResponseInterceptors = function (response) {
  const status = response.status

  const tokenStatus = response.headers['token-status']

  if (status === 200 && tokenStatus === 'Expires') {
    console.log(refreshFlag, 'refreshFlag')
    if (!refreshFlag) {
      refreshFlag = true

      return refreshToken()
        .then(res => {
          const { accessToken, refreshToken } = res.data.Data

          setToken(accessToken, refreshToken)

          response.headers.Token = `${accessToken}`
          refreshMap.forEach(cb => cb(response.config))
          refreshFlag = false
          refreshMap = []
          return this.instance(response.config)
        })
        .catch(error => {
          refreshFlag = false
          refreshMap = []

          return Promise.reject(error)
        })
    } else {
      return new Promise(resovle => {
        refreshMap.push(token => {
          response.headers.Token = `${token}`
          resovle(this.instance(response.config))
        })
      })
    }
  }

  return response
}
