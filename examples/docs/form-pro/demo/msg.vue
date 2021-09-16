<template>
  <a-form-pro @register="msgFormPro" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'mfield1',
    component: 'Input',
    label: '字段1',
    helpMessage: '这是一个字段',
  },
];

export default defineComponent({
  setup() {
    const [msgFormPro] = useForm({
      schemas,
    });
    return {
      msgFormPro,
    };
  },
});
</script>
