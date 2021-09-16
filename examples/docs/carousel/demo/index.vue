<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import FadeString from './fade.md?raw';
import Fade from './fade.vue';
import FadeCodeString from './fade.vue?raw';
import AutoplayString from './autoplay.md?raw';
import Autoplay from './autoplay.vue';
import AutoplayCodeString from './autoplay.vue?raw';
import PositionString from './position.md?raw';
import Position from './position.vue';
import PositionCodeString from './position.vue?raw';
import CustomPagingString from './customPaging.md?raw';
import CustomPaging from './customPaging.vue';
import CustomPagingCodeString from './customPaging.vue?raw';
import CustomArrowsString from './customArrows.md?raw';
import CustomArrows from './customArrows.vue';
import CustomArrowsCodeString from './customArrows.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# Carousel 走马灯轮播
        旋转木马，一组轮播的区域。
       ## 何时使用

      - 当有一组平级的内容。
      - 当内容空间不足时，可以用走马灯轮播的形式进行收纳，进行轮播展现。
      - 常用于一组图片或卡片轮播。
       ## 代码演示
        `,
  us: `# Carousel
          A carousel component. Scales with its container.
       ## When To Use

      - When there is a group of content on the same level.
      - When there is insufficient content space, it can be used to save space in the form of a revolving door.
      - Commonly used for a group of pictures/cards.
       ## Examples
        `,
};
export default {
  category: 'Components',
  type: 'Data Display',
  zhType: '数据展示',
  title: 'Carousel',
  subtitle: '走马灯轮播',
  inject: {
    demoContext: { default: {} },
  },
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort cols={1}>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={PositionString} code={PositionCodeString}>
            <Position />
          </demo-container>
          <demo-container api={FadeString} code={FadeCodeString}>
            <Fade />
          </demo-container>
          <demo-container api={AutoplayString} code={AutoplayCodeString}>
            <Autoplay />
          </demo-container>
          <demo-container api={CustomPagingString} code={CustomPagingCodeString}>
            <CustomPaging />
          </demo-container>
          <demo-container api={CustomArrowsString} code={CustomArrowsCodeString}>
            <CustomArrows />
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
