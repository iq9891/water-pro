import { provide, inject, nextTick, defineComponent } from 'vue';
import classNames from '../_util/classNames';
import PropTypes from '../_util/vue-types';
import Radio from './Radio';
import ARadioButton from './RadioButton';
import { getOptionProps, filterEmpty, hasProp, getSlot } from '../_util/props-util';
import { defaultConfigProvider } from '../config-provider';
import { tuple } from '../_util/type';
import { RadioChangeEvent } from './interface';

export default defineComponent({
  name: 'ARadioGroup',
  props: {
    prefixCls: PropTypes.string,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    size: PropTypes.oneOf(tuple('large', 'default', 'small')).def('default'),
    options: PropTypes.array,
    disabled: PropTypes.looseBool,
    name: PropTypes.string,
    buttonStyle: PropTypes.string.def('outline'),
    onChange: PropTypes.func,
    type: PropTypes.oneOf(tuple('button', 'default')).def('default'),
  },
  emits: ['update:value', 'change'],
  setup() {
    return {
      updatingValue: false,
      configProvider: inject('configProvider', defaultConfigProvider),
      radioGroupContext: null,
    };
  },
  data() {
    const { value, defaultValue } = this;
    return {
      stateValue: value === undefined ? defaultValue : value,
    };
  },
  watch: {
    value(val) {
      this.updatingValue = false;
      this.stateValue = val;
    },
  },
  // computed: {
  //   radioOptions() {
  //     const { disabled } = this;
  //     return this.options.map(option => {
  //       return typeof option === 'string'
  //         ? { label: option, value: option }
  //         : { ...option, disabled: option.disabled === undefined ? disabled : option.disabled };
  //     });
  //   },
  // },
  created() {
    this.radioGroupContext = provide('radioGroupContext', this);
  },
  methods: {
    onRadioChange(ev: RadioChangeEvent) {
      const lastValue = this.stateValue;
      const { value } = ev.target;
      if (!hasProp(this, 'value')) {
        this.stateValue = value;
      }
      // nextTick for https://github.com/vueComponent/ant-design-vue/issues/1280
      if (!this.updatingValue && value !== lastValue) {
        this.updatingValue = true;
        this.$emit('update:value', value);
        this.$emit('change', ev);
      }
      nextTick(() => {
        this.updatingValue = false;
      });
    },
  },
  render() {
    const props = getOptionProps(this);
    const { prefixCls: customizePrefixCls, options, type, buttonStyle } = props;
    const { getPrefixCls } = this.configProvider;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);

    const groupPrefixCls = `${prefixCls}-group`;
    const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
      [`${groupPrefixCls}-${props.size}`]: props.size,
    });

    let children = filterEmpty(getSlot(this));

    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      children = options.map(option => {
        if (typeof option === 'string') {
          let strRadioNode = null;

          if (type === 'default') {
            strRadioNode = (
              <Radio
                key={option}
                prefixCls={prefixCls}
                disabled={props.disabled}
                value={option}
                checked={this.stateValue === option}
              >
                {option}
              </Radio>
            );
          } else {
            strRadioNode = (
              <ARadioButton
                key={option}
                disabled={props.disabled}
                value={option}
                checked={this.stateValue === option}
              >
                {option}
              </ARadioButton>
            );
          }

          return strRadioNode;
        }

        let objRadioNode = null;

        if (type === 'default') {
          objRadioNode = (
            <Radio
              key={`radio-group-value-options-${option.value}`}
              prefixCls={prefixCls}
              disabled={option.disabled || props.disabled}
              value={option.value}
              checked={this.stateValue === option.value}
            >
              {option.label}
            </Radio>
          );
        } else {
          objRadioNode = (
            <ARadioButton
              key={`radio-group-value-options-${option.value}`}
              disabled={option.disabled || props.disabled}
              value={option.value}
              checked={this.stateValue === option.value}
            >
              {option.label}
            </ARadioButton>
          );
        }

        return objRadioNode;
      });
    }

    return <div class={classString}>{children}</div>;
  },
});
