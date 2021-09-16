<template>
  <div>
    <div>checked值： {{ checked }}</div>
    <a-switch v-model:checked="checked" checkedValue="1" unCheckedValue="2" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const checked = ref<string>('2');
    return {
      checked,
    };
  },
});
</script>
