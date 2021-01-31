<template>
  <div data-test="error-wrap" class="errorWrap">
    <template v-if="isLoading">
      <Spinner />
    </template>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Spinner from '@/presentation/components/spinner/spinner.vue'

export default defineComponent({
  name: 'FormStatus',
  components: {
    Spinner
  },
  setup () {
    const store = useStore()
    return {
      isLoading: computed(() => store.state.Auth.isLoading),
      errorMessage: computed(() => store.state.Auth.errorMessage)
    }
  }
})
</script>

<style lang="scss">
@import "./form-status-styles.scss";
</style>
