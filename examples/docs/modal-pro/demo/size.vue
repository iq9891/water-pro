<template>
  <div>
    <AButton @click="open">打开</AButton>
    <AModalPro
      @register="registerModal"
      title="water"
      :width="800"
      :minHeight="1000"
      :bodyStyle="{ height: '500px' }"
    >
      设置宽高的内容
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
    };
  },
});
</script>
