import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { jwtService } from '@/services/jwt.service'
import { API_URL } from '@/config/config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL

export function setOrUpdateHeader() {
  const token = jwtService.getToken()
  if (token) {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${token}`
  }
}

setOrUpdateHeader()

export const http = Vue.axios
