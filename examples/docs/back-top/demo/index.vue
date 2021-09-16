<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import CustomString from './custom.md?raw';
import Custom from './custom.vue';
import CustomCodeString from './custom.vue?raw';
import CN from '../index.zh-CN.md';

const md = {
  cn: `# BackTop 回到顶部
          返回页面顶部的操作按钮。
## 何时使用
- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。
          ## 代码演示`,
  us: `# BackTop
          \`BackTop\` makes it easy to go back to the top of the page.
## When To Use
- When the page content is very long.
- When you need to go back to the top very frequently in order to view the contents.
## Examples
`,
};
export default {
  category: 'Components',
  type: 'Other',
  zhType: '其他',
  subtitle: '回到顶部',
  title: 'BackTop',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={CustomString} code={CustomCodeString}>
            <Custom />
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
