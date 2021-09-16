<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import CardString from './card.md?raw';
import Card from './card.vue';
import CardCodeString from './card.vue?raw';
import NoticeCalendarString from './notice-calendar.md?raw';
import NoticeCalendar from './notice-calendar.vue';
import NoticeCalendarCodeString from './notice-calendar.vue?raw';
import SelectString from './select.md?raw';
import Select from './select.vue';
import SelectCodeString from './select.vue?raw';
import CustomizeHeaderString from './customize-header.md?raw';
import CustomizeHeader from './customize-header.vue';
import CustomizeHeaderCodeString from './customize-header.vue?raw';
import CN from '../index.zh-CN.md';

const md = {
  cn: `# Calendar 日历

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

          ## 代码演示`,
  us: `# Calendar

Container for displaying data in calendar form.

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.
## Examples
`,
};
export default {
  category: 'Components',
  type: 'Data Display',
  zhType: '数据展示',
  subtitle: '日历',
  cols: 1,
  title: 'Calendar',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={CardString} code={CardCodeString}>
            <Card />
          </demo-container>
          <demo-container api={NoticeCalendarString} code={NoticeCalendarCodeString}>
            <NoticeCalendar />
          </demo-container>
          <demo-container api={SelectString} code={SelectCodeString}>
            <Select />
          </demo-container>
          <demo-container api={CustomizeHeaderString} code={CustomizeHeaderCodeString}>
            <CustomizeHeader />
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
