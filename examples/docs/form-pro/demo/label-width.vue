<template>
  <a-form-pro @register="ruleForm" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'lwfield1',
    component: 'Switch',
    label: '点下试试',
  },
  {
    field: 'lwfield3',
    label: ' ',
    component: 'InputTextArea',
    labelWidth: 200,
    ifShow: (ifShowParams) => {
      const { values } = ifShowParams.value;
      return !!values.lwfield1;
    },
  },
];

export default defineComponent({
  setup() {
    const [ruleForm] = useForm({
      schemas,
      labelWidth: 200,
      colon: false,
    });
    return {
      ruleForm,
    };
  },
});
</script>
