/** @format */

import { defineComponent, ref, watchEffect } from 'vue';
import { PictureOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons-vue';

import useConfigInject from '../../_util/hooks/useConfigInject';
import PropTypes from '../../_util/vue-types';
import { acceptListString, useUpload, acceptList } from '../../_util/hooks/use-upload';
import { FileItem } from '../../_util/types/types';
import { tuple } from '../../_util/type';

import AButton from '../../button/button';
import { Upload } from '../../upload';

const ButtonSizes = tuple('large', 'default', 'small');
export type ButtonSize = typeof ButtonSizes[number];

export default defineComponent({
  name: 'AUploadName',
  components: {
    PictureOutlined,
    DeleteOutlined,
    FileOutlined,
  },
  props: {
    value: [Object, String],
    onFormChange: {
      type: Function,
      default: () => {},
    },
    mergeOriginDatas: {
      type: Function,
      default: undefined,
    }, 
    headers: PropTypes.object,
    placeholder: PropTypes.string,
    accept: PropTypes.string.def(acceptListString),
    action: PropTypes.string,
    autoUpload: PropTypes.bool.def(true),
    resultKey: PropTypes.string.def('data'),
    nameKey: PropTypes.string.def('name'),
    urlKey: PropTypes.string.def('url'),
    limitSize: PropTypes.number.def(2),
    disabled: PropTypes.bool,
    handleAfterAjax: PropTypes.func,
    size: PropTypes.oneOf(ButtonSizes).def('default'),
  },
  emits: ['changeUpload', 'change'],
  setup(props, params: Recordable) {
    const { prefixCls: prefixClsNew, configProvider } = useConfigInject('upload-name', props);

    const { loading, beforeUpload, handleChange, removeImage, imageName } = useUpload(
      props,
      params,
      configProvider,
    );
    const isImage = ref(true);

    watchEffect(() => {
      if (props.autoUpload) {
        // NOTE 去掉为空判断，素材中心，通字段再打开图片保留问题
        imageName.value = props.value ? (props.value as any)[props.nameKey] : '';
      }
    });

    const beforeUploadFn = (file: FileItem) => {
      const beforeResult = beforeUpload(file, props.accept.split(','));
      isImage.value = acceptList.includes(String(file.type));
      if (!props.autoUpload) {
        imageName.value = file.name || '';
        params.emit('changeUpload', file);
        return false;
      }
      return beforeResult;
    };

    return {
      loading,
      beforeUploadFn,
      handleChange,
      removeImage,
      isImage,
      imageName,
      acceptListString,
      prefixClsNew,
      sizeMap: {
        large: 'lg',
        small: 'sm',
      },
      configProvider,
    };
  },
  render() {
    return (
      <div class={`${this.prefixClsNew}-wrapper`}>
        <div class={this.prefixClsNew}>
          <Upload
            v-show={!this.imageName}
            accept={this.accept}
            class={`${this.prefixClsNew}-uploader`}
            show-upload-list={false}
            action={this.autoUpload ? this.action : ''}
            headers={this.headers}
            disabled={this.disabled}
            before-upload={this.beforeUploadFn}
            onChange={this.handleChange}
          >
            <AButton
              class={`${this.prefixClsNew}-btn`}
              type="link"
              disabled={this.disabled}
              size={this.size}
              loading={this.loading}
              style={{ marginLeft: this.loading ? '14px' : 0 }}
            >
              {this.placeholder || this.configProvider.locale?.UploadName.placeholder || '添加图片'}
            </AButton>
          </Upload>
          <div
            v-show={this.imageName}
            class={[
              `${this.prefixClsNew}-inner`,
              {
                [`${this.prefixClsNew}-inner-disabled`]: this.disabled,
                [`${this.prefixClsNew}-inner-${this.sizeMap[this.size]}`]: this.size !== 'default',
              },
            ]}
          >
            <span>
              <PictureOutlined v-show={this.isImage} class={`${this.prefixClsNew}-img`} />
              <FileOutlined v-show={!this.isImage} class={`${this.prefixClsNew}-img`} />
              {this.imageName}
            </span>
            <DeleteOutlined
              class={[
                `${this.prefixClsNew}-del`,
                {
                  [`${this.prefixClsNew}-del-disabled`]: this.disabled,
                },
              ]}
              onClick={this.removeImage}
            />
          </div>
        </div>
      </div>
    );
  },
});
