<script lang="jsx">
import Horizontal from './horizontal.vue';
import HorizontalString from './horizontal.md?raw';
import HorizontalCodeString from './horizontal.vue?raw';
import Vertical from './vertical.vue';
import VerticalString from './vertical.md?raw';
import VerticalCodeString from './vertical.vue?raw';
import WithText from './with-text.vue';
import WithTextString from './with-text.md?raw';
import WithTextCodeString from './with-text.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 分割线
        区隔内容的分割线。
        ## 何时使用
        - 对不同章节的文本段落进行分割。
        - 对行内文字/链接进行分割，例如表格的操作列。

        ## 代码演示`,
  us: `# Divider
      A divider line separates different content.
      ## When To Use
      - Divide sections of article.
      - Divide inline text and links such as the operation column of table.
      ## Examples
      `,
};
export default {
  category: 'Components',
  type: 'General',
  zhType: '通用',
  title: 'Divider',
  subtitle: '分割线',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={VerticalString} code={VerticalCodeString}>
            <Vertical />
          </demo-container>
          <demo-container api={HorizontalString} code={HorizontalCodeString}>
            <Horizontal />
          </demo-container>
          <demo-container api={WithTextString} code={WithTextCodeString}>
            <WithText />
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
