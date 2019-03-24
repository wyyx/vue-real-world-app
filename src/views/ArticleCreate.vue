<template>
  <div class="editor-page bootstrap">
    <div class="container page">
      <div class="row ">
        <div class="col-md-10 offset-md-1 col-xs-12">
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
                <input
                  v-model="tagList"
                  name="tagList"
                  data-vv-as="TagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="save"
              >
                Publish Article
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
import { articleModulePath } from '@/store/article/article.paths'

export default Vue.extend({
  data: function() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: ['dragon']
    }
  },
  methods: {
    save() {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.$data))

          this.$store.dispatch(
            getGlobalPath(articleModulePath, createArticleAction),
            {
              title: this.title,
              description: this.description,
              body: this.body,
              tagList: this.tagList
            }
          )
        }
      })
    }
  }
})
</script>
