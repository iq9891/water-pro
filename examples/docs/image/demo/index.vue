<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Error from './error.vue';
import ErrorString from './error.md?raw';
import ErrorCodeString from './error.vue?raw';
import Many from './many.vue';
import ManyString from './many.md?raw';
import ManyCodeString from './many.vue?raw';
import Reload from './reload.vue';
import ReloadString from './reload.md?raw';
import ReloadCodeString from './reload.vue?raw';
import Border from './border.vue';
import BorderString from './border.md?raw';
import BorderCodeString from './border.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# Image 图片
          可预览的图片。
## 何时使用
- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。
          ## 代码演示`,
  us: `# Image 
          TODO`,
};
export default {
  category: 'Components',
  subtitle: '输入框',
  type: 'Data Entry',
  title: 'Input',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={ErrorString} code={ErrorCodeString}>
            <Error />
          </demo-container>
          <demo-container api={ManyString} code={ManyCodeString}>
            <Many />
          </demo-container>
          <demo-container api={ReloadString} code={ReloadCodeString}>
            <Reload />
          </demo-container>
          <demo-container api={BorderString} code={BorderCodeString}>
            <Border />
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
