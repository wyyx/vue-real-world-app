<template>
  <router-link :to="{ name: 'home', params: { tag: name } }" :class="className">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: 'RwvTag',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'tag-pill tag-default'
    }
  }
}
</script>
