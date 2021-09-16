/** @format */

import type { Component } from 'vue';
import type { ComponentType } from './types/index';

import AutoComplete from '../../auto-complete';
import ColorPicker from '../../color-picker';
import DatePicker from '../../date-picker';
import Select from '../../select';
import SelectApi from '../../select-api';
import Checkbox from '../../checkbox';
import Cascader from '../../cascader';
import CascaderApi from '../../cascader-api';
import Input from '../../input';
import InputNumber from '../../input-number';
import Radio from '../../radio';
import Switch from '../../switch';
import TimePicker from '../../time-picker';
import TreeSelect from '../../tree-select';
import UploadName from '../../upload-name';
import UploadImage from '../../upload-image';
import TagGroup from '../../tag-group';
import TagModalList from '../../tag-modal-list';
import UploadCard from '../../upload-card';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSmsCode', Input.SmsCode);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('InputCount', Input.InputCount);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
componentMap.set('SelectApi', SelectApi);

componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('Cascader', Cascader);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('RangeGroupPicker', DatePicker.RangePickerGroup);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('YearPicker', DatePicker.YearPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('TimeRangePicker', TimePicker.RangePicker);
componentMap.set('ColorPicker', ColorPicker);

componentMap.set('TagGroup', TagGroup);
componentMap.set('TagModalList', TagModalList);

componentMap.set('UploadName', UploadName);
componentMap.set('UploadImage', UploadImage);
componentMap.set('UploadCard', UploadCard);
componentMap.set('CascaderApi', CascaderApi);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
