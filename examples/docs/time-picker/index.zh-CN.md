## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addon | 选择框底部显示自定义的内容 | slot \| slot-scope | 无 |  |
| allowClear | 是否展示清除按钮 | boolean | true |  |
| autoFocus | 自动获取焦点 | boolean | false |  |
| clearText | 清除按钮的提示文案 | string | clear |  |
| defaultOpenValue | 当 defaultValue/value 不存在时，可以设置面板打开时默认选中的值 | [moment](http://momentjs.com/) | moment() |  |
| defaultValue | 默认时间 | [moment](http://momentjs.com/) | 无 |  |
| disabled | 禁用全部操作 | boolean | false |  |
| disabledHours | 禁止选择部分小时选项 | function() | 无 |  |
| disabledMinutes | 禁止选择部分分钟选项 | function(selectedHour) | 无 |  |
| disabledSeconds | 禁止选择部分秒选项 | function(selectedHour, selectedMinute) | 无 |  |
| format | 展示的时间格式 | string | "HH:mm:ss" |  |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |  |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |  |
| hourStep | 小时选项间隔 | number | 1 |  |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |  |
| minuteStep | 分钟选项间隔 | number | 1 |  |
| open(v-model) | 面板是否打开 | boolean | false |  |
| placeholder | 没有值的时候显示的内容 | string | "请选择时间" |  |
| popupClassName | 弹出层类名 | string | '' |  |
| popupStyle | 弹出层样式对象 | object | - |  |
| secondStep | 秒选项间隔 | number | 1 |  |
| suffixIcon | 自定义的选择框后缀图标 | string \| VNode \| slot | - |  |
| clearIcon | 自定义的清除图标 | string \| VNode \| slot | - | 1.5.0 |
| use12Hours | 使用 12 小时制，为 true 时 `format` 默认为 `h:mm:ss a` | boolean | false |  |
| value(v-model) | 当前时间 | [moment](http://momentjs.com/) | 无 |  |
| align | 该值将合并到 placement 的配置中，设置参考 [dom-align](https://github.com/yiminghe/dom-align) | Object | 无 | 1.5.4 |
| valueFormat | 可选，绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 moment 对象 | string，[具体格式](https://momentjs.com/docs/#/displaying/format/) | - | 1.5.4 |

### 事件

| 事件名称   | 说明                  | 回调参数                                                   |
| ---------- | --------------------- | ---------------------------------------------------------- |
| change     | 时间发生变化的回调    | function(time: moment \| string, timeString: string): void |
| openChange | 面板打开/关闭时的回调 | (open: boolean): void                                      |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
