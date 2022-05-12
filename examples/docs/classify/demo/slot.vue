<template>
  <div>
    <a-button @click="open">打开</a-button>
    <a-modal-pro
      @register="registerModal"
      title="water"
      :footer="null"
      :min-height="195"
      :body-style="{ height: '227px' }"
      :z-index="1001"
    >
      <a-form-pro
        @register="handlerForm"
      >
        <template #category="{ model, field }">
          <a-classify
            v-model:value="model[field]"
            style="width: 200px"
            placeholder="请选择房价分类"
            allowClear
            mode="multiple"
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
          >
            <template #optionButtonSlot="{ loading }">
              <span :style="`color:${loading?'red':'green'}`">扩展</span>
            </template>
          </a-classify>
        </template>
      </a-form-pro>
    </a-modal-pro>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModal, useForm } from '@fe6/water-pro';

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
  setTimeout(() => {
    success([]);
  }, 1000);
};

export default defineComponent({
  setup() {
    const { register: registerModal, methods: modalMethods } = useModal();
    const [
      handlerForm,
      {
        setFieldsValue,
        getFieldsValue,
        setProps,
      }
    ] = useForm();
    return {
      getSelectForOptions,
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

      handlerForm,

      registerModal,
      open: () => {
        modalMethods.openModal();
        setTimeout(async() => {
        console.log(1111, '1118');
        setProps({
          schemas: [
            {
              field: 'categoryIds',
              label: '卡券分类',
              component: 'Input',
              slot: 'category',
              rules: [{
                required: true,
                message: '请输入卡券分类',
                type: 'array'
              }],
            }
          ],
          labelCol: {
            span: 24
          },
          wrapperCol: {
            span: 24,
          },
          actionColOptions: {
            span: 24,
            push: 0
          },
          showResetButton: false,
          actionAlgin: 'center',
          okText: '确定',
          submitButtonOptions: {
            loading: false,
          },
        });
        console.log(8, '8');
        setTimeout(async() => {
          setFieldsValue({
            categoryIds: [90],
          });
        }, 0);
      }, 0);
      },
    }
  },
});
</script>
