<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
              looks like Peeta from the Hunger Games
            </p>

            <button
              @click="setFollow()"
              v-if="currentUser !== username"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <span v-if="isFollowed"> &nbsp; Unfollow {{ username }}</span>
              <span v-else>
                <font-awesome-icon icon="plus" /> &nbsp; Follow
                {{ username }}</span
              >
            </button>
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
                  My Articles
                </span>
              </li>
              <li class="nav-item clickable" @click="currentFeed = 'favorite'">
                <span
                  class="nav-link"
                  :class="{ active: currentFeed === 'favorite' }"
                >
                  Favorited Articles
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
  articlesCount
} from '@/store/article/article.paths'
import { getGlobalPath } from '../store'
import {
  fetchProfileAction,
  unfollowAction,
  followAction
} from '../store/common/common.actions'
import { articleModulePath } from '../store/article/article.paths'
import { FeedType } from '../models/article.model'
import {
  fetchFavoriteArticlesAction,
  fetchMyArticlesAction
} from '../store/article/article.actions'
import ArticleList from '@/components/ArticleList.vue'
import { username, authModulePath } from '../store/auth/auth.paths'

export default Vue.extend({
  components: {
    ArticleList
  },
  data: function() {
    return {
      currentFeed: 'my'
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
      articleQuery,
      articles,
      articlesCount
    })
  },
  watch: {
    currentFeed(newVal, oldVal) {
      this.loadArticles()
    }
  },
  methods: {
    loadArticles() {
      switch (this.currentFeed) {
        case FeedType.My:
          this.$store.dispatch(articleModulePath + fetchMyArticlesAction, {
            username: this.username
          })
          break
        case FeedType.Favorite:
          this.$store.dispatch(
            articleModulePath + fetchFavoriteArticlesAction,
            { username: this.username }
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
    }
  },
  created() {
    const vm: any = this
    this.$store.dispatch(commonModulePath + fetchProfileAction, this.username)
    this.loadArticles()
  }
})
</script>
