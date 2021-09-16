<template>
    <a-space direction="vertical" style="width: 100%;">
    <AButton @click="expandHandle">{{loading ? '加载中' : value ? '收起' : '展开'}}</AButton>
    <AContainerCollapse
      text="water pro"
      v-model:value="value"
      lazy
      :loading="loading"
      title="expand"
      @expand="expandHandle"
    >
      这里面是个内容
    </AContainerCollapse>
  </a-space>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    const value = ref(true);
    const loading = ref(false);
    return {
      expandHandle: () => {
        if (!loading.value) {
          loading.value = true;
          setTimeout(() => {
            loading.value = false;
            value.value = !value.value;
          }, 1000);
        }
      },
      value,
      loading,
    }
  }
});
</script>
