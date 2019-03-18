<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <ArticleList
        :articles="articles"
        :articlesCount="articlesCount"
        :itemsPerPage="itemsPerPage"
        @page="onPageUpdate($event)"
      ></ArticleList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { mapGetters } from 'vuex'
import {
  USER_ARTICLES,
  USER_ARTICLES_COUNT,
  IS_LOADING,
  GLOBAL_ARTICLES,
  GLOBAL_ARTICLES_COUNT,
  ARTICLE_QUERY
} from '@/store/article/article.getters'
import {
  FETCH_GLOBAL_ARTICLES_ACTION,
  FETCH_USER_ARTICLES_ACTION
} from '@/store/article/article.actions'
import { Article } from '@/models/article.model'
import { Page } from '@/models/page.model'

export default Vue.extend({
  name: 'app-feed',
  data: function() {
    return {
      itemsPerPage: 10
    }
  },
  props: {
    feedType: {
      // 'user' or 'global'
      type: String,
      required: true
    }
  },
  created() {
    this.loadArticles({
      offset: 0,
      limit: this.itemsPerPage,
      tags: []
    })
  },
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters([
      USER_ARTICLES,
      USER_ARTICLES_COUNT,
      IS_LOADING,
      GLOBAL_ARTICLES,
      GLOBAL_ARTICLES_COUNT,
      ARTICLE_QUERY
    ]),
    isLoading() {
      return this[IS_LOADING]
    },
    articles() {
      return this['feedType'] === 'user'
        ? this[USER_ARTICLES]
        : this[GLOBAL_ARTICLES]
    },
    articlesCount() {
      return this['feedType'] === 'user'
        ? this[USER_ARTICLES_COUNT]
        : this[GLOBAL_ARTICLES_COUNT]
    }
  },
  watch: {
    [ARTICLE_QUERY](newVal, oldVal) {
      this.loadArticles(newVal)
    }
  },
  methods: {
    loadArticles(params) {
      if (this.feedType === 'user') {
        this.$store.dispatch(FETCH_USER_ARTICLES_ACTION, params)
      } else {
        this.$store.dispatch(FETCH_GLOBAL_ARTICLES_ACTION, params)
      }
    }
  }
})
</script>

<style></style>
