import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { getComponent } from '../../../_util/props-util';
import { formatDate } from '../util';

const DateInput = {
  name: 'DateInput',
  inheritAttrs: false,
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string,
    format: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.func,
    ]),
    locale: PropTypes.object,
    selectedValue: PropTypes.object,
    clearIcon: PropTypes.any,
    showClear: PropTypes.looseBool,
    multiplePanelHeaderRender: PropTypes.func,
  },

  data() {
    const selectedValue = this.selectedValue;
    return {
      str: selectedValue.map((sItem) => formatDate(sItem, this.format)),
    };
  },
  watch: {
    selectedValue() {
      this.setState({
        str: this.selectedValue.map((sItem) => formatDate(sItem, this.format)),
      });
    },
    format() {
      this.setState();
    },
  },
  methods: {
    onClear() {
      this.setState({
        str: '',
      });
      this.__emit('clear', null);
    },
  },

  render() {
    const {
      locale,
      prefixCls,
      showClear,
      multiplePanelHeaderRender,
    } = this;
    const clearIcon = getComponent(this, 'clearIcon');
    return (
      <div class={`${prefixCls}-input-wrap`}>
        <div class={`${prefixCls}-date-input-wrap`}>
          {multiplePanelHeaderRender(this.str, this.selectedValue)}
        </div>
        {showClear ? (
          <a role="button" title={locale.clear} onClick={this.onClear}>
            {clearIcon || <span class={`${prefixCls}-clear-btn`} />}
          </a>
        ) : null}
      </div>
    );
  },
};

export default DateInput;
