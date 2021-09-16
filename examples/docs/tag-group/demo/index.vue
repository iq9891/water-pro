<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Add from './add.vue';
import AddString from './add.md?raw';
import AddCodeString from './add.vue?raw';
import Disabled from './disabled.vue';
import DisabledString from './disabled.md?raw';
import DisabledCodeString from './disabled.vue?raw';
import Slot from './slot.vue';
import SlotString from './slot.md?raw';
import SlotCodeString from './slot.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# TagGroup 标签组

    标签的快捷封装

## 何时使用

- 有很多标签需要展示
- 有很多标签需要隐藏
- 需要创建标签

    ## 代码演示`,
  us: `# TagGroup
TODO

## When To Use

TODO

    ## Examples `,
};
export default {
  category: 'Components',
  subtitle: '标签组',
  type: 'Data Display',
  title: 'TagGroup',
  render() {
    return (
      <div id="components-tag-demo">
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={AddString} code={AddCodeString}>
            <Add />
          </demo-container>
          <demo-container api={SlotString} code={SlotCodeString}>
            <Slot />
          </demo-container>
          <demo-container api={DisabledString} code={DisabledCodeString}>
            <Disabled />
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
<style>
#components-tag-demo .ant-tag {
  margin-bottom: 8px;
}
</style>
