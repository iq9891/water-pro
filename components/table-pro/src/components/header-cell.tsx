import type { PropType } from 'vue';
import type { BasicColumn } from '../types/table';

import { defineComponent, computed } from 'vue';
import BasicHelp from '../../../basic-help/src/basic-help';
import EditTableHeaderCell from './edit-table-header-icon';
import useConfigInject from '../../../_util/hooks/useConfigInject';

export default defineComponent({
  name: 'TableHeaderCell',
  props: {
    column: {
      type: Object as PropType<BasicColumn>,
      default: {} as BasicColumn,
    },
    prefixCls: String,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro-header-cell', props);
    const getIsEdit = computed(() => {
      return !!props.column?.edit;
    });

    const getTitle = computed(() => {
      return props.column?.customTitle;
    });

    const getHelpMessage = computed(() => {
      return props.column?.helpMessage;
    });

    return { prefixClsNew, getIsEdit, getTitle, getHelpMessage };
  },
  render() {
    let headerCellNode = null;

    if (this.getIsEdit) {
      headerCellNode = <EditTableHeaderCell>{this.getTitle}</EditTableHeaderCell>;
    } else {
      headerCellNode = this.getTitle;
    }

    let helpNode = null;
    if (this.getHelpMessage) {
      helpNode = <BasicHelp text={this.getHelpMessage} class={`${this.prefixClsNew}__help`} />;
    }

    return (
      <>
        {headerCellNode}
        {helpNode}
      </>
    );
  },
});
