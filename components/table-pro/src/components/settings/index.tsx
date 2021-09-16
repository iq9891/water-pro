import type { TableSetting } from '../../types/table';

import { defineComponent, PropType, computed } from 'vue';

import useConfigInject from '../../../../_util/hooks/useConfigInject';

import ColumnSetting from './column-setting';
import ReloadSetting from './reload-setting';

export default defineComponent({
  name: 'TableSetting',
  props: {
    setting: {
      type: Object as PropType<TableSetting>,
      default: {} as TableSetting,
    },
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro-settings', props);
    const getSetting = computed((): TableSetting => {
      return {
        reload: true,
        setting: true,
        ...props.setting,
      };
    });

    return { getSetting, prefixClsNew };
  },
  render() {
    let reloadNode = null;
    if (this.getSetting.reload) {
      reloadNode = <ReloadSetting />;
    }

    let settingNode = null;
    if (this.getSetting.setting) {
      settingNode = <ColumnSetting />;
    }

    return (
      <div class={this.prefixClsNew}>
        {reloadNode}
        {settingNode}
      </div>
    );
  },
});
