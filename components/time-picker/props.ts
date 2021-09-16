import PropTypes from '../_util/vue-types';
import { tuple } from '../_util/type';
import { TimeOrTimesType } from '../_util/moment-util';

export const TimePickerBaseProps = () => ({
  size: PropTypes.oneOf(tuple('large', 'default', 'small')),
  defaultValue: TimeOrTimesType,
  separator: PropTypes.any,
  open: PropTypes.looseBool,
  format: PropTypes.string,
  disabled: PropTypes.looseBool,
  inputPrefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  prefixCls: PropTypes.string,
  hideDisabledOptions: PropTypes.looseBool,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  getPopupContainer: PropTypes.func,
  use12Hours: PropTypes.looseBool,
  focusOnOpen: PropTypes.looseBool,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  allowEmpty: PropTypes.looseBool,
  allowClear: PropTypes.looseBool,
  inputReadOnly: PropTypes.looseBool,
  clearText: PropTypes.string,
  defaultOpenValue: PropTypes.object,
  popupClassName: PropTypes.string,
  popupStyle: PropTypes.style,
  suffixIcon: PropTypes.any,
  align: PropTypes.object,
  placement: PropTypes.any,
  transitionName: PropTypes.string,
  autofocus: PropTypes.looseBool,
  addon: PropTypes.any,
  clearIcon: PropTypes.any,
  locale: PropTypes.object,
  valueFormat: PropTypes.string,
  onChange: PropTypes.func,
  onAmPmChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeydown: PropTypes.func,
  onOpenChange: PropTypes.func,
});

export const TimePickerProps = () => ({
  value: TimeOrTimesType,
  ...TimePickerBaseProps(),
});

export const TimeRangePickerProps = () => ({
  value: PropTypes.array,
  ...TimePickerBaseProps(),
});
