<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline clickable"
      v-for="(tag, index) of tags"
      :key="index"
      @click.stop="updateArticleQuery(tag)"
    >
      <span v-text="tag" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { UPDATE_QUERY_TAGS } from '@/store/article/article.mutations'

export default Vue.extend({
  name: 'TagList',
  props: {
    tags: Array
  },
  methods: {
    updateArticleQuery(tag) {
      this.$store.commit(UPDATE_QUERY_TAGS, [tag])
    }
  }
})
</script>
<style lang="scss" scoped>
.tag-outline:hover {
  border-color: #5cb85c !important;
  color: #5cb85c !important;
}

.tag-outline:hover span {
  color: #5cb85c !important;
}
</style>
