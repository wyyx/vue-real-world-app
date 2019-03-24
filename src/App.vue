<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/NavBar.vue'
import { mapActions } from 'vuex'
import { getGlobalPath } from '@/store'
import { authModulePath } from '@/store/auth/auth.paths'
import { checkAuthAction } from '@/store/auth/auth.actions'

export default Vue.extend({
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch(getGlobalPath(authModulePath, checkAuthAction))
  },
  methods: {}
})
</script>
