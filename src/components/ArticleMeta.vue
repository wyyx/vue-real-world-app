<template>
  <div class="article-meta">
    <router-link
      :to="{ name: 'profile', params: { username: article.author.username } }"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        class="author"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <template v-if="actions">
      <rwv-article-actions
        :article="article"
        :canModify="isCurrentUser()"
      ></rwv-article-actions>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        @click="toggleFavorite"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        <span class="counter"> {{ article.favoritesCount }} </span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, user, isAuthenticated } from '../store/auth/auth.paths'
import {
  unfavoriteArticleAction,
  favoriteArticleAction
} from '../store/article/article.actions'
import { articleModulePath } from '../store/article/article.paths'

export default Vue.extend({
  name: 'ArticleMeta',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      isAuthenticated
    })
  },
  methods: {
    isCurrentUser() {
      const vm: any = this
      if (vm.user && vm.user.username) {
        return vm.user.username === this.article.author.username
      }
      return false
    },
    toggleFavorite() {
      const vm: any = this

      if (!vm.isAuthenticated) {
        this.$router.push({ name: 'login' })
        return
      }

      const action = this.article.favorited
        ? articleModulePath + unfavoriteArticleAction
        : articleModulePath + favoriteArticleAction
      this.$store.dispatch(action, this.article.slug)
    }
  },
  created() {}
})
</script>
