<template>
  <div>
    <div v-if="isLoading" class="article-preview">
      Loading articles...
    </div>
    <div>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <ArticleList v-show="!isLoading" :articles="articles"></ArticleList>
      <div class="pagination-wrapper">
        <Pagination
          class="pagination"
          :totalItems="articlesCount"
          :currentPage="1"
          :visiblePages="5"
          :showFirstAndLastNavigator="true"
          @page="onPageUpdate($event)"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { get } from 'vuex-pathify'
import {
  globalArticles,
  globalArticlesCount,
  userArticles,
  userArticlesCount,
  isLoading,
  articleQuery,
  queryLimit,
  queryOffset,
  articleModulePath
} from '@/store/article/article.paths'
import { getGlobalPath } from '@/store'
import Pagination from '@/components/Pagination.vue'

import { Article, FeedType } from '@/models/article.model'
import { Page } from '@/models/page.model'
import {
  fetchFavoriteArticlesAction,
  fetchUserAticlesAction,
  fetchGlobalArticlesAction,
  updateArticleQueryAction
} from '@/store/article/article.actions'

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
    ArticleList,
    Pagination
  },
  computed: {
    ...get('article', {
      globalArticles,
      globalArticlesCount,
      userArticles,
      userArticlesCount,
      isLoading,
      articleQuery,
      queryOffset,
      queryLimit
    }),
    isUserFeed() {
      return this['feedType'] === 'user'
    },
    articles() {
      return this.isUserFeed ? this['userArticles'] : this['globalArticles']
    },
    articlesCount() {
      return this.isUserFeed
        ? this['userArticlesCount']
        : this['globalArticlesCount']
    }
  },
  watch: {
    articleQuery(newVal, oldVal) {
      this.loadArticles(newVal)
    }
  },
  methods: {
    loadArticles(params) {
      switch (this['feedType']) {
        case FeedType.User:
          this.$store.dispatch(
            getGlobalPath(articleModulePath, fetchUserAticlesAction),
            params
          )
          break
        case FeedType.Global:
          this.$store.dispatch(
            getGlobalPath(articleModulePath, fetchGlobalArticlesAction),
            params
          )
          break
        case FeedType.Favorite:
          this.$store.dispatch(
            getGlobalPath(articleModulePath, fetchFavoriteArticlesAction),
            params
          )
          break
        default:
          break
      }
    },
    onPageUpdate({ page, pageSize }: Page) {
      const newOffset = (page - 1) * pageSize
      const newLimit = pageSize

      this.$store.dispatch(
        getGlobalPath(articleModulePath, updateArticleQueryAction),
        {
          offset: newOffset,
          limit: newLimit
        }
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.host {
  position: relative;
}

.pagination {
  position: fixed;
  bottom: 10px;
  margin: 0px !important;
}

.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
