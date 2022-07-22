## API

3.58.0 新增

### 属性

| 参数           | 说明                                    | 类型    | 默认值 | 版本 |
| -------------- | --------------------------------------- | ------- | ------ | ---- |
| allowClear | 支持清除 | boolean | true | |
| disabled | 是否禁用 | boolean | false |  |
| value(v-model) | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |  |
| options | options 数据 | array&lt;{value, label, children> | \[] |  |
| fieldNames | 自定义 options 中 label name children 的字段 | object | `children: 'items',label: 'name',value: 'code',` |  |
| size | 输入框大小，可选 `large` `default` `small` | string | `default` |  |
| maxTagCount | 最大显示标签数 | number | 1 |  |
| separator | 标签分隔符 | string | / |  |
| tagTextStyle | 标签样式 | string | width: 80px |  |
| placeholder | 占位文字 | string | 请选择 |  |
| preWidth | 每栏宽度 | number | 160 |  |
| preHeight | 每栏高度 | number | 270 |  |
| inputStyle | 选择框的样式 | string\|array\|object | - |  |

### 事件

| 事件名称 | 说明           | 回调参数          | 版本 |
| -------- | -------------- | ----------------- | ---- |
| change   | 变化时回调函数 | Function(e:Event) | -    |  |
