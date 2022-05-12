## API

> 扩展于 Select 组件。更多参数参考 [select](./select-cn)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value(v-model) | 指定当前选中的条目 | string\|string\[]\|number\|number\[] | - |  |
| api | 下拉接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| apiParams | 下拉接口附带的参数 | object | {} |  |
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
| labelKey | 文字的字段 | string | label |  |
| valueKey | 值的字段 | string | value |  |
| selectOptions | selectOptions 数据 | array&lt;{value, label, [subLabel]}> | - |  |
| showDropdownAdd | 是否显示下拉中的添加按钮 | boolean | true |  |
| subClassify | 是否存在子分类，操作会有点不一样 | boolean | false | 3.50.0 |
| isAllClassify | 是否是全部分类 | Fucntion | (params: any)=>false | 3.50.0 |
| isOneClassify | 是否一级分类 | Fucntion | (params: any)=>params.parentId === 0 | 3.50.0 |
| drawerTableActionWidth | 管理操作的宽度 | Number | 200 | 3.53.0 |
| drawerTableDraggableBtn | 是否按钮排序 | boolean | - | 3.53.0 |
| showOneFirstSortBtn | 是否一级第一行 | Fucntion | (arg: any, table: any)=>arg.index > 1 | 3.53.0 |
| showOneLastSortBtn | 是否一级最后行 | Fucntion | (arg: any, table: any)=>arg.index < table.getDataSource().length - 1 | 3.53.0 |
| showOneFirstSortBtn | 是否二级第一行 | Fucntion | (arg: any, table: any)=>arg.index > 1 | 3.53.0 |
| showOneLastSortBtn | 是否二级最后行 | Fucntion | ({index, record}: any, table: any) =>  { const theParent = table.getDataSource().find(({id}: any) => id === record.parentId) return theParent && index < theParent.children.length - 1;} | 3.53.0 |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| on-edit | 创建编辑的时回调 | function | |
| on-remove | 删除的时回调 | function | |
| up-sort | 按钮拖拽上移 | function | 3.53.0 |
| down-sort | 按钮拖拽下移 | function | 3.53.0 |

### 插槽

| 插槽名称         | 说明             | 回调参数  | 版本   |
| ---------------- | ---------------- | --------- | ------ |
| optionButtonSlot | 下拉选项按钮扩展 | {loading} | 3.54.0 |
