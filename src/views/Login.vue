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
          <h3 class="text-xs-center">登陆</h3>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              注册新用户?
            </router-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in authErrors" :key="error" v-text="error">
              {{ error }}
              邮箱地址或密码错误！
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="邮箱"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="password"
                placeholder="密码"
                v-model="password"
              />
            </fieldset>
            <div class="text-center">
              <button @click="login" class="btn btn-lg btn-primary pull-xs">
                <span v-if="isLogging">
                  <font-awesome-icon class="fa-spin" icon="spinner" />
                </span>
                <span v-else>登陆</span>
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
import {
  authErrors,
  isLogging,
  authModulePath,
  isAuthenticated
} from '@/store/auth/auth.paths'
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
      isLogging,
      isAuthenticated
    })
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      if (newVal) {
        const targetUrl = this.$route.query.targetUrl
        if (targetUrl) {
          this.$router.push(targetUrl as string)
        } else {
          this.$router.push({ name: 'home' })
        }
      }
    }
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
