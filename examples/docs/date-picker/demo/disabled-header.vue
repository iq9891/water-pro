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
    <a-date-picker
      v-model:value="value3"
      disabledSelectYear
      value-format="MM-DD"
      format="MM-DD"
      type="multiple"
    />
    <a-month-picker
      v-model:value="value4"
      disabledSelectYear
      value-format="MM"
      format="MM"
      type="multiple"
    />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment, { Moment } from 'moment';
export default defineComponent({
  setup() {
    return {
      value1: ref<Moment>(moment()),
      value2: ref<Moment>(moment()),
      value3: ref<Moment[]>([moment()]),
      value4: ref<Moment[]>([moment()]),
    };
  },
});
</script>
