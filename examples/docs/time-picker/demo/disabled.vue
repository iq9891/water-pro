<template>
  <a-time-picker :value="dayjs('12:08:23', 'HH:mm:ss')" disabled />
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      dayjs,
    };
  },
});
</script>
