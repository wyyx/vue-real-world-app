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

          <ul class="error-messages" v-if="errors.length > 0">
            <li v-for="error in errors" :key="error" :v-text="error">
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
                <span v-if="isLogging"
                  ><font-awesome-icon class="fa-spin" icon="spinner"
                /></span>
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
import { authGetters, errors, isLogging } from '@/store/auth/auth.getters'
import { LOGIN_ACTION } from '@/store/auth/auth.actions'

export default Vue.extend({
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([errors, isLogging])
  },

  methods: {
    login() {
      this.$store.dispatch(LOGIN_ACTION, {
        email: this.email,
        password: this.password
      })
    }
  }
})
</script>

<style></style>
