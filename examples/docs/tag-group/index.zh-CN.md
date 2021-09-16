## API

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value(v-model) | 标签是否可以关闭 | boolean | false | |
| maxTagTextLength | 文字的长度，中文算2个长度，英文算一个长度 | number | 4 | |
| maxTagCount | 标签的个数，为 0 的时候显示所有 | number | 4 | |
| closable | 是否显示关闭按钮 | boolean | false | |
| createable | 是否显示创建按钮 | boolean | false | |
| createInputable | 是否输入框直接创建 | boolean | true | |
| createLoading | 创建是否加载中 | boolean | false | |
| removeLoading | 点击删除 icon 是否加载中 | boolean | false | |
| closeEmitAble | 创建的时候 input 失去焦点或者回车时候对 input 的操作 | boolean | true | |
| nameLabel | 显示标签名字的字段 | string | name | |
| createPlaceholder | 添加标签按钮文字 | string | 添加标签 | |
| color | 标签颜色 | string | blue | |
| tagStyle | 标签样式 | CSSProperties | - | |
| className | 最外层的 class 定制 | array \| string | - | |
| createIcon | type不是select模式，可以不显示+icon | boolean | true | 3.26.0 |
| createBordered | type不是select模式，可以不显示边框内边距 | boolean | true | 3.26.0 |
| showSelected | type不是select模式，是否显示已选 | boolean | true | 3.26.0 |
| disabled | 禁用 | boolean | - | 3.27.0 |

### 事件

| 事件名称 | 说明         | 回调参数    |
| -------- | ------------ | ----------- |
| close-click | 关闭时的回调 | (e) => void |
| create-click | 点击添加触发 | (e) => void |
| change | 输入框回车触发，返回输入内容， eventType 为 close | (inputValue, eventType) => void |
| change | 点击关闭按钮触发，返回当前关闭的值， eventType 为 remove | (name, eventType) => void |
