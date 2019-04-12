<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Mediumly </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link px-4 active" :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link
            :to="{ name: 'article-create' }"
            class="nav-link px-4"
            href=""
          >
            <i class="ion-compose"></i>New Article
          </router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link class="nav-link px-4" :to="{ name: 'settings' }">
            <font-awesome-icon icon="cog" />
            <span class="pl-1">Settings</span>
          </router-link>
        </li>
        <template v-if="!isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link px-4" :to="{ name: 'login' }">
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-4" :to="{ name: 'register' }">
              Sign up
            </router-link>
          </li>
        </template>
        <li v-if="isAuthenticated" class="nav-item clickable" @click="logout">
          <a class="nav-link px-4">
            <font-awesome-icon icon="sign-out-alt" />
            <span class="pl-1">Logout</span></a
          >
        </li>
        <li v-if="isAuthenticated" class="nav-item clickable">
          <router-link
            class="nav-link px-4"
            :to="{
              name: 'profile',
              params: { username }
            }"
            >[{{ username }}]</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { resetStore, getGlobalPath } from '@/store'
import { get } from 'vuex-pathify'
import {
  user,
  isAuthenticated,
  username,
  authModulePath
} from '@/store/auth/auth.paths'
import { logoutAction } from '@/store/auth/auth.actions'

export default Vue.extend({
  data: function() {
    return {}
  },
  computed: {
    ...get(authModulePath, {
      user,
      isAuthenticated,
      username
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(getGlobalPath(authModulePath, logoutAction))
      this.$store.commit(resetStore)
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-family: 'Quattrocento Sans', sans-serif !important;
}

.nav-item {
  margin: 0 !important;
}
</style>
