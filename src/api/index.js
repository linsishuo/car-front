import { http } from '@/lib/request'

// demo
export const demo = () => {
  return http.request({
    url: '/demo'
  })
}

// refreshTOken
export const getRefreshToken = () => {
  return http.request({
    url: '/refreshTOken',
  })
}

// 后门检测
export const allowLogin = data => {
  return request({
    url: '/mobileholiday/AllowSimulateLogin',
    method: 'post',
    data
  })
}

//
export const getHolidayToken = data => {
  return request({
    url: '/mobileholiday/GetHolidayToken',
    method: 'post',
    data
  })
}
