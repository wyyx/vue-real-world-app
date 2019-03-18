<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Mediumly </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link px-20 active" :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li v-if="IS_AUTHENTICATED" class="nav-item">
          <router-link
            :to="{ name: 'article-create' }"
            class="nav-link px-20"
            href=""
          >
            <i class="ion-compose"></i>New Post
          </router-link>
        </li>
        <li v-if="IS_AUTHENTICATED" class="nav-item">
          <router-link class="nav-link px-20" :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>Settings
          </router-link>
        </li>
        <template v-if="!IS_AUTHENTICATED">
          <li class="nav-item">
            <router-link class="nav-link px-20" :to="{ name: 'login' }">
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-20" :to="{ name: 'register' }">
              Sign up
            </router-link>
          </li>
        </template>
        <li v-if="IS_AUTHENTICATED" class="nav-item clickable" @click="logout">
          <a class="nav-link px-20"> <i class="ion-gear-a"></i>Logout </a>
        </li>
        <li v-if="IS_AUTHENTICATED" class="nav-item clickable">
          <router-link
            class="nav-link px-20"
            :to="{
              name: 'profile',
              params: { username: USER_NAME }
            }"
            >[{{ USER_NAME }}]</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  CURRENT_USER,
  IS_AUTHENTICATED,
  USER_NAME
} from '@/store/auth/auth.getters'
import { LOGOUT_ACTION } from '@/store/auth/auth.actions'
import { RESET_STORE } from '@/store'

export default Vue.extend({
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters({
      CURRENT_USER,
      IS_AUTHENTICATED,
      USER_NAME
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT_ACTION)
      this.$store.commit(RESET_STORE)
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
