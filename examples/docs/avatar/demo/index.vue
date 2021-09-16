<script lang="jsx">
import BasicString from './basic.md?raw';
import Basic from './basic.vue';
import BasicCodeString from './basic.vue?raw';
import BadgeString from './badge.md?raw';
import Badge from './badge.vue';
import BadgeCodeString from './badge.vue?raw';
import TypeString from './type.md?raw';
import Type from './type.vue';
import TypeCodeString from './type.vue?raw';
import DynamicString from './dynamic.md?raw';
import Dynamic from './dynamic.vue';
import DynamicCodeString from './dynamic.vue?raw';
import CN from '../index.zh-CN.md';

const md = {
  cn: `# Avatar头像
          用来代表用户或事物，支持图片、图标或字符展示。
          ## 设计师专属
安装 [Kitchen Sketch 插件 �](https://kitchen.alipay.com)，一键填充高逼格头像和文本.

          ## 代码演示`,
  us: `# Avatar
          Avatars can be used to represent people or objects. It supports images, 'Icon's, or letters.
          ## Examples
          `,
};
export default {
  category: 'Components',
  subtitle: '头像',
  type: 'Data Display',
  zhType: '数据展示',
  title: 'Avatar',
  render() {
    return (
      <div>
        <Md cn={md.cn} us={md.us} />
        <demo-sort>
          <demo-container api={BasicString} code={BasicCodeString}>
            <Basic />
          </demo-container>
          <demo-container api={TypeString} code={TypeCodeString}>
            <Type />
          </demo-container>
          <demo-container api={BadgeString} code={BadgeCodeString}>
            <Badge />
          </demo-container>
          <demo-container api={DynamicString} code={DynamicCodeString}>
            <Dynamic />
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
[id^='components-avatar-demo-'] .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}

#components-avatar-demo-with-badge .ant-avatar {
  margin-top: 0;
  margin-right: 0;
}
</style>
