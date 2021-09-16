<template>
  <a-button @click="toCopy">复制</a-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { utils } from '@fe6/water-pro';

export default defineComponent({
  methods: {
    toCopy() {
      utils.copy('water is best!');
      (this as any).$message.success('复制成功');
    },
  },
});
</script>
