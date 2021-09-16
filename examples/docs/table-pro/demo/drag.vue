<template>
  <a-table-pro
    @register="basicRegister"
    @drag-end="dragEnd"
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

export default defineComponent({
  setup() {
    const [
        basicRegister,
      ] = useTable({
        api: demoListApi,
        draggable: true,
        columns,
      });
    return {
      basicRegister,
      dragEnd(oldIndexNumber, newIndexNumber) {
        console.log(oldIndexNumber, newIndexNumber, 'drag end');
      },
    };
  },
});
</script>
