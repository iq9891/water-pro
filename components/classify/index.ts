import { App, Plugin } from 'vue';
import Classify from './src/Classify';

/* istanbul ignore next */
Classify.install = function(app: App) {
  app.component(Classify.name, Classify);
  return app;
};

export default Classify as typeof Classify &
  Plugin & {
    readonly Group: typeof Classify;
  };
