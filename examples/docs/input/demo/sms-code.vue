<template>
  <a-sms-code
    :api="getSmsCodeApi"
    v-model:value="value"
    :ajaxParams="() => ({ phone: 13810902078 })"
    :buttonOptions="{
      type: 'danger',
    }"
  >
    <template #prefix>
      <LogoutOutlined />
    </template>
  </a-sms-code>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LogoutOutlined } from '@ant-design/icons-vue';

const getSmsCodeApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export default defineComponent({
  components: {
    LogoutOutlined,
  },
  setup() {
    const value = ref<string>('');
    return {
      value,
      getSmsCodeApi,
    };
  },
});
</script>
