import omit from 'omit.js';
import { defineComponent, inject, provide, App, Plugin } from 'vue';
import VcTimePicker from '../vc-time-picker';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import BaseMixin from '../_util/BaseMixin';
import warning from '../_util/warning';
import ClockCircleOutlined from '@ant-design/icons-vue/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';
import zhCn from './locale/zh_CN';
import { hasProp, getOptionProps, getComponent, isValidElement } from '../_util/props-util';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import { cloneElement } from '../_util/vnode';
import { defaultConfigProvider } from '../config-provider';
import { checkValidate, stringToMoment, momentToString } from '../_util/moment-util';
import { TimePickerProps } from './props';
import TimeRangePicker from './range-picker';
import { generateShowHourMinuteSecond } from './utils';

const TimePicker = defineComponent({
  name: 'ATimePicker',
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: initDefaultProps(TimePickerProps(), {
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
  }),
  emits: ['update:value', 'update:open', 'change', 'openChange', 'focus', 'blur', 'keydown'],
  setup() {
    return {
      popupRef: null,
      timePickerRef: null,
      configProvider: inject('configProvider', defaultConfigProvider),
    };
  },

  data() {
    const { value, defaultValue, valueFormat } = this;

    checkValidate('TimePicker', defaultValue, 'defaultValue', valueFormat);
    checkValidate('TimePicker', value, 'value', valueFormat);
    warning(
      !hasProp(this, 'allowEmpty'),
      'TimePicker',
      '`allowEmpty` is deprecated. Please use `allowClear` instead.',
    );
    return {
      sValue: stringToMoment(value || defaultValue, valueFormat),
    };
  },
  watch: {
    value(val) {
      checkValidate('TimePicker', val, 'value', this.valueFormat);
      this.setState({ sValue: stringToMoment(val, this.valueFormat) });
    },
  },
  created() {
    provide('savePopupRef', this.savePopupRef);
  },
  methods: {
    getDefaultFormat() {
      const { format, use12Hours } = this;
      if (format) {
        return format;
      } else if (use12Hours) {
        return 'h:mm:ss a';
      }
      return 'HH:mm:ss';
    },

    getAllowClear() {
      const { allowClear, allowEmpty } = this.$props;
      if (hasProp(this, 'allowClear')) {
        return allowClear;
      }
      return allowEmpty;
    },
    getDefaultLocale() {
      const defaultLocale = {
        ...zhCn,
        ...this.$props.locale,
      };
      return defaultLocale;
    },
    savePopupRef(ref) {
      this.popupRef = ref;
    },
    saveTimePicker(timePickerRef) {
      this.timePickerRef = timePickerRef;
    },
    handleChange(value) {
      if (!hasProp(this, 'value')) {
        this.setState({ sValue: value });
      }
      const { format = 'HH:mm:ss' } = this;
      const val = this.valueFormat ? momentToString(value, this.valueFormat) : value;
      this.$emit('update:value', val);
      this.$emit('change', val, (value && value.format(format)) || '');
    },

    handleOpenClose({ open }) {
      this.$emit('update:open', open);
      this.$emit('openChange', open);
    },

    focus() {
      (this.timePickerRef as any).focus();
    },

    blur() {
      (this.timePickerRef as any).blur();
    },

    renderInputIcon(prefixCls: string) {
      let suffixIcon = getComponent(this, 'suffixIcon');
      suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
      const clockIcon = (suffixIcon &&
        isValidElement(suffixIcon) &&
        cloneElement(suffixIcon, {
          class: `${prefixCls}-clock-icon`,
        })) || <ClockCircleOutlined class={`${prefixCls}-clock-icon`} />;

      return <span class={`${prefixCls}-icon`}>{clockIcon}</span>;
    },

    renderClearIcon(prefixCls: string) {
      const clearIcon = getComponent(this, 'clearIcon');
      const clearIconPrefixCls = `${prefixCls}-clear`;

      if (clearIcon && isValidElement(clearIcon)) {
        return cloneElement(clearIcon, {
          class: clearIconPrefixCls,
        });
      }

      return <CloseCircleFilled class={clearIconPrefixCls} />;
    },

    renderTimePicker(locale) {
      let props = getOptionProps(this);
      props = omit(props, ['defaultValue', 'suffixIcon', 'allowEmpty', 'allowClear']);
      const { class: className } = this.$attrs;
      const { prefixCls: customizePrefixCls, getPopupContainer, placeholder, size } = props;
      const getPrefixCls = this.configProvider.getPrefixCls;
      const prefixCls = getPrefixCls('time-picker', customizePrefixCls);

      const format = this.getDefaultFormat();
      const pickerClassName = {
        [className as string]: className,
        [`${prefixCls}-${size}`]: !!size,
      };
      const tempAddon = getComponent(this, 'addon', {}, false);
      const pickerAddon = panel => {
        return tempAddon ? (
          <div class={`${prefixCls}-panel-addon`}>
            {typeof tempAddon === 'function' ? tempAddon(panel) : tempAddon}
          </div>
        ) : null;
      };
      const inputIcon = this.renderInputIcon(prefixCls);
      const clearIcon = this.renderClearIcon(prefixCls);
      const { getPopupContainer: getContextPopupContainer } = this.configProvider;
      const timeProps = {
        ...generateShowHourMinuteSecond(format),
        ...props,
        ...this.$attrs,
        allowEmpty: this.getAllowClear(),
        prefixCls,
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        format,
        value: this.sValue,
        placeholder: placeholder === undefined ? locale.placeholder : placeholder,
        addon: pickerAddon,
        inputIcon,
        clearIcon,
        class: pickerClassName,
        ref: this.saveTimePicker,
        onChange: this.handleChange,
        onOpen: this.handleOpenClose,
        onClose: this.handleOpenClose,
      };
      return <VcTimePicker {...timeProps} />;
    },
  },

  render() {
    return (
      <LocaleReceiver
        componentName="TimePicker"
        defaultLocale={this.getDefaultLocale()}
        children={this.renderTimePicker}
      />
    );
  },
});

Object.assign(TimePicker, {
  RangePicker: TimeRangePicker,
});

/* istanbul ignore next */
TimePicker.install = function(app: App) {
  app.component(TimePicker.name, TimePicker);
  app.component(TimeRangePicker.name, TimeRangePicker);
  return app;
};

export default TimePicker as typeof TimePicker & Plugin;
