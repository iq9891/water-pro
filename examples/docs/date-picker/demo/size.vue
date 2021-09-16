<template>
  <a-space direction="vertical">
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">Large</a-radio-button>
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="small">Small</a-radio-button>
    </a-radio-group>
    <a-date-picker :size="size" />
    <a-month-picker :size="size" placeholder="Select Month" />
    <a-range-picker :size="size" />
    <a-week-picker :size="size" placeholder="Select Week" />
    <a-year-picker :size="size" placeholder="Select year" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      size: ref<string>('default'),
    };
  },
});
</script>
