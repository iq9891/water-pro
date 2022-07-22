<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import SizeString from './size.md?raw';
import Size from './size.vue';
import SizeCodeString from './size.vue?raw';
import DisabledString from './disabled.md?raw';
import Disabled from './disabled.vue';
import DisabledCodeString from './disabled.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# CheckboxCascader 多选联级
           多选联级 **3.58.0** 新增
         ## 何时使用
         - 联级多选的补充
         ## 代码演示
        `,
  us: `# CheckboxCascader
           CheckboxCascader component
         ## When to use
         ## Examples
        `,
};

export default {
  category: 'Components',
  subtitle: '多选联级',
  type: 'Data Entry',
  zhType: '数据录入',
  title: 'CheckboxCascader',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={SizeString} code={SizeCodeString}>
            <Size />
          </demo-container>
          <demo-container api={DisabledString} code={DisabledCodeString}>
            <Disabled />
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
