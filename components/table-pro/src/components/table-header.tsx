import type { TableSetting } from '../types/table';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { default as Divider } from '../../../divider';
import useConfigInject from '../../../_util/hooks/useConfigInject';
import { getSlot } from '../../../_util/props-util';

import TableSettingComp from './settings/index';
import TableTitle from './table-title';

export default defineComponent({
  name: 'TableProHeader',
  components: {
    Divider,
    TableTitle,
    TableSetting: TableSettingComp,
  },
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
    },
    tableSetting: {
      type: Object as PropType<TableSetting>,
    },
    showTableSetting: {
      type: Boolean,
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    prefixCls: String,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro-header', props);
    return { prefixClsNew };
  },
  render() {
    let tableTitleNode = getSlot(this, 'tableTitle');

    if (!tableTitleNode.length) {
      tableTitleNode = [<TableTitle help-message={this.titleHelpMessage} title={this.title} />];
    }

    let settingNode = null;

    if (this.showTableSetting) {
      settingNode = <TableSettingComp setting={this.tableSetting} />;
    }

    return (
      <>
        {tableTitleNode}
        <div class={`${this.prefixClsNew}__toolbar`}>
          {getSlot(this, 'toolbar')}
          {settingNode}
        </div>
      </>
    );
  },
});
