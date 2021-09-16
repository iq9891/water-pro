<template>
  <a-form-pro @register="fieldMapToTimeForm" @submit="fieldMapToTimeSubmit" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { FormSchema, useForm } from '@fe6/water-pro';

const schemas: FormSchema[] =[
  {
    field: 'date',
    component: 'DatePicker',
    label: '日期',
  },
  {
    field: 'month',
    component: 'MonthPicker',
    label: '月份',
  },
  {
    field: 'year',
    component: 'YearPicker',
    label: '年份',
  },
  {
    field: 'week',
    component: 'WeekPicker',
    label: '周',
  },
  {
    field: 'time',
    component: 'TimePicker',
    label: '时间',
  },
  {
    field: 'rangeDate',
    component: 'RangePicker',
    label: '日期区间',
  },
  {
    field: 'rangeDateTime',
    component: 'RangePicker',
    label: '日期时间区间',
    componentProps: {
      showTime: true,
    }
  },
  {
    field: 'rangeGroupPicker',
    component: 'RangeGroupPicker',
    label: '日期区间快捷',
    componentProps: {
      showTodayButton: true,
      showYesterdayButton: true,
      showSevenDaysButton: true,
      showThirtyDaysButton: true,
    }
  },
  {
    field: 'rangeTime',
    component: 'TimeRangePicker',
    label: '时间区间',
  },
];

export default defineComponent({
  setup() {
    const [fieldMapToTimeForm] = useForm({
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
    return {
      fieldMapToTimeForm,
      fieldMapToTimeSubmit,
    };
  },
});
</script>
