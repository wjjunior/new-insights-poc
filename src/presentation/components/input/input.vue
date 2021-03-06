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
      :readonly="readonly"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
      :data-test="name"
    />
    <span :data-test="testId" :title="title" class="status">{{
      status
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => {
        return ['text', 'email', 'number', 'password'].indexOf(value) !== -1
      }
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: null,
      validator: (value: string) => {
        return ['hover', 'active', 'focus'].indexOf(value) !== -1
      }
    },
    error: {
      type: String,
      default: ''
    },
    testId: {
      type: String,
      default: ''
    }
  },
  emits: ['change', 'focus', 'update:value'],
  data () {
    return { readonly: true as boolean }
  },
  methods: {
    onInput (value: any) {
      this.$emit('update:value', value)
    },
    onFocus (value: any) {
      this.readonly = false
      this.$emit('focus', value)
    }
  },
  computed: {
    status: function (): string {
      return this.error ? '🔴' : '🟢'
    },
    title: function (): string {
      return this.error || 'Tudo certo!'
    }
  }
})
</script>

<style lang="scss">
@import "./input-styles.scss";
</style>
