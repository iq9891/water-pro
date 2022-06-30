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
      multipleMaxTagCount: 4,
      multipleTagGroupPopoverClass: 'test1',
      disabledDate: (current: Moment) => {
        return current && current < moment().endOf('day');
      },
    },
    label: '多选日期',
  },
  {
    field: 'mortmonth',
    component: 'MonthPicker',
    componentProps: {
      type: 'multiple',
      multipleMaxTagCount: 2,
      valueFormat: 'YYYY-MM',
    },
    label: '多选月份',
  },
  {
    field: 'mortyear',
    component: 'YearPicker',
    componentProps: {
      type: 'multiple',
      valueFormat: 'YYYY',
    },
    label: '多选年份',
  },
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
      showTime: true,
      timeRounding: true,
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
        mortdate: [moment().subtract(3, 'd')],
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
