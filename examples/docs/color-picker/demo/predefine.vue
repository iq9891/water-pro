<template>
  <a-color-picker v-model:value="value" :predefine="predefine" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<string>('00ff00');
    return {
      value,
      predefine: ['red','yellow','blue','black','gray'],
    };
  },
}); 
</script>
