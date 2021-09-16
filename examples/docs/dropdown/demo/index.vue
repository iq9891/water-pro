<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import ContextMenu from './context-menu.vue';
import ContextMenuString from './context-menu.md?raw';
import ContextMenuCodeString from './context-menu.vue?raw';
import DropdownButton from './dropdown-button.vue';
import DropdownButtonString from './dropdown-button.md?raw';
import DropdownButtonCodeString from './dropdown-button.vue?raw';
import Event from './event.vue';
import EventString from './event.md?raw';
import EventCodeString from './event.vue?raw';
import Item from './item.vue';
import ItemString from './item.md?raw';
import ItemCodeString from './item.vue?raw';
import OverlayVisible from './overlay-visible.vue';
import OverlayVisibleString from './overlay-visible.md?raw';
import OverlayVisibleCodeString from './overlay-visible.vue?raw';
import Placement from './placement.vue';
import PlacementString from './placement.md?raw';
import PlacementCodeString from './placement.vue?raw';
import SubMenu from './sub-menu.vue';
import SubMenuString from './sub-menu.md?raw';
import SubMenuCodeString from './sub-menu.vue?raw';
import Trigger from './trigger.vue';
import TriggerString from './trigger.md?raw';
import TriggerCodeString from './trigger.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 下拉菜单
        向下弹出的列表。
        ## 何时使用
        当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。
        ## 代码演示`,
  us: `# Dropdown
        A dropdown list.
        ## When To Use
        When there are more than a few options to choose from, you can wrap them in a \`Dropdown\`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.
        ## Examples
        `,
};
export default {
  category: 'Components',
  subtitle: '下拉菜单',
  type: 'Navigation',
  zhType: '导航',
  title: 'Dropdown',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ContextMenuString} code={ContextMenuCodeString}>
            <ContextMenu />
          </demo-container>
          <demo-container api={DropdownButtonString} code={DropdownButtonCodeString}>
            <DropdownButton />
          </demo-container>
          <demo-container api={EventString} code={EventCodeString}>
            <Event />
          </demo-container>
          <demo-container api={ItemString} code={ItemCodeString}>
            <Item />
          </demo-container>
          <demo-container api={OverlayVisibleString} code={OverlayVisibleCodeString}>
            <OverlayVisible />
          </demo-container>
          <demo-container api={PlacementString} code={PlacementCodeString}>
            <Placement />
          </demo-container>
          <demo-container api={SubMenuString} code={SubMenuCodeString}>
            <SubMenu />
          </demo-container>
          <demo-container api={TriggerString} code={TriggerCodeString}>
            <Trigger />
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
