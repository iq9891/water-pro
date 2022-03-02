<template>
  <a-upload-name
    action="https://api.dev.mosh.cn/public/upload/image/binary"
    accept='image/png,image/jpeg,image/gif'
    :handleAfterAjax="handleAfterAjax"
  />
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    return {
      handleAfterAjax: (info: any) => {
        return {
          ...info.file.response.data,
          name: info.file.response.data.meta.name,
        }
      }
    }
  }
})
</script>
