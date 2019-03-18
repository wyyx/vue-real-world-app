import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import store from './store'
import '@/assets/main.scss'
import '@/services/http.service'
import '@/router/router.guard'
// add fontawesome lib
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// add bootstrap and related libs
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

// add icons
library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// save store initial state
localStorage.setItem('initialState', JSON.stringify(store.state))

// import filters
import '@/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
