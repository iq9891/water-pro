<template>
  <a-table-pro
    @register="basicRegister"
    @fetch-success="successAjax"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable } from '@fe6/water-pro';

const columns = [
  {
    title: 'name',
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
  for (let index = 0; index < 20; index++) {
    arr.push({
      id: `${index}`,
      name: `${Math.random() + index}-water`,
      age: `1${index}`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
    });
  }
  setTimeout(() => {
    success({
      data: arr,
      test: 1,
      pagination: {
        total:20,
      }
    });
  }, 1000);
}

export default defineComponent({
  setup() {
    const [
        basicRegister,
      ] = useTable({
        api: demoListApi,
        columns,
      });
      const successAjax = (data: any, res: any) => {
        console.log(data, res)
      }
    return {
      basicRegister,
      successAjax,
    };
  },
});
</script>
