## API

> [支持的组件](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L85)

### FormPRO | useForm 参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| model | 表单数据对象 | object |  |  |
| labelWidth | 标签的文本的宽度 | Number \| String |  |  |
| fieldMapToTime | 标签的文本的宽度 | [字段，[开始时间的字段名字，结束时间的字段名字]， 时间格式化][] |  |  |
| actionAlgin | 底部操作按钮的对齐方式，当 `space-between` 的时候，是 flex 布局，适合多按钮。 | 'left' \| 'right' \| 'center' \| 'space-between' | left |  |
| actionAffix | 底部操作按钮是否悬停到底部 | boolean | - |  |
| actionTarget | 设置提交 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | - | 3.13.0 |
| actionOffsetBottom | 底部操作按钮悬停到底部的距离 | Number | 0 |  |
| baseGutter | 水平内联的间距 | number | 0 |  |
| autoSetPlaceHolder | 是否自定设置占位文字， RangePicker 无效 | boolean | true |  |
| submitOnReset | 点击提交是否重置字段及验证 | boolean | - |  |
| disabled | 是否禁用表单 | boolean | - |  |
| showActionButtonGroup | 是否显示操作按钮 | boolean | true |  |
| showResetButton | 是否显示重置按钮 | boolean | true |  |
| showSubmitButton | 是否显示确认按钮 | boolean | true |  |
| autoFocusFirstItem | 是否聚焦第一个输入框，只在第一个表单项为input的时候作用 | boolean | - |  |
| showAdvancedButton | 是否显示收起展开按钮 | boolean | - |  |
| autoAdvancedLine | 超过几行自动折叠 | number | 3 |  |
| emptySpan | 展开空占位的 span | number \| [ColEx](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L4) | 0 |  |
| transformDateFunc | 转化时间方法 | Function | `(date: any) => date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date` |  |
| hideRequiredMark | 是否显示标签必填的标识( * )， 只能在 form-pro 标签中设置 | boolean | - |  |
| colon | 是否显示标签文字的冒号 | boolean | true |  |
| compact | 是否紧凑模式 | boolean | - |  |
| resetClearValidate | 点击重置按钮是否清除验证提示 | boolean | true |  |
| schemas | 点击重置按钮是否清除验证提示 | [FormSchema](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L126) | [] |  |
| mergeDynamicData | 在单独动态验证方法( dynamicRules )中返回的多余字段的定义 | object | - |  |
| rulesMessageJoinLabel | 验证提示是否结合标签文字显示 | boolean | true |  |
| baseRowStyle | 整个表单的样式设置 | CSSProperties | - |  |
| baseColProps | 每个字段最基础的 col 配置，与每条字段配置中 colProps 合并配置，优先级低于 colProps | [ColEx](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L4) | - |  |
| actionColOptions | 操作行的 col 配置 | [ColEx](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L4) | - |  |
| labelCol | 配置字段标签区布局 | [ColEx](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L4) | - |  |
| wrapperCol | 配置字段内容区布局 | [ColEx](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/index.ts#L4) | - |  |
| resetButtonOptions | 重置[按钮配置](./button-cn) | object |  |  |
| submitButtonOptions | 确认[按钮配置](./button-cn) | object |  |  |
| size | 尺寸 | `default` \| `small` | `default` |  |
| navAffix | 顶部导航是否显示 | boolean | - | 3.17.0 |
| navTarget | 设置提交 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | - | 3.17.0 |
| navOffsetTop | 顶部操作按钮悬停到顶部的距离 | Number | 0 | 3.17.0 |

### FormPro 事件

| 事件名称 | 说明                   | 回调参数          | 版本 |
| -------- | ---------------------- | ----------------- | --- |
| register | 使用 useForm 的回调 | Function([formActionType](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L29)) |  |
| advanced-change   | 折叠的回调 | - |  |
| reset | 重置回调 | function(formModel(表单数据对象)) |  |
| submit | 验证成功的确定回调 | function(formModel(表单数据对象)) |  |

### useForm 事件

| 事件名称 | 说明                   | 回调参数          | 版本 |
| -------- | ---------------------- | ----------------- | --- |
| scrollToField | 滚动到验证失败 | [NamePath](https://github.com/fe6/water-pro/blob/next/components/form/interface.ts#L4), ScrollOptions) \| options |  |
| setProps | 设置属性 | - |  |
| resetAllModel | 重置所有数据 | - |  |
| updateSchema | 更新表单配置规则 schema | [FormSchema](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L126), replace(是否替换) |  |
| clearValidate | 清除验证 | 字段名字， string \| string[] |  |
| resetFields | 重置字段 | - |  |
| removeSchemaByFiled | 删除字段 | field(字段名，string \| string[]) |  |
| getFieldsValue | 获取所有字段的值，传 true 过滤不显示的字段 | filterHidden |  |
| getChildrenFieldsValue | 获取所有字段的值，符合 schema 结构，传 true 过滤不显示的字段 | filterHidden | 3.19.0 |
| setFieldsValue | 设置所有字段的值 | 设置的值 (object) |  |
| appendSchemaByField | 添加新字段 | schema(规则， [FormSchema](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L126))，参照的字段，是否在前面添加  |  |
| submit | 提交方法 | - |  |
| validate | 验证表单某些字段 | 字段的名字([NamePath](https://github.com/fe6/water-pro/blob/next/components/form/interface.ts#L4)) |  |
| validateFields | 真正所有表单字段 | 字段的名字([NamePath](https://github.com/fe6/water-pro/blob/next/components/form/interface.ts#L4)) |  |
