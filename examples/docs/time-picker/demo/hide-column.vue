<template>
  <a-time-picker v-model:value="value" format="HH:mm" />
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref(dayjs('12:08', 'HH:mm'));

    return {
      value,
    };
  },
});
</script>
