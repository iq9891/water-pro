import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { hasProp } from '../../../_util/props-util';
import MonthTable from './MonthTable';

function goYear(direction) {
  this.changeYear(direction);
}

function noop() {}

const MonthPanel = {
  name: 'MonthPanel',
  inheritAttrs: false,
  mixins: [BaseMixin],
  props: {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    cellRender: PropTypes.any,
    contentRender: PropTypes.any,
    locale: PropTypes.any,
    rootPrefixCls: PropTypes.string,
    // onChange: PropTypes.func,
    disabledDate: PropTypes.func,
    // onSelect: PropTypes.func,
    renderFooter: PropTypes.func,
    changeYear: PropTypes.func.def(noop),
    type: { type: String, default: ''}, // 'multiple'
    // 用于匹配多选的时候，月和年的时候和日期切换月年的区别
    selectType: { type: String, default: ''}, // 'date' | 'month' | 'year'
  },

  data() {
    const { value, defaultValue } = this;
    // bind methods
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    return {
      sValue: value || defaultValue,
    };
  },
  watch: {
    value(val) {
      this.setState({
        sValue: val,
      });
    },
  },
  methods: {
    setAndSelectValue(value) {
      const isMultiple = this.type === 'multiple';
      this.setValue(isMultiple?[value]:value);
      this.__emit('select', isMultiple?[value]:value);
    },

    setValue(value) {
      if (hasProp(this, 'value')) {
        this.setState({
          sValue: value,
        });
      }
    },
  },

  render() {
    const {
      sValue,
      cellRender,
      contentRender,
      locale,
      rootPrefixCls,
      disabledDate,
      renderFooter,
    } = this;
    const isMultiple = this.type === 'multiple';
    const value = isMultiple ? this.sValue?.[0] : this.sValue;
    const year = value.year();
    const prefixCls = `${rootPrefixCls}-month-panel`;

    const footer = renderFooter && renderFooter('month');
    return (
      <div class={prefixCls}>
        <div>
          <div class={`${prefixCls}-header`}>
            <a
              class={`${prefixCls}-prev-year-btn`}
              role="button"
              onClick={this.previousYear}
              title={locale.previousYear}
            />

            <a
              class={`${prefixCls}-year-select`}
              role="button"
              onClick={this.$attrs.onYearPanelShow || noop}
              title={locale.yearSelect}
            >
              <span class={`${prefixCls}-year-select-content`}>{year}</span>
              <span class={`${prefixCls}-year-select-arrow`}>x</span>
            </a>

            <a
              class={`${prefixCls}-next-year-btn`}
              role="button"
              onClick={this.nextYear}
              title={locale.nextYear}
            />
          </div>
          <div class={`${prefixCls}-body`}>
            <MonthTable
              disabledDate={disabledDate}
              onSelect={this.setAndSelectValue}
              locale={locale}
              value={sValue}
              cellRender={cellRender}
              contentRender={contentRender}
              prefixCls={prefixCls}
              type={this.type}
              selectType={this.selectType}
            />
          </div>
          {footer && <div class={`${prefixCls}-footer`}>{footer}</div>}
        </div>
      </div>
    );
  },
};

export default MonthPanel;
