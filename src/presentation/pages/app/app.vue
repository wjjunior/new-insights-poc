<template>
  <router-view />
</template>

<script lang="ts">
import { AccessToken } from '@/domain/usecases'
import { ActionTypes } from '@/presentation/store/modules'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    accessToken: {
      type: Object as () => AccessToken
    }
  },
  created (): void {
    this.$store.dispatch(ActionTypes.CheckAuthentication as string, { accessToken: this.accessToken })
  }
  // setup (props) {
  //   const store = useStore()
  //   store.dispatch(ActionTypes.CheckAuthentication as string, { accessToken: props.accessToken })
  // }
})
</script>
