/** @format */

type ColSpanType = number | string;
export interface ColEx {
  style?: any;
  /**
   * raster number of cells to occupy, 0 corresponds to display: none
   * @default none (0)
   * @type ColSpanType
   */
  span?: ColSpanType;

  /**
   * raster order, used in flex layout mode
   * @default 0
   * @type ColSpanType
   */
  order?: ColSpanType;

  /**
   * the layout fill of flex
   * @default none
   * @type ColSpanType
   */
  flex?: ColSpanType;

  /**
   * the number of cells to offset Col from the left
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType;

  /**
   * the number of cells that raster is moved to the right
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType;

  /**
   * the number of cells that raster is moved to the left
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType;

  /**
   * <576px and also default setting, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: ColEx | ColSpanType;

  /**
   * ≥576px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: ColEx | ColSpanType;

  /**
   * ≥768px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: ColEx | ColSpanType;

  /**
   * ≥992px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: ColEx | ColSpanType;

  /**
   * ≥1200px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: ColEx | ColSpanType;

  /**
   * ≥1600px, could be a span value or an object containing above props
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl?: ColEx | ColSpanType;
}

export type ComponentType =
  | 'Input'
  | 'InputCount'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSmsCode'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'SelectApi'
  | 'SelectOptGroup'
  | 'TreeSelect'
  | 'Transfer'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'RangeGroupPicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'TimeRangePicker'
  | 'YearPicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'NameTransferModalTag'
  | 'TagGroup'
  | 'TagModalList'
  | 'UploadName'
  | 'UploadImage'
  | 'UploadCard'
  | 'TableRedPacket'
  | 'ColorPicker'
  | 'CascaderApi'
  | 'MaterialSelect'
  | 'Render'
  | 'Slot';
