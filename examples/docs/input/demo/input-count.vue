<template>
  <a-input-count v-model:value="value" :max-length="6" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<string>('water');
    return {
      value,
    };
  },
});
</script>
