<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="valueDate" type="multiple" />
    <a-month-picker v-model:value="valueMonth" type="multiple" />
    <a-year-picker v-model:value="valueYear" type="multiple" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment, { Moment } from 'moment';
export default defineComponent({
  setup() {
    return {
      valueYear: ref<Moment[]>([moment()]),
      valueMonth: ref<Moment[]>([moment()]),
      valueDate: ref<Moment[]>([moment()]),
    };
  },
});
</script>
