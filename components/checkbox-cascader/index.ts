import { App, Plugin } from 'vue';
import CheckboxCascader from './src/Index';
import CheckboxCascaderBox from './src/Box';

CheckboxCascader.Box = CheckboxCascaderBox;

/* istanbul ignore next */
CheckboxCascader.install = function(app: App) {
  app.component(CheckboxCascader.name, CheckboxCascader);
  app.component(CheckboxCascaderBox.name, CheckboxCascaderBox);
  return app;
};

export default CheckboxCascader as typeof CheckboxCascader &
  Plugin & {
    readonly Box: typeof CheckboxCascaderBox;
  };
