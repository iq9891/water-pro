/** @format */

import { defineComponent, PropType, ref, unref, watchEffect, watch } from 'vue';
import {
  PlusOutlined,
  DashOutlined,
  CloseOutlined,
  LoadingOutlined,
  DownOutlined,
} from '@ant-design/icons-vue';
import { hasOwn, isUndefined } from '@fe6/shared';

import Tag from '../../tag';
import { TagGroup } from '../../tag-group';
import Button from '../../button';
import { BasicArrow } from '../../basic-arrow';
import { ModalPro, useModal } from '../../modal-pro';
import { tuple } from '../../_util/type';
import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { useAttrs } from '../../_util/hooks/use-attrs';
import classNames from '../../_util/classNames';
import WTitleRender from '../../_util/render';

function getClassName(prefixCls: string, size: string) {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
  });
}

export default defineComponent({
  name: 'ATagModalList',
  components: {
    PlusOutlined,
    DashOutlined,
    CloseOutlined,
    LoadingOutlined,
    DownOutlined,
    ATag: Tag,
    AButton: Button,
    AModalPro: ModalPro,
    ABasicArrow: BasicArrow,
    WTitleRender,
  },
  props: {
    value: Array as PropType<any[]>,
    maxTagTextLength: PropTypes.number.def(4), // 文字 4 个字
    maxTagCount: PropTypes.number.def(2), // 标签 4 个字
    createable: PropTypes.bool,
    closable: PropTypes.bool.def(true),
    size: PropTypes.oneOf(tuple('small', 'large', 'default')),
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['select', '']).def(''),
    prefixCls: PropTypes.string,
    modalTitle: PropTypes.string.def('选择标签'),
    createPlaceholder: PropTypes.string.def('添加标签'),
    nameLabel: PropTypes.string.def('name'),
    valueLabel: PropTypes.string.def('id'),
    childrenLabel: PropTypes.string.def('children'),
    checkMode: PropTypes.oneOf(tuple('radio', 'checkbox')).def('checkbox'),
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: null,
    },
    beforeClose: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: () => {
        return new Promise(reslove => {
          reslove(true);
        });
      },
    },
    titleRightRender: PropTypes.func,
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('tag-modal-list', props);
    const [state] = useRuleFormItem(props);
    const attrs = useAttrs();
    const { register: registerModal, methods: modalMethods } = useModal();
    const { openModal, getVisible } = modalMethods;
    const createLoading = ref(false);
    const tagItems = ref<Recordable[]>([]);
    const tagValueItems = ref<Recordable>([]);
    const tagCheckList = ref<Recordable[]>([]);
    const tagCheckOldList = ref<Recordable[]>([]);
    const tagCheckAllList = ref<Recordable[]>([]);
    const tagCheckAllOldList = ref<Recordable[]>([]);

    `${prefixClsNew}-select`;

    const copyCheckData = () => {
      tagCheckAllOldList.value = tagCheckAllList.value.slice();
      tagCheckOldList.value = tagCheckList.value.slice();
    };
    const resetCheckData = () => {
      tagCheckAllList.value = tagCheckAllOldList.value.slice();
      tagCheckList.value = tagCheckOldList.value.slice();
    };

    const getTagList = async (isInit?: boolean) => {
      if (!tagItems.value.length) {
        try {
          createLoading.value = true;
          const tagListResult = await props.api();
          tagItems.value = tagListResult.slice();
          // feat 支持以为数据
          const hasChild = tagItems.value.every((tItem: Recordable) =>
            hasOwn(tItem, props.childrenLabel),
          );
          const tagLists = hasChild
            ? tagItems.value.reduce((acc, tItem: Recordable) => {
                return acc.concat(tItem[props.childrenLabel]);
              }, [])
            : tagItems.value;
          // fix: 弹框中不按顺序选择，并不按顺序取消选择高亮问题
          tagValueItems.value = tagLists.sort(
            (prev: Recordable, next: Recordable) => prev[props.valueLabel] - next[props.valueLabel],
          );
          createLoading.value = false;
          if (!isInit) {
            copyCheckData();
            openModal();
          }
        } catch (error) {
          createLoading.value = false;
        }
      } else {
        if (!isInit) {
          copyCheckData();
          openModal();
        }
      }
    };

    const createClick = async () => {
      await getTagList();
    };

    const emitChange = (emitType: string) => {
      emit('change', tagCheckList.value, emitType);
    };

    const closeClick = async (item: Recordable) => {
      const canClose = await props.beforeClose(item);
      if (canClose) {
        const indexInCheckList = tagCheckAllList.value.findIndex(
          (tagCheckItem: Recordable) => tagCheckItem[props.valueLabel] === item[props.valueLabel],
        );
        if (indexInCheckList > -1) {
          tagCheckList.value.splice(indexInCheckList, 1);
          tagCheckAllList.value.splice(indexInCheckList, 1);
          emitChange('remove');
        }
      }
    };

    const tagClick = async (item: Recordable) => {
      const indexInCheckList = tagCheckAllList.value.findIndex(
        (tagCheckItem: Recordable) => tagCheckItem[props.valueLabel] === item[props.valueLabel],
      );

      if (props.checkMode === 'checkbox') {
        if (indexInCheckList > -1) {
          const canClose = await props.beforeClose(item);
          if (canClose) {
            tagCheckList.value.splice(indexInCheckList, 1);
            tagCheckAllList.value.splice(indexInCheckList, 1);
          }
        } else {
          tagCheckList.value.push(item[props.valueLabel]);
          tagCheckAllList.value.push(item);
        }
      } else {
        tagCheckList.value.length = 0;
        tagCheckAllList.value.length = 0;
        if (indexInCheckList === -1) {
          tagCheckList.value.push(item[props.valueLabel]);
          tagCheckAllList.value.push(item);
        }
      }
    };

    const submitModal = () => {
      emitChange('ok');
      openModal(false);
    };

    const cancelModal = () => {
      resetCheckData();
      emitChange('cancel');
      emit('update:value', tagCheckList.value);
    };

    const checkValue = async () => {
      if (tagCheckList.value.length) {
        await getTagList(true);
        tagCheckAllList.value = tagValueItems.value.filter((tItem: Recordable) => {
          return tagCheckList.value.find((cItem: any) => {
            return tItem[props.valueLabel] === cItem;
          });
        });
      }
    };

    watch(
      () => props.value,
      async newValue => {
        if (isUndefined(newValue)) {
          tagCheckList.value = [];
          await checkValue();
        }
      },
    );

    watchEffect(async () => {
      const myState = unref(state) as any[];
      if (myState) {
        tagCheckList.value = myState;
        // fix: 弹框中不按顺序选择，并不按顺序取消选择高亮问题
        tagCheckList.value = tagCheckList.value.sort((prev: any, next: any) => prev - next);
        await checkValue();
      }
    });

    return {
      attrs,
      state,
      createClick,
      registerModal,
      createLoading,
      tagItems,
      tagClick,
      tagCheckList,
      tagCheckAllList,
      submitModal,
      cancelModal,
      getVisible,
      closeClick,
      prefixClsNew,
      boxClass: getClassName(`${prefixClsNew.value}-select-box`, props.size),
      selectClass: getClassName(`${prefixClsNew.value}-select`, props.size),
      selectTagClass: getClassName(`${prefixClsNew.value}-select-tag`, props.size),
    };
  },
  render() {
    let tagButtonNode = (
      <TagGroup
        value={this.tagCheckAllList as any}
        value-label={this.valueLabel}
        name-label={this.nameLabel}
        max-tag-text-length={this.maxTagTextLength}
        max-tag-count={this.maxTagCount}
        createable={this.createable}
        create-placeholder={this.createPlaceholder}
        create-inputable={false}
        closable={this.tagCheckAllList.length > 1}
        create-loading={this.createLoading}
        onCreateClick={this.createClick}
        onCloseClick={this.closeClick}
      />
    );

    if (this.type) {
      let tagButtonInnerNode = (
        <div class={`${this.prefixClsNew}-select-placeholder`}>{this.placeholder}</div>
      );

      if (this.tagCheckList.length > 0) {
        tagButtonInnerNode = (
          <TagGroup
            class-name={this.selectTagClass}
            value={this.tagCheckAllList as any}
            value-label={this.valueLabel}
            name-label={this.nameLabel}
            max-tag-text-length={this.maxTagTextLength}
            max-tag-count={this.maxTagCount}
            createable={false}
            color=""
            closable={true}
            create-inputable={false}
            create-loading={this.createLoading}
            onCloseClick={this.closeClick}
            v-slots={{
              more: () => `+${this.tagCheckAllList.length - this.maxTagCount}`,
            }}
          ></TagGroup>
        );
      }

      tagButtonNode = (
        <div class={this.selectClass} onClick={this.createClick}>
          <div class={this.boxClass}>{tagButtonInnerNode}</div>
          <div>
            <LoadingOutlined
              v-show={this.createLoading}
              class={`${this.prefixClsNew}-select-arrow`}
            />
            <BasicArrow
              v-show={!this.createLoading}
              class={`${this.prefixClsNew}-select-arrow`}
              expand={!this.getVisible}
              top={this.getVisible}
            />
          </div>
        </div>
      );
    }

    let modalTitleNode: any = this.modalTitle;

    if (this.titleRightRender) {
      modalTitleNode = (
        <div class={`${this.prefixClsNew}-title`}>
          <span>{this.modalTitle}</span>
          <div>
            <WTitleRender render={this.titleRightRender} />
          </div>
        </div>
      );
    }

    const modalContentNodes = [];
    const hasAllChild = this.tagItems.every((tagGroupItem: any) =>
      hasOwn(tagGroupItem, this.childrenLabel),
    );

    this.tagItems.forEach((tagGroupItem: any) => {
      const modalTagNodes = [];
      const hasChildDatas = hasOwn(tagGroupItem, this.childrenLabel);
      if (hasChildDatas) {
        tagGroupItem[this.childrenLabel].forEach((tagItem: any) => {
          modalTagNodes.push(
            <Tag
              class={`${this.prefixClsNew}-tag`}
              color={
                this.tagCheckAllList.findIndex(
                  checkItem => checkItem[this.valueLabel] === tagItem[this.valueLabel],
                ) > -1
                  ? 'blue'
                  : ''
              }
              onClick={() => this.tagClick(tagItem)}
            >
              {tagItem[this.nameLabel]}
            </Tag>,
          );
        });
      } else {
        modalTagNodes.push(
          <Tag
            class={[`${this.prefixClsNew}-tag`, `${this.prefixClsNew}-tag-only`]}
            color={
              this.tagCheckAllList.findIndex(
                checkItem => checkItem[this.valueLabel] === tagGroupItem[this.valueLabel],
              ) > -1
                ? 'blue'
                : ''
            }
            onClick={() => this.tagClick(tagGroupItem)}
          >
            {tagGroupItem[this.nameLabel]}
          </Tag>,
        );
      }

      if (hasChildDatas) {
        modalContentNodes.push(
          <div class={`${this.prefixClsNew}-box`}>
            <h4 class={`${this.prefixClsNew}-name`}>{tagGroupItem[this.nameLabel]}</h4>
            {modalTagNodes}
          </div>,
        );
      } else {
        modalContentNodes.push(modalTagNodes);
      }
    });

    const onlyNode = <div class={`${this.prefixClsNew}-box-only`}>{modalContentNodes}</div>;

    return (
      <div class={this.type ? [`${this.prefixClsNew}-select-warp`] : ''}>
        {tagButtonNode}
        <ModalPro
          {...this.attrs}
          width="1000px"
          body-style={{ padding: '0' }}
          scroll-style={{ padding: '8px 16px 0' }}
          onRegister={this.registerModal}
          onOk={this.submitModal}
          onCancel={this.cancelModal}
          v-slots={{
            header: () => modalTitleNode,
          }}
        >
          {hasAllChild ? modalContentNodes : onlyNode}
        </ModalPro>
      </div>
    );
  },
});