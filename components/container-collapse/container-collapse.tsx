/** @format */

import type { PropType } from 'vue';

import { defineComponent } from 'vue';

// component
import Skeleton from '../skeleton';
import { CollapseTransition } from '../transition';
import ContainerLazy from '../container-lazy/container-lazy';
import useConfigInject from '../_util/hooks/useConfigInject';
import { getSlot, getOptionProps } from '../_util/props-util';
import { triggerWindowResize } from '../_util/dom';
// hook
import { useTimeoutFn } from '../_util/hooks/use-timeout';
import PropTypes from '../_util/vue-types';

import CollapseHeader from './collapse-header';

export default defineComponent({
  name: 'AContainerCollapse',
  props: {
    title: PropTypes.string.def(''),
    // Can it be expanded
    expanable: PropTypes.bool.def(true),
    // Warm reminder on the right side of the title
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    value: PropTypes.bool,
    // Whether to trigger window.resize when expanding and contracting,
    // Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
    triggerWindowResize: PropTypes.bool,
    loading: PropTypes.bool,
    // Delayed loading
    lazy: PropTypes.bool,
    // Delayed loading time
    lazyTime: PropTypes.number.def(0),
    titleLevel: PropTypes.number.def(5),
    prefixCls: PropTypes.string,
  },
  emits: ['expand'],
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('container-collapse', props);
    return {
      prefixClsNew,
    };
  },
  data() {
    return {
      show: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.show = newValue;
    },
  },
  methods: {
    handleExpand() {
      if (!this.lazy) {
        this.show = !this.show;
      }
      if (this.triggerWindowResize) {
        // 200 milliseconds here is because the expansion has animation,
        useTimeoutFn(triggerWindowResize, 200);
      }
      this.$emit('expand', this.lazy ? !this.show : this.show);
    }
  },
  render() {
    const defChildren = getSlot(this);
    const titleChildren = getSlot(this, 'title');
    const skeletonChildren = getSlot(this, 'skeleton');
    const props = getOptionProps(this);

    const collapseHeaderNode = (<CollapseHeader
      {...this.$attrs}
      {...props}
      prefix-cls={this.prefixClsNew}
      show={this.show}
      loading={this.loading}
      onExpand={this.handleExpand}
      level={this.titleLevel}
      v-slots={{
        action: () => getSlot(this, 'action')
      }}
    >
      {titleChildren}
    </CollapseHeader>)

    let lazyNode = null;
    if (this.lazy) {
      lazyNode = (<ContainerLazy timeout={this.lazyTime}>
        {defChildren}
        {skeletonChildren}
      </ContainerLazy>)
    } else {
      lazyNode = defChildren;
    }

    let childrenNode = null;
    if (this.loading) {
      childrenNode = (<Skeleton />);
    } else {
      childrenNode = (<div style={`display: ${this.show ? 'block' : 'none'}`} class={`${this.prefixClsNew}-body`}>
        {lazyNode}
      </div>)
    }

    const collapseTransitionNode = (<CollapseTransition enable={this.expanable}>
      {childrenNode}
    </CollapseTransition>);

    return (
      <div class={[this.prefixClsNew]}>
        {collapseHeaderNode}
        {collapseTransitionNode}
      </div>
    )
  },
});
