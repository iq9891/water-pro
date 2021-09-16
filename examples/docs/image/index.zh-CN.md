## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像描述 | string |  |  |
| fallback | 加载失败容错地址 | string |  |  |
| height | 图像高度 | string \| number |  |  |
| placeholder | 加载占位, 为 `true` 时使用默认占位 | boolean \| slot |  |  |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [previewType](https://2x.antdv.com/components/image-cn#previewType) | true |  |
| src | 图片地址 | string |  |  |
| width | 图像宽度 | string \| number |  |  |
| bordered | 图像边框 | boolean | true | 3.31.0 |


## previewType

```
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible) => void;
  getContainer: string | HTMLElement | (() => HTMLElement);
}
```

其他属性见 [img 标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)
