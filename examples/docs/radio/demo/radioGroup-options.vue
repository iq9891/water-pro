<template>
  <div>
    <a-radio-group :options="plainOptions" v-model:value="value1" />
    <br />
    <br />
    <a-radio-group v-model:value="value2" :options="options" disabled />
    <br />
    <br />
    <a-radio-group v-model:value="value3" :options="optionsWithDisabled" />
    <br />
    <br />
    <a-radio-group type="button" :options="plainOptions" v-model:value="value1" />
    <br />
    <br />
    <a-radio-group size="small" type="button" v-model:value="value2" :options="options" disabled />
    <br />
    <br />
    <a-radio-group size="large" type="button" v-model:value="value3" :options="optionsWithDisabled" />
    <br />
    <br />
    <a-radio-group type="button" buttonStyle="solid" :options="plainOptions" v-model:value="value1" />
    <br />
    <br />
    <a-radio-group size="small" type="button" buttonStyle="solid" v-model:value="value2" :options="options" disabled />
    <br />
    <br />
    <a-radio-group size="large" type="button" buttonStyle="solid" v-model:value="value3" :options="optionsWithDisabled" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];
export default defineComponent({
  data() {
    const value1 = ref<string>('Apple');
    const value2 = ref<string>('Apple');
    const value3 = ref<string>('Apple');

    return {
      plainOptions,
      options,
      optionsWithDisabled,
      value1,
      value2,
      value3,
    };
  },
});
</script>
