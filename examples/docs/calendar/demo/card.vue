<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" v-bind:panelChange="onPanelChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const value = ref<Dayjs>();
    const onPanelChange = (value: Dayjs, mode: string) => {
      console.log(value, mode);
    };

    return {
      value,
      onPanelChange,
    };
  },
});
</script>
