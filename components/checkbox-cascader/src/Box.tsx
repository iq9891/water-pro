import { defineComponent, computed, ref, watchEffect } from 'vue';
import { hasOwn, isEmpty } from '@fe6/shared';
import cloneDeep from 'lodash-es/cloneDeep';
import useConfigInject from '../../_util/hooks/useConfigInject';
import Item from './Item';
import { defaultFields } from './utils';
import { boxProps } from './props';

export default defineComponent({
  name: 'ACheckboxCascaderBox',
  inheritAttrs: false,
  __ANT_CHECKBOX: true,
  props: boxProps,
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('checkbox-cascader', props);
    const theFields = computed(() => ({ ...defaultFields, ...props.fieldNames }));
    const theValue = ref<any>({});
    const theOneIdx = ref(-1);
    const theTwoIdx = ref(-1);

    const goEmit = () => {
      emit('update:value', theValue.value);
      emit('change', theValue.value);
    };

    const oneChange = (status: boolean, item: any) => {
      if (status) {
        if (!hasOwn(theValue.value, item[theFields.value.value])) {
          theValue.value[item[theFields.value.value]] = {};
        }
        const theChild = item[theFields.value.children].slice();
        if (theChild.length > 0) {
          theChild.forEach((twoItem: any) => {
            if (!hasOwn(theValue.value?.[item[theFields.value.value]], twoItem[theFields.value.value])) {
              theValue.value[item[theFields.value.value]][twoItem[theFields.value.value]] = {};
            }
            theValue.value[item[theFields.value.value]][twoItem[theFields.value.value]] = twoItem[theFields.value.children].map((threeItem: any) => String(threeItem[theFields.value.value]));
          });
        }
      } else {
        delete theValue.value[item[theFields.value.value]];
      }
      goEmit();
    };

    const openOne = (itemIdx: number) => {
      theOneIdx.value = itemIdx;
      theTwoIdx.value = -1;
    };

    const twoChange = (status: boolean, item: any) => {
      const theOneCode = props.options[theOneIdx.value][theFields.value.value];
      if (status) {
        if (!hasOwn(theValue.value, theOneCode)) {
          theValue.value[theOneCode] = {};
        }
        if (!hasOwn(theValue.value?.theOneCode, item[theFields.value.value])) {
          theValue.value[theOneCode][item[theFields.value.value]] = [];
        }
        theValue.value[theOneCode][item[theFields.value.value]] = item[theFields.value.children].map((threeItem: any) => String(threeItem[theFields.value.value]));
      } else {
        delete theValue.value[theOneCode][item[theFields.value.value]];
        if (isEmpty(theValue.value[theOneCode])) {
          delete theValue.value[theOneCode];
        }
      }
      goEmit();
    };

    const openTwo = (itemIdx: number) => {
      theTwoIdx.value = itemIdx;
    };

    const threeChange = (status: boolean, item: any) => {
      const theOneCode = props.options[theOneIdx.value][theFields.value.value];
      const theTwoCode = props.options[theOneIdx.value][theFields.value.children][theTwoIdx.value][theFields.value.value];
      if (status) {
        if (!hasOwn(theValue.value, theOneCode)) {
          theValue.value[theOneCode] = {};
        }
        if (!theValue.value?.[theOneCode]?.[theTwoCode]) {
          theValue.value[theOneCode][theTwoCode] = [];
        }
        theValue.value[theOneCode][theTwoCode].push(String(item[theFields.value.value]));
      } else {
        const theIdx = theValue.value[theOneCode][theTwoCode].findIndex((threeCode: string) => threeCode === String(item[theFields.value.value]));
        if (theIdx > -1) {
          theValue.value[theOneCode][theTwoCode].splice(theIdx, 1);
          if (theValue.value[theOneCode][theTwoCode].length === 0) {
            delete theValue.value[theOneCode][theTwoCode];
          }
          if (isEmpty(theValue.value[theOneCode])) {
            delete theValue.value[theOneCode];
          }
        }
      }
      goEmit();
    };

    const allChange = (status: boolean) => {
      if (status) {
        props.options.forEach((oneItem: any) => {
          theValue.value[oneItem[theFields.value.value]] = {};
          if (hasOwn(oneItem, theFields.value.children) && oneItem[theFields.value.children].length > 0) {
            oneItem[theFields.value.children].forEach((twoItem: any) => {
              theValue.value[oneItem[theFields.value.value]][twoItem[theFields.value.value]] = {};
              if (hasOwn(twoItem, theFields.value.children) && twoItem[theFields.value.children].length > 0) {
                theValue.value[oneItem[theFields.value.value]][twoItem[theFields.value.value]] = twoItem[theFields.value.children].map((threeItem: any) => String(threeItem[theFields.value.value]));
              }
            });
          }
        });
      } else {
        theValue.value = {};
      }
      goEmit();
    };

    watchEffect(() => {
      if (props.value && !isEmpty(props.value)) {
        theValue.value = cloneDeep(props.value);
      }
    });

    return {
      prefixClsNew,
      theFields,
      theValue,
      allChange,
      openOne,
      oneChange,
      theOneIdx,
      theTwoIdx,
      twoChange,
      openTwo,
      threeChange,
    };
  },
  render() {
    const oneCode = this.theOneIdx > -1 ? this.options[this.theOneIdx][this.theFields.value] : -1;
    const twoCode = this.theOneIdx > -1 && this.theTwoIdx > -1 ? this.options[this.theOneIdx][this.theFields.children][this.theTwoIdx][this.theFields.value] : -1;

    let twoItem = null;
    if (this.theOneIdx > -1) {
      twoItem = <Item
        showArrow
        preWidth={this.preWidth}
        preHeight={this.preHeight}
        options={this.theOneIdx>-1?this.options[this.theOneIdx][this.theFields.children]:[]}
        fieldNames={this.theFields}
        onChange={this.twoChange}
        onClick={this.openTwo}
        value={this.theValue}
        level={2}
        oneCode={oneCode}
        twoCode={twoCode}
      />;
    }

    let threeItem = null;
    if (this.theTwoIdx > -1) {
      threeItem = <Item
        preWidth={this.preWidth}
        preHeight={this.preHeight}
        options={this.theOneIdx>-1&&this.theTwoIdx>-1?this.options[this.theOneIdx][this.theFields.children][this.theTwoIdx][this.theFields.children]:[]}
        fieldNames={this.theFields}
        onChange={this.threeChange}
        value={this.theValue}
        level={3}
        oneCode={oneCode}
        twoCode={twoCode}
      />;
    }

    return <div class={this.prefixClsNew}>
      <Item
        showArrow
        preWidth={this.preWidth}
        preHeight={this.preHeight}
        options={this.options}
        fieldNames={this.theFields}
        onChange={this.oneChange}
        onClick={this.openOne}
        onAllChange={this.allChange}
        value={this.theValue}
        level={1}
        oneCode={oneCode}
      />
      {twoItem}
      {threeItem}
    </div>;
  },
});
