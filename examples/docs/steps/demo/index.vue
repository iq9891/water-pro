<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import CustomizedProgressDot from './customized-progress-dot.vue';
import CustomizedProgressDotString from './customized-progress-dot.md?raw';
import CustomizedProgressDotCodeString from './customized-progress-dot.vue?raw';
import Error from './error.vue';
import ErrorString from './error.md?raw';
import ErrorCodeString from './error.vue?raw';
import Icon from './icon.vue';
import IconString from './icon.md?raw';
import IconCodeString from './icon.vue?raw';
import ProgressDot from './progress-dot.vue';
import ProgressDotString from './progress-dot.md?raw';
import ProgressDotCodeString from './progress-dot.vue?raw';
import SmallSize from './small-size.vue';
import SmallSizeString from './small-size.md?raw';
import SmallSizeCodeString from './small-size.vue?raw';
import StepNext from './step-next.vue';
import StepNextString from './step-next.md?raw';
import StepNextCodeString from './step-next.vue?raw';
import VerticalSmall from './vertical-small.vue';
import VerticalSmallString from './vertical-small.md?raw';
import VerticalSmallCodeString from './vertical-small.vue?raw';
import Vertical from './vertical.vue';
import VerticalString from './vertical.md?raw';
import VerticalCodeString from './vertical.vue?raw';
import Clickable from './clickable.vue';
import ClickableString from './clickable.md?raw';
import ClickableCodeString from './clickable.vue?raw';
import Nav from './nav.vue';
import NavString from './nav.md?raw';
import NavCodeString from './nav.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# Steps

  引导用户按照流程完成任务的导航条。

  ## 何时使用

  当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。
            ## 代码演示`,
  us: `# Steps

  'Steps' is a navigation bar that guides users through the steps of a task.

  # When To Use

  When the task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.
  ## Examples
  `,
};
export default {
  category: 'Components',
  subtitle: '步骤条',
  type: 'Navigation',
  cols: 1,
  title: 'Steps',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={SmallSizeString} code={SmallSizeCodeString}>
            <SmallSize />
          </demo-container>
          <demo-container api={IconString} code={IconCodeString}>
            <Icon />
          </demo-container>
          <demo-container api={StepNextString} code={StepNextCodeString}>
            <StepNext />
          </demo-container>
          <demo-container api={VerticalString} code={VerticalCodeString}>
            <Vertical />
          </demo-container>
          <demo-container api={VerticalSmallString} code={VerticalSmallCodeString}>
            <VerticalSmall />
          </demo-container>
          <demo-container api={ErrorString} code={ErrorCodeString}>
            <Error />
          </demo-container>
          <demo-container api={ProgressDotString} code={ProgressDotCodeString}>
            <ProgressDot />
          </demo-container>
          <demo-container api={CustomizedProgressDotString} code={CustomizedProgressDotCodeString}>
            <CustomizedProgressDot />
          </demo-container>
          <demo-container api={ClickableString} code={ClickableCodeString}>
            <Clickable />
          </demo-container>
          <demo-container api={NavString} code={NavCodeString}>
            <Nav />
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
