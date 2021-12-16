import { defineComponent, PropType, watch, computed, onMounted, unref, ref } from 'vue';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { clone, hasOwn, isNumber, isUndefined } from '@fe6/shared';
import flatten from 'lodash-es/flatten';
import uniq from 'lodash-es/uniq';
import isEqual from 'lodash-es/isEqual';

import { ModalPro, useModal } from '../../modal-pro';
import { BasicArrow } from '../../basic-arrow';
import Tree from '../../tree';
import { Row, Col } from '../../grid';
import Divider from '../../divider';
import Input from '../../input';
import ContainerScroll from '../../container-scroll';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import Space from '../../space';
import Typography from '../../typography';
import TagGroup from '../../tag-group';
import Tooltip from '../../tooltip';

import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { tuple } from '../../_util/type';
import WTitleRender from '../../_util/render';
import useFetch from '../../_util/hooks/use-fetch';
import { getClassName } from '../../_util/classNames';
import { convertTreeToEntities } from '../../vc-tree/src/util';
import { getSlot } from '../../_util/tsx';

import { renderTreeNodes, rendetUser, defaultFields } from './utils';

export default defineComponent({
  name: 'AModalUser',
  props: {
    value: Array as PropType<any[]>,
    fieldNames: PropTypes.object.def(clone(defaultFields)),
    maxTagTextLength: PropTypes.number.def(8), // 文字 4 个字
    maxTagCount: PropTypes.number.def(2), // 标签 4 个字
    closable: PropTypes.bool.def(true),
    size: PropTypes.oneOf(tuple('small', 'large', 'default')),
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    type: PropTypes.oneOf(['select', '']).def('select'),
    prefixCls: PropTypes.string,
    modalTitle: PropTypes.string,
    modalRightTitle: PropTypes.string,
    titleRightRender: PropTypes.func,
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: null,
    },
    apiParams: PropTypes.object.def({}),
    beforeOk: {
      type: Function as PropType<(arg?: Recordable) => Promise<Recordable[]>>,
      default: ({ success }: any) => {
        return new Promise((reslove) => {
          success();
          reslove(true);
        });
      },
    },
    options: PropTypes.array.def([]),
    disabled: PropTypes.bool,
    scrollName: PropTypes.string.def(''),
    modalProps: PropTypes.object.def({}),
    showAlias: PropTypes.bool.def(true),
    mode: PropTypes.oneOf(['checkbox', 'radio']).def('checkbox'),
  },
  emits: ['update:value', 'change', 'ok', 'cancel'],
  setup(props, { emit }) {
    const theFields = computed(() => ({ ...defaultFields, ...props.fieldNames }));
    const { prefixCls: prefixClsNew, configProvider } = useConfigInject('modal-user', props);
    const [state] = useRuleFormItem(props);
    const { register: registerModal, methods: modalMethods } = useModal();
    const { openModal, getVisible } = modalMethods;
    const loading = ref(false);
    const keyList = ref<string[]>([]); // 用于选中树形组件
    const keyOldList = ref<string[]>([]); // 取消时候的恢复
    const userList = ref<any[]>([]); // 所有不重复的用户列表，用于搜索
    // 原始数据
    const treeAllList = ref<Recordable[]>([]);

    const emitValue = (newVal?: any) => {
      if (newVal) {
        keyList.value = newVal.slice();
      }
      emit('update:value', keyList.value);
      emit('change', keyList.value, {
        value: keyList.value,
        eventType: 'change',
        datas: treeAllList.value,
        userList: userList.value,
      });
    };

    const searchValue = ref('');
    const searchChange = (ev: any) => {
      searchValue.value = ev.target.value;
    };
    const searchCheckboxChange = (checkItem: any) => {
      const uId = checkItem[theFields.value.value];
      const kIdx = keyList.value.findIndex((kItem: string) => kItem === uId);
        if (kIdx > -1) {
          keyList.value.splice(kIdx, 1);
        } else {
          if (props.mode === 'checkbox') {
            keyList.value.push(uId);
          } else {
            keyList.value = [uId];
          }
        }
    };

    const closeTagGroupClick = (tagRemoveItem: any,keyEntities: any) => {
      searchCheckboxChange(tagRemoveItem);
      emitValue(keyList.value);
      const selectNodes = keyList.value.map((kItem: any) => keyEntities.get(kItem));
      emit('ok', {
        value: keyList.value,
        selectNodes,
        eventType: 'tag-close',
        datas: treeAllList.value,
        userList: userList.value,
      });
    };

    const copyCheckData = () => {
      keyOldList.value = keyList.value.slice();
    };
    const resetCheckData = () => {
      keyList.value = keyOldList.value.slice();
    };
    const emptyCheckData = () => {
      keyList.value = [];
    };

    const emptyClick = () => {
      emptyCheckData();
      emitValue(keyList.value);
    };

    const getOneLevelUserList = (targetUsers: any[]) => {
      targetUsers.forEach((treeItem: any) => {
        if (hasOwn(treeItem, theFields.value.users) && treeItem[theFields.value.users].length) {
          treeItem[theFields.value.users].forEach((userItem: any) => {
            const uItem = userList.value.find(
              (uItem: any) => userItem[theFields.value.unionid] === uItem[theFields.value.unionid],
            );
            if (!uItem) {
              userList.value.push(userItem);
            }
          });
        }
        if (hasOwn(treeItem, theFields.value.children) && treeItem[theFields.value.children].length) {
          getOneLevelUserList(treeItem[theFields.value.children]);
        }
      });
    };

    const afterGetOptions = (newOptions: any, isInit?: boolean) => {
      treeAllList.value = newOptions;
      getOneLevelUserList(treeAllList.value);
      loading.value = false;
      if (!isInit) {
        copyCheckData();
        openModal();
      }
    };

    const getTagDatas = async (isInit?: boolean) => {
      if (!loading.value) {
        loading.value = true;
        if (props.api) {
          const { fetch } = useFetch(props.api);
          fetch({
            success: (res: any) => {
              loading.value = false;
              afterGetOptions(res, isInit);
            },
            error: () => {
              loading.value = false;
            },
            params: props.apiParams,
          });
        } else {
          afterGetOptions(props.options, isInit);
        }
      }
    };

    const getTreeList = async (isInit?: boolean) => {
      if (!treeAllList.value.length) {
        await getTagDatas(isInit);
      } else {
        if (!isInit) {
          copyCheckData();
          openModal();
        }
      }
    };

    const showModal = async () => {
      if (!props.disabled) {
        await getTreeList();
      }
    };

    const selectOne = (params: any, oneEv: any) => {
      const {
        checked,
        node: { halfChecked, eventKey, value },
      } = oneEv;
      if (props.mode === 'checkbox') {
        if (isNumber(eventKey)) {
          // 如果半选，就选中所有，否则就反选
          if (checked || halfChecked) {
            // FIX 之所以这样 concat 是因为点击中间的半选，父级已经选择了的用户就没了
            keyList.value = uniq([].concat(keyList.value, value.slice()));
          } else {
            value.forEach((vItem: string) => {
              const checkIdx = keyList.value.findIndex((kItem: string | number) => kItem === vItem);
              if (checkIdx > -1) {
                keyList.value.splice(checkIdx, 1);
              }
            });
          }
        } else {
          const { checked } = params;
          const newUserIdList = checked.filter((key: any) => !isNumber(key));
          keyList.value = newUserIdList.slice();
        }
        emitValue(keyList.value);
      }
    };

    const radioSelectOne = (userItem: any) => {
      if (props.mode === 'radio') {
        keyList.value = [userItem[theFields.value.value]];
        emitValue(keyList.value);
      }
    };

    const cancelModal = (keyEntities: any) => {
      resetCheckData();
      emitValue();
      const selectNodes = keyList.value.map((kItem: any) => keyEntities.get(kItem));
      emit('cancel', {
        value: keyList.value,
        selectNodes,
        eventType: 'modal-cancel',
        datas: treeAllList.value,
        userList: userList.value,
      });
    };

    const submitModal = (keyEntities: any) => {
      if (!loading.value) {
        loading.value = true;
        props.beforeOk({
          params: {
            keyList: keyList.value,
          },
          success: () => {
            loading.value = false;
            emitValue(keyList.value);
            const selectNodes = keyList.value.map((kItem: any) => keyEntities.get(kItem));
            emit('ok', {
              value: keyList.value,
              selectNodes,
              eventType: 'modal-ok',
              datas: treeAllList.value,
              userList: userList.value,
            });
            openModal(false);
          },
          error: () => {
            resetCheckData();
            loading.value = false;
          },
        });
      }
    };

    const syncState = async () => {
      const myState = unref(state) as any[];
      if (myState) {
        keyList.value = myState;
        // fix: 弹框中不按顺序选择，并不按顺序取消选择高亮问题
        keyList.value = keyList.value.sort((prev: any, next: any) => prev - next);
        if (keyList.value.length) {
          await getTreeList(true);
        }
      }
    };

    watch(
      () => props.value,
      async (newValue, oldValue) => {
        if (isUndefined(newValue)) {
          keyList.value = [];
          emptyCheckData();
        } else if (!isEqual(newValue, oldValue)) {
          await syncState();
        }
      },
    );

    onMounted(async () => {
      await syncState();
    });

    return {
      theFields,
      prefixClsNew,
      boxClass: getClassName(`${prefixClsNew.value}-select-box`, props.size),
      selectClass: getClassName(`${prefixClsNew.value}-select`, props.size),
      selectTagClass: getClassName(`${prefixClsNew.value}-select-tag`, props.size),
      registerModal,
      getVisible,
      treeAllList,
      userList,
      keyList,
      searchValue,
      searchChange,
      searchCheckboxChange,
      closeTagGroupClick,
      emptyClick,
      cancelModal,
      submitModal,
      showModal,
      selectOne,
      radioSelectOne,
      loading,
      configProvider,
    };
  },
  render() {
    let btnNode: any;
    const theLocal = this.configProvider.locale?.ModalUser;
    let modalTitleNode: any = this.modalTitle || theLocal.select;
    let selectNodes = null;
    let checkedNodes = [];

    let checkedUserList = [];
    // 选中节点
    let checkNodeIdList = [];
    // 半选中的节点
    const checkHalfIdList = [];
    let treeValue = this.keyList.slice();

    let allKeysEntities;
    // 有数据才会渲染，避免重复加载耗费性能
    if (this.treeAllList.length > 0 && this.userList.length > 0) {
      const treeChildNode = renderTreeNodes(
        this.showAlias,
        this.treeAllList,
        this.theFields,
        this.prefixClsNew,
        this.mode,
        this.radioSelectOne,
        theLocal,
      );
      const { keyEntities } = convertTreeToEntities(treeChildNode);
      allKeysEntities = keyEntities;

      if (this.searchValue) {
        selectNodes = this.userList
          .filter((uItem: any) => uItem[this.theFields.title].includes(this.searchValue))
          .map((uItem: any) => {
            return (
              <div class={`${this.prefixClsNew}-user-box`}>
                {rendetUser(
                  this.showAlias,
                  this.prefixClsNew,
                  this.theFields,
                  uItem,
                  () => {
                    return this.mode === 'checkbox' ? (
                      <Checkbox checked={this.keyList.includes(uItem[this.theFields.value])} />
                    ) : (
                      <Radio checked={this.keyList.includes(uItem[this.theFields.value])} />
                    );
                  },
                  () => {},
                  () => {
                    this.searchCheckboxChange(uItem);
                  },
                )()}
              </div>
            );
          });
      } else {
        selectNodes = (
          <Tree
            defaultExpandAll
            checkable
            checkStrictly
            checkedKeys={
              this.mode === 'checkbox' ?{
                checked: treeValue,
                halfChecked: checkHalfIdList,
              } as any : {}
            }
            selectedKeys={this.mode === 'checkbox'?[]: treeValue}
            class={`${this.prefixClsNew}-tree`}
            onCheck={this.selectOne}
          >
            {treeChildNode}
          </Tree>
        );
      }

      if (this.keyList.length) {
        checkedUserList = this.userList.filter((uItem: any) =>
          this.keyList.includes(uItem[this.theFields.value]),
        );
        checkedNodes = checkedUserList.map((uItem: any) => {
          return (
            <div class={`${this.prefixClsNew}-user-box`}>
              {rendetUser(
                this.showAlias,
                this.prefixClsNew,
                this.theFields,
                uItem,
                () => {},
                () => {
                  return (
                    <Tooltip title={theLocal.remove}>
                      <div
                        class={`${this.prefixClsNew}-user-close`}
                        onClick={() => this.searchCheckboxChange(uItem)}
                      >
                        <CloseOutlined />
                      </div>
                    </Tooltip>
                  );
                },
              )()}
            </div>
          );
        });

        // 选中节点
        checkNodeIdList = uniq(
          flatten(checkedUserList.map((uItem: any) => uItem[this.theFields.nodeId])),
        );

        // 半选中 checkHalfIdList
        // 通过节点匹配，找到里面没有匹配的，删掉添加到半匹配中
        allKeysEntities.forEach((value: any) => {
          const { userId, key } = value.node.props;
          if (userId) {
            const hasAllKey = userId.length > 1 ? userId.every((uItem: string) =>
              this.keyList.find((kItem: string) => kItem === uItem),
            ) : true;

            // FIX 当数据只有一条的时候，节点选不中
            if (hasAllKey && userId.length >0) {
              const hasKey = this.keyList.find((kItem: string) => kItem === userId[0]); 
              if (hasKey) {
                treeValue.push(key);
              }
            }

            if (!hasAllKey) {
              const noIdx = checkNodeIdList.findIndex((nId: number) => nId === key);
              if (noIdx > -1) {
                checkNodeIdList.splice(noIdx, 1);
                checkHalfIdList.push(key);
              }
            }
          }
        });

        treeValue = [...new Set([].concat(treeValue, checkNodeIdList))];

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
      }
    }

    const children = getSlot(this.$slots);
    if (!children && this.type === 'select') {
      let btnInnerNode = (
        <div class={`${this.prefixClsNew}-select-placeholder`}>{this.placeholder || theLocal.add}</div>
      );

      if (checkedUserList.length) {
        btnInnerNode = (
          <div class={`${this.prefixClsNew}-select-tags`}>
            <TagGroup
              class-name={this.selectTagClass}
              value={checkedUserList as any}
              value-label={this.theFields.value}
              name-label={this.theFields.title}
              max-tag-text-length={this.maxTagTextLength}
              max-tag-count={this.maxTagCount}
              createable={false}
              color=""
              closable={this.closable}
              create-inputable={false}
              create-loading={this.loading}
              onCloseClick={(cItem: any) => this.closeTagGroupClick(cItem, allKeysEntities)}
              v-slots={{
                more: () => `+${this.keyList.length - this.maxTagCount}`,
              }}
              disabled={this.disabled}
              class={`${this.prefixClsNew}-tags`}
            ></TagGroup>
          </div>
        );
      }

      let iconNode = null;

      if (this.loading) {
        iconNode = <LoadingOutlined class={`${this.prefixClsNew}-select-arrow`} />;
      } else {
        iconNode = (
          <BasicArrow
            class={`${this.prefixClsNew}-select-arrow`}
            expand={!this.getVisible}
            top={this.getVisible}
          />
        );
      }

      btnNode = (
        <div
          class={[
            this.selectClass,
            {
              [`${this.prefixClsNew}-select-disabled`]: this.disabled,
            },
          ]}
          onClick={this.showModal}
        >
          <div class={this.boxClass}>{btnInnerNode}</div>
          {iconNode}
        </div>
      );
    }

    if (children && children.length) {
      btnNode = (
        <div
          onClick={this.showModal}
        >
          {children}
        </div>
      );
    }

    return (
      <div class={this.type ? [`${this.prefixClsNew}-select-warp`] : ''}>
        {btnNode}
        <ModalPro
          width="1000px"
          body-style={{ padding: '0' }}
          scroll-style={{ padding: '8px 16px 0' }}
          onRegister={this.registerModal}
          onOk={() => this.submitModal(allKeysEntities)}
          ok-button-props={{
            loading: this.loading,
          }}
          onCancel={() => this.cancelModal(allKeysEntities)}
          v-slots={{
            header: () => modalTitleNode,
          }}
          {...this.modalProps}
        >
          <Row class={`${this.prefixClsNew}-modal`}>
            <Col span={11}>
              <div>
                <Input.Search
                  value={this.searchValue}
                  style="margin-bottom: 8px"
                  allowClear
                  placeholder={this.searchPlaceholder || theLocal.pleaseholder}
                  onChange={this.searchChange}
                />
                <ContainerScroll
                  class={this.scrollName}
                  showHorizontal={true}
                  style="height: 353px"
                >
                  {selectNodes}
                </ContainerScroll>
              </div>
            </Col>
            <Col span={2}>
              <Divider class={`${this.prefixClsNew}-divider`} type="vertical" />
            </Col>
            <Col span={11}>
              <div>
                <Space size={0} align="center" class={`${this.prefixClsNew}-empty`}>
                  <Typography.Text>{this.modalRightTitle || theLocal.selected}</Typography.Text>
                  <Typography.Link onClick={this.emptyClick}>{theLocal.clear}</Typography.Link>
                </Space>
                <ContainerScroll
                  class={this.scrollName}
                  showHorizontal={true}
                  style="height: 353px"
                >
                  {checkedNodes}
                </ContainerScroll>
              </div>
            </Col>
          </Row>
        </ModalPro>
      </div>
    );
  },
});
