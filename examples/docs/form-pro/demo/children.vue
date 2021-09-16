<template>
  <a-form-pro
    @register="childrenPro"
  >
    <template #resetBefore>
      <a-button>上一步</a-button>
    </template>
    <template #submitBefore>
      <a-button>children 保存</a-button>
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </template>
  </a-form-pro>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] = [
  {
    field: 'eafield1',
    component: 'Render',
    label: '字段a',
    children: [
      {
        field: 'field1',
        component: 'Input',
        label: '字段1',
        required: true,
      },
      {
        field: 'field2',
        component: 'Switch',
        label: '字段2',
      },
    ]
  },
  {
    field: 'eaafield1',
    component: 'Render',
    label: '字段b',
    ifShow: (ifShowParams) => {
      const { values } = ifShowParams.value;
      return !!values?.field2;
    },
    children: [
      {
        field: 'afield1',
        component: 'Input',
        label: '字段3',
      },
      {
        field: 'afield2',
        component: 'Switch',
        label: '字段4',
      },
    ]
  },
  {
    field: 'eabfield2',
    component: 'Render',
    label: '字段c',
    children: [
      {
        field: 'bfield1',
        component: 'Input',
        label: '字段5',
        ifShow: (ifShowParams) => {
          const { values } = ifShowParams.value;
          return !!values?.field2;
        },
      },
      {
        field: 'bfield2',
        component: 'Switch',
        label: '字段6',
      },
    ]
  },
];

export default defineComponent({
  setup() {
    const [
      childrenPro,
      { getFieldsValue, setFieldsValue, getChildrenFieldsValue }
    ] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
        push: 0
      },
      actionAlgin: 'space-between',
      actionAffix: true,
      showResetButton: false,
      showSubmitButton: false,
      navAffix: true,
    });

    // NOTO 真实场景获取详情编辑接口，设置具体曾经的数据
    setTimeout(async () => {
      setFieldsValue({
        field1: 'water'
      });
    }, 100);
    return {
      childrenPro,
      getFieldsValue,
      getChildrenFieldsValue,
    };
  },
  methods: {
    handleSubmit() {
      const values1 = this.getFieldsValue();
      const values2 = this.getFieldsValue(true);
      const values3 = this.getChildrenFieldsValue();
      const values4 = this.getChildrenFieldsValue(true);
      (this as any).$message.info('控制台有惊喜');
      
      console.log('children 的提交数据全字段:' + JSON.stringify(values1));
      console.log('children 的提交数据过滤不显示的字段:' + JSON.stringify(values2));
      console.log('children 的提交数据children结构的字段:' + JSON.stringify(values3));
      console.log('children 的提交数据children结构过滤不显示的字段:' + JSON.stringify(values4));
    },
  },
});
</script>
