/** @format */

import {
  defineComponent,
  PropType,
  ref,
  reactive,
  toRefs,
  nextTick,
  watch,
  watchEffect,
  unref,
} from 'vue';
import { PlusOutlined, DashOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { getStrLength } from '@fe6/shared';

import ATag from '../../tag';
import ATooltip from '../../tooltip';
import APopover from '../../popover';
import AInput from '../../input';

import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { getSlot } from '../../_util/props-util';

import { TagOptionItem } from './types';

export default defineComponent({
  name: 'ATagGroup',
  components: {
    PlusOutlined,
    DashOutlined,
    LoadingOutlined,
    CloseOutlined,
  },
  props: {
    value: {
      type: Array as PropType<TagOptionItem[]>,
      default: () => [],
    },
    maxTagTextLength: PropTypes.number.def(4), // 文字 4 个字
    maxTagCount: PropTypes.number.def(4), // 标签 4 个
    closable: PropTypes.bool.def(false),
    createPlaceholder: PropTypes.string.def('添加标签'),
    createable: PropTypes.bool,
    createInputable: PropTypes.bool.def(true),
    createLoading: PropTypes.bool,
    removeLoading: PropTypes.bool,
    closeEmitAble: PropTypes.bool.def(true),
    nameLabel: PropTypes.string.def('name'),
    color: PropTypes.string.def('blue'),
    prefixCls: PropTypes.string,
    tagStyle: PropTypes.style,
    className: PropTypes.any,
    showSelected: PropTypes.bool.def(true),
    createBordered: PropTypes.bool.def(true),
    createIcon: PropTypes.bool.def(true),
    disabled: PropTypes.bool,
  },
  emits: ['change', 'create-click', 'close-click'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('tag-group', props);

    const [state] = useRuleFormItem(props);
    const options = ref(props.value);
    const inputRef = ref();
    const datas = reactive({
      inputVisible: false,
      inputValue: '',
    });
    const stateTruer = ref([]);
    const removeIdx = ref<number | string>(-1);

    const handleClose = (removedTag: TagOptionItem, id: string | number) => {
      if (!props.disabled) {
        removeIdx.value = id;
        if (props.closeEmitAble) {
          emit('change', removedTag.name, 'remove');
        }
        emit('close-click', removedTag);
      }
    };

    const showInput = (ev: MouseEvent) => {
      if (!props.disabled) {
        if (props.createInputable) {
          datas.inputVisible = true;
          nextTick(() => {
            inputRef.value.focus();
          });
        }
        emit('create-click', ev);
      }
    };

    const handleInputConfirm = () => {
      if (!props.disabled) {
        if (datas.inputValue) {
          emit('change', datas.inputValue, 'add');
          Object.assign(datas, {
            inputVisible: false,
            inputValue: '',
          });
        }
      }
    };

    const handleInputEnterConfirm = (ev: any) => {
      if (!props.disabled) {
        if (datas.inputValue && ev.keyCode === 13) {
          emit('change', datas.inputValue, 'add');
          Object.assign(datas, {
            inputVisible: false,
            inputValue: '',
          });
        }
      }
    };

    const handleInputChange = (ev: any) => {
      if (!props.disabled) {
        datas.inputValue = ev.target.value;
      }
    };

    watch(
      () => props.value,
      newValue => {
        options.value = newValue;
      },
    );

    // 修复 客户标签弹框删除不了标签
    watchEffect(() => {
      stateTruer.value = unref(state as any).filter((sItem: Recordable) => sItem.type !== 'delete');
      // fix: tag-modal-list 中 select type 的时候，点击叉子一直 loading 状态
      removeIdx.value = -1;
    });

    return {
      ...toRefs(datas),
      state,
      stateTruer,
      options,
      removeIdx,
      handleClose,
      showInput,
      handleInputConfirm,
      handleInputEnterConfirm,
      handleInputChange,
      inputRef,
      prefixClsNew,
      getStrLength,
    };
  },
  render() {
    const tagList =
      this.maxTagCount > 0 && this.stateTruer.length > this.maxTagCount
        ? this.stateTruer.slice(0, this.maxTagCount)
        : this.stateTruer;
    const tagNode = [];

    const getTagInnerNode = (tagItem: any) => {
      let tagInnerNode = tagItem[this.nameLabel];

      if (
        this.maxTagTextLength > 0 &&
        getStrLength(tagItem[this.nameLabel]) >= this.maxTagTextLength
      ) {
        tagInnerNode = (
          <ATooltip title={tagItem[this.nameLabel]}>{tagItem[this.nameLabel]}</ATooltip>
        );
      }

      return tagInnerNode;
    };

    const getCloseIcon = (tagItem: any) => {
      let closeIconNode = <CloseOutlined />;
      if (this.removeIdx === tagItem.id) {
        closeIconNode = <LoadingOutlined />;
      }
      return closeIconNode;
    };

    tagList.forEach((tagItem: any) => {
      tagNode.push(
        <ATag
          class={[
            `${this.prefixClsNew}-inner`,
            {
              [`${this.prefixClsNew}-inner-small`]:
                this.maxTagTextLength > 0 &&
                getStrLength(tagItem[this.nameLabel]) >= this.maxTagTextLength,
              [`${this.prefixClsNew}-inner-big`]: this.closable && tagItem.id !== '0',
              [`${this.prefixClsNew}-inner-disabled`]: this.disabled,
            },
          ]}
          closable={this.closable && tagItem.id !== '0'}
          visible={true}
          color={this.disabled ? '#f0f0f0' : this.color}
          style={this.tagStyle}
          onClose={() => this.handleClose(tagItem, tagItem.id)}
          v-slots={{
            closeIcon: () => getCloseIcon(tagItem),
          }}
        >
          {getTagInnerNode(tagItem)}
        </ATag>,
      );
    });

    let createNode = null;
    if (this.createable) {
      if (this.inputVisible) {
        createNode = (
          <AInput
            ref="inputRef"
            value={this.inputValue}
            type="text"
            size="small"
            class={[`${this.prefixClsNew}-create-input`]}
            onBlur={this.handleInputConfirm}
            onChange={this.handleInputChange}
            onKeyup={this.handleInputEnterConfirm}
          />
        );
      } else {
        createNode = (
          <ATag
            color={this.color}
            class={[
              `${this.prefixClsNew}-create`,
              {
                [`${this.prefixClsNew}-create-border`]: this.createBordered,
                [`${this.prefixClsNew}-create-disabled`]: this.disabled,
                [`${this.prefixClsNew}-create-border-disabled`]:
                  this.disabled && this.createBordered,
              },
            ]}
            loading={this.createLoading}
            onClick={this.showInput}
          >
            <LoadingOutlined v-show={this.createLoading} />
            <plus-outlined v-show={this.createIcon && !this.createLoading} />
            {this.createPlaceholder}
          </ATag>
        );
      }
    }

    let popoverNode = null;

    if (this.maxTagCount > 0 && this.stateTruer.length > this.maxTagCount) {
      let popoverMoreNode = getSlot(this, 'more');

      if (!popoverMoreNode.length) {
        popoverMoreNode = [<DashOutlined />];
      }

      const popoverTagNodes = [];

      this.stateTruer.forEach((tagItem: any) => {
        let sPopoverInner = tagItem[this.nameLabel];
        if (this.maxTagTextLength > 0 && tagItem[this.nameLabel].length > this.maxTagTextLength) {
          sPopoverInner = (
            <ATooltip title={tagItem[this.nameLabel]}>{tagItem[this.nameLabel]}</ATooltip>
          );
        }

        popoverTagNodes.push(
          <ATag
            class={{
              [`${this.prefixClsNew}-small`]:
                this.maxTagTextLength > 0 &&
                tagItem[this.nameLabel].length >= this.maxTagTextLength,
              [`${this.prefixClsNew}-big`]: this.closable && tagItem.id !== '0',
              [`${this.prefixClsNew}-preive`]: true,
              [`${this.prefixClsNew}-disabled`]: this.disabled,
            }}
            closable={!this.disabled && this.closable && tagItem.id !== '0'}
            color={this.disabled ? '#f0f0f0' : this.color}
            onClose={() => this.handleClose(tagItem, tagItem.id)}
          >
            {sPopoverInner}
          </ATag>,
        );
      });

      const popoverInnerNode = <div class={`${this.prefixClsNew}-popover`}>{popoverTagNodes}</div>;

      popoverNode = (
        <APopover
          v-slots={{
            content: () => popoverInnerNode,
          }}
        >
          <ATag
            color={this.disabled ? '#f0f0f0' : this.color}
            class={[
              `${this.prefixClsNew}-more`,
              {
                [`${this.prefixClsNew}-more-disabled`]: this.disabled,
              },
            ]}
          >
            {popoverMoreNode}
          </ATag>
        </APopover>
      );
    }

    return (
      <div class={[this.prefixClsNew, this.className ? this.className : '']}>
        {this.showSelected && tagNode}
        {this.showSelected && popoverNode}
        {createNode}
      </div>
    );
  },
});
