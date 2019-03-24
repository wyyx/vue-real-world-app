<template>
  <div v-if="articles.length > 0">
    <ArticlePreview
      v-for="(article, index) in articles"
      :article="article"
      :key="article.title + index"
    />
  </div>
</template>

<script lang="ts">
import ArticlePreview from './ArticlePreview.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticlePreview
  },
  props: {
    articles: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
