<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Expand from './expand.vue';
import ExpandString from './expand.md?raw';
import ExpandCodeString from './expand.vue?raw';
import TopDemo from './top.vue';
import TopDemoString from './top.md?raw';
import TopDemoCodeString from './top.vue?raw';
import TipDemo from './tip.vue';
import TipDemoString from './tip.md?raw';
import TipDemoCodeString from './tip.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 三角
           统一三角
         ## 何时使用
         这是一个 icon
         ## 代码演示
        `,
  us: `# BasicArrow
         TODO
         ## Examples
        `,
};

export default {
  category: 'Components',
  subtitle: '帮助提示',
  type: 'Data Display',
  title: 'BasicArrow',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ExpandString} code={ExpandCodeString}>
            <Expand />
          </demo-container>
          <demo-container api={TopDemoString} code={TopDemoCodeString}>
            <TopDemo />
          </demo-container>
          <demo-container api={TipDemoString} code={TipDemoCodeString}>
            <TipDemo />
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
