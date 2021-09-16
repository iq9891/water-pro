<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Drag from './drag.vue';
import DragString from './drag.md?raw';
import DragCodeString from './drag.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 上传照片墙
  多张图片照片的封装。
  ## 何时使用
  - 需要多张上传图片
  - 卡片展示
        ## 代码演示`,
  us: `# UploadCard
  TODO


## When To Use

  ## Examples
  `,
};
export default {
  category: 'Components',
  subtitle: '上传照片墙',
  type: 'Data Entry',
  title: 'UploadCard',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={DragString} code={DragCodeString}>
            <Drag />
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
