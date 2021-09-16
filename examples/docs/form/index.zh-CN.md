## API

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| model | 表单数据对象 | object |  |  |
| rules | 表单验证规则 | object | 无 |  |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |  |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' | 1.5.0 |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid-cn/#Col) |  |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn/#Col) |  |  |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | true |  |
| validateOnRuleChange | 是否在 rules 属性改变后立即触发一次验证 | boolean | true |  |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean | boolean \| [options](https://github.com/stipsan/scroll-into-view-if-needed/#options) |  |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string |  |  |
| validateTrigger | 统一设置字段校验规则 | string | string[] | change |  |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| submit | 数据验证成功后回调事件 | Function(e:Event) |  |
| validate | 任一表单项被校验后触发 | 被校验的表单项 name 值，校验是否通过，错误消息（如果存在） |  |
| finish | 提交表单且数据验证成功后回调事件 | function(values) |  |
| finishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) |  |

### 方法

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- | --- |
| validate | 触发表单验证, 同 validateFields | (nameList?: [NamePath](./components/form-cn#NamePath)[]) => Promise |  |
| validateFields | 触发表单验证 | (nameList?: [NamePath](./components/form-cn#NamePath)[]) => Promise |  |
| scrollToField | 滚动到对应字段位置 | (name: [NamePath](./components/form-cn#NamePath), options: [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)) => void |  |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | - |  |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 name 属性或者 name 组成的数组，如不传则移除整个表单的校验结果 | Function(name: array | string) |  |

### Form.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string |  |  |
| rules | 表单验证规则 | object \| array |  |  |
| autoLink | 是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联，参见下方注意事项 | boolean | true |  |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | boolean | true |  |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|slot |  |  |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|slot |  |  |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string |  | 1.5.0 |
| label | label 标签的文本 | string\|slot |  |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid-cn/#Col) |  |  |
| labelAlign | 标签文本对齐方式 | 'left' \| 'right' | 'right' | 1.5.0 |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |  |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn/#Col) |  |  |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。 | boolean | false |  |
| validateTrigger | 设置字段校验的时机 | string \| string[] | change |  |

### 注意：

Form.Item 会对唯一子元素进行劫持，并监听 blur 和 change 事件，来达到自动校验的目的，所以请确保表单域没有其它元素包裹。如果有多个子元素，将只会监听第一个子元素的变化。如果要监听的表单域不满足自动监听的条件，可以通过如下方式关联表单域：

```html
<a-form-item name="form.name" ref="name" :autoLink="false">
  <a-input v-model:value="other" />
  <span>hahha</span>
  <div>
    <a-input
      v-model:value="form.name"
      @blur="() => {$refs.name.onFieldBlur()}"
      @change="() => {$refs.name.onFieldChange()}"
    />
  </div>
</a-form-item>
```

### 校验规则

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- | --- |
| trigger | 枚举类型 | 'blur' | 'change' | ['change', 'blur'] | - |  |
| enum | 枚举类型 | string | - | - |
| len | 字段长度 | number | - | - |
| max | 最大长度 | number | - | - |
| message | 校验文案 | string | - | - |
| min | 最小长度 | number | - | - |
| pattern | 正则表达式校验 | RegExp | - | - |
| required | 是否必选 | boolean | `false` | - |
| transform | 校验前转换字段值 | function(value) => transformedValue:any | - | - |
| type | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string | 'string' | - |
| validator | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | function(rule, value, callback) | - | - |
| whitespace | 必选时，空格是否会被视为错误 | boolean | `false` | - |

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。
