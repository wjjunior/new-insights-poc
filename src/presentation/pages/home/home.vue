<template>
  <div class="home">
    <h1>This is an home page</h1>
    <button type="button" data-test="logout" class="submit">Logout</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>
