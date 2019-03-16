<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Mediumly </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link px-5 active" :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link px-5" href="">
            <i class="ion-compose"></i>New Post
          </a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-5" :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>Settings
          </router-link>
        </li>
        <template v-if="!isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link px-5" :to="{ name: 'login' }">
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-5" :to="{ name: 'register' }">
              Sign up
            </router-link>
          </li>
        </template>
        <li v-if="isAuthenticated" class="nav-item link">
          <router-link
            class="nav-link px-5"
            :to="{
              name: 'profile',
              params: { username: userName }
            }"
            >[{{ userName }}]</router-link
          >
        </li>
        <li v-if="isAuthenticated" class="nav-item link" @click="logout">
          <a class="nav-link px-5"> <i class="ion-gear-a"></i>Logout </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  currentUser,
  isAuthenticated,
  userName
} from '@/store/auth/auth.getters'
import { LOGOUT_ACTION } from '@/store/auth/auth.actions'

export default Vue.extend({
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters([currentUser, isAuthenticated, userName])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT_ACTION)
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-family: 'Quattrocento Sans', sans-serif !important;
}
</style>
