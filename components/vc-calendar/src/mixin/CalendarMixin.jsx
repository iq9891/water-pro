import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { hasProp } from '../../../_util/props-util';
import moment from 'moment';
import { isAllowedDate, getTodayTime } from '../util/index';
function noop() {}

export function getNowByCurrentStateValue(value) {
  let ret;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = moment();
  }
  return ret;
}
function isMoment(value) {
  if (Array.isArray(value)) {
    return (
      value.length === 0 || value.findIndex(val => val === undefined || moment.isMoment(val)) !== -1
    );
  } else {
    return value === undefined || moment.isMoment(value);
  }
}
const MomentType = PropTypes.custom(isMoment);
const CalendarMixin = {
  mixins: [BaseMixin],
  inheritAttrs: false,
  name: 'CalendarMixinWrapper',
  props: {
    value: MomentType,
    defaultValue: MomentType,
  },

  data() {
    if (this.onKeyDown === undefined) {
      this.onKeyDown = noop;
    }
    if (this.onBlur === undefined) {
      this.onBlur = noop;
    }
    const props = this.$props;
    const sValue = props.value || props.defaultValue || getNowByCurrentStateValue();
    return {
      sValue,
      sSelectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  },
  watch: {
    value(val) {
      const sValue = val || this.defaultValue || getNowByCurrentStateValue(this.sValue);
      this.setState({
        sValue,
      });
    },
    selectedValue(val) {
      this.setState({
        sSelectedValue: val,
      });
    },
  },
  methods: {
    onSelect(value, cause) {
      if (value) {
        this.setValue(value);
      }
      this.setSelectedValue(value, cause);
    },

    renderRoot(newProps) {
      const props = { ...this.$props, ...this.$attrs };
      const prefixCls = props.prefixCls;

      const className = {
        [prefixCls]: 1,
        [`${prefixCls}-hidden`]: !props.visible,
        [props.class]: !!props.class,
        [newProps.class]: !!newProps.class,
      };
      return (
        <div
          ref={this.saveRoot}
          class={className}
          tabindex="0"
          onKeydown={this.onKeyDown || noop}
          onBlur={this.onBlur || noop}
        >
          {newProps.children}
        </div>
      );
    },

    setSelectedValue(selectedValue, cause) {
      // if (this.isAllowedDate(selectedValue)) {
      if (!hasProp(this, 'selectedValue')) {
        this.setState({
          sSelectedValue: selectedValue,
        });
      }
      this.__emit('select', selectedValue, cause);
      // }
    },

    setValue(value) {
      const originalValue = this.sValue;
      if (!hasProp(this, 'value')) {
        this.setState({
          sValue: value,
        });
      }
      const theOne = this.type !== 'multiple' && ((originalValue && value && !originalValue.isSame(value)) ||
      (!originalValue && value) ||
      (originalValue && !value));
      const theMore = this.type === 'multiple' && originalValue && originalValue.length > 0 && originalValue.every((oneValue)=>!oneValue.isSame(value));
      if (theMore || theOne) {
        this.__emit('change', value);
      }
    },

    isAllowedDate(value) {
      const disabledDate = this.disabledDate;
      const disabledTime = this.disabledTime;
      return isAllowedDate(value, disabledDate, disabledTime);
    },
  },
};

export default CalendarMixin;
