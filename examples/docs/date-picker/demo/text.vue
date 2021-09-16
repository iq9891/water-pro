<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="time1" placeholder="Select Time" @ok="onOk">
      <span>{{ time1 ? time1.toString() : 'SelectTime' }}</span>
    </a-date-picker>
    <a-range-picker v-model:value="time2">
      <span>
        {{ time2 ? time2.toString() : '请选择' }}
      </span>
    </a-range-picker>
  </a-space>
</template>
<script lang="ts">
import { Dayjs } from 'dayjs';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const time1 = ref<Dayjs>();
    const time2 = ref<Dayjs>();

    const onOk = (value: Dayjs) => {
      console.log('onOk: ', value);
    };

    const clearTime = () => {
      time1.value = undefined;
    };

    return {
      time1,
      time2,
      onOk,
      clearTime,
    };
  },
});
</script>
