import { App, Plugin } from 'vue';
import Form from './Form';

export type { FormProps } from './Form';
export type { FormItemProps } from './FormItem';

export { formProps } from './Form';
export { formItemProps } from './FormItem';

/* istanbul ignore next */
Form.install = function (app: App) {
  app.component(Form.name, Form);
  app.component(Form.Item.name, Form.Item);
  return app;
};

export default Form as typeof Form &
  Plugin & {
    readonly Item: typeof Form.Item;
  };
