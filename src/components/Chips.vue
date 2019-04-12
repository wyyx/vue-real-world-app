<template>
  <div class="d-flex flex-wrap">
    <span class="chip-wrapper p-1" v-for="chip in localChips" :key="chip">
      <span class="chip d-inline-flex justify-content-center align-items-center"
        >{{ chip }}
        <font-awesome-icon
          @click="removeChip(chip)"
          class="icon clickable"
          icon="times-circle"
          :style="{ color: 'rgba(0, 0, 0, 0.3)' }"
        />
      </span>
    </span>
    <input
      class="form-control mt-1"
      ref="input"
      type="text"
      placeholder="输入标签后，按 Enter 确认"
      @change.enter="onNewChip($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uniq } from 'lodash'

export default Vue.extend({
  model: {
    prop: 'chips',
    event: 'change'
  },
  data: function() {
    return {
      localChips: []
    }
  },
  props: {
    chips: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  created() {},
  methods: {
    onNewChip(chip: string) {
      this.localChips.push(chip)
      this.localChips = uniq(this.localChips)
      this.$emit('change', this.localChips)
      const vm: any = this
      vm.$refs.input.value = ''

      console.log('chips', this.localChips)
    },
    removeChip(chip: string) {
      this.localChips = this.localChips.filter(c => c !== chip)
    }
  }
})
</script>

<style scoped>
.chip {
  height: 32px;
  border-radius: 28px;
  border: 1px solid #ced4da;
  padding: 0 4px 0 12px;
}
.icon {
  margin: 0 2px 0 8px;
}

.icon:hover {
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
