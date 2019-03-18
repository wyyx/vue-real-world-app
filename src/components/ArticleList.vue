<template>
  <div class="host" v-if="articles.length > 0">
    <ArticlePreview
      v-for="(article, index) in articles"
      :article="article"
      :key="article.title + index"
    />
    <div class="pagination-wrapper">
      <Pagination
        class="pagination"
        :totalItems="articlesCount"
        :currentPage="1"
        :visiblePages="5"
        :showFirstAndLastNavigator="true"
        @page="onPageUpdate($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from './ArticlePreview.vue'
import Pagination from '@/components/Pagination.vue'
import { UPDATE_ARTICLE_QUERY } from '@/store/article/article.mutations'
import { Page } from '@/models/page.model'

export default {
  name: 'ArticleList',
  components: {
    ArticlePreview,
    Pagination
  },
  props: {
    articles: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    },
    articlesCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    onPageUpdate({ page, pageSize }: Page) {
      ;(this as any).$store.commit(UPDATE_ARTICLE_QUERY, {
        offset: (page - 1) * pageSize,
        limit: pageSize
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.host {
  position: relative;
}

.pagination {
  position: fixed;
  bottom: 10px;
  margin: 0px !important;
}

.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
