<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import ChildrenString from './children.md?raw';
import Children from './children.vue';
import ChildrenCodeString from './children.vue?raw';
import MoreString from './more.md?raw';
import More from './more.vue';
import MoreCodeString from './more.vue?raw';
import DiyString from './diy.md?raw';
import Diy from './diy.vue';
import DiyCodeString from './diy.vue?raw';
import OptionsString from './options.md?raw';
import Options from './options.vue';
import OptionsCodeString from './options.vue?raw';
import RadioString from './radio.md?raw';
import Radio from './radio.vue';
import RadioCodeString from './radio.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# Classify 分类选择器
          只为分类定制。
## 何时使用
- 只为设置分类
          ## 代码演示`,
  us: `# Classify
          TODO
## Examples
          `,
};
export default {
  category: 'Components',
  type: 'Data Entry',
  zhType: '数据录入',
  title: 'Classify',
  subtitle: '分类选择器',
  render() {
    return (
      <div id="components-classify-demo">
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ChildrenString} code={ChildrenCodeString}>
            <Children />
          </demo-container>
          <demo-container api={MoreString} code={MoreCodeString}>
            <More />
          </demo-container>
          <demo-container api={DiyString} code={DiyCodeString}>
            <Diy />
          </demo-container>
          <demo-container api={OptionsString} code={OptionsCodeString}>
            <Options />
          </demo-container>
          <demo-container api={RadioString} code={RadioCodeString}>
            <Radio />
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
#components-classify-demo .ant-classify-picker {
  width: 300px;
}
</style>
