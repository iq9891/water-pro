## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value(v-model) | 用于设置当前选中的值 | string | - |
| disabled | 禁选颜色选器 | boolean | false |
| size | 大小，只对按钮样式生效 | `large` \| `default` \| `small` | `default` |
| alpha | 是否支持透明度选择 | boolean | false |
| hue | 是否显示色调滑块 | boolean | true |
| format | 写入 v-model 的颜色的格式 | `hsl` \| `hsv` \| `hex` \| `rgb` | false |
| predefine | 预定义颜色 | array | ['rgba(244, 67, 54, 1)','rgba(233, 30, 99, 0.95)','rgba(156, 39, 176, 0.9)','rgba(103, 58, 183, 0.85)','rgba(63, 81, 181, 0.8)','rgba(33, 150, 243, 0.75)','rgba(3, 169, 244, 0.7)','rgba(0, 188, 212, 0.7)','rgba(0, 150, 136, 0.75)','rgba(76, 175, 80, 0.8)','rgba(139, 195, 74, 0.85)','rgba(205, 220, 57, 0.9)','rgba(255, 235, 59, 0.95)','rgba(255, 193, 7, 1)'] |
| config | picker 的配置，具体参照 [@simonwep/pickr](https://www.npmjs.com/package/@simonwep/pickr) | object | - |
| locale | picker 的多语言配置 | object | - |
| colorRounded | 颜色数值保留几位小数 | number | - |
| padding | 弹框间距 | number | 16 |
| getPopupContainer | 指定渲染容器 | function | - |

### 事件

| 事件名称   | 说明                               | 回调参数         | 版本 |
| ---------- | ---------------------------------- | ---------------- | ---- |
| change     | 切换面板的回调                     | function(key)    |      |
| openChange | 面板中当前显示的颜色发生改变时触发 | function(status) |      |
