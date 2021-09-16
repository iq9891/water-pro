import type { FormActionType, FormProps, FormSchema } from './types/form';
import type { AdvanceState } from './types/hooks';
import type { CSSProperties, Ref } from 'vue';

import {
  defineComponent,
  reactive,
  ref,
  computed,
  unref,
  onMounted,
  watch,
  toRefs,
  nextTick,
} from 'vue';
import { deepMerge, hasOwn, isBoolean, isFunction } from '@fe6/shared';

import Row from '../../grid/Row';
import ACard from '../../card';
import AAffix from '../../affix';
import Form from '../../form/Form';
import { useModalContext } from '../../modal-pro';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { getSlot } from '../../_util/props-util';

import FormItem from './components/form-item';
import FormAction from './components/form-action';

import { useFormValues } from './hooks/use-form-values';
import useAdvanced from './hooks/use-advanced';
import { useFormEvents } from './hooks/use-form-events';
import { createFormContext } from './hooks/use-form-context';
import { useAutoFocus } from './hooks/use-auto-focus';

import { basicProps } from './props';
import { dateUtil } from './date';
import { dateItemType } from './helper';

export default defineComponent({
  name: 'AFormPro',
  components: { FormItem, Form, Row, FormAction, ACard, AAffix },
  props: basicProps,
  emits: ['advanced-change', 'reset', 'submit', 'register'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('form-pro', props);
    const formModel = reactive<Recordable>({});
    const modalFn = useModalContext();

    const advanceState = reactive<AdvanceState>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6,
    });

    const defaultValueRef = ref<Recordable>({});
    const isInitedDefaultRef = ref(false);
    const propsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<Nullable<FormSchema[]>>(null);
    const formElRef = ref<Nullable<FormActionType>>(null);

    // const { prefixCls } = useDesign('basic-form');

    // Get the basic configuration of the form
    const getProps = computed(
      (): FormProps => {
        return { ...props, ...unref(propsRef) } as FormProps;
      },
    );

    const getFormClass = computed(() => {
      return [
        prefixClsNew.value,
        {
          [`${prefixClsNew.value}--compact`]: unref(getProps).compact,
        },
      ];
    });

    // Get uniform row style
    const getRowWrapStyle = computed(
      (): CSSProperties => {
        const { baseRowStyle = {} } = unref(getProps);
        return baseRowStyle;
      },
    );

    // 由于有 children ，所以统一处理一下
    const getTrueSchema = (schemas: FormSchema[]) => {
      const newSchema = [];

      schemas.forEach((sItem: FormSchema) => {
        if (hasOwn(sItem, 'children') && sItem.children.length > 0) {
          sItem.children.forEach((cItem: FormSchema) => {
            newSchema.push(cItem);
          });
        } else {
          newSchema.push(sItem);
        }
      });

      return newSchema;
    }

    const getOriginSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] =
        unref(schemaRef) || (unref(getProps).schemas as any);
      for (const schema of schemas) {
        const { defaultValue, component } = schema;
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue);
          } else {
            const def: moment.Moment[] = [];
            defaultValue.forEach((item) => {
              def.push(dateUtil(item));
            });
            schema.defaultValue = def;
          }
        }
      }
      return schemas as FormSchema[];
    });

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] =
        unref(schemaRef) || (unref(getProps).schemas as any);
      const trueSchemas: FormSchema[] = getTrueSchema(schemas);
      for (const schema of trueSchemas) {
        const { defaultValue, component } = schema;
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue);
          } else {
            const def: moment.Moment[] = [];
            defaultValue.forEach((item) => {
              def.push(dateUtil(item));
            });
            schema.defaultValue = def;
          }
        }
      }
      return trueSchemas as FormSchema[];
    });

    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit: emit as any,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    });

    const { autoFocusFirstItem } = toRefs(
      props,
    );

    const { handleFormValues, initDefault } = useFormValues({
      defaultValueRef,
      getSchema,
      formModel,
      getProps,
    });

    useAutoFocus({
      getSchema,
      autoFocusFirstItem,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionType>,
    });

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      getChildrenFieldsValue,
      updateSchema,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      scrollToField,
    } = useFormEvents({
      emit: emit as any,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formElRef as Ref<FormActionType>,
      schemaRef: schemaRef as any, // Ref<FormSchema[]>
      getOriginSchema: getOriginSchema as any, // Ref<FormSchema[]>
      handleFormValues,
    });

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
    });

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setFieldsValue(model);
      },
      {
        immediate: true,
      },
    );

    watch(
      () => getSchema.value,
      (schema) => {
        nextTick(() => {
          //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
          modalFn?.redoModalHeight?.();
        });
        if (unref(isInitedDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isInitedDefaultRef.value = true;
        }
      },
    );

    watch(
      () => getProps.value,
      async () => {
        await nextTick();
        if (!unref(getProps.value)) {
          return;
        }
        initDefault();
      },
    );

    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value;
    }
    // 因为同一个表单 调用 updateSchema 的时候提交的数据还是之前的数据格式
    const resetAllModel = async () => {
      const resetSchemas = unref(getSchema);
      resetSchemas.forEach((sItem) => {
        if (sItem.defaultValue) {
          formModel[sItem.field] = sItem.defaultValue;
        }
      });
    };

    const formActionType: Partial<FormActionType> = {
      getFieldsValue,
      setFieldsValue,
      getChildrenFieldsValue,
      resetFields,
      resetAllModel,
      updateSchema,
      setProps,
      removeSchemaByFiled,
      appendSchemaByField,
      clearValidate,
      validateFields,
      validate,
      submit: handleSubmit,
      scrollToField,
    };

    onMounted(() => {
      initDefault();
      emit('register', formActionType);
    });

    return {
      handleToggleAdvanced,
      formModel,
      defaultValueRef,
      advanceState,
      getRowWrapStyle,
      getProps,
      formElRef,
      getSchema,
      getOriginSchema,
      formActionType,
      setFormModel,
      prefixClsNew,
      getFormClass,
      navActiveKey: ref(-1),
      ...formActionType,
    };
  },
  methods: {
    getShow(schema): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow } = schema;
      const { showAdvancedButton, mergeDynamicData } = this.getProps;
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(schema.isAdvanced)
          ? schema.isAdvanced
          : true
        : true;
      const getValues = ref({
        field: schema.field,
        model: this.formModel,
        values: {
          ...mergeDynamicData,
          ...(this.defaultValueRef as any),
          ...(this.formModel as any),
        } as Recordable,
        schema,
      })
      let isShow = true;
      let isIfShow = true;

      if (isBoolean(show)) {
        isShow = show as boolean;
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow as boolean;
      }
      if (isFunction(show)) {
        isShow = (show as Function)(getValues);
      }
      if (isFunction(ifShow)) {
        isIfShow = (ifShow as Function)(getValues);
      }
      isShow = (isShow && itemIsAdvanced) as boolean;
      return { isShow, isIfShow };
    },
    renderItems() {
      const { $slots } = this;
      const schemaItems = [];
      this.getOriginSchema.forEach((schema: FormSchema, sIdx: number) => {
        if (schema.children && schema.children.length > 0) {
          const { isIfShow, isShow } = this.getShow(schema);
          const childNodes = [];

          if (isIfShow) {
            schema.children.forEach((schemaChildItem: FormSchema) => {
              childNodes.push(<FormItem
                table-action={this.tableAction}
                form-action-type={this.formActionType}
                schema={schemaChildItem}
                form-props={this.getProps}
                all-default-values={this.defaultValueRef}
                form-model={this.formModel}
                set-form-model={this.setFormModel}
                v-slots={$slots}
              />)
            });

            schemaItems.push(<a-card
              v-show={isShow}
              title={schema.label}
              class={`${this.prefixClsNew}-card ${this.prefixClsNew}-card-${schema.field}${this.getProps.navAffix && sIdx === 0 ? ` ${this.prefixClsNew}-card-first` : ''}`}
              style="width: 100%"
            >
              {childNodes}
            </a-card>)
          }
        } else {
          schemaItems.push(<FormItem
            table-action={this.tableAction}
            form-action-type={this.formActionType}
            schema={schema}
            form-props={this.getProps}
            all-default-values={this.defaultValueRef}
            form-model={this.formModel}
            set-form-model={this.setFormModel}
            v-slots={$slots}
          />)
        }
      });
      return schemaItems;
    },
    async navClick(field: string, navScrollIdx: number) {
      await nextTick();
      const scrollNode = document.getElementsByClassName(`${this.prefixClsNew}-card-${field}`);
      
      if (scrollNode.length) {
        this.navActiveKey = navScrollIdx;
        scrollNode[0].scrollIntoView({
          // 滚动到指定节点
          // 值有start,center,end，nearest，当前显示在视图区域中间
          block: 'center',
          // 值有auto、instant,smooth，缓动动画（当前是慢速的）
          behavior: 'smooth',
        });
      }
    },
  },
  render() {
    const formProps: any = {
      ...this.$attrs,
      ...this.$props,
      ref: 'formElRef',
      class: this.getFormClass,
      model: this.formModel,
    };

    const formHeaderNode = getSlot(this, 'formHeader');
    const formFooterNode = getSlot(this, 'formFooter');

    const slots = {
      resetBefore: () => getSlot(this, 'resetBefore'),
      submitBefore: () => getSlot(this, 'submitBefore'),
      advanceBefore: () => getSlot(this, 'advanceBefore'),
      advanceAfter: () => getSlot(this, 'advanceAfter'),
    };
    const actionsProps = {
      ...this.getProps,
      ...this.advanceState,
      schemas: this.getSchema,
      onToggleAdvanced: this.handleToggleAdvanced,
    }

    const actionInnerNode = (<FormAction {...actionsProps} v-slots={slots} />)

    let actionNode = null
    if (this.getProps.actionAffix) {
      actionNode = (<a-affix
        offset-bottom={this.getProps.actionOffsetBottom}
        target={this.getProps.actionTarget}
        style="width: 100%;"
        class={`${this.prefixClsNew}-footer-affix`}
      >
        {actionInnerNode}
      </a-affix>)
    } else {
      actionNode = actionInnerNode
    }

    let navNode = null;
    const hasChilds = this.getOriginSchema.filter((schema: any) => schema.children && schema.children.length > 0).length === this.getOriginSchema.length;
    if (this.getProps.navAffix && hasChilds) {
      const tabChild = [];

      this.getOriginSchema.forEach((schema: FormSchema, sIdx: number) => {
        const { isIfShow } = this.getShow(schema);
        if (isIfShow) {
          tabChild.push(<span
            key={sIdx}
            class={`${this.prefixClsNew}-nav-item${this.navActiveKey === sIdx ? ` ${this.prefixClsNew}-nav-item-active` : ''}`}
            onClick={() => this.navClick(schema.field, sIdx)}
          >{schema.label}</span>)
        }
      });

      navNode = (<a-affix
        offset-top={this.getProps.navOffsetTop}
        target={this.getProps.navTarget}
        style="width: 100%;"
        class={`${this.prefixClsNew}-nav-affix`}
      >
        <div class={`${this.prefixClsNew}-nav`}>
          {tabChild}
        </div>
      </a-affix>)
    }

    return (<Form {...formProps}>
      <Row style={this.getRowWrapStyle} gutter={this.getProps.baseGutter}>
        {navNode}
        {formHeaderNode}
        {this.renderItems()}
        {actionNode}
        {formFooterNode}
      </Row>
    </Form>)
  },
});
