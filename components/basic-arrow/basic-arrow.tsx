/** @format */

import { defineComponent, computed } from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';

import useConfigInject from '../_util/hooks/useConfigInject';
import PropTypes from '../_util/vue-types';

export default defineComponent({
  name: 'ABasicArrow',
  components: { RightOutlined },
  props: {
    // Expand contract, expand by default
    expand: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    inset: PropTypes.bool,
    prefixCls: PropTypes.string,
    helpMessage: PropTypes.string,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('basic-arrow', props);

    const getClass = computed(() => {
      const { expand, top, bottom, inset } = props;
      return [
        prefixClsNew.value,
        {
          [`${prefixClsNew.value}-active`]: expand,
          [`${prefixClsNew.value}-top`]: top,
          [`${prefixClsNew.value}-inset`]: inset,
          [`${prefixClsNew.value}-bottom`]: bottom,
        },
      ];
    });

    return {
      getClass,
    };
  },
  render() {
    const innerNode = (
      <span class={this.getClass}>
        <RightOutlined />
      </span>
    );
    let contentNode = null;

    if (this.helpMessage) {
      contentNode = <a-tooltip title={this.helpMessage}>{innerNode}</a-tooltip>;
    } else {
      contentNode = innerNode;
    }
    return contentNode;
  },
});
