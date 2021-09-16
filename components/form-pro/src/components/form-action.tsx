import type { ButtonProps } from '../../../button/buttonTypes';
import type { ColEx } from '../types/index';
import type { FormProps, FormSchema } from '../types/form';

import { defineComponent, computed, PropType, toRefs } from 'vue';
import AButton from '../../../button';
import { Col, Row } from '../../../grid';
import BasicArrow from '../../../basic-arrow';
import PropTypes from '../../../_util/vue-types';
import useConfigInject from '../../../_util/hooks/useConfigInject';
import { useActionLabelWidth } from '../hooks/use-label-width';
import { useFormContext } from '../hooks/use-form-context';
import { getSlot } from '../../../_util/props-util';
import { isNaN } from '@fe6/shared';
import { isNumber } from 'lodash';

type ButtonOptions = Partial<ButtonProps> & { text: string };

export default defineComponent({
  name: 'AFormProAction',
  props: {
    schemas: {
      type: Array as PropType<FormSchema[]>,
      default: () => [],
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: {} as FormProps,
    },
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
    actionAffix: PropTypes.looseBool,
    actionTarget: PropTypes.func,
    showActionButtonGroup: PropTypes.bool.def(true),
    showResetButton: PropTypes.bool.def(true),
    showSubmitButton: PropTypes.bool.def(true),
    showAdvancedButton: PropTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<Partial<ButtonProps>>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<Partial<ButtonProps>>,
      default: () => ({}),
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({}),
    },
    actionSpan: PropTypes.number.def(6),
    isAdvanced: PropTypes.bool,
    hideAdvanceBtn: PropTypes.bool,
    actionAlgin: PropTypes.oneOf(['left', 'right', 'center', 'space-between']).def('left'),
    resetText: PropTypes.string.def('重置'),
    okText: PropTypes.string.def('查询'),
    prefixCls: PropTypes.string,
    labelWidth: {
      type: [Number, String] as PropType<number | string>,
    },
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('form-pro', props);

    const { formProps, schemas } = toRefs(props) as any;
    const itemLabelWidthProp = useActionLabelWidth(schemas, formProps);

    const hasLabel = computed(() => {
      return !!props.schemas.filter((sItem: FormSchema) => sItem.label || sItem.subLabel).length;
    });

    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
      const actionSpan = 24 - span;
      const advancedSpanObj = showAdvancedButton
        ? {
            span: actionSpan < 6 ? 24 : actionSpan,
          }
        : {};
      let actionInnerColOpt: Partial<ColEx> = {
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions,
      };

      if (
        props.layout !== 'vertical' &&
        (!hasLabel.value || !isNaN(parseFloat(props.labelWidth)))
      ) {
        actionInnerColOpt = {};
      }

      return actionInnerColOpt;
    });

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          text: props.resetText,
        },
        props.resetButtonOptions,
      );
    });

    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          text: props.okText,
        },
        props.submitButtonOptions,
      );
    });

    function toggleAdvanced() {
      emit('toggle-advanced');
    }

    const { resetAction, submitAction } = useFormContext();

    const hasChildrenInSchemas = schemas.value.some(
      (sItem: FormSchema) => sItem.children && sItem.children.length > 0,
    );

    return {
      hasLabel,
      hasChildrenInSchemas,
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      prefixClsNew,
      resetAction,
      submitAction,
      itemLabelWidthProp,
    };
  },
  render() {
    let rootNode = null;

    if (this.showActionButtonGroup) {
      const widthStyle = isNaN(parseFloat(this.labelWidth))
        ? ''
        : `padding-left: ${isNumber(this.labelWidth) ? `${this.labelWidth}px` : this.labelWidth};`;

      const rootProps = {
        ...(this.itemLabelWidthProp || this.actionColOpt),
        style: `${this.hasLabel && !this.actionAffix ? widthStyle : ''}textAlign: ${
          this.actionAlgin
        }`,
      };

      const childColProps = {
        span: 24,
      };

      let resetButtonNode = null;
      if (this.showResetButton) {
        resetButtonNode = (
          <AButton
            type="default"
            class={`${this.prefixClsNew}-action-button`}
            {...this.getResetBtnOptions}
            style={{
              marginRight: this.showSubmitButton ? '12px' : 0,
            }}
            onClick={this.resetAction}
          >
            {this.getResetBtnOptions.text}
          </AButton>
        );
      }

      let submitButtonNode = null;
      if (this.showSubmitButton) {
        submitButtonNode = (
          <AButton
            type="primary"
            class={`${this.prefixClsNew}-action-button`}
            {...this.getSubmitBtnOptions}
            onClick={this.submitAction}
          >
            {this.getSubmitBtnOptions.text}
          </AButton>
        );
      }

      let advancedButtonNode = null;
      if (this.showAdvancedButton && !this.hideAdvanceBtn) {
        advancedButtonNode = (
          <AButton type="link" size="small" onClick={this.toggleAdvanced}>
            {this.isAdvanced ? '收起' : '展开'}
            <BasicArrow expand={!this.isAdvanced} top={this.isAdvanced} style="margin-left: 4px" />
          </AButton>
        );
      }

      rootNode = (
        <Col {...rootProps}>
          <Row class={`${this.prefixClsNew}-item-action`}>
            <Col {...childColProps}>
              <div
                class={this.actionAlgin === 'space-between' ? '' : 'ant-form-item-control'}
                style={
                  this.actionAlgin === 'space-between'
                    ? 'display: flex; justify-content: space-between;'
                    : ''
                }
              >
                {getSlot(this, 'resetBefore')}
                {resetButtonNode}
                {getSlot(this, 'submitBefore')}
                {submitButtonNode}
                {getSlot(this, 'advanceBefore')}
                {advancedButtonNode}
                {getSlot(this, 'advanceAfter')}
              </div>
            </Col>
          </Row>
        </Col>
      );
    }
    return rootNode;
  },
});
