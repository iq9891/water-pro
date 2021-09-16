<template>
  <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
    <a-calendar v-model:value="value" :fullscreen="false" v-bind:panelChange="onPanelChange">
      <template #headerRender="{ value, type, onChange, onTypeChange }">
        <div style="padding: 10px">
          <div style="margin-bottom: 10px">Custom header</div>
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-radio-group
                size="small"
                :value="type"
                v-bind:change="(e) => onTypeChange(e.target.value)"
              >
                <a-radio-button value="month">Month</a-radio-button>
                <a-radio-button value="year">Year</a-radio-button>
              </a-radio-group>
            </a-col>
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                class="my-year-select"
                :value="String(value.year())"
                v-bind:change="
                  (newYear) => {
                    onChange(value.clone().year(newYear));
                  }
                "
              >
                <a-select-option
                  v-for="val in getYears(value)"
                  :key="String(val)"
                  class="year-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <a-select
                size="small"
                :dropdown-match-select-width="false"
                :value="String(value.month())"
                v-bind:change="
                  (selectedMonth) => {
                    onChange(value.clone().month(parseInt(selectedMonth, 10)));
                  }
                "
              >
                <a-select-option
                  v-for="(val, index) in getMonths(value)"
                  :key="String(index)"
                  class="month-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-calendar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const value = ref<Dayjs>();

    const onPanelChange = (value: Dayjs, mode: string) => {
      console.log(value, mode);
    };

    const getMonths = (value: Dayjs) => {
      const current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }
      return months;
    };

    const getYears = (value: Dayjs) => {
      const year = value.year();
      const years = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }
      return years;
    };

    return {
      value,
      onPanelChange,
      getMonths,
      getYears,
    };
  },
});
</script>
