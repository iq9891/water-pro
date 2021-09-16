import { computed, CSSProperties, PropType } from 'vue';

import { defineComponent } from 'vue';

import { default as Spin } from '../../spin';
import useConfigInject from '../../_util/hooks/useConfigInject';
import PropTypes from '../../_util/vue-types';

import { SizeEnum } from './size';

export default defineComponent({
  name: 'ALoading',
  components: { Spin },
  props: {
    tip: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (v: SizeEnum): boolean => {
        return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
      },
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    background: {
      type: String as PropType<string>,
    },
    prefixCls: PropTypes.string,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('loading', props);
    const getStyle = computed((): CSSProperties => {
      const { background } = props;
      const bgColor = background ? background : 'rgba(240, 242, 245, 0.6)';
      return { background: bgColor };
    });

    return { getStyle, prefixClsNew };
  },
  render() {
    const loadingStyle = {
      ...this.getStyle,
      display: 'none',
    };

    if (this.loading) {
      loadingStyle.display = 'block';
    }

    return (
      <section
        class={[`${this.prefixClsNew}`, { [`${this.prefixClsNew}-absolute`]: this.absolute }]}
        style={loadingStyle}
      >
        <Spin
          {...this.$attrs}
          tip={this.tip}
          size={this.size}
          spinning={this.loading}
          class={`${this.prefixClsNew}-spin`}
        />
      </section>
    );
  },
});
