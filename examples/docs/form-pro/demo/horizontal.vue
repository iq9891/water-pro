<template>
  <a-form-pro :labelWidth="100" :schemas="schemas" @submit="handleSubmit" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'hfield1',
    component: 'Input',
    label: '字段1',
  },
  {
    field: 'hfield2',
    component: 'Switch',
    label: '字段2',
  },
];

export default defineComponent({
  setup() {
    return {
      schemas,
      handleSubmit: (values: any) => {
        console.log('提交的数据:' + JSON.stringify(values));
      },
    };
  },
});
</script>
