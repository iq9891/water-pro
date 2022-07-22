import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { clone, hasOwn, isEmpty, keys } from '@fe6/shared';
import useConfigInject from '../../_util/hooks/useConfigInject';
import PropTypes from '../../_util/vue-types';
import ContainerScroll from '../../container-scroll';
import Checkbox from '../../checkbox';
import OneCheckbox from './OneCheckbox';
import { defaultFields } from './utils';

export default defineComponent({
  inheritAttrs: false,
  props: {
    prefixCls: PropTypes.string,
    preWidth: PropTypes.number.def(160),
    preHeight: PropTypes.number.def(270),
    showArrow: PropTypes.bool,
    options: PropTypes.array,
    fieldNames: PropTypes.object.def(clone(defaultFields)),
    // value: PropTypes.array,
    value: PropTypes.object,
    level: PropTypes.number,
    oneCode: PropTypes.number, // 用于一级匹配 半选 和 选中
    twoCode: PropTypes.number, // 用于二级匹配 半选 和 选中
  },
  emits: ['change', 'click', 'all-change'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('checkbox-cascader', props);
    const theFields = computed(() => ({ ...defaultFields, ...props.fieldNames }));
    const oneChange = (status: boolean, item: any) => {
      emit('change', status, item);
    };
    const oneClick = (itemIdx: number) => {
      emit('click', itemIdx);
    };

    const selectValue = ref([]); // value 全选中集合
    const halfValue = ref([]); // value 半选集合

    // 检查一级
    const checkOne = () => {
      selectValue.value = [];
      halfValue.value = [];
      // 选中 | 半选
      if (!!props.value && !isEmpty(props.value)) {
        props.options.forEach((oneItem: any) => {
          let isHalf = 1;
          // 一级存在已选值当中，不是半选就是选中
          if (hasOwn(props.value, String(oneItem[theFields.value.value]))) {
            if (hasOwn(oneItem, theFields.value.children)) {
              oneItem[theFields.value.children].forEach((twoItem: any) => {
                // 二级存在已选值当中，不是半选就是选中
                if (hasOwn(props.value[oneItem[theFields.value.value]], String(twoItem[theFields.value.value]))) {
                  if (isHalf !== 2) {
                    isHalf = twoItem[theFields.value.children].length > props.value[oneItem[theFields.value.value]][twoItem[theFields.value.value]].length ? 2 : 3;
                  }
                } else {
                  isHalf = 2;
                }
              });

              if (isHalf === 2) {
                halfValue.value.push(String(oneItem[theFields.value.value]));
              } else {
                selectValue.value.push(String(oneItem[theFields.value.value]));
              }
            }
          }
        });
      }
    };

    // 检查二级
    const checkTwo = () => {
      selectValue.value = [];
      halfValue.value = [];
      // 选中
      if (!!props.value && !isEmpty(props.value)) {
        // 点击展开二级的时候
        if (props.oneCode > -1) {
          props.options.forEach((twoItem: any) => {
            if (hasOwn(props.value?.[props.oneCode], twoItem[theFields.value.value])) {
              if (twoItem[theFields.value.children].length > props.value?.[props.oneCode]?.[twoItem[theFields.value.value]]?.length) {
                halfValue.value.push(String(twoItem[theFields.value.value]));
              } else {
                selectValue.value.push(String(twoItem[theFields.value.value]));
              }
            }
          });
        }
      }
    };

    const checkThree = () => {
      if (isEmpty(props.value) || !props.value) {
        selectValue.value = [];
        halfValue.value = [];
      } else {
        halfValue.value = [];
        if (props.oneCode > -1 && props.twoCode > -1 && hasOwn(props.value, String(props.oneCode)) &&  hasOwn(props.value[props.oneCode], String(props.twoCode))) {
          selectValue.value = props.value[props.oneCode][props.twoCode].slice();
        } else {
          selectValue.value = [];
        }
      }
    };

    // 全选按钮是否选中或半选
    const isAllChecked = ref(false);
    const isAllHalf = ref(false);
    const allOneDatas = ref<any>([]);
    const allTwoDatas = ref<any>([]);
    const allThreeDatas = ref<any>([]);
    const checkAll = () => {
      isAllChecked.value = false;
      isAllHalf.value = false;
      if (!!props.value && !isEmpty(props.value)) {
        const oneKeys = keys(props.value);
        let twoKeyLength = 0;
        let threeKeyLength = 0;
        oneKeys.forEach((oneItem) => {
          const twoKeys = keys(props.value[oneItem]);
          twoKeyLength += twoKeys.length;
          twoKeys.forEach((twoItem) => {
            threeKeyLength += props.value[oneItem][twoItem].length;
          });
        });
        isAllChecked.value = oneKeys.length === allOneDatas.value.length && twoKeyLength === allTwoDatas.value.length && threeKeyLength === allThreeDatas.value.length;
        isAllHalf.value = !isAllChecked.value;
      }
    };
    const getLevel1Datas = () => {
      allOneDatas.value = [];
      allTwoDatas.value = [];
      allThreeDatas.value = [];
      if (props.level === 1 && props.options.length > 0) {
        props.options.forEach((oneItem: any) => {
          allOneDatas.value.push(oneItem[theFields.value.value]);
          if (hasOwn(oneItem, theFields.value.children) && oneItem[theFields.value.children].length > 0) {
            oneItem[theFields.value.children].forEach((twoItem: any) => {
              allTwoDatas.value.push(twoItem[theFields.value.value]);
              if (hasOwn(twoItem, theFields.value.children) && twoItem[theFields.value.children].length > 0) {
                twoItem[theFields.value.children].forEach((threeItem: any) => {
                  allThreeDatas.value.push(threeItem[theFields.value.value]);
                });
              }
            });
          }
        });
      }
    };

    const allChange = ({target}: any) => {
      emit('all-change', target?.checked);
    };

    const checkSelects = () => {
      if (props.level === 1) {
        getLevel1Datas();
        checkOne();
        checkAll();
      } else if(props.level === 2) {
        checkTwo();
      } else {
        checkThree();
      }
    };

    watch(() => props.options, getLevel1Datas, {
      deep: true,
    });

    watch(() => props.value, checkSelects, {
      deep: true,
    });

    watch(() => props.oneCode, checkSelects);
    watch(() => props.twoCode, checkSelects);

    // FIX 有值显示不选中
    onMounted(checkSelects);

    return {
      prefixClsNew,
      theFields,
      isAllChecked,
      isAllHalf,
      allChange,
      oneChange,
      oneClick,
      selectValue,
      halfValue,
    };
  },
  render() {
    let theAll = null;
    let theHeigth = this.preHeight;
    if (this.level === 1) {
      theAll = <div class={`${this.prefixClsNew}-all`}>
        <Checkbox
          checked={this.isAllChecked}
          indeterminate={this.isAllHalf}
          onChange={this.allChange}
        ></Checkbox>
        <span style="padding-left: 8px">全选</span>
      </div>;
      theHeigth = this.preHeight - 30;
    }

    let theCheckboxs = [];
    if (this.options.length > 0) {
      theCheckboxs = this.options.map((items: any, itemIdx: number) => {
        const isCheck = this.selectValue.includes(String(items[this.theFields.value]));
        const indeterminate = this.halfValue.includes(String(items[this.theFields.value]));

        return <OneCheckbox
          checked={isCheck}
          indeterminate={indeterminate}
          text={items[this.theFields?.label]}
          showArrow={this.showArrow}
          onChange={(status: boolean) => this.oneChange(status, items, itemIdx)}
          onClick={() => this.oneClick(itemIdx)}
        />;
      });
    }

    return <div class={`${this.prefixClsNew}-item`} style={{width: `${this.preWidth}px`}}>
      {theAll}
      <ContainerScroll style={{height: `${theHeigth}px`}}>
        {theCheckboxs}
      </ContainerScroll>
    </div>;
  },
});
