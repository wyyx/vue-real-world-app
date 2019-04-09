<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in errors" :key="error" v-text="error">
              {{ error }}
              That email or password is invalid
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <div class="text-center">
              <button @click="login" class="btn btn-lg btn-primary pull-xs">
                <span v-if="isLogging">
                  <font-awesome-icon class="fa-spin" icon="spinner" />
                </span>
                <span v-else> Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { get } from 'vuex-pathify'
import { errors, isLogging, authModulePath } from '@/store/auth/auth.paths'
import { loginAction } from '@/store/auth/auth.actions'
import { getGlobalPath } from '@/store'

export default Vue.extend({
  data: function() {
    return {
      email: 'gnehcyx@163.com',
      password: '12345678'
    }
  },
  computed: {
    ...get(authModulePath, {
      errors,
      isLogging
    })
  },
  methods: {
    login() {
      this.$store.dispatch(getGlobalPath(authModulePath, loginAction), {
        email: this.email,
        password: this.password
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
