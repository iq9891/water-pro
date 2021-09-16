/** @format */

import { ref } from 'vue';
import { isFunction, isArray } from '@fe6/shared';
import warning from '../warning';

export default (api: any) => {
  const loading = ref(false);
  const result = ref([]);

  function fetch(params?: Recordable) {
    const { success, params: fecthParams, error } = params || {};

    if (!api || !isFunction(api) || typeof api !== 'function') return;

    try {
      loading.value = true;
      const res = api({
        params: fecthParams,
        success,
        error,
      });
      loading.value = false;
      if (isArray(res)) {
        result.value = res;
        if (isFunction(success)) {
          (success as any)(res);
        }
        return;
      }
    } catch (err) {
      if (isFunction(error)) {
        error();
      }
      warning(err);
    } finally {
      loading.value = false;
    }
  }

  const setLoading = (loadingStatue: boolean) => {
    loading.value = loadingStatue;
  };

  return {
    loading,
    fetch,
    result,
    setLoading,
  } as const;
};
