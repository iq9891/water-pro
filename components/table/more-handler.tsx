import { defineComponent, ref } from 'vue';
import Affix from '../affix';
import useConfigInject from '../_util/hooks/useConfigInject';
import { getSlot } from '../_util/props-util';
import { MoreHandlerProps } from './interface';

export default defineComponent({
  name: 'AMoreHandler',
  inheritAttrs: false,
  props: MoreHandlerProps,
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro', props);
    return {
      prefixClsNew,
      isAffix: ref(false),
    };
  },
  methods: {
    affixChange(affixStatus: boolean) {
      this.isAffix = affixStatus;
    },
  },
  render() {
    // fix 去掉悬浮，房型有问题
    return (
      <div class={`${this.prefixClsNew}-more-box`}>
        <Affix
          target={this.target}
          offset-bottom={0}
          style="width: 100%;"
          onChange={this.affixChange}
        >
          <div class={`${this.prefixClsNew}-more-box-affix`}>
            <div class={`${this.prefixClsNew}-more`}>
              <div class={`${this.prefixClsNew}-more-message`}>
                已选择
                <span class={`${this.prefixClsNew}-more-number`}>{this.selectKey.length}</span>条
              </div>
              <div class={`${this.prefixClsNew}-more-handler`}>{getSlot(this, 'moreHandler')}</div>
            </div>
          </div>
        </Affix>
      </div>
    );
  },
});
