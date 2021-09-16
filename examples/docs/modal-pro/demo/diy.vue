<template>
  <div>
    <AButton @click="open">打开</AButton>
    <AModalPro @register="registerModal">
      这里是自定义
      <template #footer>
        <div style="color: red" @click="close">footer</div>
      </template>
      <template #header>
        <div style="color: green">header</div>
      </template>
      <template #close>
        <div style="color: blue" @click="close">close</div>
      </template>
    </AModalPro>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useModal } from '@fe6/water-pro';

export default defineComponent({
  setup() {
    const { register: registerModal, methods: modalMethods } = useModal();
    return {
      registerModal,
      open: () => {
        modalMethods.openModal();
      },
      close: () => {
        modalMethods.openModal(false);
      },
    };
  },
});
</script>
