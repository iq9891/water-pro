<template>
  <a-space direction="vertical">
    <a-checkbox-cascader
      v-model:value="value"
      :options="theOptions"
      inputStyle="width:240px"
      disabled
    ></a-checkbox-cascader>
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
export default defineComponent({
  setup() {
    const theOptions = ref([]);
    const getOpts = () => {
      fetch(`https://api.dev.mosh.cn/public/region/tree`)
        .then(res => res.json())
        .then((res) => {
          if (res.code === 10000) {
            theOptions.value = res.data;
          }
        });
    }

    onBeforeMount(getOpts);

    return {
      value: ref({
        120000: {
          120100: [120104],
        },
        "140000": {
          "140400": [ "140406" ],
        }
      }),
      theOptions,
    };
  },
});
</script>
