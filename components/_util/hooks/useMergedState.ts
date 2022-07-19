import { hasOwn } from '@fe6/shared';
import type { Ref, UnwrapRef } from 'vue';
import { toRaw, watchEffect, unref, watch, ref } from 'vue';

export default function useMergedState<T, R = Ref<T>>(
  defaultStateValue: T | (() => T),
  option?: {
    defaultValue?: T | (() => T);
    value?: Ref<T> | Ref<UnwrapRef<T>>;
    onChange?: (val: T, prevValue: T | T[]) => void;
    postState?: (val: T) => T;
    isMultiple?: Ref<boolean>;
  },
): [R, (val: T) => void] {
  const { defaultValue, value = ref() } = option || {};
  const isMultiple = hasOwn(option, 'isMultiple') ? option.isMultiple.value : false;
  let initValue: T =
    typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue;
  if (value.value !== undefined) {
    initValue = unref(value as any) as T;
  }
  if (defaultValue !== undefined) {
    initValue = typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
  }

  const innerValue = ref(initValue) as Ref<T | T[]>;
  const mergedValue = ref(initValue) as Ref<T | T[]>;
  watchEffect(() => {
    let val = value.value !== undefined ? value.value : innerValue.value;
    if (option.postState) {
      val = option.postState(val as T);
    }
    mergedValue.value = val as T;
  });

  function triggerChange(newValue: T) {
    const preVal = mergedValue.value;
    innerValue.value = isMultiple && !Array.isArray(newValue) ? [newValue] : newValue;
    if (toRaw(mergedValue.value) !== newValue && option.onChange) {
      option.onChange(newValue, preVal);
    }
  }

  // Effect of reset value to `undefined`
  watch(value, () => {
    innerValue.value = value.value as T;
  });

  return [mergedValue as unknown as R, triggerChange];
}
