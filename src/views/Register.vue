<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row bootstrap">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h3 class="text-xs-center">注册</h3>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              已经有一个账户?
            </router-link>
          </p>
          <ul class="error-messages" v-if="authErrors.length > 0">
            <li v-for="error in authErrors" :key="error" v-text="error">
              邮箱地址已经被占用
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control"
                type="text"
                placeholder="你的昵称"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-validate="'required|email'"
                name="email"
                data-vv-as="Email"
                v-model="email"
                class="form-control"
                type="text"
                placeholder="邮箱"
              />
              <div v-if="errors.has('email')" class="invalid-feedback">
                <p v-for="error in errors.collect('email')" :key="error">
                  {{ error }}
                </p>
              </div>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-validate="'required|min:8|max:20'"
                name="password"
                data-vv-as="Password"
                v-model="password"
                class="form-control"
                type="password"
                placeholder="密码"
                ref="password"
              />
              <div v-if="errors.has('password')" class="invalid-feedback">
                <p v-for="error in errors.collect('password')" :key="error">
                  {{ error }}
                </p>
              </div>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-validate="'required|confirmed:password'"
                name="confirmPassword"
                data-vv-as="Confirming Password"
                class="form-control"
                type="password"
                placeholder="再次输入密码"
              />
              <div
                v-if="errors.has('confirmPassword')"
                class="invalid-feedback"
              >
                <p
                  v-for="error in errors.collect('confirmPassword')"
                  :key="error"
                >
                  {{ error }}
                </p>
              </div>
            </fieldset>

            <div class="text-center">
              <button
                @click="register"
                class="btn btn-lg btn-primary pull-xs"
                type="button"
              >
                <span v-if="isRegistering"
                  ><font-awesome-icon class="fa-spin" icon="spinner"
                /></span>
                <span v-else>注册</span>
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
import { get } from 'vuex-pathify'
import {
  authModulePath,
  authErrors,
  isRegistering
} from '@/store/auth/auth.paths'
import { registerAction } from '@/store/auth/auth.actions'
import { getGlobalPath } from '@/store'

export default Vue.extend({
  data: function() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...get(authModulePath, {
      authErrors,
      isRegistering
    })
  },
  methods: {
    register() {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('form', JSON.stringify(this.$data))

          this.$store.dispatch(getGlobalPath(authModulePath, registerAction), {
            username: this.username,
            email: this.email,
            password: this.password
          })
        }
      })
    }
  }
})
</script>

<style></style>
