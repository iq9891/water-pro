<template>
  <a-cascader-api v-model:value="cValue" :api="getCascaderApi" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

const getCascaderApi = ({ params, success }) => {
  setTimeout(() => {
    success([
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ]);
  }, 1000);
};

export default defineComponent({
  setup() {
    return {
      cValue: ref<string[]>([]),
      getCascaderApi,
    };
  },
});
</script>
