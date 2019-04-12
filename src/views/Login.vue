<template>
  <div class="auth-page">
    <div class="container page bootstrap">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <!-- error message -->
          <div v-if="showError" class="alert alert-danger" role="alert">
            <strong>登陆失败!</strong> 用户名或密码错误.
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="showError = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in authErrors" :key="error" v-text="error">
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
import { authErrors, isLogging, authModulePath } from '@/store/auth/auth.paths'
import { loginAction } from '@/store/auth/auth.actions'
import { getGlobalPath } from '@/store'

export default Vue.extend({
  data: function() {
    return {
      email: 'gnehcyx@163.com',
      password: '12345678',
      showError: false
    }
  },
  computed: {
    ...get(authModulePath, {
      authErrors,
      isLogging
    })
  },
  methods: {
    login() {
      this.$store
        .dispatch(authModulePath + loginAction, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          const targetUrl = this.$route.query.targetUrl
          if (targetUrl) {
            this.$router.push(targetUrl as string)
          } else {
            this.$router.push({ name: 'home' })
          }
        })
        .catch(error => {
          this.showError = true
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
