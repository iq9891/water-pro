import DateConstants from './DateConstants';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);

const DateTHead = (_, { attrs }) => {
  const value = attrs.value;
  const localeData = value.localeData();
  const prefixCls = attrs.prefixCls;
  const veryShortWeekdays = [];
  const weekDays = [];
  const firstDayOfWeek = localeData.firstDayOfWeek() + 1;
  let showWeekNumberEl;
  const now = dayjs();
  for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
    const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
    now.day(index);
    veryShortWeekdays[dateColIndex] = localeData.weekdaysMin()[dateColIndex];
    weekDays[dateColIndex] = localeData.weekdaysShort()[dateColIndex];
  }

  if (attrs.showWeekNumber) {
    showWeekNumberEl = (
      <th role="columnheader" class={`${prefixCls}-column-header ${prefixCls}-week-number-header`}>
        <span class={`${prefixCls}-column-header-inner`}>x</span>
      </th>
    );
  }
  const weekDaysEls = weekDays.map((day, xindex) => {
    return (
      <th key={xindex} role="columnheader" title={day} class={`${prefixCls}-column-header`}>
        <span class={`${prefixCls}-column-header-inner`}>{veryShortWeekdays[xindex]}</span>
      </th>
    );
  });
  return (
    <thead>
      <tr role="row">
        {showWeekNumberEl}
        {weekDaysEls}
      </tr>
    </thead>
  );
};

DateTHead.inheritAttrs = false;

export default DateTHead;
