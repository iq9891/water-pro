<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <a-scrollbar style="height: 283px; border: 1px solid">
        <div
          style="
            line-height: 300px;
            background: #00a0e9;
            color: #fff;
            text-align: center;
            margin-bottom: 16px;
          "
        >
          Water Pro is best.
        </div>
        <div style="line-height: 100px; text-align: center">Water Pro is best.</div>
        <div style="line-height: 300px; background: #00a0e9; color: #fff; text-align: center">
          Water Pro is best.
        </div>
      </a-scrollbar>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>
