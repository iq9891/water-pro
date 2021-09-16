<template>
  <div>
    <a-tag-modal-list
      v-model:value="tags"
      createable
      createPlaceholder="设置标签"
      :showSelected="false"
      :createIcon="false"
      :createBordered="false"
      :options="tagNewOptions"
      valueLabel="value"
      nameLabel="label"
      :beforeOk="beforeOk"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

const tagOptions = [
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
]

export default defineComponent({
  setup() {
    const tagNewOptions = ref([]);
    onMounted(() => {
      setTimeout(() => {
        tagNewOptions.value = tagOptions.slice();
      }, 1000);
    });
    const beforeOk = ({params, success}) => {
      setTimeout(() => {
        console.log(params, '8');
        success(true);
      }, 1200);
    }
    return {
      tags: ref([80, 380]),
      tagNewOptions,
      beforeOk,
    };
  },
});
</script>
