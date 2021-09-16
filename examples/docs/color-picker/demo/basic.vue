<template>
  <a-color-picker v-model:value="value" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<string>('#f0f0f0');
    return {
      value,
    };
  },
}); 
</script>
