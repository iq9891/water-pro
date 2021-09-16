<template>
  <a-upload-card
    action="https://api.dev.mosh.cn/public/upload/image/binary"
    resultKey="data"
    v-model:value="list"
    :headers="headers"
    @changeUpload="onChangeUpload"
    draggable
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([ "https://cdn.dev.mosh.cn/image/55/24/e172e9cc8c0dd981a92efffd7bbf.png", 'https://cdn.dev.mosh.cn/image/34/19/9e08f1618c9f8a4fd073290db3be.png' ]);
    return {
      headers: {
        authorization: 'authorization-text',
      },
      list,
      onChangeUpload(newList) {
        list.value = newList;
      },
    }
  }
});
</script>
