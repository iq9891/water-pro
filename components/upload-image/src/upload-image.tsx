/** @format */

import { defineComponent, watchEffect, ref, inject } from 'vue';

import { LoadingOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';

import { Upload } from '../../upload';
import Image from '../../image';
import Modal from '../../modal';
import ToolTip from '../../tooltip';

import { acceptListString, useUpload } from '../../_util/hooks/use-upload';
import { FileItem } from '../../_util/types/types';
import PropTypes from '../../_util/vue-types';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { defaultConfigProvider } from '../../config-provider';
import { getSlot } from '../../_util/props-util';

import { errorUploadImage } from '../../config-provider/error-image';

export default defineComponent({
  name: 'AUploadImage',
  components: {
    LoadingOutlined,
  },
  props: {
    value: PropTypes.string,
    onFormChange: {
      type: Function,
      default: () => {},
    },
    mergeOriginDatas: {
      type: Function,
      default: undefined,
    },
    action: PropTypes.string,
    accept: PropTypes.string.def(acceptListString),
    autoUpload: PropTypes.bool.def(true),
    headers: PropTypes.object,
    urlKey: PropTypes.string.def('url'),
    resultKey: PropTypes.string.def('data'),
    nameKey: PropTypes.string.def('name'),
    imageWidth: PropTypes.number.def(100),
    imageHeight: PropTypes.number.def(100),
    limitSize: PropTypes.number.def(2),
    placeholder: PropTypes.string,
    errorImage: PropTypes.string,
    disabled: PropTypes.bool,
    allowUpdate: PropTypes.bool.def(false),
  },
  emits: ['changeUpload', 'change'],
  setup(props, params: Recordable) {
    const { prefixCls: prefixClsNew, configProvider } = useConfigInject('upload-image', props);
    // TODO [fix] 解决使用的过程中未用 configProvider 报错
    const { errorImage: errorImageDef } =
      inject('configProvider', defaultConfigProvider) || defaultConfigProvider;

    const { loading, beforeUpload, handleChange, imageUrl } = useUpload(props, params, configProvider);

    watchEffect(async () => {
      // NOTE 去掉为空判断，素材中心，通字段再打开图片保留问题
      imageUrl.value = props.value;
    });

    const beforeUploadFn = (file: FileItem) => {
      return beforeUpload(file, props.accept.split(','));
    };

    return {
      loading,
      beforeUploadFn,
      handleChange,
      imageUrl,
      prefixClsNew,
      errorBackImage: props.errorImage || errorImageDef || errorUploadImage,
      previewPoseterVisible: ref(false),
      configProvider,
    };
  },
  render() {
    let imageNode = null;

    if (this.imageUrl) {
      imageNode = (
        <Image
          width={this.imageWidth}
          height={this.imageHeight}
          src={this.imageUrl}
          bordered={false}
          class={[
            `${this.prefixClsNew}-img`,
            { [`${this.prefixClsNew}-img-disabled`]: this.disabled },
          ]}
          preview={false}
          fallback={this.errorBackImage}
        />
      );
    }

    let placeholderNode = null;

    if (this.placeholder) {
      placeholderNode = <p class={`${this.prefixClsNew}-tip`}>{this.placeholder}</p>;
    }

    let loadingNode = [
      <div v-show={!this.loading}>
        <p class={`${this.prefixClsNew}-tip`}>{this.configProvider.locale?.UploadImage.placeholder || '上传'}</p>
        {placeholderNode}
      </div>,
    ];
    const placeholderSlotNode = getSlot(this, 'placeholder');
    if (placeholderSlotNode.length) {
      loadingNode = placeholderSlotNode;
    }

    let nodeHtml = null;

    if (this.allowUpdate && this.imageUrl) {
      const handlePoseterPreview = async () => {
        this.previewPoseterVisible = true;
      };
      const handlePoseterCancel = () => {
        this.previewPoseterVisible = false;
      };
      const removeOneImage = () => {
        this.imageUrl = '';
        this.$emit('changeUpload', '');
      };
      nodeHtml = (
        <div class={`${this.prefixClsNew}-handle-box`}>
          {imageNode}
          <div class={`${this.prefixClsNew}-handle`}>
            <ToolTip title={this.configProvider.locale?.UploadImage.seePlaceholder}>
              <EyeOutlined
                class={`${this.prefixClsNew}-handle-icon`}
                onClick={handlePoseterPreview}
              />
            </ToolTip>
            <ToolTip title={this.configProvider.locale?.UploadImage.removePlaceholder}>
              <DeleteOutlined onClick={removeOneImage} />
            </ToolTip>
          </div>
          <Modal visible={this.previewPoseterVisible} footer={null} onCancel={handlePoseterCancel}>
            <img style="width: 100%" src={this.imageUrl} />
          </Modal>
        </div>
      );
    } else {
      nodeHtml = (
        <Upload
          accept={this.accept}
          class={this.prefixClsNew}
          show-upload-list={false}
          action={this.autoUpload ? this.action : ''}
          headers={this.headers}
          disabled={this.disabled}
          before-upload={this.beforeUploadFn}
          onChange={this.handleChange}
        >
          <div v-show={!this.imageUrl} class={`${this.prefixClsNew}-btn`}>
            <LoadingOutlined v-show={this.loading} />
            {loadingNode}
          </div>
          {imageNode}
        </Upload>
      );
    }

    return nodeHtml;
  },
});
