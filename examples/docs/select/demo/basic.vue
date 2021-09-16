<template>
  <a-select
    v-model:value="value1"
    style="width: 120px"
    @focus="focus"
    ref="select"
    @change="handleChange"
  >
    <a-select-option value="jack">Jack</a-select-option>
    <a-select-option value="lucy">Lucy</a-select-option>
    <a-select-option value="disabled" disabled>Disabled</a-select-option>
    <a-select-option value="Yiminghe">yiminghe</a-select-option>
  </a-select>
  <a-select v-model:value="value2" style="width: 120px" disabled>
    <a-select-option value="lucy">Lucy</a-select-option>
  </a-select>
  <a-select v-model:value="value3" style="width: 120px" loading>
    <a-select-option value="lucy">Lucy</a-select-option>
  </a-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const focus = () => {
      console.log('focus');
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      focus,
      handleChange,
      value1: ref('lucy'),
      value2: ref('lucy'),
      value3: ref('lucy'),
    };
  },
});
</script>
