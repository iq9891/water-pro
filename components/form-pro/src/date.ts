/** @format */

import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export function formatToDateTime(date: any = null, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
