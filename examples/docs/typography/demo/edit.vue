<template>
  <a-radio-group v-model:value="size" button-style="solid">
    <a-radio-button value="small">Small</a-radio-button>
    <a-radio-button value="default">Default</a-radio-button>
    <a-radio-button value="large">Large</a-radio-button>
  </a-radio-group>
  <a-typography-paragraph :size="size" v-model:content="editableStr" editable />
  <a-typography-paragraph :size="size" v-model:content="customIconStr" editable>
    <template v-slot:editableIcon><HighlightOutlined /></template>
    <template v-slot:editableTooltip>click to edit text</template>
  </a-typography-paragraph>
  <a-typography-paragraph :size="size" v-model:content="hideTooltipStr" :editable="{ tooltip: false }" />
  <a-typography-paragraph :size="size"
    v-model:content="lengthLimitedStr"
    :editable="{ maxlength: 50, autoSize: { maxRows: 5, minRows: 3 } }"
  />

  <a-typography-paragraph :size="size" copyable>This is a copyable text.</a-typography-paragraph>
  <a-typography-paragraph :size="size" :copyable="{ text: 'Hello, Ant Design!' }">
    Replace copy text.
  </a-typography-paragraph>
  <a-typography-paragraph :size="size" copyable content="Custom Copy icon and replace tooltips text.">
    <template v-slot:copyableIcon="{ copied }">
      <SmileOutlined v-if="!copied" key="copy-icon" />
      <SmileFilled v-else key="copied-icon" />
    </template>
    <template v-slot:copyableTooltip="{ copied }">
      <span v-if="!copied" key="copy-tooltip">click here</span>
      <span v-else key="copied-tooltip">you clicked!!</span>
    </template>
  </a-typography-paragraph>
  <a-typography-paragraph :size="size" :copyable="{ tooltips: false }">
    Hide Copy tooltips.
  </a-typography-paragraph>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const editableStr = ref('This is an editable text.');
    watch(editableStr, () => {
      console.log('editableStr', editableStr.value);
    });
    return {
      size: ref('default'),
      editableStr,
      customIconStr: ref('Custom Edit icon and replace tooltip text.'),
      hideTooltipStr: ref('Hide Edit tooltip.'),
      lengthLimitedStr: ref('This is an editable text with limited length.'),
    };
  },
  components: {
    HighlightOutlined,
    SmileOutlined,
    SmileFilled,
  },
});
</script>
