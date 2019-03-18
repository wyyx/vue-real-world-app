import { http } from './http.service'
import { User } from '@/models/user.model'

export const authService = {
  login(credentials: { email: string; password: string }) {
    return http.post('users/login', { user: credentials })
  },
  register(credentials: { username: string; email: string; password: string }) {
    return http.post('users', { user: credentials })
  },
  checkAuth() {
    return http.get('user')
  },
  updateUser(user: User) {
    return http.put('users', { user })
  }
}
