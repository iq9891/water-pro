## 使用

ConfigProvider 使用 Vue 的 [provide / inject](https://vuejs.org/v2/api/#provide-inject) 特性，只需在应用外围包裹一次即可全局生效。

ConfigProvider 使用 Vue 的 [provide / inject](https://vuejs.org/v2/api/#provide-inject){:target="_blank"} 特性，只需在应用外围包裹一次即可全局生效。

```html
<template>
  <a-config-provider :getPopupContainer="getPopupContainer">
    <app />
  </a-config-provider>
</template>
<script>
  export default {
    methods: {
      getPopupContainer(el, dialogContext) {
        if (dialogContext) {
          return dialogContext.getDialogWrap();
        } else {
          return document.body;
        }
      },
    },
  };
</script>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | true |  |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - |  |
| renderEmpty | 自定义组件空状态。参考 [空状态](./empty-cn) | slot-scope \| Function(componentName: string): VNode | - |  |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | Function(triggerNode, dialogContext) | () => document.body |  |
| locale | 语言包配置，语言包可到 [locale](http://unpkg.com/@fe6/water-pro/components/locale/) 目录下寻找 | object | - | 1.5.0 |
| pageHeader | 统一设置 pageHeader 的 ghost，参考 [pageHeader](<(/components/page-header)>) | { ghost: boolean } | 'true' | 1.5.0 |
| transformCellText | Table 数据渲染前可以再次改变，一般用户空数据的默认配置 | Function({ text, column, record, index }) => any | - | 1.5.4 ｜ |

## FAQ

#### 为什么我使用了 ConfigProvider `locale`，时间类组件的国际化还有问题？

请检查是否设置了 `moment.locale('zh-cn')`，或者是否有两个版本的 moment 共存。

#### 配置 `getPopupContainer` 导致 Modal 报错？

当如下全局设置 `getPopupContainer` 为触发节点的 parentNode 时，由于 Modal 的用法不存在 `triggerNode`，这样会导致 `triggerNode is undefined` 的报错，需要增加一个判断条件。

```diff
 <ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
 >
   <App />
 </ConfigProvider>
```
