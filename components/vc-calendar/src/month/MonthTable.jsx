import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import { getTodayTime, getMonthName } from '../util/index';

const ROW = 4;
const COL = 3;

function noop() {}

const MonthTable = {
  name: 'MonthTable',
  inheritAttrs: false,
  mixins: [BaseMixin],
  props: {
    cellRender: PropTypes.func,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    locale: PropTypes.any,
    contentRender: PropTypes.any,
    disabledDate: PropTypes.func,
    type: { type: String, default: ''}, // 'multiple'
    // 用于匹配多选的时候，月和年的时候和日期切换月年的区别
    selectType: { type: String, default: ''}, // 'date' | 'month' | 'year'
  },
  data() {
    return {
      sValue: this.value,
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
      this.setState({
        sValue: isMultiple? [value] : value,
      });
      this.__emit('select', value);
    },
    chooseMonth(month) {
      const isMultiple = this.type === 'multiple';
      const value = isMultiple ? this.sValue?.[0]:this.sValue;
      const next = value.clone();
      next.month(month);
      this.setAndSelectValue(next);
    },
    months() {
      const isMultiple = this.type === 'multiple';
      const value = isMultiple ? this.sValue?.[0]:this.sValue;
      const current = value.clone();
      const months = [];
      let index = 0;
      for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
        months[rowIndex] = [];
        for (let colIndex = 0; colIndex < COL; colIndex++) {
          current.month(index);
          const content = getMonthName(current);
          months[rowIndex][colIndex] = {
            value: index,
            content,
            title: content,
          };
          index++;
        }
      }
      return months;
    },
  },

  render() {
    const props = this.$props;
    const isMultiple = this.type === 'multiple';
    // 如果当前是月份选择器
    const isMonth = this.selectType === 'month';
    const value = isMultiple ? this.sValue?.[0]:this.sValue;
    const today = getTodayTime(value);
    const months = this.months();
    const currentMonth = value.month();
    const { prefixCls, locale, contentRender, cellRender, disabledDate } = props;
    const monthsEls = months.map((month, index) => {
      const tds = month.map((monthData) => {
        let disabled = false;
        if (disabledDate) {
          const testValue = value.clone();
          testValue.month(monthData.value);
          disabled = disabledDate(testValue);
        }
        let isCurrentOn = false;
        let isSelectOn = false;
        if (isMonth && isMultiple) {
          const hasOne = this.value.find((theVal) => {
            return value.year() === theVal.year() && monthData.value === theVal.month();
          });
          if (hasOne) {
            isCurrentOn = true;
            isSelectOn = true;
          }
        } else {
          isCurrentOn = today.year() === value.year() && monthData.value === today.month();
          isSelectOn = monthData.value === currentMonth;
        }
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-cell-disabled`]: disabled,
          [`${prefixCls}-selected-cell`]: isSelectOn,
          [`${prefixCls}-current-cell`]: isCurrentOn,
        };
        let cellEl;
        if (cellRender) {
          const currentValue = value.clone();
          currentValue.month(monthData.value);
          cellEl = cellRender({ current: currentValue, locale });
        } else {
          let content;
          if (contentRender) {
            const currentValue = value.clone();
            currentValue.month(monthData.value);
            content = contentRender({ current: currentValue, locale });
          } else {
            content = monthData.content;
          }
          cellEl = <a class={`${prefixCls}-month`}>{content}</a>;
        }
        return (
          <td
            role="gridcell"
            key={monthData.value}
            onClick={disabled ? noop : () => this.chooseMonth(monthData.value)}
            title={monthData.title}
            class={classNameMap}
          >
            {cellEl}
          </td>
        );
      });
      return (
        <tr key={index} role="row">
          {tds}
        </tr>
      );
    });

    return (
      <table class={`${prefixCls}-table`} cellspacing="0" role="grid">
        <tbody class={`${prefixCls}-tbody`}>{monthsEls}</tbody>
      </table>
    );
  },
};

export default MonthTable;
