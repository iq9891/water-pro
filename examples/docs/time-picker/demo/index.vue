<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Hours from './12hours.vue';
import HoursString from './12hours.md?raw';
import HoursCodeString from './12hours.vue?raw';
import Addon from './addon.vue';
import AddonString from './addon.md?raw';
import AddonCodeString from './addon.vue?raw';
import Disabled from './disabled.vue';
import DisabledString from './disabled.md?raw';
import DisabledCodeString from './disabled.vue?raw';
import HideColumn from './hide-column.vue';
import HideColumnString from './hide-column.md?raw';
import HideColumnCodeString from './hide-column.vue?raw';
import IntervalOptions from './interval-options.vue';
import IntervalOptionsString from './interval-options.md?raw';
import IntervalOptionsCodeString from './interval-options.vue?raw';
import Size from './size.vue';
import SizeString from './size.md?raw';
import SizeCodeString from './size.vue?raw';
import Value from './value.vue';
import ValueString from './value.md?raw';
import ValueCodeString from './value.vue?raw';
import Suffix from './suffix.vue';
import SuffixString from './suffix.md?raw';
import SuffixCodeString from './suffix.vue?raw';
import Rang from './rang.vue';
import RangString from './rang.md?raw';
import RangCodeString from './rang.vue?raw';
import CN from '../index.zh-CN.md';
const md = {
  cn: `# TimePicker 时间选择框
          输入或选择时间的控件。
## 何时使用
当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。
          ## 代码演示`,
  us: `# TimePicker
          To select/input a time.
## When To Use
By clicking the input box, you can select a time from a popup panel.
## Examples `,
};
export default {
  category: 'Components',
  subtitle: '时间选择框',
  type: 'Data Entry',
  title: 'TimePicker',
  render() {
    return (
      <div id="components-timepicker-demo">
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={HoursString} code={HoursCodeString}>
            <Hours />
          </demo-container>
          <demo-container api={AddonString} code={AddonCodeString}>
            <Addon />
          </demo-container>
          <demo-container api={DisabledString} code={DisabledCodeString}>
            <Disabled />
          </demo-container>
          <demo-container api={HideColumnString} code={HideColumnCodeString}>
            <HideColumn />
          </demo-container>
          <demo-container api={IntervalOptionsString} code={IntervalOptionsCodeString}>
            <IntervalOptions />
          </demo-container>
          <demo-container api={SizeString} code={SizeCodeString}>
            <Size />
          </demo-container>
          <demo-container api={ValueString} code={ValueCodeString}>
            <Value />
          </demo-container>
          <demo-container api={SuffixString} code={SuffixCodeString}>
            <Suffix />
          </demo-container>
          <demo-container api={RangString} code={RangCodeString}>
            <Rang />
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
#components-timepicker-demo .ant-time-picker {
  margin: 0 8px 12px 0;
}
</style>
