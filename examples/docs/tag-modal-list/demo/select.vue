<template>
  <a-tag-modal-list
    style="width: 300px"
    v-model:value="tags"
    size="large"
    :api="tagModalListApi"
    valueLabel="value"
    nameLabel="label"
    type="select"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

const tagModalListApi = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        label: '组件库',
        children: [
          {
            label: 'water',
            value: 80,
          },
          {
            label: 'antd',
            value: 180,
          },
        ],
      },
      {
        label: '官网',
        children: [
          {
            label: '金茂',
            value: 380,
          },
          {
            label: '票大大',
            value: 480,
          },
        ],
      },
    ]);
  }, 1000);
}

export default defineComponent({
  setup() {
    return {
      tags: ref([80, 380]),
      tagModalListApi,
    };
  },
});
</script>
