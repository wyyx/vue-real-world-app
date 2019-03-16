<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/NavBar.vue'
import { CHECK_AUTH } from '@/store/auth/auth.actions'

export default Vue.extend({
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch(CHECK_AUTH)
  }
})
</script>

<style lang="scss"></style>
