<template>
  <div class="container">
    <div class="alert alert-success" role="alert">
      {{ message }}
    </div>
    <div class="actions">
      <router-link v-if="firstTitle" :to="firstRoute" class="p-2">{{
        firstTitle
      }}</router-link>
      <router-link v-if="secondTitle" :to="secondRoute" class="p-2">{{
        secondTitle
      }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['message', 'firstTitle', 'firstRoute', 'secondTitle', 'secondRoute']
})
</script>

<style scoped>
.actions {
  font-size: 14px;
}
</style>
