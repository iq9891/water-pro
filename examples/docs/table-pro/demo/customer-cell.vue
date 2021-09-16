<template>
  <a-table-pro
    @register="customerCellTable"
  >
    <template #id="{ record }"> ID: {{ record.id }} </template>
    <template #no="{ record }">
      <a-tag color="green">
        {{ record.no }}
      </a-tag>
    </template>
    <template #img>
      <a-table-image
        :imgList="['https://www.evente.cn/_nuxt/img/2d0fa17.png', 'https://www.evente.cn/_nuxt/img/c45fac2.png','https://www.evente.cn/_nuxt/img/2d0fa17.png', 'https://www.evente.cn/_nuxt/img/c45fac2.png','https://www.evente.cn/_nuxt/img/2d0fa17.png', 'https://www.evente.cn/_nuxt/img/c45fac2.png','https://www.evente.cn/_nuxt/img/2d0fa17.png']"
      />
    </template>
    <template #name="{ record }">
      <a-table-card
        :imgUrl="record.image"
        :title="`${record.name}${record.name}`"
        :desc="`ID:${record.id}`"
      >
        <template #titleSuffix>
          <a-tag color="red" v-if="!record.ifShow">隐</a-tag>
        </template>
      </a-table-card>
    </template>
    <template #info="{ record }">
      <a-table-card
        :imgUrl="record.image"
        :title="`${record.name}${record.name}`"
      >
        <template #titleSuffix>
          <a-tag color="red" v-if="record.ifShow">隐</a-tag>
        </template>
      </a-table-card>
    </template>
    <template #category="{ record }">
      <a-tag color="green">
        {{ record.no }}
      </a-tag>
    </template>
  </a-table-pro>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable, BasicColumn, TableImage, TableCard } from '@fe6/water-pro';

const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      slots: { customRender: 'id' },
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 80,
      align: 'center',
      defaultHidden: true,
      slots: { customRender: 'category' },
    },
    {
      title: '产品',
      dataIndex: 'name',
      width: 300,
      slots: { customRender: 'name' },
    },
    {
      title: '信息',
      dataIndex: 'info',
      width: 300,
      slots: { customRender: 'info' },
    },
    {
      title: '头像',
      dataIndex: 'img',
      width: 120,
      slots: { customRender: 'img' },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      slots: { customRender: 'no' },
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
  ];

export function demoListApi({params, success}) {
  const arr: any = [];
  for (let index = 0; index < 10; index++) {
    arr.push({
      id: `这是一个号，${index*1000000000000}`,
      name: `${Math.random() + index}-water`,
      no: `${index + 10}`,
      age: `1${index}`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
      image: index % 2 === 0 ? 'https://www.evente.cn/_nuxt/img/2d0fa17.png' : 'https://www.evente.cn/_nuxt/img/c45fac2.png',
      ifShow: index % 2 > 0
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

export default defineComponent({
  components: {
    ATableImage: TableImage,
    ATableCard: TableCard,
  },
  setup() {
    const [customerCellTable] = useTable({
      api: demoListApi,
      columns: columns,
    });

    return {
      customerCellTable,
    };
  },
});
</script>
