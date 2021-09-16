## API
> api 接口返回的每条数据格式必须是这样的。value 字段中是根据数据中的 value 字段匹配。

```json
[
  {
    label: 'water',
    value: 90
  },
]
```

### Select props

> 更多参数参考 [select](./select-cn)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| api | 接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| apiParams | 接口附带的参数 | object | {} | 
| loopGetOptions | 是否循环请求 api ，获取下拉选项 | boolean | false | 
| value(v-model) | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |
