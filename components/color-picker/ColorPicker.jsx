import debounce from 'lodash-es/debounce';
import DownOutlined from '@ant-design/icons-vue/DownOutlined';
// TODO [fix][vite2] The requested module '/shop/node_modules/@simonwep/pickr/dist/pickr.es5.min.js?v=037821b3' does not provide an export named 'default'
// import Pickr from '@simonwep/pickr/dist/pickr.es5.min';
import Pickr from './colors/pickr';
import { isUndefined } from '@fe6/shared';

import { getOptionProps, findDOMNode, getListeners } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import { defaultConfigProvider } from '../config-provider';
import BaseMixin from '../_util/BaseMixin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import zhCN from './locale/zh_CN';
import { generateAriaId } from './utils';

export default {
  name: 'AColorPicker',
  mixins: [BaseMixin],
  inject: {
    configProvider: { default: () => defaultConfigProvider },
  },
  emits: ['update:value', 'change', 'openChange'],
  props: {
    prefixCls: PropTypes.string,
    defaultValue: PropTypes.string, //默认值
    config: PropTypes.object, //pickr配置
    value: PropTypes.string, //颜色值
    locale: PropTypes.object, //双语包
    colorRounded: PropTypes.number, //颜色数值保留几位小数
    size: PropTypes.oneOf(['default', 'small', 'large']).def('default'), //尺寸
    getPopupContainer: PropTypes.func, //指定渲染容器
    disabled: PropTypes.looseBool.def(false), //是否禁用
    format: PropTypes.string, //颜色格式设置
    alpha: PropTypes.looseBool.def(false), //是否开启透明通道
    hue: PropTypes.looseBool.def(true), //是否开启色彩预选
    padding: PropTypes.number.def(16), //弹框间距
    predefine: {
      type: Array,
      default: () => ([
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(63, 81, 181, 1)',
        'rgb(255, 120, 0)',
        '#c71585',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 150, 136, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(139, 195, 74, 1)',
        'rgba(205, 220, 57, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(255, 193, 7, 1)',
      ]),
    },
  },

  data() {
    return {
      myOpen: false,
      pickr: null,
      i18n: zhCN,
      _uid: generateAriaId(`a-color-picker`),
    };
  },
  watch: {
    'configProvider.locale.ColorPicker': {
      handler(val) {
        if (this.locale) return;
        this.i18n = val;
        this.reInitialize();
      },
    },
    locale(val) {
      this.i18n = val.ColorPicker || val.lang;
      this.reInitialize();
    },
    value(val) {
      if (!val) {
        this.reInitialize();
      } else {
        this.pickr.setColor(val);
      }
    },
    disabled(val) {
      this.pickr[val ? 'disable' : 'enable']();
    },
    config: {
      handler() {
        this.reInitialize();
      },
      deep: true,
    },
    format(val) {
      const type = val.toLocaleUpperCase();
      let res = this.pickr.setColorRepresentation(type);
      if (res) {
        this.pickr.applyColor();
      } else {
        throw new TypeError('format was invalid');
      }
    },
  },
  mounted() {
    if (this.locale) {
      this.i18n = this.locale.ColorPicker || this.locale.lang;
    }
    this.createPickr();
    this.eventsBinding();
  },
  unmounted() {
    this.pickr.destroyAndRemove();
  },
  methods: {
    reInitialize() {
      this.pickr.destroyAndRemove();
      const dom = document.createElement('div');
      dom.id = 'color-picker' + this._uid;
      const box = findDOMNode(this).querySelector('#color-picker-box' + this._uid);
      box.appendChild(dom);
      this.createPickr();
      this.eventsBinding();
    },
    setColor: debounce(function(val) {
      this.pickr.setColor(val);
    }, 1000),
    eventsBinding() {
      const pickrEvents = [
        'init',
        'hide',
        'show',
        'save',
        'clear',
        'change',
        'changestop',
        'cancel',
        'swatchselect',
      ];
      const listeners = getListeners(this);
      Object.keys(listeners).forEach(event => {
        pickrEvents.includes(event) && this.pickr.on(event, listeners[event]);
      });
    },
    createPickr() {
      const { getPopupContainer } = getOptionProps(this);
      const { getPopupContainer: getContextPopupContainer } = this.configProvider;
      const container = getPopupContainer || getContextPopupContainer;
      this.pickr = Pickr.create(
        Object.assign(
          {
            el: '#color-picker' + this._uid,
            container: (container && container(findDOMNode(this))) || document.body,
            theme: 'monolith', // or 'monolith', or 'nano'
            default: this.value || this.defaultValue || null, // 有默认颜色pickr才可以获取到_representation
            swatches: this.predefine,
            padding: this.padding,
            closeOnScroll: true,
            components: {
              preview: true,
              opacity: this.alpha,
              hue: this.hue,
              interaction: {
                input: true,
                clear: true,
                save: true,
              },
            },
          },
          this.config,
          { i18n: this.i18n },
        ),
      )
        .on('save', (color, instance) => {
          if (color) {
            let _representation = instance._representation || 'HEXA';
            color = color['to' + _representation]().toString(this.colorRounded || 0);
          }
          this.$emit('update:value', color || '');
          this.$emit('change', color || '');
          this.handleOpenChange(false);
        })
        .on('clear', () => {
          this.$emit('update:value', null);
          this.$emit('change', null);
        })
        .on('hide', () => {
          this.setState({ myOpen: false });
          this.$emit('openChange', false);
        });
      this.pickr[this.disabled ? 'disable' : 'enable']();
    },
    handleOpenChange(status) {
      const open = isUndefined(status) ? !this.myOpen : status;
      this.setState({ myOpen: open });
      this.pickr[open ? 'show' : 'hide']();
      this.$emit('openChange', open);
    },
    getDefaultLocale() {
      const result = {
        ...zhCN,
        ...this.$props.locale,
      };
      result.lang = {
        ...result.lang,
        ...(this.$props.locale || {}).lang,
      };
      return result;
    },
    openColorPicker() {
      if (!this.disabled) {
        setTimeout(() => {
          this.handleOpenChange();
        }, 0);
      }
    },
    renderColorPicker() {
      const { prefixCls: customizePrefixCls } = this.$props;
      const { getPrefixCls } = this.configProvider;
      const prefixCls = getPrefixCls('color-picker', customizePrefixCls);
      const { disabled } = getOptionProps(this);
      const classString = {
        [prefixCls]: true,
        [`${prefixCls}-open`]: this.myOpen,
        [`${prefixCls}-lg`]: this.size === 'large',
        [`${prefixCls}-sm`]: this.size === 'small',
        [`${prefixCls}-disabled`]: this.disabled,
      };
      return (
        <div class={classString} tabindex={disabled ? -1 : 0} onClick={this.openColorPicker}>
          <div class={`${prefixCls}-selection`}>
            <div id={'color-picker-box' + this._uid}>
              <div id={'color-picker' + this._uid}></div>
            </div>
            <DownOutlined class={`${prefixCls}-icon`} />
          </div>
        </div>
      );
    },
  },
  render() {
    return (
      <LocaleReceiver
        componentName="ColorPicker"
        defaultLocale={this.getDefaultLocale}
        children={this.renderColorPicker}
      />
    );
  },
};
