import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/hero/check/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/hero/check/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/hero/check/logout',
    method: 'post'
  })
}
