<template>
  <a-space direction="vertical">
    <a-date-picker
      v-model:value="value1"
      disabledSelectYear
      value-format="MM-DD"
      format="MM-DD"
    />
    <a-month-picker
      v-model:value="value2"
      disabledSelectYear
      value-format="MM"
      format="MM"
    />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment, { Moment } from 'moment';
export default defineComponent({
  setup() {
    return {
      value1: ref<Moment>(),
      value2: ref<Moment>(),
    };
  },
});
</script>
