<script lang="jsx">
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';

const md = {
  cn: `# 复制
  一个复制的工具方法。
  ## 何时使用
  - 需要复制个链接。
        ## 代码演示`,
  us: `# fuzhi`,
};
export default {
  category: 'Components',
  subtitle: '上传',
  type: 'Data Entry',
  title: 'Upload',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
        </demo-sort>
      </div>
    );
  },
};
</script>
