<template>
  <a-form-pro @register="injectFormPro" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'hifield1',
    component: 'Input',
    componentProps: {
      placeholder: '字段1',
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'hifield2',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'water',
          value: 12,
        },
        {
          label: 'antd',
          value: 23,
        },
      ],
      placeholder: '字段2',
    },
    colProps: {
      span: 8,
    },
  },
];

export default defineComponent({
  setup() {
    const [injectFormPro] = useForm({
      schemas,
      actionColOptions: {
        span: 8,
      },
      baseGutter: 16,
    });
    return {
      injectFormPro,
    };
  },
});
</script>
