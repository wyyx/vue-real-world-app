<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta d-flex">
          <a href=""><img :src="avatar"/></a>
          <div class="info">
            <a href="" class="author">{{
              article.author && article.author.username
            }}</a>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <!-- edit and delete article -->
          <span v-if="isAuthor" class="d-flex flex-wrap">
            <span class=" pr-2 pt-1">
              <button
                @click="editArticle"
                class="btn btn-sm btn-outline-primary"
              >
                <font-awesome-icon icon="pen" />&nbsp;编辑文章
              </button>
            </span>
            <span class=" pt-1">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-toggle="modal"
                data-target="#deleteArticleModal"
              >
                <font-awesome-icon icon="trash-alt" />&nbsp;删除文章
              </button>
            </span>
            <!-- Modal -->
            <div
              class="modal"
              id="deleteArticleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    确定要删除这篇文章吗？
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      取消
                    </button>
                    <span class="pl-2">
                      <button
                        @click="deleteArticle"
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        确认删除
                      </button></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </span>
          <!-- follow author and favorite article -->
          <div v-else class="d-flex flex-wrap">
            <div class="px-2 pt-1">
              <FollowToggler
                @reload-article="onReloadArticle"
                :article="article"
              ></FollowToggler>
            </div>
            <div class="pt-1">
              <FavoriteToggler
                @reload-article="onReloadArticle"
                :article="article"
              ></FavoriteToggler>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- article content -->
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 id="introducing-ionic">{{ article.description }}</h2>
          <p class="article-body">{{ article.body }}</p>
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
                  placeholder="写一个评论吧..."
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
                发布评论
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
            <div class="card-footer d-flex">
              <span class="flex-grow-1">
                <a href="" class="comment-author">
                  <img :src="comment.author.image" class="comment-author-img" />
                </a>
                &nbsp;
                <a href="" class="comment-author">
                  {{ comment.author.username }}
                </a>
                <span class="date-posted">{{ comment.createdAt }}</span>
              </span>
              <span
                v-if="isAuthor"
                class="clickable"
                data-toggle="modal"
                data-target="#deleteCommentModal"
              >
                <font-awesome-icon icon="trash-alt" />
                <span class="pl-1">删除</span>
              </span>
              <!-- Modal -->
              <div
                class="modal"
                id="deleteCommentModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      确定要删除这条评论吗？
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        取消
                      </button>
                      <span class="pl-2">
                        <button
                          @click="deleteComment(comment.id)"
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          确认删除
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
import {
  postCommentAction,
  deleteCommentAction
} from '../store/common/common.actions'
import { articleModulePath } from '../store/article/article.paths'
import * as $ from 'jquery'

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
    },
    deleteComment(commentId: string) {
      const vm: any = this
      const slug: string = vm.article.slug

      this.$store
        .dispatch(commonModulePath + deleteCommentAction, {
          slug,
          commentId
        })
        .then(response => {
          // reload comments
          this.fetchComments(slug)
        })
    }
  }
})
</script>
<style lang="scss" scoped>
.modal-body {
  color: black;
}
.article-content {
  overflow-wrap: break-word;
}
</style>
