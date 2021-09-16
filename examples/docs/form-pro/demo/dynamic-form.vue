<template>
  <div>
    <a-space>
      <a-button @click="appendField"> 往 字段3 后面插入字段10 </a-button>
      <a-button @click="deleteField"> 删除 字段4 </a-button>
    </a-space>
    <a-divider />
    <h1>动态表单示例，动态根据表单内其他值改变</h1>
    <a-divider />
    <a-form-pro @register="register" />
    <a-divider />
    <h1>componentProps 动态改变</h1>
    <a-divider />
    <a-form-pro @register="regist1" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useForm, FormSchema } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'dffield1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8,
    },
    show: (showParams) => {
      const { values } = showParams.value;
      return !!values.dffield4;
    },
  },
  {
    field: 'dffield2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8,
    },
    ifShow: (ifShowParams) => {
      const { values } = ifShowParams.value;
      return !!values.dffield3;
    },
  },
  {
    field: 'dffield3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8,
    },
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return !!values.dffield3 ? [{ required: true, type: 'string', message: '字段3必填' }] : [];
    },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'dffield4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8,
    },
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return values.dffield8 ? [{ required: true, message: '字段4必填' }] : [];
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
          key: '1',
        },
        {
          label: '选项2',
          value: '2',
          key: '2',
        },
      ],
    },
  },
];

const schemas1: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: 'F1',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        placeholder: '同步f2的值为f1',
        onChange: (e: ChangeEvent) => {
          formModel.f2 = e.target.value;
        },
      };
    },
  },
  {
    field: 'f2',
    component: 'Input',
    label: 'F2',
    colProps: {
      span: 12,
    },
    componentProps: { disabled: true },
  },
  {
    field: 'f3',
    component: 'Input',
    label: 'F3',
    colProps: {
      span: 12,
    },
    // @ts-ignore
    componentProps: ({ formActionType }) => {
      return {
        placeholder: '值改变时执行查询,查看控制台',
        onChange: async () => {
          const { validate } = formActionType;
          // tableAction只适用于在表格内开启表单的例子
          // const { reload } = tableAction;
          const res = await validate();
          console.log(res);
        },
      };
    },
  },
];

export default defineComponent({
  setup() {
    const [register, { setProps, appendSchemaByField, removeSchemaByFiled }] = useForm({
      labelWidth: 200,
      schemas,
    });
    const [regist1] = useForm({
      labelWidth: 200,
      actionAlgin: 'center',
      schemas: schemas1,
    });

    function appendField() {
      appendSchemaByField(
        {
          field: 'dffield10',
          label: '字段10',
          component: 'Input',
          colProps: {
            span: 8,
          },
        },
        'dffield3',
      );
    }
    function deleteField() {
      removeSchemaByFiled('dffield4');
    }
    return {
      register,
      regist1,
      setProps,
      appendField,
      deleteField,
    };
  },
});
</script>
