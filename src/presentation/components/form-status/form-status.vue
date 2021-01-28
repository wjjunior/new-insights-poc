<template>
  <div class="errorWrap">
    <Spinner />
    <span class="error">Erro</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "@/presentation/components/spinner/spinner.vue";

export default defineComponent({
  name: "FormStatus",
  components: {
    Spinner,
  },
});
</script>

<style lang="scss">
@import "./form-status-styles.scss";
</style>
