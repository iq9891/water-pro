<template>
  <a-table-pro
    @register="toolbarRegister"
    cardable
    cardTitle="列表"
  >
    <template #extra>
      <a-button>下载</a-button>
    </template>
  </a-table-pro>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable } from '@fe6/water-pro';

export function getFormConfig(): Partial<any> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'input',
        label: '输入框',
        component: 'Input',
        componentProps: {
          placeholder: '输入框',
        },
        colProps: {
          xl: 12,
          xxl: 12,
        },
      },
      {
        field: 'datePicker',
        label: '日期',
        component: 'DatePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
        },
        colProps: {
          xl: 12,
          xxl: 12,
        },
      },
    ],
  };
}

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
      width: 300,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
      width: 300,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
      width: 1300,
  },
  {
    title: '开始时间',
    width: 200,
    dataIndex: 'beginTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 200,
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
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
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

export default defineComponent({
  setup() {
    const [
      toolbarRegister,
    ] = useTable({
      api: demoListApi,
      columns,
      useSearchForm: true,
      formConfig: getFormConfig(),
    });
    return {
      toolbarRegister,
    };
  },
});
</script>
