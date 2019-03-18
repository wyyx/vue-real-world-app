<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Mediumly {{ SELECTED_TAGS }}</h1>
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
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                v-for="tag in TAGS"
                :key="tag"
                class="tag-pill tag-default"
                :class="{
                  active: activeTag(tag),
                  'shadow-sm': activeTag(tag)
                }"
                href="#"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Feed from '@/components/Feed.vue'
import { FETCH_TAGS_ACTION } from '@/store/article/article.actions'
import { mapGetters } from 'vuex'
import {
  TAGS,
  SELECTED_TAGS,
  ARTICLE_QUERY
} from '@/store/article/article.getters'
import { IS_AUTHENTICATED } from '@/store/auth/auth.getters'
import { UPDATE_ARTICLE_QUERY } from '@/store/article/article.mutations'

export default Vue.extend({
  data: function() {
    return {
      tags: [],
      currentFeed: 'global'
    }
  },
  computed: {
    ...mapGetters({
      TAGS,
      IS_AUTHENTICATED,
      SELECTED_TAGS,
      ARTICLE_QUERY
    }),
    haveTags() {
      return (this as any).tags.length > 0
    }
  },
  components: {
    Feed
  },
  watch: {
    IS_AUTHENTICATED() {
      this.$store.dispatch(FETCH_TAGS_ACTION)
      this.tags = []
    },
    ARTICLE_QUERY(newVal, oldVal) {
      const tags = newVal.tags
      const tag = tags[0]

      // remove popular tags when non popular tag clicked
      if (tags.length === 1 && !(this as any).TAGS.includes(tag)) {
        this.tags = []
      }
    }
  },
  created() {
    this.$store.dispatch(FETCH_TAGS_ACTION)
  },
  methods: {
    toggleTag(tag) {
      if (this.tags.includes(tag)) {
        this.tags = this.tags.filter(t => t !== tag)
      } else {
        this.tags.push(tag)
      }
      this.updateTag(this.tags)
    },
    updateTag(tags) {
      this.$store.commit(UPDATE_ARTICLE_QUERY, { tags, offset: 0 })
    },
    activeTag(tag) {
      return this.tags.includes(tag)
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-font {
  font-family: 'Quattrocento Sans', sans-serif;
}

.tag-pill.active {
  background-color: #5cb85c !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2) !important;
}
</style>
