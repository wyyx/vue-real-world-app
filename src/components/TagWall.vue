<template>
  <div class="sidebar">
    <p>{{ title }}</p>
    <div class="tag-list">
      <a
        v-for="tag in tags"
        :key="tag"
        class="tag-pill tag-default"
        :class="{
          active: activeTag(tag),
          'shadow-sm': activeTag(tag)
        }"
        href="#"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: function() {
    return {
      selectedTags: []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: function() {
        return []
      }
    },
    multiSelect: {
      type: Boolean,
      default: true
    },
    initSelectedTags: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  created() {
    const vm: any = this
    vm.selectedTags = [...vm.initSelectedTags]
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
      }

      // emit tags event
      this.$emit('tags', this.selectedTags)
    },
    activeTag(tag) {
      return this.selectedTags.includes(tag)
    },
    clear() {
      this.selectedTags = []
    },
    setSelectedTags(tags: string[]) {
      this.selectedTags = tags
    }
  }
})
</script>

<style lang="scss" scoped>
.tag-pill.active {
  background-color: #5cb85c !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2) !important;
}
</style>
