<template>
  <a-table-pro @register="toolbarRegister">
    <template #action> 自定义的内容 </template>
    <template #toolbar> 自定义头部 </template>
  </a-table-pro>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable } from '@fe6/water-pro';

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

export function demoListApi({ params, success }) {
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
    const [toolbarRegister] = useTable({
      api: demoListApi,
      columns,
      showTableSetting: true,
    });
    return {
      toolbarRegister,
    };
  },
});
</script>
