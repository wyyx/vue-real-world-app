<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/NavBar.vue'
import { CHECK_AUTH_ACTION } from '@/store/auth/auth.actions'
import { mapActions } from 'vuex'

export default Vue.extend({
  data: function() {
    return {
      currentPage: 1,
      showFirstAndLast: true
    }
  },
  components: {
    NavBar
  },
  created() {
    console.log('CHECK_AUTH_ACTION')
    this.$store.dispatch(CHECK_AUTH_ACTION)
  },
  methods: {
    onPageUpdate(page) {
      console.log('page', page)
    }
  }
})
</script>

<style lang="scss"></style>
