<template>
  <a-menu
    id="dddddd"
    style="width: 256px"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
    selectedColor="rgb(250, 173, 20)"
    selectedBgColor="rgba(250, 173, 20, 0.1)"
    selectedBorderColor="rgba(250, 173, 20, 1)"
  >
    <a-menu-item key="1">
      <router-link to="/">
        Option 1
      </router-link>
    </a-menu-item>
    <a-menu-item key="2">
        Option 2
    </a-menu-item>
    <a-menu-item key="3">
      <router-link to="/">
        Option 2
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>(['1']);
    const openKeys = ref<string[]>(['sub1']);
    const handleClick = (e: Event) => {
      console.log('click', e);
    };
    const titleClick = (e: Event) => {
      console.log('titleClick', e);
    };
    watch(
      () => openKeys,
      val => {
        console.log('openKeys', val);
      },
    );
    return {
      selectedKeys,
      openKeys,

      handleClick,
      titleClick,
    };
  },
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
});
</script>
