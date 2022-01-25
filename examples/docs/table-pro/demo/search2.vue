<template>
  <a-table-pro
    @register="searchTableRegister"
    :formLabelCol="{
      span: 6
    }"
    :formWrapperCol="{
      span: 18
    }"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable, FormProps } from '@fe6/water-pro';

const columns = [
  {
    title: '1name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age', 
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export function demoListApi({params, success}) {
  const arr: any = [];
  for (let index = 0; index < 10; index++) {
    arr.push({
      id: `${index}`,
      name: `${Math.random() + index}-water`,
      age: `1${index}`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

const getSelectForOptions = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        label: 'water',
        value: 90
      },
      {
        label: 'antd',
        value: 80
      }
    ]);
  }, 1000);
};

const tagModalListApi = ({params, success}) => {
  setTimeout(() => {
    success([
      {
        name: '组件库',
        children: [
          {
            name: 'water',
            id: 80,
          },
          {
            name: 'antd',
            id: 180,
          },
        ],
      },
      {
        name: '官网',
        children: [
          {
            name: '金茂',
            id: 380,
          },
          {
            name: '票大大',
            id: 480,
          },
        ],
      },
    ]);
  }, 1000);
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelCol: {
      span: 4,
      md: {
        span: 6,
      } as any,
    },
    wrapperCol: {
      span: 20,
      md: {
        span: 18,
      } as any,
      style: 'padding-right: 16px'
    },
    actionColOptions: {
      span: 4,
      md: {
        span: 8,
      } as any,
    },
    submitOnReset: false,
    schemas: [
      {
        field: 'couponName',
        label: '优惠券名称',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'status',
        component: 'Select',
        label: '优惠券状态',
        componentProps: {
          options: [{
            label: '使用中',
            value: 1,
          }, {
            label: '已过期',
            value: 2,
          }, {
            label: '已失效',
            value: 3,
          }],
          placeholder: '请选择优惠券状态',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}

export default defineComponent({
  setup() {
    const [searchTableRegister] = useTable({
      api: demoListApi,
      columns,
      useSearchForm: true,
      formConfig: getFormConfig(),
    });

    return {
      searchTableRegister,
    };
  },
});
</script>
