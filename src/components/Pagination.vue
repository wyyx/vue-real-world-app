<template>
  <nav v-if="totalItems > 0">
    <ul class="pages">
      <li
        v-if="showFirstAndLastNavigatorLocal"
        @click="firstPage"
        class="page-item"
        :class="{ disabled: isFirstPage }"
      >
        <a class="page-link" href="#">第一页</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: isFirstPage }"
        @click="previousPage"
      >
        <a class="page-link" href="#">上一页</a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === currentPageLocal }"
        v-for="page in pages"
        :key="page"
        @click="goTo(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ disabled: isLastPage }" @click="nextPage">
        <a class="page-link" href="#">下一页</a>
      </li>
      <li
        v-if="showFirstAndLastNavigatorLocal"
        @click="lastPage"
        class="page-item"
        :class="{ disabled: isLastPage }"
      >
        <a class="page-link" href="#">最后一页</a>
      </li>
      <li class="page-item bootstrap">
        <div class="dropdown ">
          <button
            class="btn btn-outline-secondary dropdown-toggle page-link"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            每页显示:
            {{ itemsPerPageLocal }}
          </button>
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            @click="closeMenu"
          >
            <a
              class="dropdown-item clickable"
              href="#"
              @click="updateItemsPerPage(5)"
            >
              5
            </a>
            <a
              class="dropdown-item clickable"
              href="#"
              @click="updateItemsPerPage(10)"
              >10
            </a>
            <a
              class="dropdown-item clickable"
              href="#"
              @click="updateItemsPerPage(20)"
            >
              20
            </a>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { pageUtil } from '@/utils/page.util'

export default Vue.extend({
  data() {
    return {
      showMenuFlag: false,
      visiblePagesLocal: 5,
      currentPageLocal: 1,
      itemsPerPageLocal: 10,
      showFirstAndLastNavigatorLocal: true,
      pages: []
    }
  },
  created() {
    this.visiblePagesLocal = this.visiblePages
    this.currentPageLocal = this.currentPage
    this.itemsPerPageLocal = this.itemsPerPage
    this.showFirstAndLastNavigatorLocal = this.showFirstAndLastNavigator
    this.updatePage()
  },
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    visiblePages: {
      type: Number,
      required: false,
      default: 5
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    },
    showFirstAndLastNavigator: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    totalItems(newVal, oldVal) {
      this.updatePage()
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(
        (this as any).totalItems / (this as any).itemsPerPageLocal
      )
    },
    isFirstPage() {
      return (this as any).currentPageLocal === 1
    },
    isLastPage() {
      return (this as any).currentPageLocal === this.totalPages
    }
  },
  methods: {
    updatePage() {
      // change currentPage to last page when currentPage are greater than totalPages
      const totalPages = Math.ceil(this.totalItems / this.itemsPerPageLocal)
      if (this.currentPageLocal > totalPages) {
        this.currentPageLocal = 1
      }

      this.pages = pageUtil.getPages(
        this.totalItems,
        this.itemsPerPageLocal,
        this.visiblePagesLocal,
        this.currentPageLocal
      )
      this.$emit('page', {
        page: this.currentPageLocal,
        pageSize: this.itemsPerPageLocal
      })
    },
    updateItemsPerPage(num) {
      this.itemsPerPageLocal = num
      this.currentPageLocal = 1
      this.updatePage()
    },
    goTo(page) {
      this.currentPageLocal = page
      this.updatePage()
    },
    previousPage() {
      this.currentPageLocal--
      this.updatePage()
    },
    nextPage() {
      this.currentPageLocal++
      this.updatePage()
    },
    firstPage() {
      this.currentPageLocal = 1
      this.updatePage()
    },
    lastPage() {
      this.currentPageLocal = this.totalPages
      this.updatePage()
    },
    toggleMenu() {
      this.showMenuFlag = !this.showMenuFlag
    },
    closeMenu() {
      this.showMenuFlag = false
    }
  }
})
</script>

<style lang="scss" scoped>
.bootstrap .btn-outline-secondary {
  border-color: #ddd !important;
}

.dropdown-toggle {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.pages {
  display: flex !important;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
  list-style: none;
}
</style>
