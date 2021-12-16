<template>
  <a-table-pro
    @register="searchTableRegister"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useTable, FormProps } from '@fe6/water-pro';

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
const genData: any[] =  [
  {
    "id": 1,
    "name": "本地环境-段",
    "parentId": 0,
    "users": [
      {
        "id": 53,
        "userId": "ShangHaojia",
        "name": "上好佳",
        "alias": "Irresistible teacher",
        departmentId: [1],
        "position": "千禧部门",
        "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
        "roleName": "管理员",
      }
    ],
    "children": [
      {
          "id": 2,
          "name": "亚太地区",
          "users": [
              {
                  "id": 51,
                  "userId": "Meina",
                  "name": "美娜",
                  "alias": "out of body master",
                  departmentId: [1, 2],
                  "position": "鼓励部门",
                  "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
                  "roleName": "超级管理员",
              }
          ],
          "children": [
              {
                  "id": 3,
                  "name": "中国",
                  "users": [],
                  "children": [
                    {
                          "id": 44,
                          "name": "大中华区",
                          "users": [],
                          "children": [
                              {
                                "id": 5,
                                "name": "西三旗部",
                                "users": [
                                  {
                                    "id": 51,
                                    "userId": "Cangjingkong",
                                    "name": "苍井空",
                                    "alias": "Irresistible teacher",
                                    departmentId: [1, 2, 3, 5,6, 7, 44],
                                    "position": "退休",
                                    "avatar": "http://water.chjgo.com/assets/logo.20db40aa.png",
                                    "roleName": "超级管理员",
                                  },
                                  {
                                    "id": 151,
                                    "userId": "Cang",
                                    "name": "苍",
                                    departmentId: [1, 2, 3, 5],
                                    "alias": "Irresistible teacher",
                                    "position": "退休",
                                    "avatar": "http://water.chjgo.com/assets/logo.20db40aa.png",
                                    "roleName": "超级管理员",
                                  }
                                ],
                                "children": []
                              }
                          ]
                      },
                      {
                          "id": 6,
                          "name": "华南区",
                          "users": [],
                          "children": [
                              {
                                  "id": 7,
                                  "name": "西部",
                                  "users": [
                                    {
                                        "id": 51,
                                        "userId": "Cangjingkong",
                                        "name": "苍井空",
                                        "alias": "Irresistible teacher",
                                        "position": "退休",
                                        departmentId: [1, 2, 3, 5,6, 7, 44],
                                        "avatar": "http://water.chjgo.com/assets/logo.20db40aa.png",
                                        "roleName": "超级管理员",
                                    },
                                    {
                                        "id": 151,
                                        "userId": "Ca1ngjingkong",
                                        "name": "苍井空1",
                                        departmentId: [1, 2, 3,6, 7],
                                        "alias": "Irresistible teacher",
                                        "position": "退休",
                                        "avatar": "http://water.chjgo.com/assets/logo.20db40aa.png",
                                        "roleName": "超级管理员",
                                    }
                                  ],
                                  "children": []
                              }
                          ]
                      }
                  ]
              },
          ]
      }
    ]
  }
]

const getModalUserForOptions = ({params, success}) => {
  setTimeout(() => {
    success(genData);
  }, 100);
};

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'picker',
        component: 'RangeGroupPicker',
        componentProps: {
          showTodayButton: true,
          showYesterdayButton: true,
          showSevenDaysButton: true,
          showThirtyDaysButton: true,
        },
        colProps: {
          span: 24,
        },
      },
      {
        field: 'userId',
        component: 'ModalUser',
        componentProps: {
          api: getModalUserForOptions,
          placeholder: '添加人',
        },
        colProps: {
          span: 5,
        },
      },
      {
        field: 'input',
        component: 'Input',
        componentProps: {
          placeholder: '输入框',
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'selectAPI',
        component: 'SelectApi',
        componentProps: {
          placeholder: '下拉',
          api: getSelectForOptions,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'tagModalListSelect',
        component: 'TagModalList',
        componentProps: {
          placeholder: '标签筛选',
          countMaxLength: 2,
          type: 'select',
          api: tagModalListApi,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'rangePicker',
        component: 'RangePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'datePicker',
        component: 'DatePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
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
