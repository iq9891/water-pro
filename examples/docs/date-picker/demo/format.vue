<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="value1" :format="dateFormat" />
    <a-date-picker v-model:value="value2" :format="dateFormatList" />
    <a-month-picker v-model:value="value3" :format="monthFormat" />
    <a-range-picker v-model:value="value4" :format="dateFormat" />
  </a-space>
</template>
<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const dateFormat = 'YYYY/MM/DD';
    const monthFormat = 'YYYY/MM';
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return {
      value1: ref<Dayjs>(dayjs('2015/01/01', dateFormat)),
      value2: ref<Dayjs>(dayjs('01/01/2015', dateFormatList[0])),
      value3: ref<Dayjs>(dayjs('2015/01', monthFormat)),
      value4: ref<Dayjs[]>([dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]),
      dateFormat,
      monthFormat,
      dateFormatList,
      dayjs,
    };
  },
});
</script>
