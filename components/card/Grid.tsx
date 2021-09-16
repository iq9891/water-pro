import { defineComponent, inject } from 'vue';
import PropTypes from '../_util/vue-types';
import { defaultConfigProvider } from '../config-provider';
import { getSlot } from '../_util/props-util';
import { tuple } from '../_util/type';

export default defineComponent({
  name: 'ACardGrid',
  __ANT_CARD_GRID: true,
  props: {
    prefixCls: PropTypes.string,
    hoverable: PropTypes.looseBool,
    theme: PropTypes.oneOf(tuple('default', 'gray')),
  },
  setup() {
    return {
      configProvider: inject('configProvider', defaultConfigProvider),
    };
  },
  render() {
    const { prefixCls: customizePrefixCls, theme, hoverable = true } = this.$props;

    const { getPrefixCls } = this.configProvider;
    const prefixCls = getPrefixCls('card', customizePrefixCls);

    const classString = {
      [`${prefixCls}-grid`]: true,
      [`${prefixCls}-grid-hoverable`]: hoverable,
      [`${prefixCls}-grid-${theme}`]: theme && theme !== 'default',
    };
    return <div class={classString}>{getSlot(this)}</div>;
  },
});
