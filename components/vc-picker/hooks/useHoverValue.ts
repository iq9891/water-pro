import raf from '../../_util/raf';
import type { ComputedRef, Ref, UnwrapRef } from 'vue';
import { ref, onBeforeUnmount, watch } from 'vue';
import type { ValueTextConfig } from './useValueTexts';
import useValueTexts from './useValueTexts';

export default function useHoverValue<DateType>(
  valueText: Ref<string>,
  { formatList, generateConfig, locale, type }: ValueTextConfig<DateType>,
): [ComputedRef<string>, (date: DateType) => void, (immediately?: boolean) => void] {
  const isMultiple = type && type.value === 'multiple';
  const innerValue = ref<DateType | DateType[]>(isMultiple ? [] : null);
  let rafId: number;

  function setValue(val: DateType, immediately = false) {
    raf.cancel(rafId);
    if (immediately && !isMultiple) {
      innerValue.value = val as UnwrapRef<DateType>;
      return;
    }
    rafId = raf(() => {
      if (!isMultiple) {
        innerValue.value = val as UnwrapRef<DateType>;
      }
    });
  }

  const [, firstText] = useValueTexts(innerValue as Ref<DateType>, {
    formatList,
    generateConfig,
    locale,
    type,
  });
  function onEnter(date: DateType) {
    setValue(date);
  }

  function onLeave(immediately = false) {
    setValue(null, immediately);
  }

  watch(valueText, () => {
    onLeave(true);
  });
  onBeforeUnmount(() => {
    raf.cancel(rafId);
  });

  return [firstText, onEnter, onLeave];
}
