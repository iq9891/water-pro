<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# 文字查看图片
  说明中一段问题的预览示例。
  ## 何时使用
  - 一段文字中的图片示例
        ## 代码演示`,
  us: `# UploadName
  TODO


## When To Use

  ## Examples
  `,
};
export default {
  category: 'Components',
  subtitle: '头像',
  type: 'Data Display',
  zhType: '数据展示',
  title: 'PreviewImage',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
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
