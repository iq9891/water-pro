<template>
  <a-form-pro @register="specialFormPro" @submit="specialHandleSubmit" />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

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

const genData: any[] =  [
    {
        "id": 22,
        "name": "本地环境-段",
        "users": [
            {
                "id": 53,
                "userId": "ShangHaojia",
                "name": "上好佳",
                "position": "千禧部门",
                departmentId: [22],
                "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
                "roleName": "管理员",
            },
            {
                "id": 51,
                "userId": "TongXinCui",
                "name": "同心脆",
                departmentId: [22],
                "position": "千禧部门",
                "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
                "roleName": "管理员",
            },
            {
                "id": 51,
                "userId": "AoLiAo",
                departmentId: [22],
                "name": "奥利奥",
                "position": "千禧部门",
                "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
                "roleName": "管理员",
            }
        ],
        "children": [
            {
                "id": 90,
                "name": "亚太地区",
                "users": [
                    {
                        "id": 51,
                        departmentId: [22, 90],
                        "userId": "Meina",
                        "name": "美娜",
                        "position": "鼓励部门",
                        "avatar": "https://ecdn.evente.cn/assets/image/b-favicon-1.ico",
                        "roleName": "超级管理员",
                    }
                ],
                "children": []
            }
        ]
    }
]


const tagModalListApi = ({success}) => {
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

const getModalUserForOptions = ({params, success}) => {
  console.log('下拉配置初始化');
  
  setTimeout(() => {
    success(genData);
  }, 100);
};

const schemas: FormSchema[] = [
  {
    field: 'modalUser',
    component: 'ModalUser',
    label: 'ModalUser',
    componentProps: {
      api: getModalUserForOptions,
      placeholder: '请输入'
    },
  },
  {
    field: 'spfield1',
    component: 'SelectApi',
    label: 'SelectApi',
    componentProps: {
      api: getSelectForOptions,
      placeholder: '请输入'
    },
  },
  {
    field: 'spfield2',
    component: 'UploadImage',
    label: 'UploadImage',
    changeEvent: 'changeUpload',
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return [
        {
          required: true,
          validator: () => {
            const { spfield2 } = values;
            if (!spfield2) {
              return Promise.reject(new Error('请上传 UploadImage'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
    componentProps: (params) => {
      const { formActionType } = params;
      return {
        placeholder: 'UploadImage 自动上传',
        action: 'https://api.dev.mosh.cn/public/upload/image/binary',
        mergeMoreDataable: true,
        mergeOriginDatas: (uploadParams: Recordable) => {
          // 设置提交数据
          formActionType.setFieldsValue({
            type: 2,
          });
          return uploadParams.url;
        },
      };
    },
  },
  {
    field: 'tagModalListSelect',
    component: 'TagModalList',
    label: '标签弹框 select 模式',
    componentProps: {
      createable: true,
      showMoreButton: true,
      countMaxLength: 2,
      type: 'select',
      api: tagModalListApi,
      placeholder: '请输入'
    },
  },
  {
    field: 'spfield3auto',
    component: 'UploadName',
    changeEvent: 'changeUpload',
    label: 'UploadName',
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return [
        {
          required: true,
          trigger: 'blur',
          validator: () => {
            const { spfield3 } = values;
            if (!spfield3) {
              return Promise.reject(new Error('上传 UploadName'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
    componentProps: () => {
      return {
        accept: '*',
        action: 'https://qiwei-api.dev.mosh.cn/api/v1/upload/file/binary',
        headers: {
          Authorization: 'Bearer XLP8KP3RhblzIiunsEMukNOznUYrEubCFUMJ8QqUsm1IxqrpitnV4LjseVtxMw/ai1Y/aEokl/Rd7FT/r9LzPQ==',
        },
        placeholder: 'UploadName 自动上传',
      };
    },
  },
  {
    field: 'spfield3',
    component: 'UploadName',
    changeEvent: 'changeUpload',
    label: 'UploadName',
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return [
        {
          required: true,
          trigger: 'blur',
          validator: () => {
            const { spfield3 } = values;
            if (!spfield3) {
              return Promise.reject(new Error('上传 UploadName'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
    componentProps: () => {
      return {
        accept: '*',
        placeholder: 'UploadName 不是自动上传',
        autoUpload: false,
        onFormChange: (values: any) => {
          console.log(values, 'values');
        },
      };
    },
  },
  {
    field: 'spfield4',
    component: 'UploadCard',
    label: 'UploadCard',
    changeEvent: 'changeUpload',
    dynamicRules: (ruleParams) => {
      const { values } = ruleParams.value;
      return [
        {
          required: true,
          validator: () => {
            const { spfield4 } = values;
            if (!spfield4 || !spfield4.length) {
              return Promise.reject(new Error('请上传 UploadCard'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
    componentProps: (params) => {
      return {
        placeholder: 'UploadCard',
        action: 'https://api.dev.mosh.cn/public/upload/image/binary',
        onFormChange: () => {
          // 上传之后验证一下
          params.formActionType.validate('spfield4');
        },
      };
    },
  },
];

export default defineComponent({
  setup() {
    const [
      specialFormPro,
      specialFormActions
    ] = useForm({
      schemas,
      labelWidth: 200,
    });

    const specialHandleSubmit = async () => {
      try {
        const updateParams = await specialFormActions.validate();
        console.log(JSON.stringify(updateParams), 'updateParams');
      } catch (err) {}
    };

    onMounted(() => {
      setTimeout(() => {
        specialFormActions.setFieldsValue({
          modalUser: ['ShangHaojia'],
        })
      }, 90);
    });

    return {
      specialFormPro,
      specialHandleSubmit,
    };
  },
});
</script>
