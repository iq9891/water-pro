<script lang="jsx">
import Horizontal from './horizontal.vue';
import HorizontalString from './horizontal.md?raw';
import HorizontalCodeString from './horizontal.vue?raw';
import InlineCollapsed from './inline-collapsed.vue';
import InlineCollapsedString from './inline-collapsed.md?raw';
import InlineCollapsedCodeString from './inline-collapsed.vue?raw';
import Inline from './inline.vue';
import InlineString from './inline.md?raw';
import InlineCodeString from './inline.vue?raw';
import SiderCurrent from './sider-current.vue';
import SiderCurrentString from './sider-current.md?raw';
import SiderCurrentCodeString from './sider-current.vue?raw';
import SwitchMode from './switch-mode.vue';
import SwitchModeString from './switch-mode.md?raw';
import SwitchModeCodeString from './switch-mode.vue?raw';
import Theme from './theme.vue';
import ThemeString from './theme.md?raw';
import ThemeCodeString from './theme.vue?raw';
import Vertical from './vertical.vue';
import VerticalString from './vertical.md?raw';
import VerticalCodeString from './vertical.vue?raw';
import Color from './color.vue';
import ColorString from './color.md?raw';
import ColorCodeString from './color.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# Menu 导航菜单
          为页面和功能提供导航的菜单列表。
## 何时使用
导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
          ## 代码演示`,
  us: `# Menu
          A versatile menu for navigation.

## When To Use

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers top and side navigation options. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).
## Examples`,
};
export default {
  category: 'Components',
  cols: 1,
  type: 'Navigation',
  title: 'Menu',
  subtitle: '导航菜单',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={HorizontalString} code={HorizontalCodeString}>
            <Horizontal />
          </demo-container>
          <demo-container api={InlineString} code={InlineCodeString}>
            <Inline />
          </demo-container>
          <demo-container api={InlineCollapsedString} code={InlineCollapsedCodeString}>
            <InlineCollapsed />
          </demo-container>
          <demo-container api={SiderCurrentString} code={SiderCurrentCodeString}>
            <SiderCurrent />
          </demo-container>
          <demo-container api={VerticalString} code={VerticalCodeString}>
            <Vertical />
          </demo-container>
          <demo-container api={ThemeString} code={ThemeCodeString}>
            <Theme />
          </demo-container>
          <demo-container api={SwitchModeString} code={SwitchModeCodeString}>
            <SwitchMode />
          </demo-container>
          <demo-container api={ColorString} code={ColorCodeString}>
            <Color />
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
<style></style>
