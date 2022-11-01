import { getRefreshToken } from '@/api'

import store from '@/store'

// 刷新接口
export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    getRefreshToken()
      .then(res => {
        const { accessToken, refreshToken } = res.data.Data

        if (!accessToken || !refreshToken) {
          reject({
            code: 401,
            data: '请退出后重新登录'
          })
        } else {
          resolve(res)
        }
      })
      .catch(err => reject(err))
  })
}

export const setToken = (accessToken, refreshToken) => {
  // const data = Object.assign(store.state.userInfo, {
  //   accessToken,
  //   refreshToken
  // })

  // store.dispatch('setUserInfo', data)
}

export const removeToken = () => {
  // store.dispatch('setUserInfo', {})
}
