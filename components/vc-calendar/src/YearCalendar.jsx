import moment from 'moment';
import PropTypes from '../../_util/vue-types';
import BaseMixin from '../../_util/BaseMixin';
import KeyCode from '../../_util/KeyCode';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
import zhCn from './locale/zh_CN';
import { defineComponent } from 'vue';
const YearCalendar = defineComponent({
  name: 'YearCalendar',
  mixins: [BaseMixin, CommonMixin, CalendarMixin],
  inheritAttrs: false,
  props: {
    locale: PropTypes.object.def(zhCn),
    format: PropTypes.string,
    visible: PropTypes.looseBool.def(true),
    prefixCls: PropTypes.string.def('rc-calendar'),
    yearCellRender: PropTypes.func,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    selectedValue: PropTypes.object,
    defaultSelectedValue: PropTypes.object,
    disabledDate: PropTypes.func,
    yearCellContentRender: PropTypes.func,
    renderFooter: PropTypes.func.def(() => null),
    renderSidebar: PropTypes.func.def(() => null),
  },

  data() {
    const props = this.$props;
    return {
      mode: 'year',
      sValue: props.value || props.defaultValue || moment(),
      sSelectedValue: props.selectedValue || props.defaultSelectedValue,
    };
  },
  methods: {
    onKeyDown(event) {
      const keyCode = event.keyCode;
      const ctrlKey = event.ctrlKey || event.metaKey;
      const stateValue = this.sValue;
      const { disabledDate } = this;
      let value = stateValue;
      switch (keyCode) {
        case KeyCode.DOWN:
          value = stateValue.clone();
          value.add(3, 'years');
          break;
        case KeyCode.UP:
          value = stateValue.clone();
          value.add(-3, 'years');
          break;
        case KeyCode.LEFT:
          value = stateValue.clone();
          if (ctrlKey) {
            value.add(-1, 'decade');
          } else {
            value.add(-1, 'years');
          }
          break;
        case KeyCode.RIGHT:
          value = stateValue.clone();
          if (ctrlKey) {
            value.add(1, 'decade');
          } else {
            value.add(1, 'years');
          }
          break;
        case KeyCode.ENTER:
          if (!disabledDate || !disabledDate(stateValue)) {
            this.onSelect(stateValue);
          }
          event.preventDefault();
          return 1;
        default:
          return undefined;
      }
      if (value !== stateValue) {
        this.setValue(value);
        event.preventDefault();
        return 1;
      }
    },

    handlePanelChange(_, mode) {
      if (mode !== 'date') {
        this.setState({ mode });
      }
    },
  },

  render() {
    const { mode, sValue: value, $props: props, $slots } = this;
    const { prefixCls, locale, disabledDate } = props;
    const yearCellRender = this.yearCellRender || $slots.yearCellRender;
    const yearCellContentRender = this.yearCellContentRender || $slots.yearCellContentRender;
    const renderFooter = this.renderFooter || $slots.renderFooter;
    const children = (
      <div class={`${prefixCls}-year-calendar-content`}>
        <div class={`${prefixCls}-year-header-wrap`}>
          <CalendarHeader
            prefixCls={prefixCls}
            mode={mode}
            value={value}
            locale={locale}
            disabledYear={disabledDate}
            yearCellRender={yearCellRender}
            yearCellContentRender={yearCellContentRender}
            onYearSelect={this.onSelect}
            onValueChange={this.setValue}
            onPanelChange={this.handlePanelChange}
          />
        </div>
        <CalendarFooter prefixCls={prefixCls} renderFooter={renderFooter} />
      </div>
    );
    return this.renderRoot({
      class: `${props.prefixCls}-year-calendar`,
      children,
    });
  },
});

export default YearCalendar;
