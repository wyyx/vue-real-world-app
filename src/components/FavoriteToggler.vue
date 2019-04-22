<template>
  <button
    class="btn btn-sm"
    @click="toggleFavorite"
    :class="{
      'btn-outline-primary': article.favorited,
      'btn-outline-secondary': !article.favorited
    }"
  >
    <font-awesome-icon icon="heart" />&nbsp;
    <span class="counter"> {{ article.favoritesCount }}&nbsp; </span>
    <span v-if="showTitle">
      <span v-if="!article.favorited">喜欢</span><span v-else>取消喜欢</span>
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, isAuthenticated } from '../store/auth/auth.paths'
import {
  unfavoriteArticleAction,
  favoriteArticleAction
} from '../store/article/article.actions'
import { articleModulePath } from '../store/article/article.paths'

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...get(authModulePath, {
      isAuthenticated
    })
  },
  methods: {
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

      this.reloadArticle()
    },
    reloadArticle() {
      this.$emit('reload-article')
    }
  }
})
</script>
