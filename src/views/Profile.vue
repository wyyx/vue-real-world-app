<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              {{ profile.bio }}
            </p>

            <div class="follow-wrapper">
              <button
                @click="setFollow()"
                v-if="currentUser !== username"
                class="btn btn-sm"
                :class="{
                  'btn-outline-primary': !isFollowed,
                  'btn-outline-secondary': isFollowed
                }"
              >
                <span v-if="isFollowed"> &nbsp; 取消关注 {{ username }}</span>
                <span v-else>
                  <font-awesome-icon icon="plus" /> &nbsp; 关注
                  {{ username }}</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item clickable" @click="currentFeed = 'my'">
                <span
                  class="nav-link"
                  :class="{ active: currentFeed === 'my' }"
                >
                  我的文章
                </span>
              </li>
              <li class="nav-item clickable" @click="currentFeed = 'favorite'">
                <span
                  class="nav-link"
                  :class="{ active: currentFeed === 'favorite' }"
                >
                  收藏的文章
                </span>
              </li>
            </ul>
          </div>

          <!-- feed -->
          <div>
            <div v-if="isLoading" class="article-preview">
              正在加载 ...
            </div>
            <div>
              <div
                v-if="!isLoading && articles.length === 0"
                class="article-preview"
              >
                没有文章可显示
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { commonModulePath } from '../store/common/common.paths'
import { profile, isFollowed } from '@/store/common/common.paths'
import {
  isLoading,
  articleQuery,
  articles,
  articlesCount,
  articleModulePath
} from '@/store/article/article.paths'
import { getGlobalPath } from '../store'
import {
  fetchProfileAction,
  unfollowAction,
  followAction
} from '../store/common/common.actions'
import { FeedType } from '../models/article.model'
import {
  fetchFavoriteArticlesAction,
  fetchMyArticlesAction
} from '../store/article/article.actions'
import ArticleList from '@/components/ArticleList.vue'
import Pagination from '@/components/Pagination.vue'
import { username, authModulePath } from '../store/auth/auth.paths'
import { Page } from '../models/page.model'

export default Vue.extend({
  components: {
    ArticleList,
    Pagination
  },
  data: function() {
    return {
      currentFeed: 'my',
      articleQuery: {
        username: this.username,
        offset: 0,
        limit: 0
      }
    }
  },
  props: {
    username: {
      type: String
    }
  },
  computed: {
    ...get(authModulePath, {
      currentUser: username
    }),
    ...get(commonModulePath, {
      profile,
      isFollowed
    }),
    ...get(articleModulePath, {
      isLoading,
      articles,
      articlesCount
    })
  },
  watch: {
    currentFeed(newVal, oldVal) {
      this.loadArticles(this.articleQuery)
    },
    username(newVal, oldVal) {
      this.articleQuery.username = newVal
      this.updateProfile()
    }
  },
  created() {
    this.$store.dispatch(commonModulePath + fetchProfileAction, this.username)
  },
  methods: {
    onPageUpdate({ page, pageSize }: Page) {
      const newOffset = (page - 1) * pageSize
      const newLimit = pageSize

      this.articleQuery = {
        username: this.username,
        offset: newOffset,
        limit: newLimit
      }

      this.loadArticles(this.articleQuery)
    },
    loadArticles(params) {
      switch (this.currentFeed) {
        case FeedType.My:
          this.$store.dispatch(
            articleModulePath + fetchMyArticlesAction,
            params
          )

          break
        case FeedType.Favorite:
          this.$store.dispatch(
            articleModulePath + fetchFavoriteArticlesAction,
            params
          )
          break
        default:
          break
      }
    },
    setFollow() {
      const vm: any = this
      if (vm.isFollowed) {
        this.$store.dispatch(commonModulePath + unfollowAction, this.username)
      } else {
        this.$store.dispatch(commonModulePath + followAction, this.username)
      }
    },
    updateProfile() {
      this.$store.dispatch(commonModulePath + fetchProfileAction, this.username)
      this.loadArticles(this.articleQuery)
    }
  }
})
</script>
<style lang="scss" scoped>
.follow-wrapper {
  text-align: right;
}
</style>
