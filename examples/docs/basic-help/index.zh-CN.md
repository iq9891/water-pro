## API

支持 `Typography.Title` 的所有属性，但是是纯展示的属性。操作交互的属性不支持自定义 json 形式，如 editable 。

| 参数      | 说明                         | 类型               | 可选值 | 默认值  |
| --------- | ---------------------------- | ------------------ | ------ | ------- |
| maxWidth  | 最大宽度                     | string             |        | 400px   |
| text      | 提示文字                     | string \| string[] |        | -       |
| showIndex | 当 `text 是 array` 是否显示  | boolean            |        | -       |
| color     | 内容的文字颜色               | string             |        | #ffffff |
| fontSize  | 内容的文字大小               | string             |        | 14px    |
| placement | 参照 [tooltip](./tooltip-cn) | string             |        | bottom  |
