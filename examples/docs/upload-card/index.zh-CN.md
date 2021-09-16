## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value(v-model) | 上传的值 | string \| object | - | - |
| onFormChange | 上传之后触发的方法 | function | () => {} | - |
| mergeOriginDatas | 设置 form 提交的数据 | function | - | - |
| headers | 上传图片的 headers 设置 | - | - | |
| placeholder | 上传按钮的文案 | - | - | |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | 'image/png', 'image/jpeg' |  |
| action | 上传的地址 | string | 无 |  |
| autoUpload | 是否自动上传 | boolean | true |  |
| resultKey | ajax 返回来的数据存放的字段 | string | 'data' |  |
| nameKey | 图片名字存储的字段 | string | 'name' |  |
| urlKey | 图片地址存储的字段 | string | 'url' |  |
| limitSize | 图片限制的大小 | number | 2(M) |  |
| disabled | 禁用 | boolean | - |  |
| draggable | 拖拽改变位置 | boolean | - | 3.12.0 |
| imageWidth | 图片宽度 | number | 100 |  |
| imageHeight | 图片高度 | number | 100 |  |
| errorImage | value 加载失败的显示 | string |  |  |
| size | 设置按钮大小，可选值为 `small` `large` 或者不设 | string | `default` |  |
| maxUploadCount | 最多上传多少张 | number | - |  |
| objectFit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | contain \| cover | - |  |
 
### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| change | 上传文件改变时的状态，详见 [change](#change) | Function | 无 |  |
| changeUpload | 上传改变，与 change 分隔，用在 form pro 配置中 | Function(file) | 无 |  |
