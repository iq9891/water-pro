<template>
  <div>
    <a-time-picker v-model:value="value1" size="large" />
    <a-time-picker v-model:value="value2" />
    <a-time-picker v-model:value="value3" size="small" />
  </div>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value1: ref(dayjs('12:08:23', 'HH:mm')),
      value2: ref(dayjs('12:08:23', 'HH:mm')),
      value3: ref(dayjs('12:08:23', 'HH:mm')),
    };
  },
});
</script>
