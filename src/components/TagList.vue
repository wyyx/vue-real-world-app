<template>
  <ul class="tag-list">
    <li
      v-for="tag in tags"
      :key="tag"
      class="tag-default tag-pill tag-outline clickable"
      :class="{
        active: activeTag(tag),
        'shadow-sm': activeTag(tag)
      }"
      href="#"
      @click="toggleTag(tag)"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  articleQueryTags,
  articleModulePath
} from '@/store/article/article.paths'

export default Vue.extend({
  data: function() {
    return {
      selectedTags: []
    }
  },
  props: {
    tags: {
      type: Array,
      default: function() {
        return []
      }
    },
    multiSelect: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    toggleTag(tag) {
      // single selection
      if (!this['multiSelect']) {
        this.toggleTagSingle(tag)
      } else {
        this.toggleTagMulti(tag)
      }
    },
    toggleTagSingle(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = []
      } else {
        this.selectedTags.push(tag)
      }

      // emit tags event
      this.$emit('tags', this.selectedTags)
    },
    toggleTagMulti(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag)
      } else {
        this.selectedTags.push(tag)
        console.log('tag', tag)
      }

      console.log('toggleTagMulti', tag)

      // emit tags event
      this.$emit('tags', this.selectedTags)
    },
    activeTag(tag) {
      return this.selectedTags.includes(tag)
    },
    clear() {
      this.selectedTags = []
    }
  }
})
</script>
<style lang="scss" scoped>
.tag-outline:hover {
  border-color: #5cb85c !important;
  color: #5cb85c !important;
}
</style>
