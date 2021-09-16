<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Login from './login.vue';
import LoginString from './login.md?raw';
import LoginCodeString from './login.vue?raw';
import Use from './use.vue';
import UseString from './use.md?raw';
import UseCodeString from './use.vue?raw';
import Inner from './inner.vue';
import InnerString from './inner.md?raw';
import InnerCodeString from './inner.vue?raw';
import Horizontal from './horizontal.vue';
import HorizontalString from './horizontal.md?raw';
import HorizontalCodeString from './horizontal.vue?raw';
import HorizontalInner from './horizontal-inner.vue';
import HorizontalInnerString from './horizontal-inner.md?raw';
import HorizontalInnerCodeString from './horizontal-inner.vue?raw';
import LabelWidth from './label-width.vue';
import LabelWidthString from './label-width.md?raw';
import LabelWidthCodeString from './label-width.vue?raw';
import Label from './label.vue';
import LabelString from './label.md?raw';
import LabelCodeString from './label.vue?raw';
import Rule from './rule.vue';
import RuleString from './rule.md?raw';
import RuleCodeString from './rule.vue?raw';
import DynamicForm from './dynamic-form.vue';
import DynamicFormString from './dynamic-form.md?raw';
import DynamicFormCodeString from './dynamic-form.vue?raw';
import IfShow from './if-show.vue';
import IfShowString from './if-show.md?raw';
import IfShowCodeString from './if-show.vue?raw';
import UpdateSchema from './update-schema.vue';
import UpdateSchemaString from './update-schema.md?raw';
import UpdateSchemaCodeString from './update-schema.vue?raw';
import Msg from './msg.vue';
import MsgString from './msg.md?raw';
import MsgCodeString from './msg.vue?raw';
import Slot from './slot.vue';
import SlotString from './slot.md?raw';
import SlotCodeString from './slot.vue?raw';
import Special from './special.vue';
import SpecialString from './special.md?raw';
import SpecialCodeString from './special.vue?raw';
import ExpendActive from './expend-active.vue';
import ExpendActiveString from './expend-active.md?raw';
import ExpendActiveCodeString from './expend-active.vue?raw';
import Expend from './expend.vue';
import ExpendString from './expend.md?raw';
import ExpendCodeString from './expend.vue?raw';
import ChangeTime from './change-time.vue';
import ChangeTimeString from './change-time.md?raw';
import ChangeTimeCodeString from './change-time.vue?raw';
import Full from './full.vue';
import FullString from './full.md?raw';
import FullCodeString from './full.vue?raw';
import Children from './children.vue';
import ChildrenString from './children.md?raw';
import ChildrenCodeString from './children.vue?raw';


import CN from '../index.zh-CN.md';

const md = {
  cn: `# Form Pro 表单加强版
        表单增强版。不支持 table-pro 。

      ## 何时使用

      - 偷懒的时候
      - 快速实现数据提交

       ## 代码演示
        `,
  us: `# Form Pro
        TODO
       ## Examples
        `,
};
export default {
  category: 'Components',
  subtitle: '表单 PRO',
  type: 'Data Entry',
  zhType: '数据录入',
  cols: 1,
  title: 'Form Pro',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={LoginString} code={LoginCodeString}>
            <Login />
          </demo-container>
          <demo-container api={UseString} code={UseCodeString}>
            <Use />
          </demo-container>
          <demo-container api={InnerString} code={InnerCodeString}>
            <Inner />
          </demo-container>
          <demo-container api={HorizontalString} code={HorizontalCodeString}>
            <Horizontal />
          </demo-container>
          <demo-container api={HorizontalInnerString} code={HorizontalInnerCodeString}>
            <HorizontalInner />
          </demo-container>
          <demo-container api={RuleString} code={RuleCodeString}>
            <Rule />
          </demo-container>
          <demo-container api={LabelWidthString} code={LabelWidthCodeString}>
            <LabelWidth />
          </demo-container>
          <demo-container api={LabelString} code={LabelCodeString}>
            <Label />
          </demo-container>
          <demo-container api={DynamicFormString} code={DynamicFormCodeString}>
            <DynamicForm />
          </demo-container>
          <demo-container api={IfShowString} code={IfShowCodeString}>
            <IfShow />
          </demo-container>
          <demo-container api={UpdateSchemaString} code={UpdateSchemaCodeString}>
            <UpdateSchema />
          </demo-container>
          <demo-container api={MsgString} code={MsgCodeString}>
            <Msg />
          </demo-container>
          <demo-container api={SlotString} code={SlotCodeString}>
            <Slot />
          </demo-container>
          <demo-container api={SpecialString} code={SpecialCodeString}>
            <Special />
          </demo-container>
          <demo-container api={ExpendString} code={ExpendCodeString}>
            <Expend />
          </demo-container>
          <demo-container api={ExpendActiveString} code={ExpendActiveCodeString}>
            <ExpendActive />
          </demo-container>
          <demo-container api={ChangeTimeString} code={ChangeTimeCodeString}>
            <ChangeTime />
          </demo-container>
          <demo-container api={FullString} code={FullCodeString}>
            <Full />
          </demo-container>
          <demo-container api={ChildrenString} code={ChildrenCodeString}>
            <Children />
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
