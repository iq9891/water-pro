<template>
  <div>
    <AButton @click="open">打开</AButton>
    <AModalPro @register="registerModal" :title="null" :footer="null"> 没有头和底 </AModalPro>
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
