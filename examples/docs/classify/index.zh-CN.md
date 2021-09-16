## API

> 扩展于 Select 组件。更多参数参考 [select](./select-cn)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value(v-model) | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |
| api | 下拉接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| apiParams | 下拉接口附带的参数 | object | {} |
| removeApi | 删除接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| removeApiParams | 删除接口附带的参数 | object | {} |  |
| removeTip | 删除接口提示 | string | - |  |
| removeKey | 删除的默认唯一索引，用于loading | string | id |  |
| editApi | 编辑接口请求，自动传递 id ，数据列表必须有个id，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| editApiParams | 编辑接口附带的参数 | object | {} |  |
| createApi | 创建接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| createApiParams | 创建接口附带的参数 | object | {} |  |
| createFormConfig | 添加弹框的表单配置 | [FormSchema](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L126) | {} |  |
| createTitle | 添加的弹框标题 | string | 添加 |  |
| editTitle | 编辑的弹框标题 | string | 编辑 |  |
| drawerTitle | 添加的抽屉标题 | string | 管理 |  |
| drawerWidth | 添加的抽屉宽度 | number | 650 |  |
| drawerZIndex | 添加的抽屉层级高度 | number | 1000 |  |
| drawerCreateButtonText | 抽屉添加的文案 | string | 添加 |  |
| drawerTableApi | 抽屉接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| drawerTableApiParams | 抽屉接口附带的参数 | object | {} |  |
| drawerTableColumns | 抽屉表格列的配置 | [BasicColumn](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#414) | - |  |
| drawerTableDraggable | 是否拖拽排序 | boolean | - |  |
| drawerTableDragKey | 会返回所有排好序的 id 值的数组 | string | id |  |
| drawerTableDragApi | 拖拽排序接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| subLabelKey | 子选项的描述字段，当设置才会显示 | string | - |  |
| labelKey | 文字的字段 | string | - | label |
| valueKey | 值的字段 | string | - | value |
| selectOptions | selectOptions 数据 | array&lt;{value, label, [subLabel]}> | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| on-edit | 创建编辑的时回调 | function |
| on-remove | 删除的时回调 | function |
