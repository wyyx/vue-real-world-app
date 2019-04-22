<template>
  <button
    @click="setFollow()"
    class="btn btn-sm"
    :class="{
      'btn-outline-primary': !isFollowing,
      'btn-outline-secondary': isFollowing
    }"
  >
    <span v-if="isFollowing"> &nbsp; 取消关注</span>
    <span v-else> <font-awesome-icon icon="plus" /> &nbsp;关注</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, isAuthenticated } from '../store/auth/auth.paths'
import { unfollowAction, followAction } from '../store/common/common.actions'
import { articleModulePath } from '../store/article/article.paths'
import { commonModulePath } from '../store/common/common.paths'

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...get(authModulePath, {
      isAuthenticated
    }),
    isFollowing() {
      const vm: any = this
      return vm.article.author && vm.article.author.following
    },
    username() {
      const vm: any = this
      return vm.author && vm.author.username
    }
  },
  methods: {
    setFollow() {
      const vm: any = this

      if (!vm.isAuthenticated) {
        this.$router.push({ name: 'login' })
        return
      }

      if (this.isFollowing) {
        this.$store.dispatch(
          commonModulePath + unfollowAction,
          this.article.author.username
        )
      } else {
        this.$store.dispatch(
          commonModulePath + followAction,
          this.article.author.username
        )
      }

      this.reloadArticle()
    },
    reloadArticle() {
      this.$emit('reload-article')
    }
  }
})
</script>
