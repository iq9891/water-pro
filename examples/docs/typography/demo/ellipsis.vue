<template>
  <a-radio-group v-model:value="size" button-style="solid">
    <a-radio-button value="small">Small</a-radio-button>
    <a-radio-button value="default">Default</a-radio-button>
    <a-radio-button value="large">Large</a-radio-button>
  </a-radio-group>
  <a-switch v-model:checked="ellipsis" />
  <a-typography-paragraph
    :size="size"
    :ellipsis="ellipsis"
    content=" Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team."
  />

  <a-typography-paragraph
    :size="size"
    :ellipsis="ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false"
    content="Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team. Ant
    Design, a design language for background applications, is refined by Ant UED Team."
  />

  <a-typography-text
    :size="size"
    :style="ellipsis ? { width: '100px' } : {}"
    :ellipsis="ellipsis ? { tooltip: 'I am ellipsis now!' } : false"
    content="Ant Design, a design language for background applications, is refined by Ant UED Team."
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      size: ref('default'),
      ellipsis: ref(true),
    };
  },
});
</script>
