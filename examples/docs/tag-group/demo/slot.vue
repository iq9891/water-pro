<template>
  <a-tag-group :value="tagDatas">
    <template #more> +{{ tagDatas.length - 4 }} </template>
  </a-tag-group>
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
  {
    name: '榴莲',
    id: 390,
  },
  {
    name: '山药',
    id: 490,
  },
  {
    name: '洗手液',
    id: 590,
  },
  {
    name: '快手',
    id: 690,
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
