<template>
  <div class="inputWrap">
    <input
      :id="id"
      :name="name"
      :disabled="disabled"
      :type="type"
      :value="value"
      :class="state"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    >
    <span class="status">🔴</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
      validator: (value: string) => {
        return ["text", "email", "number"].indexOf(value) !== -1;
      },
    },
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      default: null,
      validator: (value: string) => {
        return ["hover", "active", "focus"].indexOf(value) !== -1;
      },
    },
  },
  emits: ["change", "focus"],
  methods: {
    onInput(value: any) {
      this.$emit("change", value);
    },
    onFocus(value) {
      this.$emit("focus", value);
    },
  },
});
</script>

<style lang="scss">
@import "./input-styles.scss";
</style>
