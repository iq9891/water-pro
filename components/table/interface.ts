import { ExtractPropTypes, PropType, UnwrapRef } from 'vue';
import PropTypes, { withUndefined } from '../_util/vue-types';
import { PaginationProps as getPaginationProps, PaginationConfig } from '../pagination';
import { SpinProps as getSpinProps } from '../spin';
import { tuple } from '../_util/type';

const PaginationProps = getPaginationProps();
const SpinProps = getSpinProps();

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;
export const ColumnFilterItem = PropTypes.shape({
  text: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.array,
}).loose;

export const columnProps = {
  // 表头的名字，当与 customTitle 同时存在，那么优先 customTitle
  title: PropTypes.VNodeChild,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // 数据对应的字段显示
  dataIndex: PropTypes.string,
  // 自定义渲染列的 内容 函数
  customRender: PropTypes.func,
  // 设置单元格属性
  customCell: PropTypes.func,
  // 设置头部单元格属性
  customHeaderCell: PropTypes.func,
  // 设置列内容的对齐方式
  align: PropTypes.oneOf(tuple('left', 'right', 'center')),
  // 超过宽度将自动省略，暂不支持和排序筛选一起使用。设置为 true 时，表格布局将变成 tableLayout="fixed"。
  ellipsis: PropTypes.looseBool,
  // 自定义筛选
  filters: PropTypes.arrayOf(ColumnFilterItem),
  // onFilter: (value: any, record: T) => PropTypes.looseBool,
  // 是否多选
  filterMultiple: PropTypes.looseBool,
  // 	可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互
  filterDropdown: PropTypes.any,
  // 用于控制自定义筛选菜单是否可见
  filterDropdownVisible: PropTypes.looseBool,
  // onFilterDropdownVisibleChange?: (visible: boolean) => void;
  // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
  sorter: PropTypes.oneOfType([PropTypes.looseBool, PropTypes.func]),
  // 默认排序
  defaultSortOrder: PropTypes.oneOf(tuple('ascend', 'descend')),
  // 表头列合并,设置为 0 时，不渲染
  colSpan: PropTypes.number,
  // 列宽度
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // class 名字
  className: PropTypes.string,
  // 列是否固定，可选 true(等效于 left) 'left' 'right'
  fixed: withUndefined(
    PropTypes.oneOfType([PropTypes.looseBool, PropTypes.oneOf(tuple('left', 'right'))]),
  ),
  // 自定义 filter 图标。
  filterIcon: PropTypes.any,
  // 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组
  filteredValue: PropTypes.array,
  // 标识数据是否经过过滤，筛选图标会高亮
  filtered: PropTypes.looseBool,
  // 默认筛选值
  defaultFilteredValue: PropTypes.array,
  // 排序的受控属性，外界可用此控制列的排序，可设置为 'ascend' 'descend' false
  sortOrder: withUndefined(
    PropTypes.oneOfType([PropTypes.looseBool, PropTypes.oneOf(tuple('ascend', 'descend'))]),
  ),
  // 支持的排序方式，取值为 'ascend' 'descend'
  sortDirections: PropTypes.array,
  // children?: ColumnProps<T>[];
  // onCellClick?: (record: T, event: any) => void;
  // onCell?: (record: T) => any;
  // onHeaderCell?: (props: ColumnProps<T>) => any;
};

export type ColumnProps = Partial<ExtractPropTypes<typeof columnProps>> & {
  slots?: Record<string, string>;
};

export interface TableComponents {
  table?: any;
  header?: {
    wrapper?: any;
    row?: any;
    cell?: any;
  };
  body?: {
    wrapper?: any;
    row?: any;
    cell?: any;
  };
}

export const TableLocale = PropTypes.shape({
  filterTitle: PropTypes.string,
  filterConfirm: PropTypes.any,
  filterReset: PropTypes.any,
  emptyText: PropTypes.any,
  selectAll: PropTypes.any,
  selectInvert: PropTypes.any,
  sortTitle: PropTypes.string,
  expand: PropTypes.string,
  collapse: PropTypes.string,
}).loose;

export const RowSelectionType = PropTypes.oneOf(tuple('checkbox', 'radio'));
// export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: Object[]) => any;

export const tableRowSelection = {
  type: RowSelectionType,
  selectedRowKeys: PropTypes.array,
  // onChange?: (selectedRowKeys: string[] | number[], selectedRows: Object[]) => any;
  getCheckboxProps: PropTypes.func,
  // onSelect?: SelectionSelectFn<T>;
  // onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => any;
  // onSelectInvert?: (selectedRows: Object[]) => any;
  selections: withUndefined(PropTypes.oneOfType([PropTypes.array, PropTypes.looseBool])),
  hideDefaultSelections: PropTypes.looseBool,
  fixed: PropTypes.looseBool,
  columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectWay: PropTypes.oneOf(
    tuple('onSelect', 'onSelectMultiple', 'onSelectAll', 'onSelectInvert'),
  ),
  columnTitle: PropTypes.any,
};

export type SortOrder = 'descend' | 'ascend';

const paginationProps = PaginationConfig();

export const tableProps = {
  prefixCls: PropTypes.string,
  dropdownPrefixCls: PropTypes.string,
  rowSelection: PropTypes.oneOfType([PropTypes.shape(tableRowSelection).loose, Object]),
  pagination: withUndefined(
    PropTypes.oneOfType([
      PropTypes.shape<Partial<ExtractPropTypes<typeof paginationProps>>>(paginationProps).loose,
      PropTypes.looseBool,
    ]),
  ),
  size: PropTypes.oneOf(tuple('default', 'middle', 'small', 'large')),
  dataSource: PropTypes.array,
  components: PropTypes.object,
  columns: {
    type: Array as PropType<ColumnProps>,
  },
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowClassName: PropTypes.func,
  expandedRowRender: PropTypes.any,
  defaultExpandAllRows: PropTypes.looseBool,
  defaultExpandedRowKeys: PropTypes.array,
  expandedRowKeys: PropTypes.array,
  expandIconAsCell: PropTypes.looseBool,
  expandIconColumnIndex: PropTypes.number,
  expandRowByClick: PropTypes.looseBool,
  showMoreHandler: PropTypes.looseBool,
  moreHandlerTarget: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.shape(SpinProps).loose, PropTypes.looseBool]),
  locale: TableLocale,
  indentSize: PropTypes.number,
  customRow: PropTypes.func,
  customHeaderRow: PropTypes.func,
  useFixedHeader: PropTypes.looseBool,
  bordered: PropTypes.looseBool,
  showHeader: PropTypes.looseBool,
  footer: PropTypes.func,
  title: PropTypes.func,
  scroll: {
    type: Object as PropType<{
      x?: boolean | number | string;
      y?: boolean | number | string;
      scrollToFirstRowOnChange?: boolean;
    }>,
  },
  childrenColumnName: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  bodyStyle: PropTypes.style,
  sortDirections: {
    type: Array as PropType<SortOrder[]>,
  },
  tableLayout: PropTypes.string,
  getPopupContainer: PropTypes.func,
  expandIcon: PropTypes.func,
  transformCellText: PropTypes.func,
  onExpandedRowsChange: PropTypes.func,
  onExpand: PropTypes.func,
  onChange: PropTypes.func,
  onRowClick: PropTypes.func,
  // style?: React.CSSProperties;
  // children?: React.ReactNode;
};

export type TableRowSelection = Partial<ExtractPropTypes<typeof tableRowSelection>>;

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;

export interface TableStateFilters {
  [key: string]: string[];
}

export interface TableState {
  pagination?: Partial<ExtractPropTypes<typeof PaginationProps>>;
  filters?: TableStateFilters;
  sortColumn?: ColumnProps | null;
  sortOrder?: SortOrder;
  columns?: ColumnProps[];
}

export interface TransformCellTextProps {
  text: any;
  column: ColumnProps;
  record: any;
  index: number;
}

// export type SelectionItemSelectFn = (key: string[]) => any;

// export interface SelectionItem {
//   key: PropTypes.string,
//   text: PropTypes.any,
//   onSelect: SelectionItemSelectFn;
// }
export type TableStore = UnwrapRef<{
  selectedRowKeys: any[];
  selectionDirty: boolean;
}>;
export const SelectionCheckboxAllProps = {
  propsSymbol: PropTypes.any,
  store: PropTypes.any,
  locale: PropTypes.any,
  disabled: PropTypes.looseBool,
  getCheckboxPropsByItem: PropTypes.func,
  getRecordKey: PropTypes.func,
  data: PropTypes.array,
  prefixCls: PropTypes.string,
  hideDefaultSelections: PropTypes.looseBool,
  selections: PropTypes.oneOfType([PropTypes.array, PropTypes.looseBool]),
  getPopupContainer: PropTypes.func,
  onSelect: PropTypes.func,
};

// export interface SelectionCheckboxAllState {
//   checked: PropTypes.looseBool,
//   indeterminate: PropTypes.looseBool,
// }

export const MoreHandlerProps = {
  selectKey: PropTypes.array,
  prefixCls: PropTypes.string,
  target: PropTypes.func,
};

export const MoreDisplayProps = {
  selectKey: PropTypes.array,
  prefixCls: PropTypes.string,
};

export const SelectionBoxProps = {
  store: PropTypes.any,
  type: RowSelectionType,
  defaultSelection: PropTypes.array,
  rowIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  disabled: PropTypes.looseBool,
  id: PropTypes.string,
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
};

// export interface SelectionBoxState {
//   checked?: PropTypes.looseBool,
// }

export const FilterMenuProps = {
  locale: TableLocale,
  selectedKeys: PropTypes.array,
  column: PropTypes.object,
  confirmFilter: PropTypes.func,
  prefixCls: PropTypes.string,
  dropdownPrefixCls: PropTypes.string,
  getPopupContainer: PropTypes.func,
  handleFilter: PropTypes.func,
};

// export interface FilterMenuState {
//   selectedKeys: string[];
//   keyPathOfSelectedItem: { [key: string]: string };
//   visible?: PropTypes.looseBool,
// }
