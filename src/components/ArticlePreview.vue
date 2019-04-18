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
        <TagList :tags="article.tagList" @tags="onTags($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleMeta from './ArticleMeta.vue'
import TagList from './TagList.vue'
import {
  articleModulePath,
  articleQueryTags,
  currentTags
} from '../store/article/article.paths'

export default Vue.extend({
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
      const vm: any = this
      return {
        name: 'article',
        params: {
          slug: vm.article.slug
        }
      }
    }
  },
  methods: {
    onTags(tags: string[]) {
      console.log('tags', tags)
      const store: any = this.$store
      store.set(articleModulePath + articleQueryTags, tags)
      store.set(articleModulePath + currentTags, tags)

      this.$router.push({ name: 'home' })
    }
  }
})
</script>

<style lang="scss" scoped>
.article-preview .preview-link ul {
  float: none;
  max-width: 100%;
}
</style>
