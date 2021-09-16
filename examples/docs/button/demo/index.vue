<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import ButtonGroupString from './button-group.md?raw';
import ButtonGroup from './button-group.vue';
import ButtonGroupCodeString from './button-group.vue?raw';
import DisabledString from './disabled.md?raw';
import Disabled from './disabled.vue';
import DisabledCodeString from './disabled.vue?raw';
import GhostString from './ghost.md?raw';
import Ghost from './ghost.vue';
import GhostCodeString from './ghost.vue?raw';
import IconString from './icon.md?raw';
import Icon from './icon.vue';
import IconCodeString from './icon.vue?raw';
import LoadingString from './loading.md?raw';
import Loading from './loading.vue';
import LoadingCodeString from './loading.vue?raw';
import SizeString from './size.md?raw';
import Size from './size.vue';
import SizeCodeString from './size.vue?raw';
import BlockString from './block.md?raw';
import Block from './block.vue';
import BlockCodeString from './block.vue?raw';
import CopyString from './copy.md?raw';
import Copy from './copy.vue';
import CopyCodeString from './copy.vue?raw';
import CN from '../index.zh-CN.md';

const md = {
  cn: `# Button 按钮
          按钮用于开始一个即时操作。
          ## 何时使用
          标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

          在 Ant Design Vue 中我们提供了五种按钮。

          - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
          - 默认按钮：用于没有主次之分的一组行动点。
          - 虚线按钮：常用于添加操作。
          - 文本按钮：用于最次级的行动点。
          - 链接按钮：用于作为外链的行动点。

          以及四种状态属性与上面配合使用。
          - 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
          - 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
          - 禁用：行动点不可用的时候，一般需要文案解释。
          - 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

          ## 组件注册
          \`\`\`js
          import { Button } from '@fe6/water-pro';
          Vue.use(Button);
          \`\`\`
          ## 代码演示`,
  us: `# Button
          To trigger an operation.
          ## When To Use
          A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
          ## Component Registration
          \`\`\`js
          import { Button } from '@fe6/water-pro';
          Vue.use(Button);
          \`\`\`
          ## Examples
          `,
};
export default {
  category: 'Components',
  type: 'General',
  zhType: '通用',
  title: 'Button',
  subtitle: '按钮',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ButtonGroupString} code={ButtonGroupCodeString}>
            <ButtonGroup />
          </demo-container>
          <demo-container api={DisabledString} code={DisabledCodeString}>
            <Disabled />
          </demo-container>
          <demo-container api={GhostString} code={GhostCodeString}>
            <Ghost />
          </demo-container>
          <demo-container api={IconString} code={IconCodeString}>
            <Icon />
          </demo-container>
          <demo-container api={LoadingString} code={LoadingCodeString}>
            <Loading />
          </demo-container>
          <demo-container api={SizeString} code={SizeCodeString}>
            <Size />
          </demo-container>
          <demo-container api={BlockString} code={BlockCodeString}>
            <Block />
          </demo-container>
          <demo-container api={CopyString} code={CopyCodeString}>
            <Copy />
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
[id^='components-button-demo-'] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^='components-button-demo-'] .ant-btn-group > .ant-btn {
  margin-right: 0;
}
</style>
