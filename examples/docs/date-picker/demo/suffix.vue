<template>
  <a-space direction="vertical">
    <a-date-picker @change="onChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-date-picker>
    <a-month-picker @change="onChange" placeholder="Select month">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-month-picker>
    <a-range-picker @change="onChange">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-range-picker>
    <a-week-picker @change="onChange" placeholder="Select week">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </a-week-picker>
    <a-date-picker suffix-icon="ab" @change="onChange" />
    <a-month-picker suffix-icon="ab" placeholder="Select month" @change="onChange" />
    <a-range-picker suffix-icon="ab" @change="onChange" />
    <a-week-picker suffix-icon="ab" placeholder="Select week" @change="onChange" />
    <a-year-picker suffix-icon="ab" placeholder="Select year" @change="onChange" />
  </a-space>
</template>
<script lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue';
import { Dayjs } from 'dayjs';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    const onChange = (date: Dayjs, dateString: string[]) => {
      console.log(date, dateString);
    };

    return {
      onChange,
    };
  },
});
</script>
