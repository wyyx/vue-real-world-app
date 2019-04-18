<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <a href=""><img :src="avatar"/></a>
          <div class="info">
            <a href="" class="author">{{
              article.author && article.author.username
            }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <!-- edit and delete article -->
          <span v-if="isAuthor">
            <span class="px-2">
              <button
                @click="editArticle"
                class="btn btn-sm btn-outline-primary"
              >
                <font-awesome-icon icon="pen" />&nbsp;Edit Article
              </button>
            </span>
            <button
              @click="deleteArticle"
              class="btn btn-sm btn-outline-primary"
            >
              <font-awesome-icon icon="trash-alt" />&nbsp;Delete Article
            </button>
          </span>
          <!-- follow author and favorite article -->
          <span v-else>
            <span class="px-2">
              <FollowToggler
                @reload-article="onReloadArticle"
                :article="article"
              ></FollowToggler>
            </span>
            <FavoriteToggler
              @reload-article="onReloadArticle"
              :article="article"
            ></FavoriteToggler>
          </span>
        </div>
      </div>
    </div>

    <!-- article content -->
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 id="introducing-ionic">{{ article.description }}</h2>
          <p>{{ article.body }}</p>
          <TagList :tags="article.tagList" :hasAction="false" />
        </div>
      </div>

      <hr />
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- post comment -->
          <form class="card comment-form bootstrap">
            <div class="card-block">
              <fieldset class="form-group m-0">
                <textarea
                  class="form-control form-control-lg"
                  v-validate="'required'"
                  name="comment"
                  data-vv-as="Comment"
                  v-model="comment"
                  placeholder="Write a comment..."
                  rows="3"
                ></textarea>
                <div v-if="errors.has('comment')" class="invalid-feedback">
                  <p
                    class="error-item m-0 pl-3 py-2"
                    v-for="error in errors.collect('comment')"
                    :key="error"
                  >
                    {{ error }}
                  </p>
                </div>
              </fieldset>
            </div>
            <div class="card-footer">
              <div>{{ user && user.image }}</div>
              <img :src="avatar" class="comment-author-img" />
              <button
                class="btn btn-sm btn-primary"
                @click.prevent="postComment"
              >
                Post Comment
              </button>
            </div>
          </form>
          <!-- comment list -->
          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">
                {{ comment.author.username }}
              </a>
              <span class="date-posted">{{ comment.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { articleService } from '@/services/article.service'
import FollowToggler from '@/components/FollowToggler.vue'
import FavoriteToggler from '@/components/FavoriteToggler.vue'
import TagList from '@/components/TagList.vue'
import { get } from 'vuex-pathify'
import { authModulePath, user, username } from '../store/auth/auth.paths'
import { commentService } from '@/services/comment.service'
import { commonModulePath } from '../store/common/common.paths'
import { postCommentAction } from '../store/common/common.actions'
import { articleModulePath } from '../store/article/article.paths'

export default Vue.extend({
  components: {
    FollowToggler,
    FavoriteToggler,
    TagList
  },
  props: {
    slug: {
      type: String
    }
  },
  data: function() {
    return {
      article: {},
      comments: [],
      comment: ''
    }
  },
  computed: {
    ...get(authModulePath, {
      username,
      user
    }),
    isAuthor() {
      const vm: any = this

      return vm.article.author
        ? vm.article.author.username === vm.username
        : false
    },
    avatar() {
      const vm: any = this
      return (
        (vm.user && vm.user.image) ||
        'https://static.productionready.io/images/smiley-cyrus.jpg'
      )
    }
  },
  created() {
    this.fetchArticle()
  },
  methods: {
    fetchArticle() {
      articleService
        .getArticleById(this.slug)
        .then(response => {
          this.article = response.data.article
          this.fetchComments(response.data.article.slug)
        })
        .catch(error => {})
    },
    deleteArticle() {
      const vm: any = this

      articleService.delete(this.slug).then(response => {
        this.$router.push({
          name: 'success',
          params: {
            message: '文章已经删除！',
            firstTitle: '查看我的文章',
            firstRoute: `/@${vm.username}`
          }
        })
      })
    },
    editArticle() {
      this.$router.push({
        name: 'article-edit',
        params: {
          slug: this.slug
        }
      })
    },
    onReloadArticle() {
      this.fetchArticle()
    },
    fetchComments(slug: string) {
      commentService
        .getComments(slug)
        .then(response => {
          this.comments = response.data.comments
        })
        .catch(error => {})
    },
    postComment() {
      const vm: any = this
      const slug: string = vm.article.slug
      const comment: string = this.comment

      this.$validator.validate().then(valid => {
        if (valid) {
          this.$store
            .dispatch(commonModulePath + postCommentAction, {
              slug,
              comment
            })
            .then(response => {
              // reload comments
              this.fetchComments(slug)

              // reset comment and form validity
              this.comment = ''
              this.$validator.reset()
            })
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped></style>
