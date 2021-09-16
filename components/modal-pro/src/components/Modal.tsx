/** @format */

import { defineComponent, toRefs, computed } from 'vue';
import Modal from '../../../modal';
import { basicProps } from '../props';
import { ModalProps } from '../types';
import { useModalDragMove } from '../hooks/use-modal-drag';

export default defineComponent({
  name: 'AModalProBase',
  inheritAttrs: false,
  props: basicProps,
  setup(props) {
    const { visible, draggable, destroyOnClose } = toRefs(props);

    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    });

    const getProps = computed((): ModalProps => {
      return { ...props } as ModalProps;
    });

    return {
      getProps,
    };
  },
  render() {
    return <Modal {...this.getProps} v-slots={this.$slots}></Modal>;
  },
});
