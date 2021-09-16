## API

更多 ***帮助提示*** 的参数，参考 [basic-help](./basic-help-cn) 。更多 ***延迟容器*** 的参数，参考 [container-lazy](./container-lazy-cn) 。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value(v-model) | 是否显示内容 | boolean | false | - |
| title | 标题 | string | - | - |
| text | 帮助提示。 | string | - | - |
| expanable | 是否可展开内容 | boolean | true | - |
| triggerWindowResize | 是否监听窗口改变 | boolean | - | - |
| loading | 是否加载中 | boolean | - | - |
| lazy | 是否延迟加载 | boolean | - | - |
| titleLevel | 标题字号 | number | 5 | 3.24.0 |

### 事件

| 事件名称    | 说明                     | 回调参数              |
| ----------- | ------------------------ | --------------------- |
| openChange  | 弹出日历和关闭日历的回调 | function(status)      |
| panelChange | 日期面板变化时的回调     | function(value, mode) | - |
