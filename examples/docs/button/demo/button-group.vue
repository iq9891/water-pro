<template>
  <div id="components-button-demo-button-group">
    <h4>Basic</h4>
    <a-button-group>
      <a-button>Cancel</a-button>
      <a-button type="primary">
        OK
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button disabled>
        L
      </a-button>
      <a-button disabled>
        M
      </a-button>
      <a-button disabled>
        R
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary">
        L
      </a-button>
      <a-button>M</a-button>
      <a-button>M</a-button>
      <a-button type="dashed">
        R
      </a-button>
    </a-button-group>

    <h4>With Icon</h4>
    <a-button-group>
      <a-button type="primary">
        <template #icon><LeftOutlined /></template>
        Go back
      </a-button>
      <a-button type="primary"><template #icon><RightOutlined /></template> Go forward</a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>
      </a-button>
      <a-button type="primary">
        <template #icon><FullscreenExitOutlined /></template>
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
import { SearchOutlined, LeftOutlined, RightOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    FullscreenExitOutlined,
    SearchOutlined,
    LeftOutlined,
    RightOutlined,
  },
};
</script>

<style>
#components-button-demo-button-group > h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group > h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
</style>
