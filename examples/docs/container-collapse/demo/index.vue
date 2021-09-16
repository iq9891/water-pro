<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Action from './action.vue';
import ActionString from './action.md?raw';
import ActionCodeString from './action.vue?raw';
import Lazy from './lazy.vue';
import LazyString from './lazy.md?raw';
import LazyCodeString from './lazy.vue?raw';
import Slot from './slot.vue';
import SlotString from './slot.md?raw';
import SlotCodeString from './slot.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 展开容器
           有过多东西的时候
         ## 何时使用
         不想一次展现的时候
         ## 代码演示
        `,
  us: `# ContainerCollapse
         TODO
         ## Examples
        `,
};

export default {
  category: 'Components',
  subtitle: '展开容器',
  type: 'Layout',
  title: 'ContainerCollapse',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ActionString} code={ActionCodeString}>
            <Action />
          </demo-container>
          <demo-container api={LazyString} code={LazyCodeString}>
            <Lazy />
          </demo-container>
          <demo-container api={SlotString} code={SlotCodeString}>
            <Slot />
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
