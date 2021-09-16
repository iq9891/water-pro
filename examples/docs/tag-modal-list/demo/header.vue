<template>
  <a-tag-modal-list
    v-model:value="tags"
    createable
    :api="tagModalListApi"
    valueLabel="value"
    nameLabel="label"
    :titleRightRender="titleRightRender"
  />
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';

import Button from '@fe6/water-pro/es/button/index';

const tagModalListApi = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        label: '组件库',
        children: [
          {
            label: 'water',
            value: 80,
          },
          {
            label: 'antd',
            value: 180,
          },
        ],
      },
      {
        label: '官网',
        children: [
          {
            label: '金茂',
            value: 380,
          },
          {
            label: '票大大',
            value: 480,
          },
        ],
      },
    ]);
  }, 1000);
}

export default defineComponent({
  setup() {
    return {
      tags: ref([80, 380]),
      tagModalListApi,
      titleRightRender: () => {
        const btnProps: any = {
          type: 'link',
          onClick: () => open('http://water.chjgo.com/'),
          style: 'margin-left: 16px'
        }
        return (<div>
          <Button {...btnProps}>
            <CloseCircleFilled />设置
          </Button>
          <Button {...btnProps}>
            <CloseCircleFilled />设置
          </Button>
        </div>)
      }
    };
  },
});
</script>
