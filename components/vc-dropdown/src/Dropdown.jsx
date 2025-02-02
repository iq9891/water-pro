import { defineComponent, Text } from 'vue';
import PropTypes from '../../_util/vue-types';
import Trigger from '../../vc-trigger';
import placements from './placements';
import {
  hasProp,
  getComponent,
  getOptionProps,
  getSlot,
  findDOMNode,
} from '../../_util/props-util';
import BaseMixin from '../../_util/BaseMixin';
import { cloneElement } from '../../_util/vnode';

export default defineComponent({
  mixins: [BaseMixin],
  props: {
    minOverlayWidthMatchTrigger: PropTypes.looseBool,
    prefixCls: PropTypes.string.def('rc-dropdown'),
    transitionName: PropTypes.string,
    overlayClassName: PropTypes.string.def(''),
    openClassName: PropTypes.string,
    animation: PropTypes.any,
    align: PropTypes.object,
    overlayStyle: PropTypes.object.def(() => ({})),
    placement: PropTypes.string.def('bottomLeft'),
    overlay: PropTypes.any,
    trigger: PropTypes.array.def(['hover']),
    alignPoint: PropTypes.looseBool,
    showAction: PropTypes.array.def([]),
    hideAction: PropTypes.array.def([]),
    getPopupContainer: PropTypes.func,
    visible: PropTypes.looseBool,
    defaultVisible: PropTypes.looseBool.def(false),
    mouseEnterDelay: PropTypes.number.def(0.15),
    mouseLeaveDelay: PropTypes.number.def(0.1),
  },
  data() {
    let sVisible = this.defaultVisible;
    if (hasProp(this, 'visible')) {
      sVisible = this.visible;
    }
    return {
      sVisible,
    };
  },
  watch: {
    visible(val) {
      if (val !== undefined) {
        this.setState({
          sVisible: val,
        });
      }
    },
  },
  methods: {
    onClick(e) {
      const overlayProps = this.getOverlayElement().props;
      // do no call onVisibleChange, if you need click to hide, use onClick and control visible
      if (!hasProp(this, 'visible')) {
        this.setState({
          sVisible: false,
        });
      }
      this.__emit('overlayClick', e);
      if (overlayProps.onClick) {
        overlayProps.onClick(e);
      }
    },

    onVisibleChange(visible) {
      if (!hasProp(this, 'visible')) {
        this.setState({
          sVisible: visible,
        });
      }
      this.__emit('update:visible', visible);
      this.__emit('visibleChange', visible);
    },

    getMinOverlayWidthMatchTrigger() {
      const props = getOptionProps(this);
      const { minOverlayWidthMatchTrigger, alignPoint } = props;
      if ('minOverlayWidthMatchTrigger' in props) {
        return minOverlayWidthMatchTrigger;
      }

      return !alignPoint;
    },

    getOverlayElement() {
      const overlay = getComponent(this, 'overlay');
      return Array.isArray(overlay) ? overlay[0] : overlay;
    },

    getMenuElement() {
      const { onClick, prefixCls } = this;
      const overlayElement = this.getOverlayElement();
      const extraOverlayProps = {
        prefixCls: `${prefixCls}-menu`,
        getPopupContainer: () => this.getPopupDomNode(),
        onClick,
      };
      if (overlayElement && overlayElement.type === Text) {
        delete extraOverlayProps.prefixCls;
      }
      return cloneElement(overlayElement, extraOverlayProps);
    },

    getMenuElementOrLambda() {
      const overlay = this.overlay || this.$slots.overlay;
      if (typeof overlay === 'function') {
        return this.getMenuElement;
      }
      return this.getMenuElement();
    },

    getPopupDomNode() {
      return this.triggerRef.getPopupDomNode();
    },

    getOpenClassName() {
      const { openClassName, prefixCls } = this.$props;
      if (openClassName !== undefined) {
        return openClassName;
      }
      return `${prefixCls}-open`;
    },

    afterVisibleChange(visible) {
      if (visible && this.getMinOverlayWidthMatchTrigger()) {
        const overlayNode = this.getPopupDomNode();
        const rootNode = findDOMNode(this);
        if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
          overlayNode.style.minWidth = `${rootNode.offsetWidth}px`;
          if (
            this.triggerRef &&
            this.triggerRef._component &&
            this.triggerRef._component.alignInstance
          ) {
            this.triggerRef._component.alignInstance.forceAlign();
          }
        }
      }
    },

    renderChildren() {
      const children = getSlot(this);
      const { sVisible } = this;
      return sVisible && children
        ? cloneElement(children[0], { class: this.getOpenClassName() }, false)
        : children;
    },
    saveTrigger(node) {
      this.triggerRef = node;
    },
  },

  render() {
    const {
      prefixCls,
      transitionName,
      animation,
      align,
      placement,
      getPopupContainer,
      showAction,
      hideAction,
      overlayClassName,
      overlayStyle,
      trigger,
      ...otherProps
    } = this.$props;
    let triggerHideAction = hideAction;
    if (!triggerHideAction && trigger.includes('contextmenu')) {
      triggerHideAction = ['click'];
    }

    const triggerProps = {
      ...otherProps,
      prefixCls,
      popupClassName: overlayClassName,
      popupStyle: overlayStyle,
      builtinPlacements: placements,
      action: trigger,
      showAction,
      hideAction: triggerHideAction || [],
      popupPlacement: placement,
      popupAlign: align,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      popupVisible: this.sVisible,
      afterPopupVisibleChange: this.afterVisibleChange,
      getPopupContainer,
      onPopupVisibleChange: this.onVisibleChange,
      popup: this.getMenuElementOrLambda(),
      ref: this.saveTrigger,
    };
    return <Trigger {...triggerProps}>{this.renderChildren()}</Trigger>;
  },
});
