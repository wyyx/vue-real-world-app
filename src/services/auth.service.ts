import { http } from './http.service'

export const authService = {
  login(credentials: { email: string; password: string }) {
    return http.post('users/login', { user: credentials })
  },
  register(credentials: { username: string; email: string; password: string }) {
    return http.post('users', { user: credentials })
  },
  checkAuth() {
    return http.get('user')
  }
}
