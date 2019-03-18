<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul class="error-messages" v-if="ERRORS.length > 0">
            <li v-for="error in ERRORS" :key="error" v-text="error">
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
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>

            <div class="text-center">
              <button @click="register" class="btn btn-lg btn-primary pull-xs">
                <span v-if="IS_REGISTERING"
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
import { REGISTER_ACTION } from '@/store/auth/auth.actions'
import { mapGetters } from 'vuex'
import { ERRORS, IS_REGISTERING } from '@/store/auth/auth.getters'

export default Vue.extend({
  data: function() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      ERRORS,
      IS_REGISTERING
    })
  },
  methods: {
    register() {
      this.$store.dispatch(REGISTER_ACTION, {
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
})
</script>

<style></style>
