## API

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | - |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | - |  |
| delete | 添加删除线样式 | boolean | - |  |
| size | 设置大小，可选值为 `small` `large` 或者不设 | string | `default` | 3.14.0 |
| disabled | 禁用文本 | boolean | - |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [copyable](#copyable) | - |  |
| ellipsis | 自动溢出省略 | boolean | - |  |
| keyboard | 添加键盘样式 | boolean | - |  |
| mark | 添加标记样式 | boolean | - |  |
| strong | 是否加粗 | boolean | - |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - |  |
| underline | 添加下划线样式 | boolean | - |  |
| resetable | 是否重置默认样式 | boolean | true |  |
| content(v-model) | 当使用 ellipsis 或 editable 时，使用 content 代替 children | string | - |  |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | - |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | - |  |
| delete | 添加删除线样式 | boolean | - |  |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` | 3.14.0 |
| disabled | 禁用文本 | boolean | - |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [copyable](#copyable) | - |  |
| ellipsis | 自动溢出省略 | boolean | - |  |
| level | 重要程度，相当于 h1、h2、h3、h4、h5、h6 | number: 1, 2, 3, 4, 5, 6 | 1 |  |
| mark | 添加标记样式 | boolean | - |  |
| strong | 是否加粗 | boolean | - |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - |  |
| underline | 添加下划线样式 | boolean | - |  |
| resetable | 是否重置默认样式 | boolean | true |  |
| content(v-model) | 当使用 ellipsis 或 editable 时，使用 content 代替 children | string | - |  |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | - |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | - |  |
| delete | 添加删除线样式 | boolean | - |  |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` | 3.14.0 |
| disabled | 禁用文本 | boolean | - |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [copyable](#copyable) | - |  |
| ellipsis | 自动溢出省略 | boolean | - |  |
| mark | 添加标记样式 | boolean | - |  |
| strong | 是否加粗 | boolean | - |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - |  |
| underline | 添加下划线样式 | boolean | - |  |
| resetable | 是否重置默认样式 | boolean | true |  |
| content(v-model) | 当使用 ellipsis 或 editable 时，使用 content 代替 children | string | - |  |

### slots

| 名称 | 说明 | 参数 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| editableIcon | 自定义编辑图标 |  | `<EditOutlined />` |  |
| editableTooltip | 自定义提示文本，当 editable.tooltip = false 时关闭 |  | 编辑 |  |
| copyableIcon | 自定义拷贝图标 |  | `copied ? <CheckOutlined /> : <CopyOutlined />` |  |
| copyableTooltip | 自定义提示文案，当 copyable.tooltip = false 时关闭 |  | `copied ? '复制成功' : '复制'` |  |
| ellipsisSymbol | 自定义展开描述文案 |  |  |  |
| ellipsisTooltip | 省略时，展示提示信息 |  |  |  |

### copyable

``` json
{
  text: string,
  onCopy: function,
  tooltip: false,
}
```

| 名称 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| text | 拷贝到剪切板里的文本 | string | | |
| tooltip | 是否展示提示文本 | boolean | true | |
| onCopy | 拷贝成功的回调函数 | function | | |

### editable

``` json
{
  tooltip: boolean,
  editing: boolean,
  maxlength: number,
  autoSize: boolean | { minRows: number, maxRows: number },
  onStart: function,
  onChange: function(string),
  onCancel: function,
  onEnd: function,
}
```

| 名称 | 说明 | 类型	 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoSize | 自动 resize 文本域 | boolean | { minRows: number, maxRows: number } | |
| editing | 控制是否是编辑中状态 | boolean | false | |
| maxlength | 编辑中文本域最大长度 | number | | |
| tooltip | 是否展示提示文本 | boolean | true | |
| onCancel | 按 ESC 退出编辑状态时触发 | function | | |
| onChange | 文本域编辑时触发 | function(event) | | |
| onStart | 进入编辑中状态时触发 | function | | |
| onEnd | 按 ENTER 结束编辑状态时触发 | function | | |

### ellipsis

``` json
{
  rows: number,
  expandable: boolean,
  suffix: string,
  symbol: string,
  tooltip: boolean,
  onExpand: function(event),
  onEllipsis: function(ellipsis),
}
```

| 名称 | 说明 | 类型	 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| expandable | 是否可展开 | boolean |  |  |
| rows | 最多显示的行数 | boolean |  |  |
| suffix | 自定义省略内容后缀 | string |  |  |
| symbol | 自定义展开描述文案 | string | 展开 |  |
| tooltip | 省略时，展示提示信息 | boolean \| string |  |  |
| onEllipsis | 触发省略时的回调 | function(ellipsis) |  |  |
| onExpand | 点击展开时的回调 | function(event) |  |  |
