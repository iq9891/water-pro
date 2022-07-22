import { defineComponent } from 'vue';
import useConfigInject from '../../_util/hooks/useConfigInject';
import PropTypes from '../../_util/vue-types';
import Checkbox from '../../checkbox';
import BasicArrow from '../../basic-arrow';
import Typography from '../../typography';

export default defineComponent({
  inheritAttrs: false,
  props: {
    prefixCls: PropTypes.string,
    text: PropTypes.string,
    preWidth: PropTypes.number.def(160),
    showArrow: PropTypes.bool,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
  },
  emits: ['change', 'click'],
  setup(props, {emit}) {
    const { prefixCls: prefixClsNew } = useConfigInject('checkbox-cascader', props);

    const changeCheckbox = ({target}: any) => {
      emit('change', target?.checked);
    };

    const openClick = () => {
      emit('click');
    };

    return {
      prefixClsNew,
      changeCheckbox,
      openClick,
    };
  },
  render() {
    let theArrow = null;
    if (this.showArrow) {
      theArrow = <BasicArrow class={`${this.prefixClsNew}-one-arrow`} />;
    }
    return <div class={`${this.prefixClsNew}-one`} style={{width: `${this.preWidth}px`}}>
      <Checkbox checked={this.checked} indeterminate={this.indeterminate} onChange={this.changeCheckbox}></Checkbox>
      <Typography.Text
        class={`${this.prefixClsNew}-one-label`}
        style={{width: `${this.preWidth - 60}px`}}
        onClick={this.openClick}
        content={this.text}
        ellipsis={{ tooltip: this.text }}
      />
      {theArrow}
    </div>;
  },
});
