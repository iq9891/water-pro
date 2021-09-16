<template>
  <div>
    <a-button @click="renderForm">生成表单</a-button>
    <a-divider />
    <a-form-pro @register="updateSchemaFormPro" @submit="updateSchemaHandleSubmit" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'usfield1',
    component: 'DatePicker',
    label: 'DatePicker',
  },
];

export default defineComponent({
  setup() {
    const [updateSchemaFormPro, updateSchemaFormActions] = useForm({
      schemas: [],
      showActionButtonGroup: false,
    });

    const updateSchemaHandleSubmit = async () => {
      try {
        const updateParams = await updateSchemaFormActions.validate();
        console.log(JSON.stringify(updateParams), 'updateParams');
      } catch (err) {}
    };

    const renderForm = async () => {
      await updateSchemaFormActions.updateSchema(schemas, true);
      updateSchemaFormActions.setProps({
        showActionButtonGroup: true,
      });
    };

    return {
      updateSchemaFormPro,
      updateSchemaHandleSubmit,
      renderForm,
    };
  },
});
</script>
