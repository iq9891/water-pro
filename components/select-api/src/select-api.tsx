import { defineComponent, ref, unref, PropType, onUpdated, onUnmounted, watchEffect } from 'vue';
import { isUndefined } from '@fe6/shared';
import { LoadingOutlined } from '@ant-design/icons-vue';

import ASelect from '../../select';
import AEmpty from '../../empty';
import PRESENTED_IMAGE_SIMPLE from '../../empty/simple';
import useFetch from '../../_util/hooks/use-fetch';
import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';

export default defineComponent({
  name: 'ASelectApi',
  props: {
    value: PropTypes.any,
    api: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    apiParams: PropTypes.object.def({}),
    loopGetOptions: PropTypes.bool,
    filterOption: {
      type: Function,
      default: (inputValue: string, option: any) => {
        return option.label.indexOf(inputValue) > -1;
      },
    },
  },
  setup(props) {
    const [state] = useRuleFormItem(props);
    const { fetch } = useFetch(props.api);

    const loading = ref(false);
    const options = ref<any[]>([]);
    const getOptionDatas = () => {
      if (!loading.value) {
        loading.value = true;
        fetch({
          success: (res: any) => {
            loading.value = false;
            options.value = res;
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
        !unref(options).length &&
        getOptionsTime.value < 2 &&
        !props.loopGetOptions
      ) {
        getOptionsTime.value += props.loopGetOptions ? 0 : 1;
        getOptionDatas();
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
      if (!unref(options).length) {
        getOptionsTime.value = 0;
      }
    });

    onUnmounted(() => {
      getOptionsTime.value = 0;
    });

    return {
      dropdownVisibleChange,
      loading,
      options,
      apiValue,
      // TODO [error] yarn pub error TS4082:
      // simpleImage: AEmpty.PRESENTED_IMAGE_SIMPLE,
    };
  },
  render() {
    let notFoundNode = null;

    if (this.loading) {
      const emptySlots = {
        image: () => <LoadingOutlined style="font-size: 30px" />,
      };
      notFoundNode = (
        <div>
          <AEmpty description="正在加载" v-slots={emptySlots} />
        </div>
      );
    } else {
      const emptySlots = {
        image: () => <PRESENTED_IMAGE_SIMPLE />,
      };
      notFoundNode = (
        <div>
          <AEmpty v-slots={emptySlots} />
        </div>
      );
    }

    const selectSlot = {
      notFoundContent: () => notFoundNode,
    };

    return (
      <ASelect
        value={this.apiValue}
        loading={this.loading}
        options={this.options}
        virtual
        {...this.$attrs}
        filter-option={this.filterOption}
        onDropdownVisibleChange={this.dropdownVisibleChange}
        v-slots={selectSlot}
      />
    );
  },
});
