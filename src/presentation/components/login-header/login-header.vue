<template>
  <header class="header">
    <logo />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/presentation/components/logo/logo.vue'

export default defineComponent({
  name: 'LoginHeader',
  components: {
    Logo
  }
})
</script>

<style lang="scss">
@import "./login-header-styles.scss";
</style>
