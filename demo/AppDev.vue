<template>
<div>
    <!-- <a-date-picker v-model:value="value1" mode="year" />
    <a-range-picker v-model:value="value33" />
    <a-week-picker v-model:value="value43" /> -->
    <!-- {{value33}}
    <br />
    <ATimeRangePicker v-model:value="value33" valueFormat="HH:mm" @change="change" />
    {{value323}}
    <br />
    <ARangePicker v-model:value="value323" show-time valueFormat="YYYY-MM-DD HH:mm" @change="change" />
    <br/> -->
  <a-classify
    v-model:value="value3"
    style="width: 200px"
    placeholder="请选择房价分类"
    allowClear
    :api="getSelectForOptions"
    :createFormConfig="createFormConfig"
    :createApi="postCreateApi"
    :editApi="postEditApi"
    :removeApi="postRemoveApi"
    removeTip="确定要删除吗"
    :drawerTableApi="tableApi"
    :drawerTableColumns="columns"
    showSearch
    drawerTableDraggable
    :drawerTableDragApi="dragApi"
    subLabelKey="subLabel"
  />
  <a-classify
    v-model:value="value4"
    style="width: 300px"
    mode="multiple"
    :maxTagCount="2"
    :api="getSelect1ForOptions"
  />
  {{value3}}
  </div>
    <!-- 滚动的时候颜色选择器有问题 -->
    <!-- <AColorPicker
    ></AColorPicker> -->
</template>
<script lang="tsx">
// TODO
// - 指令
// - use
import { defineComponent, ref } from 'vue';

import AClassify from '@fe6/water-pro/es/classify';
import '@fe6/water-pro/es/classify/style';
import ATimePicker from '@fe6/water-pro/es/time-picker';
import '@fe6/water-pro/es/time-picker/style';
import ADatePicker from '@fe6/water-pro/es/date-picker';
import '@fe6/water-pro/es/date-picker/style';
// import ColorPicker from '@fe6/water-pro/es/color-picker/index';
// import '@fe6/water-pro/es/color-picker/style';

const getSelectForOptions = ({params, success}) => {
  console.log('下拉配置初始化');
  setTimeout(() => {
    success([
      {
        label: '水滴',
        value: 90,
        subLabel: 'Water is 最棒'
      },
      {
        label: '阿里',
        value: 80,
        subLabel: 'Antd is 最棒'
      }
    ]);
  }, 1000);
};

const getSelect1ForOptions = ({params, success}) => {
  console.log('111下拉配置初始化');
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
  console.log('drag');
  setTimeout(() => {
    success([]);
  }, 1000);
};


export default defineComponent({
  components: {
    AClassify,
    ADatePicker: ADatePicker,
    ATimeRangePicker: ATimePicker.RangePicker,
    ARangePicker: ADatePicker.RangePicker,
    // AColorPicker: ColorPicker,
  },
  setup() {
    return {
      value3: ref(80),
      value4: ref([380]),
      getSelectForOptions,
      getSelect1ForOptions,
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
      value1: ref<any>(),
      value2: ref<any>(),
      value33: ref<any[]>([]),
      value323: ref<any[]>([]),
      value43: ref<any>(),
      value53: ref<any>(),
      change(sss) {
        console.log(sss, 'sss');
      },
    }
  }
});
</script>
