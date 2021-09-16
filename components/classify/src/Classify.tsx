import {
  defineComponent,
  ref,
  unref,
  PropType,
  onUpdated,
  onUnmounted,
  watchEffect,
  nextTick,
} from 'vue';
import { hasOwn, isUndefined } from '@fe6/shared';
import { LoadingOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { isEmpty, merge } from 'lodash';

import ASelect from '../../select';
import ADivider from '../../divider';
import AModal from '../../modal';
import AButton from '../../button';
import ADrawer from '../../drawer';
import AEmpty from '../../empty';
import Spin from '../../spin';
import APypography from '../../typography';
import { FormPro, useForm, FormProps } from '../../form-pro';
import { TablePro, TableAction, useTable, BasicColumn } from '../../table-pro';
import PRESENTED_IMAGE_SIMPLE from '../../empty/simple';
import useConfigInject from '../../_util/hooks/useConfigInject';
import useFetch from '../../_util/hooks/use-fetch';
import PropTypes from '../../_util/vue-types';
import { useRuleFormItem } from '../../_util/hooks/use-form-item';

const VNodes = (_, { attrs }) => attrs.vnodes;

const createDefFormConfig: FormProps = {
  schemas: [],
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
  showResetButton: false,
  showSubmitButton: false,
};

export default defineComponent({
  name: 'AClassify',
  props: {
    value: PropTypes.any,
    api: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    apiParams: PropTypes.object.def({}),
    loopGetOptions: PropTypes.bool,
    filterOption: {
      type: Function,
      default: (inputValue: string, option: any) => {
        return option.label.indexOf(inputValue) > -1;
      },
    },
    removeApi: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    removeApiParams: PropTypes.object.def({}),
    removeTip: PropTypes.string,
    removeKey: PropTypes.string.def('id'), // 删除的默认唯一索引，用于loading
    editApi: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    editApiParams: PropTypes.object.def({}),
    createFormConfig: PropTypes.object.def({}),
    createApi: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    createApiParams: PropTypes.object.def({}),
    createTitle: PropTypes.string.def('添加'),
    editTitle: PropTypes.string.def('编辑'),
    drawerTitle: PropTypes.string.def('管理'),
    drawerWidth: PropTypes.number.def(650),
    drawerZIndex: PropTypes.number.def(1000),
    drawerCreateButtonText: PropTypes.string.def('添加'),
    drawerTableApi: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    drawerTableApiParams: PropTypes.object.def({}),
    drawerTableColumns: {
      type: [Array] as PropType<BasicColumn[]>,
      default: () => [],
    },
    drawerTableDraggable: PropTypes.bool.def(false),
    drawerTableDragKey: PropTypes.string.def('id'), // 会返回所有排好序的 id 值的数组
    drawerTableDragApi: {
      type: Function as PropType<(arg?: any) => Promise<any[]>>,
      default: null,
    },
    selectOptions: PropTypes.array,
    labelKey: PropTypes.string.def('label'),
    subLabelKey: PropTypes.string.def('subLabel'),
    valueKey: PropTypes.string.def('value'),
  },
  emits: ['on-edit', 'on-remove'],
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('classify', props);

    const [state] = useRuleFormItem(props);
    const { fetch } = useFetch(props.api);

    const [formRegister, formMethods] = useForm();

    const loading = ref(false);
    const options = ref<any[]>([]);

    const getOptionDatas = () => {
      if (!loading.value && props.api) {
        loading.value = true;
        try {
          fetch({
            success: (res: any) => {
              loading.value = false;
              options.value = res;
            },
            error: () => {
              loading.value = false;
            },
            params: props.apiParams,
          });
        } catch (err) {
          loading.value = false;
        }
      }
    };

    const getOptionsTime = ref(1);

    const dropdownVisibleChange = (dropDownIsOpen: boolean) => {
      if (
        dropDownIsOpen &&
        !unref(options).length &&
        getOptionsTime.value < 2 &&
        !props.loopGetOptions
      ) {
        getOptionsTime.value += props.loopGetOptions ? 0 : 1;
        getOptionDatas();
      }
    };

    const resetAjaxApi = () => {
      getOptionsTime.value = 1;
      options.value = [];
    };

    const isEdit = ref(-1);
    const createModalStatus = ref(false);
    const createLoading = ref(false);
    const { fetch: createFecth } = useFetch(props.createApi);
    const { fetch: editFecth } = useFetch(props.editApi);

    const removeLoadingId = ref('');
    const { fetch: removeFecth } = useFetch(props.removeApi);

    const drawerStatus = ref(false);
    const drawerLoading = ref(false);
    const { fetch: drawerFecth } = useFetch(props.drawerTableApi);

    const { fetch: drawerDragFecth } = useFetch(props.drawerTableDragApi);

    const [tableRegister, tableMethods] = useTable({
      draggable: props.drawerTableDraggable,
      canResize: true,
      pagination: false,
      dataSource: [],
      columns: [
        ...props.drawerTableColumns,
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
    });

    const tableDatas = ref([]);
    const getTableDatas = () => {
      if (!drawerLoading.value) {
        drawerLoading.value = true;
        try {
          drawerFecth({
            success: (res: any) => {
              tableDatas.value = res;
              tableMethods.setTableData(res);
              drawerLoading.value = false;
            },
            error: () => {
              drawerLoading.value = false;
            },
            params: props.drawerTableApiParams,
          });
        } catch (err) {
          drawerLoading.value = false;
        }
      }
    };

    const tableDragDatas = (dragList: any) => {
      if (!drawerLoading.value) {
        drawerLoading.value = true;
        try {
          drawerDragFecth({
            success: () => {
              drawerLoading.value = false;
            },
            error: () => {
              drawerLoading.value = false;
            },
            params: dragList,
          });
        } catch (err) {
          drawerLoading.value = false;
        }
      }
    };

    const apiValue = ref('');
    watchEffect(() => {
      apiValue.value = (state as any).value || props.value;
      if (props.selectOptions) {
        options.value = props.selectOptions;
      }
      if (
        !isUndefined(apiValue.value) &&
        String(apiValue.value).length > 0 &&
        !loading.value &&
        !options.value.length
      ) {
        getOptionDatas();
      }
    });

    onUpdated(() => {
      if (!unref(options).length) {
        getOptionsTime.value = 0;
      }
    });

    onUnmounted(() => {
      getOptionsTime.value = 0;
    });

    return {
      prefixClsNew,
      dropdownVisibleChange,
      resetAjaxApi,
      loading,
      options,
      apiValue,
      createModalStatus,
      formRegister,
      formMethods,
      createFecth,
      isEdit,
      editFecth,
      removeFecth,
      removeLoadingId,
      createLoading,
      drawerStatus,
      drawerLoading,
      getTableDatas,
      tableDragDatas,
      tableDatas,
      tableRegister,
      tableMethods,
      getOptionDatas,
    };
  },
  methods: {
    async handleCreateModalStatus() {
      this.createModalStatus = !this.createModalStatus;
      await nextTick();
      if (this.createModalStatus && !isEmpty(this.createFormConfig)) {
        this.formMethods.setProps(merge(createDefFormConfig, this.createFormConfig));
      }
    },
    async createOk() {
      if (!this.createLoading) {
        const myFormData = await this.formMethods.validateFields();
        if (myFormData) {
          this.createLoading = true;
          const params =
            this.isEdit > -1
              ? {
                  ...myFormData,
                  id: this.isEdit,
                  ...this.editApiParams,
                }
              : {
                  ...myFormData,
                  ...this.createApiParams,
                };
          this[this.isEdit > -1 ? 'editFecth' : 'createFecth']({
            success: async () => {
              this.createLoading = false;
              this.resetAjaxApi();
              if (this.drawerStatus) {
                this.getTableDatas();
              }
              await this.createCandel();
              this.getOptionDatas();
              this.$emit('on-edit');
            },
            error: () => {
              this.createLoading = false;
            },
            params,
          });
        }
      }
    },
    async createCandel() {
      await this.formMethods.resetFields();
      this.handleCreateModalStatus();
      this.isEdit = -1;
    },
    handleDrawerStatus() {
      this.drawerStatus = !this.drawerStatus;
      if (this.drawerStatus) {
        this.getTableDatas();
      }
    },
    handleDelete(removeData: any) {
      if (this.removeTip && !this.removeLoadingId) {
        this.removeLoadingId = removeData[this.removeKey];
        AModal.confirm({
          title: this.removeTip,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.removeFecth({
              success: async () => {
                this.removeLoadingId = '';
                this.resetAjaxApi();
                this.getTableDatas();
                this.getOptionDatas();
                this.$emit('on-remove');
              },
              error: () => {
                this.removeLoadingId = '';
              },
              params: {
                [this.removeKey]: [this.removeLoadingId],
                ...this.removeApiParams,
              },
            });
          },
          onCancel: () => {
            this.removeLoadingId = '';
          },
        });
      }
    },
    async handleEdit(editData: any) {
      this.isEdit = editData.id;
      this.handleCreateModalStatus();
      await nextTick();
      this.formMethods.setFieldsValue(editData);
    },
    tableDragEnd(oldNum: number, newNum: number) {
      const dragList = this.tableDatas.map((tdItem: any) => tdItem[this.drawerTableDragKey]);
      if (oldNum > newNum) {
        dragList.splice(newNum, 0, dragList[oldNum]);
        dragList.splice(oldNum + 1, 1);
      } else {
        dragList.splice(newNum + 1, 0, dragList[oldNum]);
        dragList.splice(oldNum, 1);
      }
      this.tableDragDatas(dragList);
    },
  },
  render() {
    const selectSlot: any = {
      notFoundContent: () => notFoundNode,
    };

    let notFoundNode = null;
    if (this.loading) {
      const emptySlots = {
        image: () => <LoadingOutlined style="font-size: 30px" />,
      };
      notFoundNode = (
        <div>
          <AEmpty description="正在加载" v-slots={emptySlots} />
        </div>
      );
    } else {
      const emptySlots = {
        image: () => <PRESENTED_IMAGE_SIMPLE />,
      };
      notFoundNode = (
        <div>
          <AEmpty s={emptySlots} />
        </div>
      );
    }

    const createIconNode = this.createLoading ? <LoadingOutlined /> : <PlusOutlined />;
    const drawerIconNode = this.drawerLoading ? <LoadingOutlined /> : <EditOutlined />;

    const dropdownRender = ({ menuNode }: any) => {
      return (
        <div>
          <VNodes vnodes={menuNode} />
          <ADivider style={{ margin: '4px 0' }} />
          <div style="text-align: right;">
            <AButton size="small" type="link" onClick={this.handleCreateModalStatus}>
              {createIconNode} 添加
            </AButton>
            <AButton size="small" type="link" onClick={this.handleDrawerStatus}>
              {drawerIconNode} 管理
            </AButton>
          </div>
        </div>
      );
    };

    selectSlot.dropdownRender = dropdownRender;

    const optNodes = [];
    const optChilds = this.options.filter(
      (oItem: any) => hasOwn(oItem, 'children') && oItem.children.length > 0,
    );

    if (optChilds.length) {
      optChilds.forEach((oItem: any) => {
        const ocNode = [];
        oItem.children.forEach((ocItem: any) => {
          let childInner = ocItem[this.labelKey];
          if (this.subLabelKey) {
            childInner = (
              <>
                <div>{ocItem[this.labelKey]}</div>
                <APypography.Text type="secondary" size="small">
                  {ocItem[this.subLabelKey]}
                </APypography.Text>
              </>
            );
          }
          ocNode.push(<ASelect.Option value={ocItem[this.valueKey]}>{childInner}</ASelect.Option>);
        });
        optNodes.push(
          <ASelect.OptGroup
            label={oItem[this.labelKey]}
            v-slots={{ default: () => ocNode }}
          ></ASelect.OptGroup>,
        );
      });
    } else {
      this.options.forEach((oItem: any) => {
        let childInner = oItem[this.labelKey];
        if (this.subLabelKey) {
          childInner = (
            <>
              <div>{oItem[this.labelKey]}</div>
              <APypography.Text type="secondary" size="small">
                {oItem[this.subLabelKey]}
              </APypography.Text>
            </>
          );
        }
        optNodes.push(<ASelect.Option value={oItem[this.valueKey]}>{childInner}</ASelect.Option>);
      });
    }

    selectSlot.default = () => optNodes;

    const tableActionNode = ({ record }: any) => (
      <TableAction
        actions={[
          {
            label: '编辑',
            onClick: () => this.handleEdit(record),
          },
          {
            label: '删除',
            color: 'danger',
            loading: this.removeLoadingId === record[this.removeKey],
            onClick: () => this.handleDelete(record),
          },
        ]}
      />
    );

    return (
      <>
        <ASelect
          value={this.apiValue}
          loading={this.loading}
          virtual
          class={`${this.prefixClsNew}-select`}
          {...this.$attrs}
          filter-option={this.filterOption}
          onDropdownVisibleChange={this.dropdownVisibleChange}
          v-slots={selectSlot}
        />
        <AModal
          visible={this.createModalStatus}
          centered
          cancel-text="取消"
          ok-text="确定"
          mask-closable={false}
          z-index={1001}
          title={this.isEdit > -1 ? this.editTitle : this.createTitle}
          okButtonProps={{
            loading: this.createLoading,
          }}
          onOk={this.createOk}
          onCancel={this.createCandel}
        >
          <FormPro onRegister={this.formRegister} />
        </AModal>
        <ADrawer
          visible={this.drawerStatus}
          centered
          title={this.drawerTitle}
          width={this.drawerWidth}
          onClose={this.handleDrawerStatus}
          placement="right"
          zIndex={this.drawerZIndex}
          wrapClassName={`${this.prefixClsNew}-drawer${
            this.drawerTableDraggable ? ` ${this.prefixClsNew}-drawer-drag` : ''
          }`}
        >
          <AButton block={true} onClick={this.handleCreateModalStatus}>
            <PlusOutlined /> {this.drawerCreateButtonText}
          </AButton>
          <Spin spinning={this.drawerLoading}>
            <TablePro
              onRegister={this.tableRegister}
              onDragEnd={this.tableDragEnd}
              v-slots={{
                action: tableActionNode,
              }}
            />
          </Spin>
        </ADrawer>
      </>
    );
  },
});
