<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Mediumly</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'settings' }">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'register' }">
            Sign up
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UPDATE_USER } from '@/store/auth/auth.actions'
import { SET_ERROR } from '@/store/auth/auth.mutations'

@Component({})
export default class ComponentName extends Vue {}
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-family: 'Quattrocento Sans', sans-serif !important;
}
</style>
