<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row bootstrap">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul class="error-messages" v-if="ERRORS.length > 0">
            <li v-for="error in errors" :key="error" v-text="error">
              That email is already taken
            </li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-validate="'required|email'"
                name="email"
                data-vv-as="Email"
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
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
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
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
                class="form-control form-control-lg"
                type="password"
                placeholder="Confirm Password"
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
                <span v-else> Sign up</span>
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
import { authModulePath, errors, isRegistering } from '@/store/auth/auth.paths'
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
      errors,
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
