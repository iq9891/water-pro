<script lang="jsx">
import Options from './options.vue';
import OptionsString from './options.md?raw';
import OptionsCodeString from './options.vue?raw';
import Basic from './basic.vue';
import BasicString from './basic.md?raw';
import BasicCodeString from './basic.vue?raw';
import Data from './data.vue';
import DataString from './data.md?raw';
import DataCodeString from './data.vue?raw';
import Radio from './radio.vue';
import RadioString from './radio.md?raw';
import RadioCodeString from './radio.vue?raw';
import RadioSelect from './radio-select.vue';
import RadioSelectString from './radio-select.md?raw';
import RadioSelectCodeString from './radio-select.vue?raw';
import Select from './select.vue';
import SelectString from './select.md?raw';
import SelectCodeString from './select.vue?raw';
import Header from './header.vue';
import HeaderString from './header.md?raw';
import HeaderCodeString from './header.vue?raw';
import BeforeClose from './before-close.vue';
import BeforeCloseString from './before-close.md?raw';
import BeforeCloseCodeString from './before-close.vue?raw';
import maxCheckCount from './max-check-count.vue';
import maxCheckCountString from './max-check-count.md?raw';
import maxCheckCountCodeString from './max-check-count.vue?raw';

import CN from '../index.zh-CN.md';

const md = {
  cn: `# TagModalList 标签选择器

    标签的快捷封装

## 何时使用

- 有很多标签需要展示
- 有很多标签需要隐藏
- 需要创建标签

    ## 代码演示`,
  us: `# TagModalList
TODO

## When To Use

TODO

    ## Examples `,
};
export default {
  category: 'Components',
  subtitle: '标签组',
  type: 'Data Display',
  title: 'TagGroup',
  render() {
    return (
      <div id="components-tag-demo">
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={OptionsString} code={OptionsCodeString}>
            <Options />
          </demo-container>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={DataString} code={DataCodeString}>
            <Data />
          </demo-container>
          <demo-container api={SelectString} code={SelectCodeString}>
            <Select />
          </demo-container>
          <demo-container api={HeaderString} code={HeaderCodeString}>
            <Header />
          </demo-container>
          <demo-container api={BeforeCloseString} code={BeforeCloseCodeString}>
            <BeforeClose />
          </demo-container>
          <demo-container api={RadioString} code={RadioCodeString}>
            <Radio />
          </demo-container>
          <demo-container api={RadioSelectString} code={RadioSelectCodeString}>
            <RadioSelect />
          </demo-container>
          <demo-container api={maxCheckCountString} code={maxCheckCountCodeString}>
            <maxCheckCount />
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
