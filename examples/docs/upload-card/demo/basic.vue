<template>
  <a-upload-card
    action="https://api.dev.mosh.cn/public/upload/image/binary"
    resultKey="data"
    v-model:value="list"
    :headers="headers"
    multiple
    accept='image/png,image/jpeg,image/gif'
    @changeUpload="theChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      theChange: (a) => {
        console.log(a, 'change');
      },
      headers: {
        authorization: 'authorization-text',
      },
      list: ref([ "https://cdn.dev.mosh.cn/image/55/24/e172e9cc8c0dd981a92efffd7bbf.png" ]),
    }
  }
});
</script>
