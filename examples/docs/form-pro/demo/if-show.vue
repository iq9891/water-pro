<template>
  <a-form-pro :schemas="schemas" @submit="handleSubmit" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'isfield1',
    component: 'RadioGroup',
    label: '字段2',
    defaultValue: 'water',
    componentProps: {
      options: [
        { label: '大地', value: 'water' },
        { label: '天空', value: 'antd' },
      ],
    },
  },
  {
    field: 'isfield2',
    component: 'Input',
    label: '大地',
    ifShow: (ifShowParams) => {
      const { values } = ifShowParams.value;
      return values.isfield1 === 'water';
    },
  },
  {
    field: 'isfield3',
    component: 'Switch',
    label: '天空',
    ifShow: (ifShowParams) => {
      const { values } = ifShowParams.value;
      return values.isfield1 === 'antd';
    },
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
