<template>
  <a-slider v-model:value="rows" :min="1" :max="10" />
  <a-radio-group v-model:value="size" button-style="solid">
    <a-radio-button value="small">Small</a-radio-button>
    <a-radio-button value="default">Default</a-radio-button>
    <a-radio-button value="large">Large</a-radio-button>
  </a-radio-group>
  <a-typography-paragraph
    :size="size"
    :ellipsis="ellipsis"
    :title="`${article}--William Shakespeare`"
    :content="article"
  ></a-typography-paragraph>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const rows = ref(1);
    const ellipsis = computed(() => {
      return {
        rows: rows.value,
        expandable: true,
        suffix: '--William Shakespeare',
        onEllipsis: (ellipsis: boolean) => {
          console.log('Ellipsis changed:', ellipsis);
        },
      };
    });
    return {
      size: ref('default'),
      rows,
      ellipsis,
      article:
        "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life",
    };
  },
});
</script>
