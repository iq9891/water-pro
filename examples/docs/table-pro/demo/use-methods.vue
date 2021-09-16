<template>
  <div>
    <a-space style="flex-wrap: wrap;">
      <a-button @click="reloadTable"> 还原 </a-button>
      <a-button @click="changeLoading"> 开启loading </a-button>
      <a-button @click="changeColumns"> 更改Columns </a-button>
      <a-button @click="getColumn"> 获取Columns </a-button>
      <a-button @click="getTableData"> 获取表格数据 </a-button>
      <a-button @click="setPaginationInfo"> 跳转到第2页 </a-button>
      <a-button @click="setSelectedRowKeyList"> 设置选中行 </a-button>
      <a-button @click="getSelectRowList"> 获取选中行 </a-button>
      <a-button @click="getSelectRowKeyList"> 获取选中行Key </a-button>
      <a-button @click="clearSelect"> 清空选中行 </a-button>
      <a-button @click="getPagination"> 获取分页信息 </a-button>
      <a-button @click="toDeleteSelectRowByKey"> 删除选中的某几个 </a-button>
      <a-button @click="toSetTableData"> 换一拨数据 </a-button>
      <a-button @click="toSetProps"> 设置配置(去掉省略号) </a-button>
      <a-button @click="toGetSize"> 获取表格的 size </a-button>
      <a-button @click="toGetForm"> 获取表格 </a-button>
      <a-button @click="setShowMoreHandler">showMoreHandler 显示批量操作 </a-button>
    </a-space>
    <a-table-pro
      @register="useMethodsRegister"
    >
      <template #action="{ record }">
        123
      </template>
      <template #moreHandler>
        <a-button>批量删除</a-button>
      </template>
    </a-table-pro>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useTable, TableAction } from '@fe6/water-pro';
import { BasicColumn } from '@fe6/water-pro/src/types/table';

import Button from '@fe6/water-pro/es/button/index';
import '@fe6/water-pro/es/button/style';

import Space from '@fe6/water-pro/es/space/index';
import '@fe6/water-pro/es/space/style';


export function demoListApi({params, success}) {
  const arr: any = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      name: `${Math.random() + index}-water`,
      age: `1${index}`,
      no: `${index + 10}`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  setTimeout(() => {
    success(arr);
  }, 1000);
}

const getNewData: any = (() => {
  const arr: any = [];
  for (let index = 0; index < 140; index++) {
    arr.push({
      id: `${index}`,
      name: '这是新数据',
      age: `1${index}`,
      no: `${index + 10}`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '开始时间',
      width: 120,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      width: 120,
      sorter: true,
      dataIndex: 'endTime',
    },
  ];
}

export function getFormConfig(): Partial<any> {
  return {
    labelWidth: 130,
    schemas: [
      {
        field: 'input',
        label: '兑换券名称',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Space.name]: Space,
    [TableAction.name]: TableAction,
  },
  setup() {
      const [
        useMethodsRegister,
        {
          setLoading,
          setColumns,
          getColumns,
          getDataSource,
          reload,
          getPaginationRef,
          setPagination,
          getSelectRows,
          getSelectRowKeys,
          setSelectedRowKeys,
          clearSelectedRowKeys,
          deleteSelectRowByKey,
          setTableData,
          setProps,
          getSize,
          getForm,
        },
      ] = useTable();

      const getConfig = async () => {
        await demoListApi({params: {}, success: () => {}});
      }

      onMounted(async () => {
        await getConfig();
        setProps({
          // title: 'useTable示例',
          // titleHelpMessage: '使用useTable调用表格内方法',
          api: demoListApi,
          columns: getBasicColumns(),
          rowKey: 'id',
          rowSelection: {
            type: 'checkbox', // radio or checkbox
          },
          useSearchForm: true,
          formConfig: getFormConfig(),
          actionColumn: {
            width: 80,
            title: 'Action',
            dataIndex: 'action',
            slots: { customRender: 'action' },
          },
        });
      });

      function changeLoading() {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      function changeColumns() {
        setColumns(getBasicShortColumns());
      }
      function reloadTable() {
        setColumns(getBasicColumns());

        reload({
          page: 1,
        });
      }
      function getColumn() {
        console.log(getColumns());
      }

      function getTableData() {
        console.log(getDataSource());
      }

      function getPagination() {
        console.log(getPaginationRef());
      }

      function toDeleteSelectRowByKey() {
        deleteSelectRowByKey('1');
      }

      function setPaginationInfo() {
        setPagination({
          current: 2,
        });
        reload();
      }
      function getSelectRowList() {
        console.log(getSelectRows());
      }
      function getSelectRowKeyList() {
        console.log(getSelectRowKeys());
      }
      function setSelectedRowKeyList() {
        setSelectedRowKeys(['0', '1', '2']);
      }
      function toSetTableData() {
        setTableData(getNewData);
      }
      function toSetProps() {
        setProps({
          ellipsis: false,
        });
      }

      const moreHandlerStatus = ref(false);
      function setShowMoreHandler() {
        moreHandlerStatus.value = !moreHandlerStatus.value;
        setProps({
          showMoreHandler: moreHandlerStatus.value,
        });
      }
      
      function toGetSize() {
        console.log(getSize());
      }
      function toGetForm() {
        console.log(getForm());
      }
      function clearSelect() {
        clearSelectedRowKeys();
      }

      return {
        useMethodsRegister,
        changeLoading,
        changeColumns,
        reloadTable,
        getColumn,
        getTableData,
        getPagination,
        setPaginationInfo,
        getSelectRowList,
        getSelectRowKeyList,
        setSelectedRowKeyList,
        clearSelect,
        toDeleteSelectRowByKey,
        toSetTableData,
        toSetProps,
        toGetSize,
        toGetForm,
        setShowMoreHandler,
      };
  },
});
</script>
