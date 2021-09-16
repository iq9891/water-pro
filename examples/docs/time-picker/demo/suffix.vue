<template>
  <a-time-picker v-model:value="value" :defaultOpenValue="dayjs('00:00:00', 'HH:mm:ss')">
    <template #suffixIcon><smile-outlined /></template>
  </a-time-picker>
</template>
<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    return {
      dayjs,
      value: ref<Dayjs | undefined>(),
    };
  },
});
</script>
