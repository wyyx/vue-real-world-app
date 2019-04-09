<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
              looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
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

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
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
import { profile } from '@/store/common/common.paths'
import { getGlobalPath } from '../store'
import { fetchProfileAction } from '../store/common/common.actions'
import { articleModulePath } from '../store/article/article.paths'

export default Vue.extend({
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
    ...get(commonModulePath, {
      profile
    })
  },
  methods: {
    // loadArticles(params) {
    //   switch (this.currentFeed) {
    //     case FeedType.User:
    //       this.$store.dispatch(
    //         articleModulePath + fetchUserArticlesAction,
    //         params
    //       )
    //       break
    //     case FeedType.Global:
    //       this.$store.dispatch(
    //         articleModulePath + fetchGlobalArticlesAction,
    //         params
    //       )
    //       break
    //     default:
    //       break
    //   }
    // }
  },
  created() {
    this.$store.dispatch(
      getGlobalPath(commonModulePath, fetchProfileAction),
      this.username
    )
  }
})
</script>
