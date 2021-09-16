<template>
  <a-upload-image
    action="https://api.dev.mosh.cn/public/upload/image/binary"
    resultKey="data"
    :headers="headers"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    }
  }
});
</script>
