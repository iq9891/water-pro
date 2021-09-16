import { PropType } from 'vue';
import type { ValidationRule } from '../../../form/Form';
import type { TableActionType } from '../../../table-pro';
import type { FormActionType, FormProps, FormSchema } from '../types/form';

import { defineComponent, computed, unref, toRefs } from 'vue';
import { isBoolean, isFunction } from '@fe6/shared';
import { upperFirst, cloneDeep, isString } from 'lodash-es';

import Col from '../../../grid/Col';
import Form from '../../../form/Form';
import BasicHelp from '../../../basic-help';

import { getSlot } from '../../../_util/tsx';
import PropTypes from '../../../_util/vue-types';
import useConfigInject from '../../../_util/hooks/useConfigInject';
import { createPlaceholderMessage, setComponentRuleType } from '../helper';
import { componentMap } from '../component-map';
import { useItemLabelWidth } from '../hooks/use-label-width';

export default defineComponent({
  name: 'AFormProItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      default: () => {},
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: {} as FormProps,
    },
    allDefaultValues: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
    formModel: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null,
    },
    tableAction: {
      type: Object as PropType<TableActionType>,
    },
    formActionType: {
      type: Object as PropType<FormActionType>,
    },
    prefixCls: PropTypes.string,
  },
  setup(props, { slots }) {
    const { prefixCls: prefixClsNew } = useConfigInject('form-pro', props);

    const { schema, formProps } = toRefs(props) as any;

    const itemLabelWidthProp = useItemLabelWidth(schema, formProps);

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props;
      const { mergeDynamicData } = props.formProps;
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...(allDefaultValues as any),
          ...(formModel as any),
        } as Recordable,
        schema,
      };
    });

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props;
      const { componentProps = {} } = schema;
      if (!isFunction(componentProps)) {
        return componentProps;
      }
      return (
        (componentProps as Function)({
          schema,
          tableAction,
          formModel,
          formActionType,
        }) ?? {}
      );
    });

    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps;
      const { dynamicDisabled } = props.schema;
      const { disabled: itemDisabled = false } = unref(getComponentsProps);
      let disabled = !!globDisabled || itemDisabled;
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled;
      }

      if (isFunction(dynamicDisabled)) {
        disabled = (dynamicDisabled as Function)(unref(getValues));
      }
      return disabled;
    });

    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow } = props.schema;
      const { showAdvancedButton } = props.formProps;
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true;

      let isShow = true;
      let isIfShow = true;

      if (isBoolean(show)) {
        isShow = show as boolean;
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow as boolean;
      }
      if (isFunction(show)) {
        isShow = (show as Function)(getValues);
      }
      if (isFunction(ifShow)) {
        isIfShow = (ifShow as Function)(getValues);
      }
      isShow = (isShow && itemIsAdvanced) as boolean;
      return { isShow, isIfShow };
    }

    function handleRules(): ValidationRule[] {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required,
      } = props.schema;

      // 因为 vite 中始终检测不到 select value 的变化
      if (isFunction(dynamicRules)) {
        return (dynamicRules as Function)(getValues) as ValidationRule[];
      }

      let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[];

      if ((!rules || rules.length === 0) && required) {
        rules = [{ required, type: 'string' }];
      }

      const requiredRuleIndex: number = rules.findIndex(
        (rule) =>
          Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
      );
      const {
        rulesMessageJoinLabel: globalRulesMessageJoinLabel,
      } = props.formProps;

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex];
        const { isShow } = getShow();
        if (!isShow) {
          rule.required = false;
        }

        if (rule.required && component) {
          if (!Reflect.has(rule, 'type')) {
            rule.type = 'string';
          }
          const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
            ? rulesMessageJoinLabel
            : globalRulesMessageJoinLabel;

          rule.message =
            rule.message ||
            createPlaceholderMessage(component) + `${joinLabel ? label : ''}`;

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true;
          }

          setComponentRuleType(rule, component);
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max);
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message ||
          `字符数应小于${rules[characterInx].max}位`;
      }
      return rules;
    }

    function renderComponent() {
      const {
        renderComponentContent,
        component,
        field,
        changeEvent = 'change',
        valueLayout = (
          attr: unknown,
        ) => attr,
        valueField,
      } = props.schema;

      const isCheck = component && ['Switch', 'Checkbox'].includes(component);

      const eventKey = `on${upperFirst(changeEvent)}`;

      const on = {
        [eventKey]: (e: Nullable<Recordable>, params: any) => {
          if (propsData[eventKey]) {
            propsData[eventKey](e);
          }

          const target = e ? e.target : null;

          const value = target
            ? isCheck
              ? target.checked
              : target.value
            : e;

          props.setFormModel(field, valueLayout(value, field, props, params));
        },
      };
      const Comp: any = componentMap.get(component) as typeof defineComponent;

      const { autoSetPlaceHolder, size } = props.formProps;
      const propsData: Recordable = {
        allowClear: true,
        getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      };

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
      // Fixed 修复之前是空，问题是 RangPicker 的时候设置无效
      let placeholder = unref(getComponentsProps)?.placeholder;
      // RangePicker place is an array
      if (isCreatePlaceholder && component !== 'RangePicker' && component !== 'RangeGroupPicker' && component !== 'TimeRangePicker' && component) {
        placeholder =
          unref(getComponentsProps)?.placeholder ||
          createPlaceholderMessage(component);
      }
      propsData.placeholder = placeholder;
      propsData.codeField = field;
      propsData.formValues = unref(getValues);

      const bindValue: Recordable = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[
          field
        ],
      };

      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      };

      if (!renderComponentContent) {
        return <Comp {...compAttr} />;
      }

      const getCompSlot = (values: any) => {
        if (isFunction(renderComponentContent)) {
          const funSlot = (renderComponentContent as Function)(values);
          if (isString(funSlot)) {
            return {
              default: () => <span>{funSlot}</span>
            };
          } else {
            return {
              default: () =>(renderComponentContent as Function)(values)
            };
          }
        }
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...getCompSlot(getValues) }
        : {
            default: () => <span>{renderComponentContent}</span>,
          };

      return <Comp {...compAttr} v-slots={compSlot}></Comp>;
    }

    function renderLabelHelpMessage() {
      const {
        label,
        helpMessage,
        helpComponentProps,
        subLabel,
      } = props.schema;
      let labelInnerTrue = '';
      if (isFunction(label)) {
        labelInnerTrue = (label as Function)(getValues);
      } else {
        labelInnerTrue = label as string;
      }
      const renderLabel = subLabel ? (
        <span>
          {labelInnerTrue} <span style="color:#00000073">{subLabel}</span>
        </span>
      ) : (
        labelInnerTrue
      );
      if (
        !helpMessage ||
        (Array.isArray(helpMessage) && helpMessage.length === 0)
      ) {
        return renderLabel;
      }
      return (
        <span>
          {renderLabel}
          <BasicHelp
            placement="right"
            class={`${prefixClsNew.value}-help`}
            text={helpMessage}
            {...helpComponentProps}
          />
        </span>
      );
    }

    function renderItem() {
      const { label, itemProps, slot, render, field, suffix, component, end, wrapperWidth } = props.schema;
      const { labelCol, wrapperCol } = unref(itemLabelWidthProp);
      const { colon } = props.formProps;

      const getContent = () => {
        return slot
          ? getSlot(slots, slot, unref(getValues))
          : render
          ? (render as Function)(getValues)
          : renderComponent();
      };

      const showSuffix = !!suffix;

      const getSuffix = isFunction(suffix)
        ? (suffix as Function)(unref(getValues))
        : suffix;

        const showEnd = !!end;
  
        const getEnd = isFunction(end)
          ? (end as Function)(unref(getValues))
          : end;

      const isAddDiyClassName = () => {
        const whiteListOfAddName = ['InputSmsCode', 'ColorPicker', 'TagGroup', 'TagModalList'];
        return whiteListOfAddName.includes(component) 
      }
      const isInlineCpt = () => {
        const inlineCpt = ['InputSmsCode', 'InputNumber'];
        return inlineCpt.includes(component) 
      }

      const isTagModalListClassName = () => {
        const whiteListOfTagModalListName = ['TagModalList'];
        return whiteListOfTagModalListName.includes(component) 
      }

      let realWrapperCol = wrapperCol;
      // 如果没有 label
      if (!renderLabelHelpMessage()) {
        realWrapperCol = { span: 24 };
      }

      let contentNode = null;
      const contentInnerNode = wrapperWidth ? <div style={{width: wrapperWidth, display: 'inline-block'}}>{getContent()}</div> : getContent();

      if (showEnd) {
        contentNode = <>
          <div>
            {contentInnerNode}
            {showSuffix && <span class={`${prefixClsNew.value}-suffix`}>{getSuffix}</span>}
          </div>
          {showEnd && <div class={`${prefixClsNew.value}-end`}>{getEnd}</div>}
        </>
      } else {
        contentNode = <>
          {contentInnerNode}
          {showSuffix && <span class={`${prefixClsNew.value}-suffix`}>{getSuffix}</span>}
        </>
      }

      let labelTrue = '';

      if (isFunction(label)) {
        labelTrue = (label as Function)(getValues);
      } else {
        labelTrue = label as string;
      }

      return (
        <Form.Item
          name={field}
          colon={ labelTrue && labelTrue.trim() === '' ? false : colon}
          class={{
            [`${prefixClsNew.value}-item-suffix`]: showSuffix,
            [`${prefixClsNew.value}-item-diy`]: isAddDiyClassName(),
            [`${prefixClsNew.value}-item-special`]: isTagModalListClassName(),
            [`${prefixClsNew.value}-item-smscode`]: isInlineCpt,
          }}
          {...(itemProps as Recordable)}
          label={renderLabelHelpMessage()}
          rules={handleRules()}
          labelCol={labelCol}
          wrapperCol={realWrapperCol}>
          {contentNode}
        </Form.Item>
      );
    }
    return () => {
      const {
        colProps = { span: 24 },
        colSlot,
        renderColContent,
        component,
      } = props.schema;
      if (!componentMap.has(component)) return null;

      const { baseColProps = {} } = props.formProps;

      const realColProps = { ...baseColProps, ...colProps };
      const { isIfShow, isShow } = getShow();

      const values = unref(getValues);
      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
          ? (renderColContent as Function)(getValues)
          : renderItem();
      };

      return (
        isIfShow && (
          <Col {...realColProps} v-show={isShow}>
            {getContent()}
          </Col>
        )
      );
    };
  },
});
