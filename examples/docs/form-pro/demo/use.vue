<template>
  <a-form-pro @register="injectFormPro" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'usefield1',
    component: 'Input',
    label: '字段1',
  },
  {
    field: 'usefield2',
    component: 'Switch',
    label: '字段2',
  },
];

export default defineComponent({
  setup() {
    const [injectFormPro] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    });
    return {
      injectFormPro,
    };
  },
});
</script>
