import IconBytedCloseOne from '@fe6/icon-vue/lib/icons/byted-close-one';
import { isFunction } from '@fe6/shared';
import classNames from '../_util/classNames';
import { getInputClassName } from './Input';
import PropTypes from '../_util/vue-types';
import { cloneElement } from '../_util/vnode';
import type { PropType, VNode } from 'vue';
import { ref, defineComponent } from 'vue';
import { tuple } from '../_util/type';
import type { Direction, SizeType } from '../config-provider';
import type { MouseEventHandler } from '../_util/EventInterface';

export function hasPrefixSuffix(propsAndSlots: any) {
  return !!(propsAndSlots.prefix || propsAndSlots.suffix || propsAndSlots.allowClear);
}

function hasAddon(propsAndSlots: any) {
  return !!(propsAndSlots.addonBefore || propsAndSlots.addonAfter);
}

const ClearableInputType = ['text', 'input'];

export default defineComponent({
  name: 'ClearableLabeledInput',
  inheritAttrs: false,
  props: {
    prefixCls: PropTypes.string,
    inputType: PropTypes.oneOf(tuple('text', 'input')),
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    allowClear: PropTypes.looseBool,
    element: PropTypes.any,
    handleReset: PropTypes.func,
    disabled: PropTypes.looseBool,
    direction: { type: String as PropType<Direction> },
    size: { type: String as PropType<SizeType> },
    suffix: PropTypes.any,
    prefix: PropTypes.any,
    addonBefore: PropTypes.any,
    addonAfter: PropTypes.any,
    readonly: PropTypes.looseBool,
    focused: PropTypes.looseBool,
    bordered: PropTypes.looseBool.def(true),
    triggerFocus: { type: Function as PropType<() => void> },
  },
  setup(props, { slots, attrs }) {
    const containerRef = ref();
    const onInputMouseUp: MouseEventHandler = (e) => {
      if (containerRef.value?.contains(e.target as Element)) {
        const { triggerFocus } = props;
        triggerFocus?.();
      }
    };
    const renderClearIcon = (prefixCls: string) => {
      const { allowClear, value, disabled, readonly, handleReset, suffix = slots.suffix } = props;
      if (!allowClear) {
        return null;
      }
      const needClear = !disabled && !readonly && value;
      const className = `${prefixCls}-clear-icon`;
      return (
        <IconBytedCloseOne
          colors={['currentColor']}
          theme="filled"
          onClick={handleReset}
          // Do not trigger onBlur when clear input
          onMousedown={(e) => e.preventDefault()}
          class={classNames(
            {
              [`${className}-hidden`]: !needClear,
              [`${className}-has-suffix`]: !!suffix,
            },
            className,
          )}
          role="button"
        />
      );
    };

    const renderSuffix = (prefixCls: string) => {
      const { suffix = slots.suffix?.(), allowClear } = props;
      if (suffix || allowClear) {
        return (
          <span class={`${prefixCls}-suffix`}>
            {renderClearIcon(prefixCls)}
            {isFunction(suffix) ? suffix() : suffix}
          </span>
        );
      }
      return null;
    };

    const renderLabeledIcon = (prefixCls: string, element: VNode) => {
      const {
        focused,
        value,
        prefix = slots.prefix?.(),
        size,
        suffix = slots.suffix?.(),
        disabled,
        allowClear,
        direction,
        readonly,
        bordered,
        addonAfter = slots.addonAfter,
        addonBefore = slots.addonBefore,
      } = props;
      const suffixNode = renderSuffix(prefixCls);
      if (!hasPrefixSuffix({ prefix, suffix, allowClear })) {
        return cloneElement(element, {
          value,
        });
      }

      const prefixNode = prefix ? (
        <span class={`${prefixCls}-prefix`}>{isFunction(prefix) ? prefix() : prefix}</span>
      ) : null;

      const affixWrapperCls = classNames(`${prefixCls}-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-focused`]: focused,
        [`${prefixCls}-affix-wrapper-disabled`]: disabled,
        [`${prefixCls}-affix-wrapper-sm`]: size === 'small',
        [`${prefixCls}-affix-wrapper-lg`]: size === 'large',
        [`${prefixCls}-affix-wrapper-input-with-clear-btn`]: suffix && allowClear && value,
        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
        [`${prefixCls}-affix-wrapper-readonly`]: readonly,
        [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
        // className will go to addon wrapper
        [`${attrs.class}`]: !hasAddon({ addonAfter, addonBefore }) && attrs.class,
      });
      return (
        <span
          ref={containerRef}
          class={affixWrapperCls}
          style={attrs.style}
          onMouseup={onInputMouseUp}
        >
          {prefixNode}
          {cloneElement(element, {
            style: null,
            value,
            class: getInputClassName(prefixCls, bordered, size, disabled),
          })}
          {suffixNode}
        </span>
      );
    };

    const renderInputWithLabel = (prefixCls: string, labeledElement: VNode) => {
      const {
        addonBefore = slots.addonBefore?.(),
        addonAfter = slots.addonAfter?.(),
        size,
        direction,
      } = props;
      // Not wrap when there is not addons
      if (!hasAddon({ addonBefore, addonAfter })) {
        return labeledElement;
      }

      const wrapperClassName = `${prefixCls}-group`;
      const addonClassName = `${wrapperClassName}-addon`;
      const addonBeforeNode = addonBefore ? (
        <span class={addonClassName}>{isFunction(addonBefore) ? addonBefore() : addonBefore}</span>
      ) : null;
      const addonAfterNode = addonAfter ? (
        <span class={addonClassName}>{isFunction(addonAfter) ? addonAfter() : addonAfter}</span>
      ) : null;

      const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperClassName, {
        [`${wrapperClassName}-rtl`]: direction === 'rtl',
      });

      const mergedGroupClassName = classNames(
        `${prefixCls}-group-wrapper`,
        {
          [`${prefixCls}-group-wrapper-sm`]: size === 'small',
          [`${prefixCls}-group-wrapper-lg`]: size === 'large',
          [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
        },
        attrs.class,
      );

      // Need another wrapper for changing display:table to display:inline-block
      // and put style prop in wrapper
      return (
        <span class={mergedGroupClassName} style={attrs.style}>
          <span class={mergedWrapperClassName}>
            {addonBeforeNode}
            {cloneElement(labeledElement, { style: null })}
            {addonAfterNode}
          </span>
        </span>
      );
    };

    const renderTextAreaWithClearIcon = (prefixCls: string, element: VNode) => {
      const {
        value,
        allowClear,
        direction,
        bordered,
        addonAfter = slots.addonAfter,
        addonBefore = slots.addonBefore,
      } = props;
      if (!allowClear) {
        return cloneElement(element, {
          value,
        });
      }
      const affixWrapperCls = classNames(
        `${prefixCls}-affix-wrapper`,
        `${prefixCls}-affix-wrapper-textarea-with-clear-btn`,
        {
          [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          [`${prefixCls}-affix-wrapper-borderless`]: !bordered,
          // className will go to addon wrapper
          [`${attrs.class}`]: !hasAddon({ addonAfter, addonBefore }) && attrs.class,
        },
      );
      return (
        <span class={affixWrapperCls} style={attrs.style}>
          {cloneElement(element, {
            style: null,
            value,
          })}
          {renderClearIcon(prefixCls)}
        </span>
      );
    };

    return () => {
      const { prefixCls, inputType, element = slots.element?.() } = props;
      if (inputType === ClearableInputType[0]) {
        return renderTextAreaWithClearIcon(prefixCls, element);
      }
      return renderInputWithLabel(prefixCls, renderLabeledIcon(prefixCls, element));
    };
  },
});
