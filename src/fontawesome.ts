import Vue from 'vue'

// import fontawesome lib
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faCog,
  faSignOutAlt,
  faPlus,
  faTimesCircle,
  faHeart,
  faPen,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// add fontawesome icons
library.add(faSpinner)
library.add(faCog)
library.add(faSignOutAlt)
library.add(faPlus)
library.add(faTimesCircle)
library.add(faHeart)
library.add(faPen)
library.add(faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
