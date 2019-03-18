import Vue from 'vue'
import { dateFilter } from './date.filter'
import { errorFilter } from './error.filter'

Vue.filter('date', dateFilter)
Vue.filter('error', errorFilter)
