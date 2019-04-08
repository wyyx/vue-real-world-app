import { http } from './http.service'
import { Profile } from '@/models/profile.model'

export const profileService = {
  fetchProfile(username: string) {
    return http.get<{ profile: Profile }>(`profiles/${username}`)
  }
}
