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
    drawerTableDraggableBtn
    :drawerTableDragApi="tableApi"
    :drawerWidth="1000"
    subClassify
    @up-sort="upSort"
    @down-sort="downSort"
  >
    <template #name="{ record}">
      <template v-if="record.parentId === 0">{{record.name}}</template>
      <template v-else>
        <a-space>
          <a-image :src="record.imgUrl" :width="30" :height="30" />{{record.name}}
        </a-space>
      </template>
    </template>
  </a-classify>
</template>
<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import { Switch, Space, Image } from '@fe6/water-pro';

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
    width: 200,
    key: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: '分类名称',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '显示',
    dataIndex: 'show',
    key: 'show',
    width: 60,
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

const imgs = [
  'https://cdn.dev.mosh.cn/image/dc/a4/696b123403f5c16bd1f65be44e36.png',
  'https://cdn.dev.mosh.cn/image/d8/5a/836b532fb131586b679f2c969900.png'
];

const tableApi = ({params, success}) => {
  const arr: any = [];
  arr.push({
    id: -1,
    name: '全部',
    age: '-',
    parentId: 0,
    children: [],
  });

  for (let index = 1; index < 5; index++) {
    arr.push({
      id: `${index}`,
      name: `${index}-water`,
      age: 18,
      parentId: 0,
      show: Math.floor(Math.random()* 10)>5,
      children: [{
        parentId: `${index}`,
        id: `child-${index+3}`,
        show: Math.floor(Math.random()* 10)>5,
        name: `child-${index+3}`,
        imgUrl: imgs[1],
        age: 98,
      }, {
        parentId: `${index}`,
        id: `child-${index+1}`,
        show: Math.floor(Math.random()* 10)>5,
        name: `child-${index+1}`,
        imgUrl: imgs[0],
        age: 98,
      }, {
        parentId: `${index}`,
        id: `child-${index+2}`,
        show: Math.floor(Math.random()* 10)>5,
        name: `child-${index+2}`,
        imgUrl: imgs[1],
        age: 98,
      }]
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

export default defineComponent({
  components: {
    ASpace: Space,
    AImage: Image,
  },
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
          },
          {
            field: 'id',
            label: '',
            component: 'Input',
            ifShow: () => false,
          }
        ],
      },
      columns,
      tableApi,
      upSort(params: any) {
        console.log(params, 'up')
      },
      downSort(params: any) {
        console.log(params, 'up')
      },
    }
  },
});
</script>
