<template>
  <a-select v-model:value="value" style="width: 120px" :options="options" @change="handleChange" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('beijing');
    return {
      handleChange(value) {
        console.log(`selected ${value}`);
      },
      options: [
        {
          label: '北京',
          value: 'beijing',
          title: '北京 010',
          key: '010',
        },
        {
          label: '上海',
          value: 'shanghai',
          key: '021',
        },
        {
          label: '杭州',
          value: 'hangzhou',
          key: '0571',
          disabled: true,
        },
      ],
      value,
    };
  },
});
</script>
