<template>
  <div class="editor-page bootstrap">
    <div class="container page">
      <div class="row ">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h3 class="text-xs-center">创建文章</h3>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  v-validate="'required'"
                  name="title"
                  data-vv-as="Title"
                  type="text"
                  class="form-control"
                  placeholder="文章标题"
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
                  placeholder="关于什么的文章?"
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
                  placeholder="在这里写文章 (markdown 格式)"
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
import { createArticleAction } from '@/store/article/article.actions'
import { getGlobalPath } from '@/store'
import { articleModulePath, isPending } from '@/store/article/article.paths'
import Chips from '@/components/Chips.vue'
import { get } from 'vuex-pathify'
import {
  authModulePath,
  username,
  isAuthenticated
} from '../store/auth/auth.paths'

export default Vue.extend({
  components: {
    Chips
  },

  data: function() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  },
  computed: {
    ...get(authModulePath, {
      username,
      isAuthenticated
    }),
    ...get(articleModulePath, {
      isPending
    })
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      if (!newVal) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  methods: {
    save() {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('valid :-)\n' + JSON.stringify(this.$data))

          this.$store
            .dispatch(articleModulePath + createArticleAction, {
              title: this.title,
              description: this.description,
              body: this.body,
              tagList: this.tagList
            })
            .then(response => {
              this.$router.push({
                name: 'success',
                params: {
                  message: '恭喜你，成功创建一篇文章！',
                  firstTitle: '查看文章',
                  firstRoute: `/articles/${response.slug}`,
                  secondTitle: '继续创建',
                  secondRoute: '/editor'
                }
              })
            })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
