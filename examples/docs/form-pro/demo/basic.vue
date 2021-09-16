<template>
  <a-form-pro
    :schemas="schemas"
    @submit="handleSubmit"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'eafielda',
    component: 'Input',
    label: '字段1',
  },
  {
    field: 'eafieldb',
    component: 'Switch',
    label: '字段2',
  },
];

export default defineComponent({
  setup() {
    return {
      schemas,
    };
  },
  methods: {
    handleSubmit(values: any) {
      const myValues = JSON.stringify(values);
      (this as any).$message.info(myValues === '{}' ? '操作点数据吧' : myValues);
      console.log('提交的数据:' + JSON.stringify(values));
    },
  },
});
</script>
