<template>
  <a-form
    name="custom-validation"
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item required has-feedback label="Password" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Age" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { RuleObject, ValidateErrorEntity } from '../../../../components/form/interface';
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';
interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      pass: '',
      checkPass: '',
      age: undefined,
    });
    let checkAge = async (rule: RuleObject, value: number) => {
      if (!value) {
        return Promise.reject(new Error('Please input the age'));
      }
      if (!Number.isInteger(value)) {
        return Promise.reject(new Error('Please input digits'));
      } else {
        if (value < 18) {
          return Promise.reject(new Error('Age must be greater than 18'));
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePass = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject(new Error('Please input the password'));
      } else {
        if (formState.checkPass !== '') {
          formRef.value.validateField('checkPass');
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject(new Error('Please input the password again'));
      } else if (value !== formState.pass) {
        return Promise.reject(new Error("Two inputs don't match!"));
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      pass: [{ validator: validatePass, trigger: 'change' }],
      checkPass: [{ validator: validatePass2, trigger: 'change' }],
      age: [{ validator: checkAge, trigger: 'change' }],
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
    };
  },
});
</script>
