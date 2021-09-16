<template>
  <a-space direction="vertical">
    <a-radio-group v-model:value="size" button-style="solid">
      <a-radio-button value="small">Small</a-radio-button>
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="large">Large</a-radio-button>
    </a-radio-group>
    <a-typography-text :size="size">Ant Design Vue (default)</a-typography-text>
    <a-typography-text styleReset :size="size" type="secondary">Ant Design Vue (secondary)</a-typography-text>
    <a-typography-text :size="size" type="success">Ant Design Vue (success)</a-typography-text>
    <a-typography-text :size="size" type="warning">Ant Design Vue (warning)</a-typography-text>
    <a-typography-text :size="size" type="danger">Ant Design Vue (danger)</a-typography-text>
    <a-typography-text :size="size" disabled>Ant Design Vue (disabled)</a-typography-text>
    <a-typography-text :size="size" mark>Ant Design Vue (mark)</a-typography-text>
    <a-typography-text :size="size" code>Ant Design Vue (code)</a-typography-text>
    <a-typography-text :size="size" keyboard>Ant Design Vue (keyboard)</a-typography-text>
    <a-typography-text :size="size" underline>Ant Design Vue (underline)</a-typography-text>
    <a-typography-text :size="size" delete>Ant Design Vue (delete)</a-typography-text>
    <a-typography-text :size="size" strong>Ant Design Vue (strong)</a-typography-text>
    <a-typography-link :size="size" href="https://antdv.com" target="_blank">
      Ant Design Vue (Link)
    </a-typography-link>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      size: ref('default'),
    };
  },
});
</script>
