<template>
  <a-tag-modal-list
    v-model:value="tags"
    createable
    :api="tagModalListApi"
    valueLabel="value"
    nameLabel="label"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

const tagModalListApi = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        label: 'water',
        value: 80,
      },
      {
        label: 'antd',
        value: 180,
      },
      {
        label: '金茂',
        value: 380,
      },
      {
        label: '票大大',
        value: 480,
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
