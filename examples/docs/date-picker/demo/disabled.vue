<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="value1" />
    <a-month-picker v-model:value="value2" disabled />
    <a-range-picker v-model:value="value3" disabled />
  </a-space>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const dateFormat = 'YYYY-MM-DD';
    return {
      value1: ref<dayjs.Dayjs>(dayjs('2015-06-06', dateFormat)),
      value2: ref<dayjs.Dayjs>(dayjs('2015-06', 'YYYY-MM')),
      value3: ref<dayjs.Dayjs[]>([
        dayjs('2015-06-06', dateFormat),
        dayjs('2015-06-06', dateFormat),
      ]),
    };
  },
});
</script>
