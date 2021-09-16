<template>
  <a-tag-group :value="tagDatas" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

const tagDatas = [
  {
    name: '这是很长的标签',
    id: 190,
  },
  {
    name: 'water',
    id: 290,
  },
];

export default defineComponent({
  setup() {
    return {
      tagDatas,
    };
  },
});
</script>
