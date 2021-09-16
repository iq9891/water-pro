import CalendarLocale from '../../vc-calendar/src/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';

const locale = {
  lang: {
    placeholder: '请选择日期',
    otherPlaceholder: {
      ADatePicker: '请选择日期',
      AMonthPicker: '请选择月份',
      AYearPicker: '请选择年份',
      week: '请选择周',
    },
    rangePlaceholder: ['开始日期', '结束日期'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// should add whitespace between char in Button
locale.lang.ok = '确 定';

// All settings at:
// https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

export default locale;
