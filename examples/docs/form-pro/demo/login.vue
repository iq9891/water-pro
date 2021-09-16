<template>
  <a-form-pro @register="loginFormPro" @submit="handleSubmit" />
</template>
<script lang="ts">
import { defineComponent, h } from 'vue';
import { rePhone } from '@fe6/shared';

import { FormSchema, useForm } from '@fe6/water-pro';

const getSmsCodeApi = (params: any) => {
  console.log(params, 'params');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

const schemas: FormSchema[] = [
  {
    field: 'phone',
    component: 'Input',
    componentProps: (a) => {
      return {
        placeholder: '手机号',
      };
    },
    rules: [
      {
        required: true,
        trigger: 'blur',
        message: '请输入手机号',
      },
      {
        validator: async (rule, value) => {
          if (value && !rePhone.test(value)) {
            return Promise.reject(new Error('请填写正确手机号'));
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'smscode',
    component: 'InputSmsCode',
    componentProps: ({ formModel }) => {
      let ticket = '';
      let randstr = '';
      return {
        api: getSmsCodeApi,
        ajaxParams: () => {
          return {
            phone: formModel.phone,
            ticket,
            randstr,
          };
        },
        before(fn) {
          const captcha1 = new (window as any).TencentCaptcha('2086745153', (res) => {
            if (res.ret === 0) {
              ticket = res.ticket;
              randstr = res.randstr;
              fn();
            }
          });
          captcha1.show(); // 显示验证码
        },
      };
    },
  },
  {
    field: 'useCookie',
    component: 'Checkbox',
    renderComponentContent: () => h('span', '七天内登录'),
  },
];

export default defineComponent({
  setup() {
    const [loginFormPro] = useForm({
      schemas,
      showResetButton: false,
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
      actionColOptions: {
        span: 24,
        push: 0,
      },
      layout: 'vertical',
      submitButtonOptions: {
        block: true,
      },
    });
    return {
      loginFormPro,
    };
  },
  methods: {
    handleSubmit(values: any) {
      const myValues = JSON.stringify(values);
      (this as any).$message.info(myValues === '{}' ? '操作点数据吧' : myValues);
      console.log('提交的数据:' + JSON.stringify(values));
    },
  },
});
</script>
