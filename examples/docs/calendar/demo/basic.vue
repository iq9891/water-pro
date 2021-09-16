<template>
  <a-calendar v-model:value="value" v-bind:panelChange="onPanelChange" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const value = ref<dayjs.Dayjs>();
    const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
      console.log(value, mode);
    };

    return {
      value,
      onPanelChange,
    };
  },
});
</script>
