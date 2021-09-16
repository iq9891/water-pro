import 'moment/dist/locale/zh-cn';
import '@@style';
import water from '@@';
import Md from '../components/md.vue';
import Api from '../components/api.vue';
import demoBox from '../components/demoBox.vue';
import demoContainer from '../components/demoContainer.vue';
import demoSort from '../components/demoSort';

const basic = (_, { slots }) => {
  return slots && slots.default && slots.default();
};

export const setupComponents = (app) => {
  app.use(water);

  app.component(Md.name, Md);
  app.component(Api.name, Api);
  app.component('demo-box', demoBox);
  app.component('demo-container', demoContainer);
  app.component('demo-sort', demoSort);
  app.component('demo', basic)
}
