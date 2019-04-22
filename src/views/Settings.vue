<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row justify-content-center">
        <div class="col-md-10 col-xs-12">
          <h3 class="text-xs-center">我的设置</h3>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
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
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSettings"
              >
                <span v-if="isPending">
                  <font-awesome-icon class="fa-spin" icon="spinner" />
                </span>
                <span v-else> Update Settings</span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { commonModulePath } from '../store/common/common.paths'
import {
  authModulePath,
  user,
  isPending,
  isAuthenticated
} from '../store/auth/auth.paths'
import {
  updateUserAction,
  updateUserFailAction
} from '../store/auth/auth.actions'

export default Vue.extend({
  data: function() {
    const vm: any = this

    return {
      email: '',
      password: '',
      username: '',
      bio: '',
      image: ''
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      isPending,
      isAuthenticated
    })
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      if (!newVal) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  created() {
    const vm: any = this
    this.initSettings()
  },
  methods: {
    updateSettings() {
      this.$store
        .dispatch(authModulePath + updateUserAction, {
          email: this.email,
          password: this.password,
          username: this.username,
          bio: this.bio,
          image: this.image
        })
        .then(response => {
          this.$router.push({
            name: 'success',
            params: {
              message: 'Settings 更新成功！'
            }
          })
        })
    },
    initSettings() {
      const vm: any = this
      this.email = vm.user.email
      this.username = vm.user.username
      this.bio = vm.user.bio
      this.image = vm.user.image
    }
  }
})
</script>

<style lang="scss" scoped></style>
