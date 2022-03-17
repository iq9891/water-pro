<template>
  <a-classify
    v-model:value="value3"
    style="width: 200px"
    placeholder="请选择房价分类"
    allowClear
    :api="getSelectForOptions"
    :createFormConfig="formOneConfig"
    :createApi="postCreateApi"
    :editApi="postEditApi"
    :removeApi="postRemoveApi"
    removeTip="确定要删除吗"
    :createSubFormConfig="formTwoConfig"
    :drawerTableApi="tableApi"
    :drawerTableColumns="columns"
    drawerCreateButtonText="添加一级分类"
    :showDropdownAdd="false"
    showSearch
    drawerTableDraggable
    :drawerTableDragApi="tableApi"
    :drawerWidth="700"
    subClassify
  />
</template>
<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import { Switch } from '@fe6/water-pro';

const getSelectForOptions = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        label: 'water',
        value: 90,
        children: [
          {
            label: 'antd1',
            value: 180
          },
          {
            label: '2antd',
            value: 280
          }
        ],
      },
      {
        label: 'antd',
        value: 80,
        children: [
          {
            label: '23antd1',
            value: 380
          },
          {
            label: '442antd',
            value: 480
          }
        ],
      }
    ]);
  }, 1000);
};

const postCreateApi = ({params, success}) => {
  console.log(params, 'create');
  setTimeout(() => {
    success([]);
  }, 1000);
};

const postEditApi = ({params, success}) => {
  console.log(params, 'edit');
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
  {
    title: '显示',
    dataIndex: 'show',
    key: 'show',
    customRender: ({ record }) => {
      return {
        children: h(Switch, {
          checked: record.show,
          onChange: () => {
            setTimeout(() => {
              record.show = !record.show;
            }, 1000);
          }
        }),
        props: {
          colSpan: 1,
        },
      };
    },
  },
];

const tableApi = ({params, success}) => {
  const arr: any = [];
  arr.push({
    id: '0',
    name: '全部',
    age: '-',
    children: [],
  });

  for (let index = 1; index < 5; index++) {
    arr.push({
      id: `${index}`,
      name: `${index}-water`,
      age: 18,
      show: Math.floor(Math.random()* 10)>5,
      children: [{
        parentId: `${index}`,
        id: `child-${index+1}`,
        show: Math.floor(Math.random()* 10)>5,
        name: `child-${index+1}`,
        age: 98,
      }, {
        parentId: `${index}`,
        id: `child-${index+2}`,
        show: Math.floor(Math.random()* 10)>5,
        name: `child-${index+2}`,
        age: 98,
      }]
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

export default defineComponent({
  setup() {
    return {
      value3: ref(380),
      getSelectForOptions,
      postCreateApi,
      postEditApi,
      postRemoveApi,
      formOneConfig: {
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
      formTwoConfig: {
        schemas: [
          {
            field: 'age',
            component: 'Input',
            label: '数字',
            componentProps: {
              placeholder: '请输入内容',
              maxlength: 200,
            },
            rules: [{
              required: true,
              message: '请输入所在楼层',
              type: 'string',
            }]
          },
          {
            field: 'parentId',
            label: '',
            component: 'Input',
            ifShow: () => false,
          }
        ],
      },
      columns,
      tableApi,
    }
  },
});
</script>
