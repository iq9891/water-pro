<template>
  <a-classify
    v-model:value="value3"
    style="width: 200px"
    placeholder="请选择房价分类"
    allowClear
    :createFormConfig="createFormConfig"
    :createApi="postCreateApi"
    :editApi="postEditApi"
    :removeApi="postRemoveApi"
    removeTip="确定要删除吗"
    mode="multiple"
    :drawerTableApi="tableApi"
    :drawerTableColumns="columns"
    showSearch
    drawerTableDraggable
    :drawerTableDragApi="dragApi"
    :selectOptions="getSelectForOptions"
    labelKey="label"
    valueKey="value"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

const postCreateApi = ({params, success}) => {
  console.log('create');
  setTimeout(() => {
    success([]);
  }, 1000);
};

const postEditApi = ({params, success}) => {
  console.log('edit');
  setTimeout(() => {
    success([]);
  }, 1000);
};

const postRemoveApi = ({params, success}) => {
  console.log('remote');
  setTimeout(() => {
    success([]);
  }, 1000);
};

const columns = [
  {
    title: '分类类型',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分类名称',
    dataIndex: 'age',
    key: 'age',
  },
];

const tableApi = ({params, success}) => {
  const arr: any = [];
  for (let index = 0; index < 100; index++) {
    arr.push({
      id: `${index}`,
      name: `${Math.random() + index}-water`,
      age: `1${index}`,
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}
const dragApi = ({params, success}) => {
  setTimeout(() => {
    success([]);
  }, 1000);
};

export default defineComponent({
  setup() {
    return {
      value3: ref([80]),
      getSelectForOptions: [
      {
        label: '水滴',
        value: 90,
        subLabel: 'Water is 最棒'
      },
      {
        label: '阿里',
        value: 80,
        subLabel: 'Antd is 最棒'
      },
      {
        label: '2水滴',
        value: 190,
        subLabel: 'Water is 最棒'
      },
      {
        label: '3阿里',
        value: 180,
        subLabel: 'Antd is 最棒'
      }
    ],
      postCreateApi,
      postEditApi,
      postRemoveApi,
      createFormConfig: {
        schemas: [
          {
            field: 'name',
            component: 'Input',
            label: '房型特色',
            componentProps: {
              placeholder: '请输入内容',
              maxlength: 200,
            },
            itemProps: {
              labelAlign: 'left'
            },
            rules: [{
              required: true,
              message: '请输入所在楼层',
              type: 'string',
            }]
          },
        ],
      },
      columns,
      tableApi,
      dragApi,
    }
  },
});
</script>
