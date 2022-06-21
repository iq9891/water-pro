<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import DateRender from './date-render.vue';
import DateRenderString from './date-render.md?raw';
import DateRenderCodeString from './date-render.vue?raw';
import DisabledDate from './disabled-date.vue';
import DisabledDateString from './disabled-date.md?raw';
import DisabledDateCodeString from './disabled-date.vue?raw';
import Disabled from './disabled.vue';
import DisabledString from './disabled.md?raw';
import DisabledCodeString from './disabled.vue?raw';
import ExtraFooter from './extra-footer.vue';
import ExtraFooterString from './extra-footer.md?raw';
import ExtraFooterCodeString from './extra-footer.vue?raw';
import Format from './format.vue';
import FormatString from './format.md?raw';
import FormatCodeString from './format.vue?raw';
import Mode from './mode.vue';
import ModeString from './mode.md?raw';
import ModeCodeString from './mode.vue?raw';
import PresettedRanges from './presetted-ranges.vue';
import PresettedRangesString from './presetted-ranges.md?raw';
import PresettedRangesCodeString from './presetted-ranges.vue?raw';
import Size from './size.vue';
import SizeString from './size.md?raw';
import SizeCodeString from './size.vue?raw';
import StartEnd from './start-end.vue';
import StartEndString from './start-end.md?raw';
import StartEndCodeString from './start-end.vue?raw';
import Time from './time.vue';
import TimeString from './time.md?raw';
import TimeCodeString from './time.vue?raw';
import Suffix from './suffix.vue';
import SuffixString from './suffix.md?raw';
import SuffixCodeString from './suffix.vue?raw';
import Text from './text.vue';
import TextString from './text.md?raw';
import TextCodeString from './text.vue?raw';
import RangeNow from './range-now.vue';
import RangeNowString from './range-now.md?raw';
import RangeNowCodeString from './range-now.vue?raw';
import Multiple from './multiple.vue';
import MultipleString from './multiple.md?raw';
import MultipleCodeString from './multiple.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# DatePicker 日期选择框
          输入或选择日期的控件。
## 何时使用
当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。
          ## 代码演示`,
  us: `# DatePicker
          To select or input a date.
## When To Use
By clicking the input box, you can select a date from a popup calendar.
## Examples
          `,
};
export default {
  category: 'Components',
  type: 'Data Entry',
  zhType: '数据录入',
  title: 'DatePicker',
  subtitle: '日期选择框',
  render() {
    return (
      <div id="components-date-picker-demo">
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={DateRenderString} code={DateRenderCodeString}>
            <DateRender />
          </demo-container>
          <demo-container api={DisabledDateString} code={DisabledDateCodeString}>
            <DisabledDate />
          </demo-container>
          <demo-container api={DisabledString} code={DisabledCodeString}>
            <Disabled />
          </demo-container>
          <demo-container api={ExtraFooterString} code={ExtraFooterCodeString}>
            <ExtraFooter />
          </demo-container>
          <demo-container api={FormatString} code={FormatCodeString}>
            <Format />
          </demo-container>
          <demo-container api={ModeString} code={ModeCodeString}>
            <Mode />
          </demo-container>
          <demo-container api={PresettedRangesString} code={PresettedRangesCodeString}>
            <PresettedRanges />
          </demo-container>
          <demo-container api={SizeString} code={SizeCodeString}>
            <Size />
          </demo-container>
          <demo-container api={StartEndString} code={StartEndCodeString}>
            <StartEnd />
          </demo-container>
          <demo-container api={TimeString} code={TimeCodeString}>
            <Time />
          </demo-container>
          <demo-container api={TextString} code={TextCodeString}>
            <Text />
          </demo-container>
          <demo-container api={SuffixString} code={SuffixCodeString}>
            <Suffix />
          </demo-container>
          <demo-container api={RangeNowString} code={RangeNowCodeString}>
            <RangeNow />
          </demo-container>
          <demo-container api={MultipleString} code={MultipleCodeString}>
            <Multiple />
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
#components-date-picker-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
