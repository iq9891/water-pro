<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import BorderLessString from './border-less.md?raw';
import BorderLess from './border-less.vue';
import BorderLessCodeString from './border-less.vue?raw';
import FlexibleContentString from './flexible-content.md?raw';
import FlexibleContent from './flexible-content.vue';
import FlexibleContentCodeString from './flexible-content.vue?raw';
import GridCardString from './grid-card.md?raw';
import GridCard from './grid-card.vue';
import GridCardCodeString from './grid-card.vue?raw';
import InColumnString from './in-column.md?raw';
import InColumn from './in-column.vue';
import InColumnCodeString from './in-column.vue?raw';
import InnerString from './inner.md?raw';
import Inner from './inner.vue';
import InnerCodeString from './inner.vue?raw';
import LoadingString from './loading.md?raw';
import Loading from './loading.vue';
import LoadingCodeString from './loading.vue?raw';
import MetaString from './meta.md?raw';
import Meta from './meta.vue';
import MetaCodeString from './meta.vue?raw';
import SimpleString from './simple.md?raw';
import Simple from './simple.vue';
import SimpleCodeString from './simple.vue?raw';
import TabsString from './tabs.md?raw';
import Tabs from './tabs.vue';
import TabsCodeString from './tabs.vue?raw';
import GrayString from './gray.md?raw';
import Gray from './gray.vue';
import GrayCodeString from './gray.vue?raw';

import CN from './../index.zh-CN.md';

const md = {
  cn: `# Card 卡片
         通用卡片容器
       ## 何时使用
         最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
       ## 代码演示
        `,
  us: `# Card
         Simple rectangular container.
       ## When To Use
         A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
       ## Examples
        `,
};
export default {
  category: 'Components',
  type: 'Data Display',
  zhType: '数据展示',
  title: 'Card',
  subtitle: '卡片',
  cols: 1,
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={BorderLessString} code={BorderLessCodeString}>
            <BorderLess />
          </demo-container>
          <demo-container api={FlexibleContentString} code={FlexibleContentCodeString}>
            <FlexibleContent />
          </demo-container>
          <demo-container api={GridCardString} code={GridCardCodeString}>
            <GridCard />
          </demo-container>
          <demo-container api={InColumnString} code={InColumnCodeString}>
            <InColumn />
          </demo-container>
          <demo-container api={InnerString} code={InnerCodeString}>
            <Inner />
          </demo-container>
          <demo-container api={LoadingString} code={LoadingCodeString}>
            <Loading />
          </demo-container>
          <demo-container api={MetaString} code={MetaCodeString}>
            <Meta />
          </demo-container>
          <demo-container api={SimpleString} code={SimpleCodeString}>
            <Simple />
          </demo-container>
          <demo-container api={TabsString} code={TabsCodeString}>
            <Tabs />
          </demo-container>
          <demo-container api={GrayString} code={GrayCodeString}>
            <Gray />
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
