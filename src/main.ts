import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { router } from './router/router'
import '@/assets/main.scss'
import '@/services/http.service'
import '@/router/router.guard'
import VeeValidate, { Validator } from 'vee-validate'
// import filters
import '@/filters'
// import fontawesome
import './fontawesome'

// add bootstrap and related libs
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

// save store initial state
localStorage.setItem('initialState', JSON.stringify(store.state))

// plugs
Vue.use(VeeValidate, {
  // events: 'blur',
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

// Validator.localize('zh', zh)

Vue.config.productionTip = false

console.log('store', store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
