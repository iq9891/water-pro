import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { hasOwn, isEmpty, keys } from "@fe6/shared";
import cloneDeep from "lodash-es/cloneDeep";
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled';

import PropTypes from '../../_util/vue-types';
import Trigger from '../../vc-trigger';
import { getOptionProps } from '../../_util/props-util';
import { tuple } from '../../_util/type';

import { placements, defaultFields } from './utils';
import { boxProps } from './props';
import Box from './Box';

const theDefPrefixCls = 'ant-checkbox-cascader';

export type SizeType = 'small' | 'default' | 'large' | undefined;

export default defineComponent({
  name: 'ACheckboxCascader',
  inheritAttrs: false,
  __ANT_CHECKBOX: true,
  props: {
    align: PropTypes.object.def(() => ({})),
    animation: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    disabled: PropTypes.looseBool,
    transitionName: PropTypes.string,
    dropdownClassName: PropTypes.string,
    getCalendarContainer: PropTypes.func,
    open: PropTypes.looseBool,
    placement: PropTypes.any.def('bottomLeft'),
    placeholder: PropTypes.string.def('请选择'),
    inputStyle: PropTypes.any.def(''),
    tagTextStyle: PropTypes.any.def('width:80px'),
    separator: PropTypes.string.def('/'),
    allowClear: PropTypes.looseBool.def(true),
    maxTagCount: PropTypes.number.def(1),
    size: PropTypes.oneOf(tuple('small', 'large', 'default')).def('default'),
    ...boxProps,
  },
  emits: ['update:value', 'change'],
  setup(props) {
    const theFields = computed(() => ({ ...defaultFields, ...props.fieldNames }));
    const sValue = ref<any>({});
    const viewDatas = ref([]);
    const viewAllDatas = ref([]);
    const showMore = ref(0);

    const getViewDatas = (newValue: any) => {
      viewDatas.value = [];
      viewAllDatas.value = [];
      const oneKeys = keys(newValue);
      oneKeys.forEach((oneKey: string) => {
        const theOneItem = props.options.find((oneItem: any) => String(oneItem[theFields.value.value]) === oneKey);
        if (theOneItem && hasOwn(theOneItem, theFields.value.children)) {
          const twoKeys = keys(newValue[oneKey]);
          twoKeys.forEach((twoKey: string) => {
            const theTwoItem = theOneItem[theFields.value.children].find((twoItem: any) => String(twoItem[theFields.value.value]) === twoKey);
            if (theTwoItem && hasOwn(theTwoItem, theFields.value.children)) {
              newValue[oneKey][twoKey].forEach((threeCode: string) => {
                const theThreeItem = theTwoItem[theFields.value.children].find((threeItem: any) => String(threeItem[theFields.value.value]) === threeCode);
                if (theThreeItem) {
                  const theView = {
                    label: `${theOneItem[theFields.value.label]}${props.separator}${theTwoItem[theFields.value.label]}${props.separator}${theThreeItem[theFields.value.label]}`,
                    value: [oneKey, twoKey, threeCode],
                  };
                  viewDatas.value.push(theView);
                  viewAllDatas.value.push(theView);
                }
              });
            }
          });
        }
      });

      if (viewDatas.value.length > props.maxTagCount) {
        showMore.value = viewDatas.value.length - props.maxTagCount;
        viewDatas.value.length = props.maxTagCount;
      }
    };

    const getValues = () => {
      // 必须都是字符串格式
      viewDatas.value = [];
      viewAllDatas.value = [];
      sValue.value = {};
      showMore.value = 0;
      if (props.value && !isEmpty(props.value)) {
        const oneKeys = keys(props.value);
        oneKeys.forEach((oneCode: any) => {
          if (!hasOwn(sValue.value, String(oneCode))) {
            sValue.value[oneCode] = {};
          }
          const twoKeys = keys(props.value[oneCode]);
          twoKeys.forEach((twoCode: any) => {
            if (!hasOwn(sValue.value[oneCode], String(twoCode))) {
              sValue.value[oneCode][twoCode] = {};
            }
            sValue.value[oneCode][twoCode] = props.value[oneCode][twoCode].map((threeCode: any) => String(threeCode));
          });
        });
        getViewDatas(sValue.value);
      }
    };

    watch(() => props.options, getValues, {
      deep: true,
    });

    watch(() => props.value, getValues, {
      deep: true,
    });
    onMounted(getValues);
  
    return {
      theFields,
      sValue,
      viewDatas,
      viewAllDatas,
      showMore,
      getViewDatas,
    };
  },
  data() {
    this.calendarElement = null;
    return {
      sOpen: false,
    };
  },
  methods: {
    boxElement() {
      return <Box
        prefixCls={this.prefixCls}
        options={this.options}
        preWidth={this.preWidth}
        preHeight={this.preHeight}
        fieldNames={this.fieldNames}
        value={this.sValue}
        onChange={this.boxChange}
      />;
    },
    goEmit(newValue: any) {
      this.$emit('update:value', newValue);
      this.$emit('change', newValue);
    },
    boxChange(newValue: any) {
      this.getViewDatas(newValue);
      this.goEmit(newValue);
    },
    onVisibleChange(open: boolean) {
      this.sOpen = open;
    },
    removeOne(ev: MouseEvent, oneValue: any) {
      ev.stopPropagation();
      if (oneValue.length > 2) {
        const theValues = cloneDeep(this.sValue);
        if (hasOwn(theValues, oneValue[0]) && hasOwn(theValues[oneValue[0]], oneValue[1])) {
          const delIdx = theValues[oneValue[0]][oneValue[1]].findIndex((threeCode: string) => threeCode === oneValue[2]);
          if (delIdx > -1) {
            theValues[oneValue[0]][oneValue[1]].splice(delIdx, 1);
          }
          if (theValues[oneValue[0]][oneValue[1]].length === 0) {
            delete theValues[oneValue[0]][oneValue[1]];
          }
          if (isEmpty(theValues[oneValue[0]])) {
            delete theValues[oneValue[0]];
          }
        }
        this.goEmit(theValues);
      }
    },
    renderTriggerNodes() {
      const prefixCls = this.prefixCls || theDefPrefixCls;
      if (this.viewDatas.length > 0) {
        const theNodes = this.viewDatas.map((vItem: any) => {
          let removeIcon = null;
          if (!this.disabled) {
            removeIcon = <span class={`${prefixCls}-select-item-remove`} onClick={(ev:any) => this.removeOne(ev, vItem.value)}>
              <CloseOutlined
                class={`${prefixCls}-select-item-icon`}
                key="remove-icon"
              />
            </span>;
          }
          return <span class={`${prefixCls}-select-item`}>
            <span class={`${prefixCls}-select-item-text`} style={this.tagTextStyle} title={vItem.label}>{vItem.label}</span>
            {removeIcon}
          </span>;
        });
        return this.showMore > 0 ? theNodes.concat([<span class={`${prefixCls}-select-item`}>
          <span class={`${prefixCls}-select-item-text`}>+{this.showMore}...</span>
        </span>]) : theNodes;
      } else {
        return <span class={`${prefixCls}-select-placeholder`}>{this.placeholder}</span>;
      }
    },
    clearAll(ev: MouseEvent) {
      ev.stopPropagation();
      this.sValue = {};
      this.goEmit(this.sValue);
    },
  },
  render() {
    const props = getOptionProps(this);
    const {
      prefixCls = theDefPrefixCls,
      placement,
      getCalendarContainer,
      align, 
      animation,
      disabled,
      dropdownClassName,
      transitionName,
      allowClear,
    } = props;

    if (this.sOpen || !this.calendarElement) {
      this.calendarElement = this.boxElement();
    }

    let clearNode = null;
    if (!disabled && allowClear && !isEmpty(this.sValue)) {
      clearNode = (
        <span class={`${prefixCls}-clear`} onClick={this.clearAll}>
          <CloseCircleFilled
            class={`${prefixCls}-clear-icon`}
            key="clear-icon"
          />
        </span>
      );
    }

    return <Trigger
      popupAlign={align}
      builtinPlacements={placements}
      popupPlacement={placement}
      action={disabled && !this.sOpen ? [] : ['click']}
      destroyPopupOnHide
      getPopupContainer={getCalendarContainer}
      popupStyle={this.$attrs.style || {}}
      popupAnimation={animation}
      popupTransitionName={transitionName}
      popupVisible={this.sOpen}
      onPopupVisibleChange={this.onVisibleChange}
      prefixCls={`${prefixCls}-alert`}
      popupClassName={dropdownClassName}
      popup={this.calendarElement}
    >
      <div class={[`${prefixCls}-select`, {
        [`${prefixCls}-select-disabled`]: this.disabled,
        [`${prefixCls}-select-${this.size}`]: !!this.size,
      }]} style={this.inputStyle}>
        <div class={`${prefixCls}-select-inner`}>
          {this.renderTriggerNodes()}
          {clearNode}
        </div>
      </div>
    </Trigger>;
  },
});
