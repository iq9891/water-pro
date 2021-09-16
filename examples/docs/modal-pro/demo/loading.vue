<template>
  <div>
    <AButton @click="open">打开</AButton>
    <AModalPro
      @register="registerModal"
      title="water"
      @ok="okHandle"
      :loading="modalLoading"
      loadingTip="我们在努力的加载"
      :okButtonProps="{
        loading: modalLoading,
      }"
      okText="点击加载"
    >
      这里面是简单的内容
    </AModalPro>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModal } from '@fe6/water-pro';

export default defineComponent({
  setup(props) {
    const { register: registerModal, methods: modalMethods } = useModal();
    const modalLoading = ref(false);
    return {
      registerModal,
      open: () => {
        modalMethods.openModal();
      },
      okHandle: () => {
        modalLoading.value = true;
        setTimeout(() => {
          modalMethods.openModal(false);
          modalLoading.value = false;
        }, 1500);
      },
      modalLoading,
    };
  },
});
</script>
