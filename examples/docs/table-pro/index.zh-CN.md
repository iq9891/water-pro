## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| clickToRowSelect | 点击行选中 | boolean | - |  |
| isTreeTable | 是否是树形表格，如果数据里面有 ***children*** 字段，表格自动为树形表格。当 isTreeTable = true 的时候，数据中设置 `flag: 'INDEX'` 不起作用 | boolean | - |  |
| showIndexColumn | 是否显示序号列 | boolean | - |  |
| inset | 取消表格外部的默认 `padding` | boolean | - |  |
| autoCreateKey | 是否自动生成 rowKey 配置 | boolean | - |  |
| showTableSetting | 是否显示表格右上角的设置和刷新按钮 | boolean | - |  |
| showSummary | 是否显示合计行 | boolean | - |  |
| immediate | 是否立即请求接口 | boolean | true |  |
| useSearchForm | 是否使用搜索表单 | boolean | true |  |
| showIndexColumn | 是否显示序号列 | boolean | - |  |
| ellipsis | 文本超过宽度是否显示 `...` | boolean | - |  |
| draggable | 拖拽培训 | boolean | - | 3.17.0 |
| canResize | 是否可以自适应高度 | boolean | - |  |
| bordered | 是否显示边框 | boolean | - |  |
| pagination | 分页配置 | [`PaginationProps`](ttps://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/pagination.ts#15) \| boolean | - |  |
| clearSelectOnPageChange | 在分页改变的时候清空选项 | boolean | - |  |
| loading | 是否加载 | boolean | - |  |
| emptyDataIsShowTable | 在开起搜索表单的时候，如果没有数据是否显示表格 | boolean | true |  |
| resizeHeightOffset | 自适应高度偏移，计算结果-偏移量 | number | - |  |
| maxHeight | 表格滚动最大高度 | number | - |  |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | `string` | `((record: Recordable) => string)` | - |  |
| titleHelpMessage | 标题右侧提示 | string \| `string[]` | - |  |
| title | 表格标题 | string | - |  |
| size | 表格紧密度 | [SizeType](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#L94) | default |  |
| tableSetting | 设置右上角显示的icon | [TableSetting](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#L143) | - | - |
| sortFn | 自定义排序方法 | Function | - |  |
| filterFn | 自定义筛选方法 | Function | - |  |
| summaryFunc | 计算合计行的方法 | Function | - |  |
| beforeFetch | 请求之前处理参数 | Function | - |  |
| afterFetch | 自定义处理接口返回参数 | Function | - |  |
| handleSearchInfoFn | 查询条件请求之前处理 | Function | - |  |
| totalRender | 分页总数的配置 | `(total: number, range: [number, number]) => any` | - |  |
| fetchSetting | 请求接口配置 | [FetchSetting](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#L132) | - |  |
| api | 接口请求，不支持 async 和 Promise ，只支持回调 | `(...arg: any) => Promise<any>` | - |  |
| summaryData | 自定义合计表格内容 | object[] | - |  |
| dataSource | 表格数据 | object[] | - |  |
| searchInfo | 额外的请求接口的数据 | object | - |  |
| scroll | 表格滚动条设置 | `{ x?: number | true; y?: number }` | - |  |
| formConfig | 查询条件的配置 | [`Partial<FormProps>`](https://github.com/fe6/water-pro/blob/next/components/form/Form.tsx#L67) | - |  |
| columns | 表格列的配置 | [BasicColumn](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#414) | - |  |
| indexColumnProps | 序号列配置 | [BasicColumn](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#414) | - |  |
| actionColumn | 操作列的配置 | [BasicColumn](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#414) | - |  |
| rowClassName | row 的 class 名字 | `(record: TableCustomRecord<T>) => string` | - |  |
| rowSelection | row 的 selection 配置 | [TableRowSelection](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#21) | - |  |

> 更多参数参考 [TableProProps](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#414)

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| register | 使用 useTable 的回调 | Function([formActionType](https://github.com/fe6/water-pro/blob/next/components/form-pro/src/types/form.ts#L29)) |  |
| fetch-success | api 参数请求成功的回调 | Function({ items: 结果数据, total: 总数, params: 参数 }) |  |
| fetch-error | api 参数请求失败的回调 | Function(error: any) |  |
| fetch-finally | api 参数请求成功失败都会回调 | Function() |  |
| selection-change | 表格 rowSelection 的 change 回调 | `Function(keys： string[] | number[]，rows: any[])` |  |
| row-click | 表格 row-click 的回调 | `Function(record: Recordable<any>, index: number, e: Event)` |  |
| row-dbClick | 表格 row-dbClick 的回调 | `Function(record: Recordable<any>, index: number, e: Event)` |  |
| row-contextmenu | 表格 row-contextmenu 的回调 | `Function(record: Recordable<any>, index: number, e: Event)` |  |
| row-mouseenter | 表格 row-mouseenter 的回调 | `Function(record: Recordable<any>, index: number, e: Event)` |  |
| row-mouseleave | 表格 row-mouseleave 的回调 | `Function(record: Recordable<any>, index: number, e: Event)` |  |

### useTable 返回的方法 ( TableActionType )
> 更多参数参考 [TableProProps](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#102)

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| reload | 重新请求接口 | Function(opt?: [FetchParams](https://github.com/fe6/water-pro/blob/next/components/table-pro/src/types/table.ts#79)) |
| getSelectRows | 获取选中行 | - |
| clearSelectedRowKeys | 清空选中行 | - |
| getSelectRowKeys | 获取选中行 Key | - |
| deleteSelectRowByKey | 删除选中的某几个 | Function(keys: string[]) |
| setPagination | 设置分页 | - |
| setTableData | 设置表格数据 | - |
| getColumns | 获取表头配置 | - |
| setColumns | 设置表头配置 | - |
| getDataSource | 获取表格数据 | - |
| setLoading | 设置表格加载状态 | - |
| getLoading | 获取表格加载状态 | - |
| setProps | 获取表格配置 | - |
| setSelectedRowKeys | 设置选中的表格行 | Function(keys: string[]) |
| getPaginationRef | 获取表格分页实例 | - |
| getSize | 获取表格紧密度 | - |

### a-table-image API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| imgList | 图片的数据 | string[] | - |  |

### a-table-card API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| imgSize | 图片的尺寸 | number | 80 | 3.33.0 |
| imgUrl | 图片的地址 | string | '' | 3.33.0 |
| imgBorderd | 图片的边框 | boolean | true | 3.33.0 |
| imgPreview | 图片的预览 | boolean | false | 3.33.0 |
| imgErrorImage | 图片加载错误展示 | string | - | 3.33.0 |
| title | 标题 | string | - | 3.33.0 |
| titleMaxLength | 标题最大展示长度 | number | 14 | 3.33.0 |
| desc | 描述 | string | - | 3.33.0 |
| descMaxLength | 描述最大展示长度 | number | 14 | 3.34.0 |
| cardable | 卡片表格 | boolean | false | 3.35.0 |
| cardTitle | 卡片标题 | string | - | 3.35.0 |

### a-table-card slots

| 名称 | 说明 | 参数 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| titleSuffix | 标题末尾的追加 |  | - | 3.33.0 |
