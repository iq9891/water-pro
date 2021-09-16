import { defineComponent, ref, unref, PropType, onUpdated, onUnmounted, watchEffect } from 'vue';
import { isUndefined } from '@fe6/shared';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue';

import ACascader from '../../cascader';
import useFetch from '../../_util/hooks/use-fetch';
import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';
import { splitAttrs } from '../../_util/props-util';

export default defineComponent({
  name: 'ACascaderApi',
  props: {
    value: PropTypes.any,
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: null,
    },
    apiParams: PropTypes.object.def({}),
    loopGetOptions: PropTypes.bool,
    filterOption: {
      type: Function,
      default: (inputValue: string, option: Recordable) => {
        return option.label.indexOf(inputValue) > -1;
      },
    },
  },
  setup(props) {
    const [state] = useRuleFormItem(props);
    const { fetch } = useFetch(props.api);

    const loading = ref(false);
    const popupVisible = ref(false);
    const optionDatas = ref<Recordable[]>([]);
    const getOptionDatas = () => {
      if (!loading.value) {
        loading.value = true;
        fetch({
          success: (res: any) => {
            loading.value = false;
            popupVisible.value = true;
            optionDatas.value = res;
          },
          error: () => {
            loading.value = false;
          },
          params: props.apiParams,
        });
      }
    };

    const getOptionsTime = ref(1);

    const dropdownVisibleChange = (dropDownIsOpen: boolean) => {
      if (
        dropDownIsOpen &&
        !unref(optionDatas).length &&
        getOptionsTime.value < 2 &&
        !props.loopGetOptions
      ) {
        getOptionsTime.value += props.loopGetOptions ? 0 : 1;
        getOptionDatas();
      } else {
        popupVisible.value = dropDownIsOpen;
      }
    };

    const apiValue = ref('');
    watchEffect(() => {
      apiValue.value = (state as any).value || props.value;
      if (!isUndefined(apiValue.value) && String(apiValue.value).length > 0) {
        dropdownVisibleChange(true);
      }
    });

    onUpdated(() => {
      if (!unref(optionDatas).length) {
        getOptionsTime.value = 0;
      }
    });

    onUnmounted(() => {
      getOptionsTime.value = 0;
    });

    return {
      dropdownVisibleChange,
      loading,
      optionDatas,
      popupVisible,
    };
  },
  render() {
    const { onEvents } = splitAttrs(this.$attrs);
    const cascaderProps: any = () => ({
      ...this.$attrs,
      options: this.optionDatas,
      loading: this.loading,
      popupVisible: this.popupVisible,
      suffixIcon: () => (this.loading ? <LoadingOutlined class="test" /> : <DownOutlined />),
      onPopupVisibleChange: this.dropdownVisibleChange,
      ...onEvents,
    });

    return <ACascader {...cascaderProps()}></ACascader>;
  },
});
