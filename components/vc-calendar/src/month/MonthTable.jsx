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
      this.setState({
        sValue: value,
      });
      this.__emit('select', value);
    },
    chooseMonth(month) {
      const next = this.sValue.clone().month(month);
      this.setAndSelectValue(next);
    },
    months() {
      const value = this.sValue;
      let current = value.clone();
      const months = [];
      let index = 0;
      for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
        months[rowIndex] = [];
        for (let colIndex = 0; colIndex < COL; colIndex++) {
          current = current.month(index);
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
    const value = this.sValue;
    const today = getTodayTime(value);
    const months = this.months();
    const currentMonth = value.month();
    const { prefixCls, locale, contentRender, cellRender, disabledDate } = props;
    const monthsEls = months.map((month, index) => {
      const tds = month.map((monthData, monthIdx) => {
        let disabled = false;
        if (disabledDate) {
          const testValue = value.clone();
          testValue.month(monthData.value);
          disabled = disabledDate(testValue);
        }
        const classNameMap = {
          [`${prefixCls}-cell`]: 1,
          [`${prefixCls}-cell-disabled`]: disabled,
          [`${prefixCls}-selected-cell`]: monthData.value === currentMonth,
          [`${prefixCls}-current-cell`]:
            today.year() === value.year() && monthData.value === today.month(),
        };
        let cellEl;
        if (cellRender) {
          const currentValue = value.clone().month(monthData.value);
          cellEl = cellRender({ current: currentValue, locale, row: index, col: monthIdx });
        } else {
          let content;
          if (contentRender) {
            const currentValue = value.clone().month(monthData.value);
            content = contentRender({ current: currentValue, locale, row: index, col: monthIdx });
          } else {
            // fix 日期的月选择器渲染失败
            const currentValue = value.clone().month(monthData.value);
            content = currentValue.localeData().monthsShort()[monthIdx + index*3];
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
