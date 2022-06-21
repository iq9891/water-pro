<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="valueDate" type="multiple" />
    <a-month-picker v-model:value="valueMonth" type="multiple" multipleTagGroupPopoverClass="monthmore" />
    <a-year-picker v-model:value="valueYear" type="multiple" multipleTagGroupPopoverClass="yearmore" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment, { Moment } from 'moment';
export default defineComponent({
  setup() {
    return {
      valueYear: ref<Moment[]>([moment(), moment('2021-01-10'), moment('2012-01-11')]),
      valueMonth: ref<Moment[]>([moment(), moment('2021-01-10'), moment('2012-01-11')]),
      valueDate: ref<Moment[]>([moment(), moment('2021-01-10'), moment('2012-01-11')]),
    };
  },
});
</script>

<style lang="less">
.yearmore {
  width: 129px;
}
.monthmore {
  width: 167px;
}
</style>
