/** @format */

import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDate(date: any = null, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
