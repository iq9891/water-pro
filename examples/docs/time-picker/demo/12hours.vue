<template>
  <div>
    <a-time-picker v-model:value="value" use12-hours />
    <a-time-picker v-model:value="value" use12-hours format="h:mm:ss A" />
    <a-time-picker v-model:value="value" use12-hours format="h:mm a" />
  </div>
</template>
<script lang="ts">
import { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value: ref<Dayjs | undefined>(undefined),
    };
  },
});
</script>
