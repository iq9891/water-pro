<template>
  <a-form-pro @register="fieldMapToTimeForm" @submit="fieldMapToTimeSubmit" />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import moment, { Moment } from 'moment';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] =[
  {
    field: 'mortdate',
    component: 'DatePicker',
    componentProps: {
      type: 'multiple',
      valueFormat: 'YYYY-MM-DD',
      format: 'YYYY年MM月DD日',
      multipleMaxTagTextLength: 15,
      // multipleMaxTagCount: 4,
      multipleTagGroupPopoverClass: 'test1',
      disabledDate: (current: Moment) => {
        return current && current < moment().endOf('day');
      },
    },
    label: '多选日期',
  },
];

export default defineComponent({
  setup() {
    const [fieldMapToTimeForm, {setFieldsValue}] = useForm({
      schemas,
      labelWidth: 140,
      fieldMapToTime: [
        [
          'rangeDate',
          ['startDate', 'endDate'],
        ],
        [
          'rangeTime',
          ['timeStartDate', 'timeEndDate'],
        ],
      ],
    });

    const fieldMapToTimeSubmit = async (ressss) => {
      console.log(ressss, 'ctfieldMapToTimeParams');
    };

    onMounted(() => {
      setFieldsValue({
        mortdate: [moment().subtract(3, 'd'), moment().add(3, 'd')],
        mortmonth: [moment().subtract(3, 'd')],
      })
    })

    return {
      fieldMapToTimeForm,
      fieldMapToTimeSubmit,
    };
  },
});
</script>

<style lang="less">
.test1 {
  width: 256px;
}
</style>
