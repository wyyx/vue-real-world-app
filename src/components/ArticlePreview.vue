<template>
  <div class="article-preview">
    <ArticleMeta :article="article" />
    <router-link :to="articleLink" class="preview-link">
      <h1 v-text="article.title" />
      <p v-text="article.description" />
      <span>Read more...</span>
    </router-link>
    <div class="row">
      <div class="col-12 col-md-6"></div>
      <div class="col-12 col-md-6 text-right">
        <TagList :tags="article.tagList" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMeta from './ArticleMeta'
import TagList from './TagList'

export default {
  name: 'ArticlePreview',
  components: {
    ArticleMeta,
    TagList
  },
  props: {
    article: { type: Object, required: true }
  },
  computed: {
    articleLink() {
      return {
        name: 'article',
        params: {
          slug: this.article.slug
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-preview .preview-link ul {
  float: none;
  max-width: 100%;
}
</style>
