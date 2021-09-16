/** @format */

import { defineComponent } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { BasicTitle } from '../basic-title';
import { BasicArrow } from '../basic-arrow';
import useConfigInject from '../_util/hooks/useConfigInject';
import PropTypes from '../_util/vue-types';
import { getSlot } from '../_util/props-util';

export default defineComponent({
  inheritAttrs: false,
  props: {
    title: PropTypes.string,
    show: PropTypes.bool,
    expanable: PropTypes.bool,
    loading: PropTypes.bool,
    prefixCls: PropTypes.string,
  },
  emits: ['expand'],
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('container-collapse', props);
    return {
      prefixClsNew,
    };
  },
  render() {
    let titleNode: any = this.title;
    const children = getSlot(this);
    if (children.length > 0) {
      titleNode = children.slice();
    }

    let loadingNode = null;
    if (this.loading) {
      loadingNode = <LoadingOutlined />;
    }

    let actionNode = null;
    const actionChildren = getSlot(this, 'action');
    if (actionChildren.length > 0) {
      actionNode = actionChildren.slice();
    }

    let arrowNode = null;
    if (!this.loading && this.expanable) {
      arrowNode = (
        <BasicArrow top={this.show} helpMessage={this.show ? '收起' : '展开'} expand={!this.show} />
      );
    }

    return (
      <div
        class={[
          `${this.prefixClsNew}-header`,
          {
            [`${this.prefixClsNew}-header-active`]: this.show,
            [`${this.prefixClsNew}-header-only`]: !this.expanable,
          },
        ]}
        onClick={() => this.$emit('expand')}
      >
        <BasicTitle class={`${this.prefixClsNew}-header-title`} {...this.$attrs}>
          {titleNode}
        </BasicTitle>
        <div class={`${this.prefixClsNew}-action`}>
          {actionNode}
          {loadingNode}
          {arrowNode}
        </div>
      </div>
    );
  },
});
