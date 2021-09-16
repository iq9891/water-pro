<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Breadcrumb from './breadcrumb.vue';
import BreadcrumbString from './breadcrumb.md?raw';
import BreadcrumbCodeString from './breadcrumb.vue?raw';
import Actions from './actions.vue';
import ActionsString from './actions.md?raw';
import ActionsCodeString from './actions.vue?raw';
import Responsive from './responsive.vue';
import ResponsiveString from './responsive.md?raw';
import ResponsiveCodeString from './responsive.vue?raw';
import Ghost from './ghost.vue';
import GhostString from './ghost.md?raw';
import GhostCodeString from './ghost.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# PageHeader 页头

      页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题、页面内容简介、页面级操作等、页面级导航组成。

      ## 何时使用

      当需要使用户快速理解当前页是什么以及方便用户使用页面功能时使用，通常也可被用作页面间导航。

      ## 代码演示
      `,
  us: `# PageHeader

      The header can be used to declare the page topic, display important information about the page that the user is interested in, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.)

      ## When To Use

      It can also be used as inter-page navigation when it is needed to make the user quickly understand what the current page is and to facilitate the user to use the page function.

      ## Examples
      `,
};

export default {
  category: 'Components',
  subtitle: '页头',
  type: 'Navigation',
  title: 'PageHeader',
  cols: 1,
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={BreadcrumbString} code={BreadcrumbCodeString}>
            <Breadcrumb />
          </demo-container>
          <demo-container api={ActionsString} code={ActionsCodeString}>
            <Actions />
          </demo-container>
          <demo-container api={ResponsiveString} code={ResponsiveCodeString}>
            <Responsive />
          </demo-container>
          <demo-container api={GhostString} code={GhostCodeString}>
            <Ghost />
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
