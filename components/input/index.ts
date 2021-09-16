import { App, Plugin } from 'vue';
import Input from './Input';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Password from './Password';
import InputCount from './InputCount';
import SmsCode from './sms-code';

Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.InputCount = InputCount;
Input.SmsCode = SmsCode;

/* istanbul ignore next */
Input.install = function (app: App) {
  app.component(Input.name, Input);
  app.component(Input.Group.name, Input.Group);
  app.component(Input.Search.name, Input.Search);
  app.component(Input.TextArea.name, Input.TextArea);
  app.component(Input.Password.name, Input.Password);
  app.component(Input.InputCount.name, Input.InputCount);
  app.component(Input.SmsCode.name, Input.SmsCode);
  return app;
};

export default Input as typeof Input &
  Plugin & {
    readonly Group: typeof Group;
    readonly Search: typeof Search;
    readonly TextArea: typeof TextArea;
    readonly Password: typeof Password;
    readonly InputCount: typeof InputCount;
    readonly SmsCode: typeof SmsCode;
  };
