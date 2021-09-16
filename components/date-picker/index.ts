import { App, DefineComponent, Plugin } from 'vue';
import VcCalendar from '../vc-calendar';
import MonthCalendar from '../vc-calendar/src/MonthCalendar';
import YearCalendar from '../vc-calendar/src/YearCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
import {
  DatePickerProps,
  MonthPickerProps,
  YearPickerProps,
  WeekPickerProps,
  RangePickerProps,
  RangePickerGroupProps,
} from './props';
import {
  DatePickerPropsTypes,
  RangePickerPropsTypes,
  RangePickerGroupPropsTypes,
  MonthPickerPropsTypes,
  YearPickerPropsTypes,
  WeekPickerPropsTypes,
} from './interface';

const WrappedRangePicker = (wrapPicker(
  RangePicker as any,
  RangePickerProps,
  'date',
) as unknown) as DefineComponent<RangePickerPropsTypes>;

const WrappedRangePickerGroup = (wrapPicker(
  RangePicker as any,
  RangePickerGroupProps,
  'date',
) as unknown) as DefineComponent<RangePickerGroupPropsTypes>;

const WrappedWeekPicker = (wrapPicker(
  WeekPicker as any,
  WeekPickerProps,
  'week',
) as unknown) as DefineComponent<WeekPickerPropsTypes>;

const DatePicker = (wrapPicker(
  createPicker(VcCalendar as any, DatePickerProps, 'ADatePicker'),
  DatePickerProps,
  'date',
) as unknown) as DefineComponent<DatePickerPropsTypes> & {
  readonly RangePicker: typeof WrappedRangePicker;
  readonly MonthPicker: typeof MonthPicker;
  readonly WeekPicker: typeof WrappedWeekPicker;
};

const MonthPicker = (wrapPicker(
  createPicker(MonthCalendar as any, MonthPickerProps, 'AMonthPicker'),
  MonthPickerProps,
  'month',
) as unknown) as DefineComponent<MonthPickerPropsTypes>;

const YearPicker = (wrapPicker(
  createPicker(YearCalendar as any, YearPickerProps, 'AYearPicker'),
  YearPickerProps,
  'year',
) as unknown) as DefineComponent<YearPickerPropsTypes>;

Object.assign(DatePicker, {
  RangePicker: WrappedRangePicker,
  RangePickerGroup: WrappedRangePickerGroup,
  MonthPicker,
  YearPicker,
  WeekPicker: WrappedWeekPicker,
});

/* istanbul ignore next */
DatePicker.install = function(app: App) {
  app.component(DatePicker.name, DatePicker);
  app.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
  app.component('ARangePickerGroup', DatePicker.RangePickerGroup);
  app.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);
  app.component(DatePicker.YearPicker.name, DatePicker.YearPicker);
  app.component(DatePicker.WeekPicker.name, DatePicker.WeekPicker);
  return app;
};

export default DatePicker as typeof DatePicker & Plugin;
