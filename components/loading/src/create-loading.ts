/** @format */

import type { LoadingProps } from './types';

import { VNode, defineComponent, createVNode, render, reactive, h } from 'vue';

import Loading from './loading';

export function createLoading(props?: Partial<LoadingProps>, target?: HTMLElement) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    tip: '',
    loading: true,
    ...props,
  });

  const LoadingWrap = defineComponent({
    setup() {
      return () => {
        return h(Loading, { ...data });
      };
    },
  });

  vm = createVNode(LoadingWrap);

  render(vm, document.createElement('div'));

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
    document.body.style.overflow = '';
  }

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    target.appendChild(vm.el as HTMLElement);
    document.body.style.overflow = 'hidden';
  }

  if (target) {
    open(target);
  }
  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip;
    },
    setLoading: (loading: boolean) => {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}
