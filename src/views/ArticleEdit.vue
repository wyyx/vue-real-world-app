<template>
  <div class="editor-page bootstrap">
    <div class="container page">
      <div class="row ">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h3 class="text-xs-center">编辑文章</h3>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  v-validate="'required'"
                  name="title"
                  data-vv-as="Title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  v-validate="'required'"
                  name="description"
                  data-vv-as="Description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  v-validate="'required'"
                  name="body"
                  data-vv-as="Content"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <Chips
                  v-model="tagList"
                  name="tagList"
                  data-vv-as="TagList"
                ></Chips>
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="save"
              >
                <span v-if="isPending">
                  <font-awesome-icon class="fa-spin" icon="spinner" />
                </span>
                <span v-else>发布</span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  createArticleAction,
  updateArticleAction
} from '@/store/article/article.actions'
import { articleModulePath, isPending } from '@/store/article/article.paths'
import Chips from '@/components/Chips.vue'
import { get } from 'vuex-pathify'
import { articleService } from '../services/article.service'
import { authModulePath, username } from '../store/auth/auth.paths'

export default Vue.extend({
  components: {
    Chips
  },
  props: {
    slug: {
      type: String
    }
  },
  data: function() {
    return {
      article: {},
      slugLocal: '',
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  },
  computed: {
    ...get(authModulePath, {
      username
    }),
    ...get(articleModulePath, { isPending })
  },
  methods: {
    fetchArticle() {
      articleService
        .getArticleById(this.slug)
        .then(response => {
          this.article = response.data.article

          this.fillForm()
        })
        .catch(error => {})
    },
    fillForm() {
      const vm: any = this

      this.slugLocal = vm.article.slug
      this.title = vm.article.title
      this.description = vm.article.description
      this.body = vm.article.body
      this.tagList = vm.article.tagList
    },
    save() {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('valid :-)')

          this.$store
            .dispatch(articleModulePath + updateArticleAction, {
              slug: this.slug,
              title: this.title,
              description: this.description,
              body: this.body,
              tagList: this.tagList
            })
            .then(response => {
              this.$router.push({
                name: 'success',
                params: {
                  message: '文章已经更新！',
                  firstTitle: '查看',
                  firstRoute: `/articles/${this.slug}`
                }
              })
            })
        }
      })
    }
  },
  created() {
    this.fetchArticle()
  }
})
</script>
