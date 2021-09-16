<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="value1" />
    <a-month-picker v-model:value="value2" placeholder="Select month" />
    <a-range-picker v-model:value="value3" />
    <a-week-picker v-model:value="value4" placeholder="Select week" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
export default defineComponent({
  setup() {
    return {
      value1: ref<dayjs.Dayjs>(),
      value2: ref<dayjs.Dayjs>(),
      value3: ref<dayjs.Dayjs[]>([]),
      value4: ref<dayjs.Dayjs>(),
    };
  },
});
</script>
