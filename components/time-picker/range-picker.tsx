import { CSSProperties, defineComponent, inject, nextTick } from 'vue';
import moment from 'moment';
import RangeCalendar from '../vc-calendar/src/RangeCalendar';
import TimePickerPanel from '../vc-time-picker/Panel';
import VcDatePicker from '../vc-calendar/src/Picker';
import classNames from '../_util/classNames';
import shallowequal from '../_util/shallowequal';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';
import Tag from '../tag';
import { defaultConfigProvider } from '../config-provider';
import interopDefault from '../_util/interopDefault';
import { hasProp, getOptionProps, getComponent } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';
import { generateShowHourMinuteSecond, formatDate } from './utils';
import InputIcon from './InputIcon';
import { getDataAndAriaProps } from '../_util/util';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { TimeRangePickerProps } from './props';
import { isArray, isString } from '@fe6/shared';

type RangePickerValue =
  | undefined[]
  | null[]
  | [moment.Moment]
  | [undefined, moment.Moment]
  | [moment.Moment, undefined]
  | [null, moment.Moment]
  | [moment.Moment, null]
  | [moment.Moment, moment.Moment];

export type RangePickerPresetRange = RangePickerValue | (() => RangePickerValue);
function getShowDateFromValue(value: RangePickerValue, valueFormat: string) {
  const [start, end] = value;
  // value could be an empty array, then we should not reset showDate
  if (!start && !end) {
    return;
  }
  const newStart = typeof start === 'string' ? moment(start, valueFormat) : start;
  const newEnd = typeof end === 'string' ? moment(end, valueFormat) : end;
  return [newStart, newEnd] as RangePickerValue;
}

function pickerValueAdapter(
  value?: moment.Moment | RangePickerValue,
): RangePickerValue | undefined {
  if (!value) {
    return;
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value, value.clone().add(1, 'month')];
}

function isEmptyArray(arr: any) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.every(i => !i);
  }
  return false;
}

function fixLocale(value: RangePickerValue | undefined, localeCode: string | undefined) {
  if (!localeCode) {
    return;
  }
  if (!value || value.length === 0) {
    return;
  }
  const [start, end] = value;
  if (start) {
    start.locale(localeCode);
  }
  if (end) {
    end.locale(localeCode);
  }
}

function getColumns({ showHour, showMinute, showSecond, use12Hours }: any) {
  let column = 0;
  if (showHour) {
    column += 1;
  }
  if (showMinute) {
    column += 1;
  }
  if (showSecond) {
    column += 1;
  }
  if (use12Hours) {
    column += 1;
  }
  return column;
}

export interface RangePickerState {
  sValue?: RangePickerValue;
  sShowDate?: RangePickerValue;
  sOpen?: boolean;
  sHoverValue?: RangePickerValue;
}

export default defineComponent({
  name: 'ATimeRangePicker',
  mixins: [BaseMixin],
  inheritAttrs: false,
  // props: initDefaultProps(RangePickerGroupProps, {
  //   allowClear: true,
  //   showToday: false,
  // }),
  props: initDefaultProps(TimeRangePickerProps(), {
    align: {
      offset: [0, -2],
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up',
    focusOnOpen: true,
    allowClear: true,
    format: 'HH:mm:ss',
    valueFormat: 'HH:mm:ss',
    separator: '~',
  }),
  emits: [
    'update:value',
    'ok',
    'mouseleave',
    'mouseenter',
    'update:open',
    'change',
    'openChange',
    'focus',
    'blur',
    'keydown',
  ],
  setup() {
    return {
      configProvider: inject('configProvider', defaultConfigProvider),
      picker: null,
      sTagPrefixCls: undefined,
      sPrefixCls: '',
    };
  },
  data(): RangePickerState {
    const value = this.value || this.defaultValue || [];
    const pickerValue = !value || isEmptyArray(value) ? this.defaultPickerValue : value;
    return {
      sValue: value as RangePickerValue,
      sShowDate: pickerValueAdapter(pickerValue || interopDefault(moment)()),
      sOpen: this.open,
      sHoverValue: [],
    };
  },
  watch: {
    value(val) {
      const value = val || [];
      let state: RangePickerState = { sValue: value };
      if (!shallowequal(val, this.sValue)) {
        state = {
          ...state,
          sShowDate: getShowDateFromValue(value, this.valueFormat) || this.sShowDate,
        };
      }
      this.setState(state);
    },
    open(val) {
      const state = { sOpen: val };
      this.setState(state);
    },
    sOpen(val, oldVal) {
      nextTick(() => {
        if (!hasProp(this, 'open') && oldVal && !val) {
          this.focus();
        }
      });
    },
  },
  methods: {
    setValue(value: RangePickerValue, hidePanel?: boolean) {
      this.handleChange(value);
      if (hidePanel && !hasProp(this, 'open')) {
        this.setState({ sOpen: false });
      }
    },

    savePicker(node: any) {
      this.picker = node;
    },
    clearSelection(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ sValue: [] });
      this.handleChange([]);
    },

    clearHoverValue() {
      this.setState({ sHoverValue: [] });
    },

    handleChange(value: RangePickerValue) {
      if (!hasProp(this, 'value')) {
        this.setState(({ sShowDate }) => ({
          sValue: value,
          sShowDate: getShowDateFromValue(value, this.valueFormat) || sShowDate,
        }));
      }

      if (value[0] && value[1] && value[0].diff(value[1]) > 0) {
        value[1] = undefined;
      }
      const [start, end] = value;
      const formatValues = value.length
        ? [formatDate(start, this.valueFormat), formatDate(end, this.valueFormat)]
        : value;
      this.$emit('change', formatValues, value);
      this.$emit('update:value', formatValues);
    },

    handleOpenChange(open: boolean) {
      if (!hasProp(this, 'open')) {
        this.setState({ sOpen: open });
      }

      if (open === false) {
        this.clearHoverValue();
      }
      this.$emit('openChange', open);
    },

    handleShowDateChange(showDate: boolean) {
      this.setState({ sShowDate: showDate });
    },

    handleHoverChange(hoverValue: any) {
      this.setState({ sHoverValue: hoverValue });
    },

    handleRangeMouseLeave() {
      if (this.sOpen) {
        this.clearHoverValue();
      }
    },

    handleCalendarInputSelect(value: RangePickerValue) {
      const [start] = value;
      if (!start) {
        return;
      }
      this.setState(({ sShowDate }) => ({
        sValue: value,
        sShowDate: getShowDateFromValue(value, this.valueFormat) || sShowDate,
      }));
    },

    handleRangeClick(value: RangePickerPresetRange) {
      if (typeof value === 'function') {
        value = value();
      }

      this.setValue(value, true);
      this.$emit('ok', value);
      this.$emit('openChange', false);
    },

    onMouseEnter(e: MouseEvent) {
      this.$emit('mouseenter', e);
    },
    onMouseLeave(e: MouseEvent) {
      this.$emit('mouseleave', e);
    },

    focus() {
      this.picker.focus();
    },

    blur() {
      this.picker.blur();
    },

    renderFooter() {
      const { ranges, $slots } = this;
      const { sPrefixCls: prefixCls, sTagPrefixCls: tagPrefixCls } = this;
      const renderExtraFooter: any = this.renderExtraFooter || $slots.renderExtraFooter;
      if (!ranges && !renderExtraFooter) {
        return null;
      }
      const customFooter = renderExtraFooter ? (
        <div class={`${prefixCls}-footer-extra`} key="extra">
          {typeof renderExtraFooter === 'function' ? renderExtraFooter() : renderExtraFooter}
        </div>
      ) : null;
      const operations: any =
        ranges &&
        Object.keys(ranges).map(range => {
          const value: any = ranges[range];
          const hoverValue = typeof value === 'function' ? value.call(this) : value;
          return (
            <Tag
              key={range}
              prefixCls={tagPrefixCls}
              color="blue"
              onClick={() => this.handleRangeClick(value)}
              onMouseenter={() => this.setState({ sHoverValue: hoverValue })}
              onMouseleave={this.handleRangeMouseLeave}
            >
              {range}
            </Tag>
          );
        });
      const rangeNode =
        operations && operations.length > 0 ? (
          <div class={`${prefixCls}-footer-extra ${prefixCls}-range-quick-selector`} key="range">
            {operations}
          </div>
        ) : null;
      return [rangeNode, customFooter];
    },
  },

  render() {
    const props: any = { ...getOptionProps(this), ...this.$attrs };
    let suffixIcon = getComponent(this, 'suffixIcon');
    suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
    const {
      sValue: value,
      sShowDate: showDate,
      sHoverValue: hoverValue,
      sOpen: open,
      $slots,
    } = this;
    const {
      prefixCls: customizePrefixCls,
      tagPrefixCls: customizeTagPrefixCls,
      popupStyle,
      disabledDate,
      disabledTime,
      ranges,
      localeCode,
      format,
      separator,
      inputReadOnly,
      style,
      onCalendarChange,
      onOk,
      onBlur,
      onFocus,
      onPanelChange,
      inputPrefixCls: customizeInputPrefixCls,
      use12Hours,
    } = props;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('calendar', customizePrefixCls);
    const tagPrefixCls = getPrefixCls('tag', customizeTagPrefixCls);
    this.sPrefixCls = prefixCls;
    this.sTagPrefixCls = tagPrefixCls;

    const dateRender = props.dateRender || $slots.dateRender;
    fixLocale(value, localeCode);
    fixLocale(showDate, localeCode);

    const calendarClassName = classNames({
      [`${prefixCls}-time`]: true,
      [`${prefixCls}-range-with-ranges`]: ranges,
    });

    // 需要选择时间时，点击 ok 时才触发 onChange
    const pickerChangeHandler = {
      onChange: this.handleChange,
    };
    const calendarProps: any = {
      onOk: this.handleChange,
    };
    pickerChangeHandler.onChange = changedValue => this.handleChange(changedValue);

    if ('mode' in props) {
      calendarProps.mode = props.mode;
    }

    const startPlaceholder = Array.isArray(props.placeholder) ? props.placeholder[0] : '开始时间';
    const endPlaceholder = Array.isArray(props.placeholder) ? props.placeholder[1] : '结束时间';

    const vcTimePickerProps = {
      ...generateShowHourMinuteSecond(format),
      format,
      use12Hours,
    };
    const columns = getColumns(vcTimePickerProps);
    const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
    const timePickerPanelProps = {
      ...vcTimePickerProps,
      prefixCls: `${prefixCls}-time-picker`,
      placeholder: '请选择时间',
      transitionName: 'slide-up',
      class: timePickerCls,
      onEsc: () => {},
    };
    const timePicker = <TimePickerPanel {...timePickerPanelProps} />;
    const rangeCalendarProps = {
      ...calendarProps,
      separator,
      format,
      prefixCls,
      renderFooter: this.renderFooter,
      timePicker,
      showTimePickerButton: false,
      disabledDate,
      disabledTime,
      dateInputPlaceholder: [startPlaceholder, endPlaceholder],
      // locale: locale.lang,
      dateRender,
      value: false,
      hoverValue,
      showToday: false,
      inputReadOnly,
      onChange: onCalendarChange,
      onOk,
      mode: ['time', 'time'],
      onValueChange: this.handleShowDateChange,
      onHoverChange: this.handleHoverChange,
      onPanelChange,
      onInputSelect: this.handleCalendarInputSelect,
      class: calendarClassName,
    };

    const calendar = <RangeCalendar {...rangeCalendarProps} v-slots={$slots} />;

    // default width for showTime
    const pickerStyle: CSSProperties = {};
    pickerStyle.width = '210px';

    // const [startValue, endValue] = value;
    const clearIcon =
      !props.disabled && props.allowClear && value && value.length > 1 ? (
        <CloseCircleFilled class={`${prefixCls}-picker-clear`} onClick={this.clearSelection} />
      ) : null;

    const inputIcon = <InputIcon suffixIcon={suffixIcon} prefixCls={prefixCls} />;

    const pickerClass = classNames(`${prefixCls}-picker`, {
      [`${prefixCls}-picker-${this.size}`]: !!this.size,
    });
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    const pickerInputClass = classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
      [`${inputPrefixCls}-lg`]: this.size === 'large',
      [`${inputPrefixCls}-sm`]: this.size === 'small',
      [`${inputPrefixCls}-disabled`]: this.disabled,
    });

    const input = ({ value: inputValue }) => {
      const [start, end] = inputValue;
      const newStart = start && isString(start) ? moment(start, this.valueFormat) : start;
      const newEnd = end && isString(end) ? moment(end, this.valueFormat) : end;
      return (
        <span class={pickerInputClass}>
          <input
            disabled={props.disabled}
            readonly
            value={formatDate(newStart, props.format)}
            placeholder={startPlaceholder}
            class={`${prefixCls}-range-picker-input`}
            tabindex={-1}
          />
          <span class={`${prefixCls}-range-picker-separator`}> {separator} </span>
          <input
            disabled={props.disabled}
            readonly
            value={formatDate(newEnd, props.format)}
            placeholder={endPlaceholder}
            class={`${prefixCls}-range-picker-input`}
            tabindex={-1}
          />
          {clearIcon}
          {inputIcon}
        </span>
      );
    };

    const vcDatePickerProps = {
      ...props,
      ...pickerChangeHandler,
      calendar,
      value: isArray(value)
        ? value.map((vItem: any) => (isString(vItem) ? moment(vItem, this.valueFormat) : vItem))
        : [],
      open,
      prefixCls: `${prefixCls}-picker-container ${prefixCls}-picker-container-time`,
      onOpenChange: this.handleOpenChange,
      style: popupStyle,
    };

    return (
      <span class={`${prefixCls}-range-picker-box`}>
        <span
          ref={this.savePicker}
          id={props.id}
          class={classNames(props.class ? props.class : '', pickerClass)}
          style={{ ...pickerStyle, ...style }}
          tabindex={props.disabled ? -1 : 0}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseenter={this.onMouseEnter}
          onMouseleave={this.onMouseLeave}
          {...getDataAndAriaProps(props)}
        >
          <VcDatePicker
            {...vcDatePickerProps}
            v-slots={{ default: input, ...$slots }}
          ></VcDatePicker>
        </span>
      </span>
    );
  },
});
