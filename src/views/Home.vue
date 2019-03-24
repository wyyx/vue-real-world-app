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
          <Feed :feedType="currentFeed"></Feed>
        </div>
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
              :tags="authors('global')"
              title="Author Tags"
              @tags="onAuthorTagsChange($event)"
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
import {
  queryAuthor,
  tags,
  articleQuery,
  queryTags,
  authors,
  articleModulePath
} from '@/store/article/article.paths'
import { isAuthenticated, authModulePath } from '@/store/auth/auth.paths'
import { mapGetters } from 'vuex'
import { get } from 'vuex-pathify'
import { fetchTagsAction } from '@/store/article/article.actions'
import { getGlobalPath } from '@/store'

export default Vue.extend({
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
      authors
    })
  },
  components: {
    Feed,
    TagWall
  },
  watch: {
    isAuthenticated() {
      this.$store.dispatch(getGlobalPath(articleModulePath, fetchTagsAction))
    }
  },
  created() {
    this.$store.dispatch(getGlobalPath(articleModulePath, fetchTagsAction))
  },
  methods: {
    onPopularTagsChange(tags) {
      ;(this.$store as any).set(queryTags, tags)
      ;(this.$store as any).set(queryAuthor, '')
      // clear tags
      ;(this.$refs.authorTags as any).clear()
    },
    onAuthorTagsChange(tags) {
      ;(this.$store as any).set(queryTags, [])
      ;(this.$store as any).set(queryAuthor, tags[0])
      // clear tags
      ;(this.$refs.popularTags as any).clear()
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-font {
  font-family: 'Quattrocento Sans', sans-serif;
}
</style>
