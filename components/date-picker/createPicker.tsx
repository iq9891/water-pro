import { CSSProperties, DefineComponent, defineComponent, inject, nextTick } from 'vue';
import moment from 'moment';
import omit from 'lodash-es/omit';
import MonthCalendar from '../vc-calendar/src/MonthCalendar';
import YearCalendar from '../vc-calendar/src/YearCalendar';
import VcDatePicker from '../vc-calendar/src/Picker';
import classNames from '../_util/classNames';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';
import CalendarOutlined from '@ant-design/icons-vue/CalendarOutlined';
import { defaultConfigProvider } from '../config-provider';
import interopDefault from '../_util/interopDefault';
import BaseMixin from '../_util/BaseMixin';
import PropTypes from '../_util/vue-types';
import { hasProp, getOptionProps, getComponent, isValidElement } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import { formatDate } from './utils';
import { getDataAndAriaProps } from '../_util/util';
import TagGroup from '../tag-group';

export interface PickerProps {
  value?: moment.Moment;
  open?: boolean;
  prefixCls?: string;
}
export interface PickerState {
  sOpen?: boolean;
  sValue?: moment.Moment | null;
  showDate?: moment.Moment | null;
}
export default function createPicker<P>(
  TheCalendar: DefineComponent<P>,
  props: any,
  name: string,
): any {
  return defineComponent({
    name,
    mixins: [BaseMixin],
    inheritAttrs: false,
    props: {
      ...props,
      allowClear: PropTypes.looseBool.def(true),
      showToday: PropTypes.looseBool.def(true),
    },
    setup() {
      return {
        configProvider: inject('configProvider', defaultConfigProvider),
        input: undefined,
        sPrefixCls: undefined,
      };
    },
    data(): PickerState {
      const value = this.value || this.defaultValue;
      return {
        sValue: value,
        showDate: value,
        sOpen: !!this.open,
      };
    },
    watch: {
      open(val) {
        const props: PickerProps = getOptionProps(this);
        const state: PickerState = {};
        state.sOpen = val;
        if ('value' in props && !val && props.value !== this.showDate) {
          state.showDate = props.value;
        }
        this.setState(state);
      },
      value(val) {
        const state: PickerState = {};
        state.sValue = val;
        if (val !== this.sValue) {
          state.showDate = val;
        }
        this.setState(state);
      },
      sOpen(val, oldVal) {
        nextTick(() => {
          if (!hasProp(this, 'open') && oldVal && !val) {
            this.focus();
          }
        });
      },
    },
    methods: {
      saveInput(node: any) {
        this.input = node;
      },
      clearSelection(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.handleChange(this.type === 'multiple' ? [] : null);
      },

      handleChange(value: moment.Moment | moment.Moment[] | null) {
        const isMultiple = this.type === 'multiple';
        if (!hasProp(this, 'value')) {
          this.setState({
            sValue: isMultiple ? [value]:value,
            showDate: isMultiple ? [value]:value,
          });
        }
        // 真正 value 更新
        this.$emit('change', value, isMultiple ? (value as  moment.Moment[]).map((iVal: any) =>formatDate(iVal, this.format)) : formatDate(value as  moment.Moment, this.format));
      },

      handleCalendarChange(value: moment.Moment) {
        this.setState({ showDate: value });
      },
      handleOpenChange(open: boolean) {
        const props = getOptionProps(this);
        if (!('open' in props)) {
          this.setState({ sOpen: open });
        }
        this.$emit('openChange', open);
      },
      focus() {
        this.input?.focus();
      },

      blur() {
        this.input?.blur();
      },
      renderFooter(...args: any[]) {
        const { $slots, sPrefixCls: prefixCls } = this;
        const renderExtraFooter: Function = this.renderExtraFooter || $slots.renderExtraFooter;
        return renderExtraFooter ? (
          <div class={`${prefixCls}-footer-extra`}>
            {typeof renderExtraFooter === 'function'
              ? renderExtraFooter(...args)
              : renderExtraFooter}
          </div>
        ) : null;
      },
      onMouseEnter(e: MouseEvent) {
        this.$emit('mouseenter', e);
      },
      onMouseLeave(e: MouseEvent) {
        this.$emit('mouseleave', e);
      },
      // 多选删除
      mulitpleTagChange(name: string, eventeType: string, theStr: any, selectedValue: any) {
        if (eventeType === 'remove') {
          const theRemoveIdx = theStr.findIndex((item: any) => item === name);
          if (theRemoveIdx > -1) {
            theStr.splice(theRemoveIdx, 1);
            selectedValue.splice(theRemoveIdx, 1);
            const theRemoveOne = theStr[theRemoveIdx];
            this.$emit('mulitplteRemove', theRemoveOne, theRemoveIdx);
          }
        }
      },
      multiplePanelHeaderRender(theStr: any, selectedValue: any) {
        const theNewTagGroupValue = theStr?.map((oneStr: string, oneIdx: number) => ({
          id: oneIdx + 1,
          name: oneStr,
        }));
        const theMoreSlot = () => {
          return `+${theNewTagGroupValue.length - this.multipleMaxTagCount}`;
        };
        const props: any = omit({ ...getOptionProps(this), ...this.$attrs }, ['onChange']);
        const getPrefixCls = this.configProvider.getPrefixCls;
        const { prefixCls: customizePrefixCls } = props;
        const prefixCls = getPrefixCls('calendar', customizePrefixCls);

        return <TagGroup
          class={`${prefixCls}-picker-multiple-taggroup`}
          value={theNewTagGroupValue}
          maxTagCount={this.multipleMaxTagCount}
          maxTagTextLength={this.multipleMaxTagTextLength}
          color={'#f5f5f5'}
          closable={this.multipleClosable} 
          overlayClassName={[`${prefixCls}-picker-multiple-popover`, this.multipleTagGroupPopoverClass]}
          onChange={(name: string, eventeType: string) => this.mulitpleTagChange(name, eventeType, theStr, selectedValue)}
          v-slots={{
            more: theMoreSlot,
          }}
        />;
      },
    },

    render() {
      const { $slots } = this;
      const isMultiple = this.type === 'multiple';
      const { sValue: value, showDate, sOpen: open } = this.$data;
      let suffixIcon = getComponent(this, 'suffixIcon');
      suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
      const props: any = omit({ ...getOptionProps(this), ...this.$attrs }, ['onChange']);

      const { prefixCls: customizePrefixCls, locale, localeCode, inputReadOnly } = props;
      const getPrefixCls = this.configProvider.getPrefixCls;
      const prefixCls = getPrefixCls('calendar', customizePrefixCls);
      this.sPrefixCls = prefixCls;

      const dateRender = props.dateRender || $slots.dateRender;
      const monthCellContentRender = props.monthCellContentRender || $slots.monthCellContentRender;

      const placeholder =
        'placeholder' in props ? props.placeholder : locale.lang.otherPlaceholder[name];

      const disabledTime = props.showTime && this.type !== 'multiple' ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime && this.type !== 'multiple',
        [`${prefixCls}-month`]: (MonthCalendar as any) === TheCalendar,
        [`${prefixCls}-year`]: (YearCalendar as any) === TheCalendar,
      });

      if (value && localeCode) {
        if (isMultiple) {
          if (value.length > 0) {
            value.forEach((oneValue: any) => {
              if (oneValue.locale) {
                oneValue.locale(localeCode);
              }
            });
          }
        } else {
          value.locale(localeCode);
        }
      } else {
        // form pro 报错
        this.sValue = this.type === 'multiple' ? [] : undefined;
      }

      const pickerProps: any = {};
      const calendarProps: any = {};
      const pickerStyle: CSSProperties = {};
      if (props.showTime && this.type !== 'multiple') {
        // fix https://github.com/ant-design/ant-design/issues/1902
        calendarProps.onSelect = this.handleChange;
        pickerStyle.minWidth = '195px';
      } else {
        pickerProps.onChange = this.handleChange;
      }
      if ('mode' in props) {
        calendarProps.mode = props.mode;
      }
      const theCalendarProps = {
        ...calendarProps,
        disabledDate: props.disabledDate,
        disabledTime,
        locale: locale.lang,
        timePicker: this.type === 'multiple' ? null : props.timePicker,
        defaultValue: props.defaultPickerValue || interopDefault(moment)(),
        dateInputPlaceholder: placeholder,
        prefixCls,
        dateRender,
        format: props.format,
        showToday: props.showToday,
        monthCellContentRender,
        renderFooter: this.renderFooter,
        value: showDate,
        inputReadOnly,
        onOk: props.onOk,
        onPanelChange: props.onPanelChange,
        onChange: this.handleCalendarChange,
        class: calendarClassName,
        type: this.type,
        multiplePanelHeaderRender: this.multiplePanelHeaderRender,
      };
      const calendar = <TheCalendar {...theCalendarProps} v-slots={$slots} />;
      const hasValue = isMultiple ? value?.length > 0 : !!value;

      const clearIcon =
        !props.disabled && props.allowClear && hasValue ? (
          <CloseCircleFilled class={`${prefixCls}-picker-clear`} onClick={this.clearSelection} />
        ) : null;

      const inputIcon = (suffixIcon &&
        (isValidElement(suffixIcon) ? (
          cloneElement(suffixIcon, {
            class: `${prefixCls}-picker-icon`,
          })
        ) : (
          <span class={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
        ))) || <CalendarOutlined class={`${prefixCls}-picker-icon`} />;

      const multipleTagNode = (inputValue: any) => {
        const isMultipleEmpty = inputValue?.length < 1;
        const theValues = inputValue?.map((item: any) => formatDate(item, this.format));
        return <div class={`${prefixCls}-picker-multiple`}>
          <div class={[props.pickerInputClass, {
            [`${prefixCls}-picker-multiple-placeholder`]: isMultipleEmpty,
          }]}>{isMultipleEmpty ? placeholder : this.multiplePanelHeaderRender(theValues, inputValue)}</div>
          {clearIcon}
          {inputIcon}
        </div>;
      };

      const input = ({ value: inputValue }) => {
        return isMultiple ? multipleTagNode(inputValue) : (
          <div>
            <input
              ref={this.saveInput}
              disabled={props.disabled}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              readonly
              value={formatDate(inputValue, this.format)}
              placeholder={placeholder}
              class={props.pickerInputClass}
              tabindex={props.tabindex}
              name={this.name}
            />
            {clearIcon}
            {inputIcon}
          </div>
        );
      };
      const vcDatePickerProps = {
        ...props,
        ...pickerProps,
        calendar,
        value,
        prefixCls: `${prefixCls}-picker-container`,
        open,
        onOpenChange: this.handleOpenChange,
        style: props.popupStyle,
      };
      return (
        <span
          id={props.id}
          class={classNames(props.class, props.pickerClass)}
          style={{ ...pickerStyle, ...props.style }}
          // tabindex={props.disabled ? -1 : 0}
          // onFocus={focus}
          // onBlur={blur}
          {...getDataAndAriaProps(this.$attrs)}
          onMouseenter={this.onMouseEnter}
          onMouseleave={this.onMouseLeave}
        >
          <VcDatePicker
            {...vcDatePickerProps}
            v-slots={{ default: input, ...$slots }}
          ></VcDatePicker>
        </span>
      );
    },
  });
}
