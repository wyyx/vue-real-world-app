<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Mediumly</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row p-20">
        <div class="col-12 col-sm-12 order-12 order-md-1 col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item clickable" @click="currentFeed = 'user'">
                <span
                  class="nav-link"
                  :class="{ active: currentFeed === 'user' }"
                >
                  Your Feed
                </span>
              </li>
              <li class="nav-item clickable" @click="currentFeed = 'global'">
                <span
                  class="nav-link"
                  :class="{ active: currentFeed === 'global' }"
                >
                  Global Feed
                </span>
              </li>
            </ul>
          </div>
          <!-- feed -->
          <div>
            <div v-if="isLoading" class="article-preview">
              Loading articles...
            </div>
            <div>
              <div
                v-if="!isLoading && articles.length === 0"
                class="article-preview"
              >
                No articles are here... yet.
              </div>
              <ArticleList
                v-show="!isLoading"
                :articles="articles"
              ></ArticleList>
            </div>
          </div>
          <!-- pagination -->
          <div class="pagination-wrapper" v-show="!isLoading">
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
        <!-- tag wall -->
        <div class="col-12 col-sm-12 order-1 order-md-12 col-md-3">
          <div class="tags-wrapper p-10">
            <TagWall
              ref="popularTags"
              :tags="tags"
              title="Popular Tags"
              @tags="onPopularTagsChange($event)"
            ></TagWall>
          </div>
          <div class="tags-wrapper p-10">
            <TagWall
              :multiSelect="false"
              ref="authorTags"
              :tags="authors"
              title="Author Tags"
              @tags="onAuthorTagsChange($event)"
            ></TagWall>
          </div>
          <div class="tags-wrapper p-10" v-show="currentTags.length > 0">
            <TagWall
              :multiSelect="false"
              ref="currentTags"
              :tags="currentTags"
              :initSelectedTags="currentTags"
              title="Current Tags"
              @tags="onCurrentTagsChange($event)"
            ></TagWall>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Feed from '@/components/Feed.vue'
import TagWall from '@/components/TagWall.vue'
import ArticleList from '@/components/ArticleList.vue'
import Pagination from '@/components/Pagination.vue'
import {
  articleQueryAuthor,
  tags,
  articleQuery,
  articleQueryTags,
  authors,
  articleModulePath,
  isLoading,
  articleQueryLimit,
  articleQueryOffset,
  currentTags,
  articles,
  articlesCount
} from '@/store/article/article.paths'
import {
  fetchTagsAction,
  fetchUserArticlesAction,
  fetchGlobalArticlesAction,
  updateArticleQueryAction
} from '@/store/article/article.actions'
import { isAuthenticated, authModulePath } from '@/store/auth/auth.paths'
import { mapGetters } from 'vuex'
import { get } from 'vuex-pathify'
import store from '@/store'
import { FeedType } from '../models/article.model'
import { Page } from '../models/page.model'

export default Vue.extend({
  components: {
    TagWall,
    ArticleList,
    Pagination
  },
  data: function() {
    return {
      currentFeed: 'global'
    }
  },
  computed: {
    ...get(authModulePath, {
      isAuthenticated
    }),
    ...get(articleModulePath, {
      articleQuery,
      tags,
      authors,
      articles,
      articlesCount,
      isLoading,
      articleQueryOffset,
      articleQueryTags,
      articleQueryLimit,
      currentTags
    })
  },

  watch: {
    isAuthenticated() {
      this.$store.dispatch(articleModulePath + fetchTagsAction)
    },
    articleQuery(newVal, oldVal) {
      this.loadArticles(newVal)
    },
    currentTags(newVal: string[], oldVal: string[]) {
      const currentTagsRef: any = this.$refs.currentTags
      if (newVal.length > 0) {
        this.clearPopularTags()
        this.clearAuthorTags()
        currentTagsRef.setSelectedTags(newVal)
      }
    },
    currentFeed(newVal, oldVal) {
      const vm: any = this
      this.loadArticles(vm.articleQuery)
    }
  },
  created() {
    this.$store.dispatch(articleModulePath + fetchTagsAction)
  },
  methods: {
    onPopularTagsChange(tags) {
      const store: any = this.$store
      store.set(articleModulePath + articleQueryTags, tags)
      store.set(articleModulePath + articleQueryAuthor, '')

      this.clearAuthorTags()
      this.clearCurrentTags()
    },

    onAuthorTagsChange(tags) {
      const store: any = this.$store
      store.set(articleModulePath + articleQueryTags, [])
      store.set(articleModulePath + articleQueryAuthor, tags[0])

      this.clearPopularTags()
      this.clearCurrentTags()
    },
    onCurrentTagsChange(tags: string[]) {
      console.log('tags', tags)
      const store: any = this.$store
      store.set(articleModulePath + articleQueryTags, tags)
      store.set(articleModulePath + currentTags, tags)

      this.clearPopularTags()
      this.clearAuthorTags()
    },
    clearPopularTags() {
      const popularTagsRef: any = this.$refs.popularTags
      popularTagsRef.clear()
    },
    clearAuthorTags() {
      const authorTagsRef: any = this.$refs.authorTags
      authorTagsRef.clear()
    },
    clearCurrentTags() {
      const currentTagsRef: any = this.$refs.currentTags
      const store: any = this.$store

      store.set(articleModulePath + currentTags, [])
      currentTagsRef.clear()
    },
    loadArticles(params) {
      switch (this.currentFeed) {
        case FeedType.User:
          this.$store.dispatch(
            articleModulePath + fetchUserArticlesAction,
            params
          )
          break
        case FeedType.Global:
          this.$store.dispatch(
            articleModulePath + fetchGlobalArticlesAction,
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

      this.$store.dispatch(articleModulePath + updateArticleQueryAction, {
        offset: newOffset,
        limit: newLimit
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-font {
  font-family: 'Quattrocento Sans', sans-serif;
}

.host {
  position: relative;
}

.pagination {
  bottom: 10px;
  margin: 0px !important;
}

.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
