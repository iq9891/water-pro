## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultFullscreen | 是否全屏 | boolean | - |  |
| canFullscreen | 是否全屏按钮 | boolean | - |  |
| bodyStyle | 内容的高度 | object | - |  |
| minHeight | 内容的最小高度 | number | - |  |
| width | 内容的宽度 | number | - |  |
| title | 弹框标题， 为 `null` 的时候就隐藏标题 | string \| null | - |  |
| text | 标题边上的帮助提示 | string | - |  |
| loadingTip | 内容区域加载的文案 | string | - |  |
| loading | 内容区域是否加载 | boolean | - |  |

### modalMethods 中的方法

| 方法名称 | 说明 |
| ----- | ----- |
| setModalProps | 设置 Modal Pro 属性 |
| getVisible | 获取弹框显示状态 |
| redoModalHeight | 设置弹框整体的高度 |
| openModal | 直接不传参数的调用是打开弹框，传 `false` 是关闭弹框 |
