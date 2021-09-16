<template>
  <a-space direction="vertical">
    <a-range-picker v-model:value="value1" :ranges="ranges" />
    <a-range-picker
      style="width: 400px"
      v-model:value="value2"
      :ranges="ranges"
      show-time
      format="YYYY/MM/DD HH:mm:ss"
    />
  </a-space>
</template>
<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value1: ref<Dayjs[]>([]),
      value2: ref<Dayjs[]>([]),
      ranges: { Today: [dayjs(), dayjs()], 'This Month': [dayjs(), dayjs().endOf('month')] },
    };
  },
});
</script>
