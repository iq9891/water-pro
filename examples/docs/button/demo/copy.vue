<template>
  <a-button @click="buttonClick">复制</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { utils } from '@fe6/water-pro';

export default defineComponent({
  methods: {
    buttonClick() {
      utils.copy('water is best!');
      (this as any).$message.success('复制成功');
    },
  },
});
</script>
