<template>
  <AUploadName
    :headers="headers"
    action="https://api.dev.mosh.cn/public/upload/image/binary"
    resultKey="data"
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
