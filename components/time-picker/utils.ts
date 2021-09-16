import moment from 'moment';

type Value = moment.Moment | undefined | null;
type Format = string | string[] | undefined | ((val?: Value) => string | string[] | undefined);
export function formatDate(value: Value, format: Format) {
  if (!value) {
    return '';
  }
  if (Array.isArray(format)) {
    format = format[0];
  }
  if (typeof format === 'function') {
    return format(value);
  }
  return value.format(format);
}

export function generateShowHourMinuteSecond(format: string) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1,
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1,
  };
}
