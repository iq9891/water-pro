<template>
  <a-avatar>
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
  <a-avatar>U</a-avatar>
  <a-avatar>USER</a-avatar>
  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  <a-avatar style="color: #f56a00; backgroundcolor: #fde3cf">U</a-avatar>
  <a-avatar style="backgroundcolor: #87d068">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    UserOutlined,
  },
});
</script>
