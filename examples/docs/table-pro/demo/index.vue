<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Action from './action.vue';
import ActionString from './action.md?raw';
import ActionCodeString from './action.vue?raw';
import Origin from './origin.vue';
import OriginString from './origin.md?raw';
import OriginCodeString from './origin.vue?raw';
import Toolbar from './toolbar.vue';
import ToolbarString from './toolbar.md?raw';
import ToolbarCodeString from './toolbar.vue?raw';
import UseMethods from './use-methods.vue';
import UseMethodsString from './use-methods.md?raw';
import UseMethodsCodeString from './use-methods.vue?raw';
import CustomerCell from './customer-cell.vue';
import CustomerCellString from './customer-cell.md?raw';
import CustomerCellCodeString from './customer-cell.vue?raw';
import Search from './search.vue';
import SearchString from './search.md?raw';
import SearchCodeString from './search.vue?raw';
import Drag from './drag.vue';
import DragString from './drag.md?raw';
import DragCodeString from './drag.vue?raw';
import Empty from './empty.vue';
import EmptyString from './empty.md?raw';
import EmptyCodeString from './empty.vue?raw';
import Card from './card.vue';
import CardString from './card.md?raw';
import CardCodeString from './card.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# TablePro 表格加强版

    普通表格只能一点点写，加强版表格配一下就行~

    ## 何时使用

    - 想偷懒的时候
    - 加速迭代项目的时候

    ## 代码演示`,
  us: `# TablePro
TODO
    ## Examples `,
};
export default {
  category: 'Components',
  subtitle: '表格 PRO',
  type: 'Data Display',
  title: 'TablePro',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={SearchString} code={SearchCodeString}>
            <Search />
          </demo-container>
          <demo-container api={ActionString} code={ActionCodeString}>
            <Action />
          </demo-container>
          <demo-container api={ToolbarString} code={ToolbarCodeString}>
            <Toolbar />
          </demo-container>
          <demo-container api={UseMethodsString} code={UseMethodsCodeString}>
            <UseMethods />
          </demo-container>
          <demo-container api={CustomerCellString} code={CustomerCellCodeString}>
            <CustomerCell />
          </demo-container>
          <demo-container api={OriginString} code={OriginCodeString}>
            <Origin />
          </demo-container>
          <demo-container api={DragString} code={DragCodeString}>
            <Drag />
          </demo-container>
          <demo-container api={EmptyString} code={EmptyCodeString}>
            <Empty />
          </demo-container>
          <demo-container api={CardString} code={CardCodeString}>
            <Card />
          </demo-container>
        </demo-sort>
        <api>
          <CN />
        </api>
      </div>
    );
  },
};
</script>
