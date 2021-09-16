<template>
  <a-form-pro
    :schemas="schemas"
    :labelWidth="200"
  >
  <template #sfield4="{ model, field }">
    <span>这是 sfield4 的 slot 。 {{model}}-{{field}} 是数据</span>
  </template>
  </a-form-pro>
</template>
<script lang="ts">
import type { ComputedRef } from 'vue';
import type { RenderCallbackParams } from '@fe6/water-pro';

import { defineComponent, h } from 'vue';

import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { FormSchema } from '@fe6/water-pro';
import Input from '@fe6/water-pro/es/input';
import Tooltip from '@fe6/water-pro/es/tooltip';
import Typography from '@fe6/water-pro/es/typography';

const schemas: FormSchema[] = [
  {
    field: 'sfield1',
    component: 'Input',
    label: '首尾自定义',
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(schema, formModel, e);
        },
      };
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot',
      };
    },
  },
  {
    field: 'sfield2',
    component: 'Checkbox',
    label: '选项自定义',
    renderComponentContent: () => h('span', 'Check'),
  },
  {
    field: 'sfield3',
    component: 'Input',
    label: 'render 方式',
    render: (rParams: ComputedRef<RenderCallbackParams>) => {
      const { model, field } = rParams.value;
      return h(Input, {
        placeholder: 'change 方法修改提交数据',
        value: model[field],
        onChange: (e: ChangeEvent) => {
          model[field] = e.target.value;
        },
      });
    },
  },
  {
    field: 'sfield4',
    component: 'Input',
    label: '自定义Slot',
    slot: 'sfield4',
  },
  {
    field: 'sfield5',
    component: 'Input',
    label: '自定义组件',
    defaultValue: 'water pro',
    componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot',
      };
    },
  },
  {
    field: 'sfield6',
    component: 'Input',
    label: '带后缀',
    defaultValue: 'water',
    wrapperWidth: '70%',
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
    suffix: () => h(Tooltip, {
      title: 'water is best!'
    }, () => h(InfoCircleOutlined)),
  },
  {
    field: 'posters',
    component: 'UploadCard',
    label: '房型图片',
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return [
        {
          required: true,
          validator: () => {
            const { posters } = values;
            if (!posters || !posters.length) {
              return Promise.reject(new Error('请上传房型图片'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
    componentProps: {
      action: 'https://api.dev.mosh.cn/public/upload/image/binary',
    },
    end: (): any => h('div', [
      h(Typography.Text, {
        type: 'secondary',
        style: {
          display: 'block',
          lineHeight: '22px',
          fontSize: '12px',
          paddingTop: '8px',
        },
      }, () => '1.最多可添加6张'),
      h(Typography.Text, {
        type: 'secondary',
        style: {
          display: 'block',
          lineHeight: '22px',
          fontSize: '12px',
        },
      }, () => '2.图片建议尺寸为800*800px以上'),
      h(Typography.Text, {
        type: 'secondary',
        style: {
          display: 'block',
          lineHeight: '22px',
          fontSize: '12px',
        },
      }, () => '3.支持PNG、JPG和JPEG格式，大小不超过5MB'),
    ]),
  },
];

export default defineComponent({
  setup() {
    return {
      schemas,
    };
  },
});
</script>
