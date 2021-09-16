import { defineComponent, PropType } from 'vue';

import useConfigInject from '../../../_util/hooks/useConfigInject';
import { errImage } from './error-image';

export default defineComponent({
  name: 'ATableCard',
  props: {
    imgSize: {
      type: Number as PropType<number>,
      default: 80,
    },
    imgUrl: {
      type: String as PropType<string>,
      default: '',
    },
    imgBorderd: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    imgPreview: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    imgErrorImage: {
      type: String as PropType<string>,
      default: errImage,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    desc: {
      type: String as PropType<string>,
      default: '',
    },
    descMaxLength: {
      type: Number as PropType<number>,
      default: 14,
    },
    titleMaxLength: {
      type: Number as PropType<number>,
      default: 14,
    },
    prefixCls: String,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro-card', props);
    return { prefixClsNew };
  },
  render() {
    let titleNode = null;

    if (this.title) {
      if (this.title.length > this.titleMaxLength) {
        titleNode = (
          <a-tooltip title={this.title}>
            <a-typography-text class={`${this.prefixClsNew}-text`}>{this.title}</a-typography-text>
          </a-tooltip>
        );
      } else {
        titleNode = (
          <a-typography-text class={`${this.prefixClsNew}-text`}>{this.title}</a-typography-text>
        );
      }
    }

    let descNode = null;
    if (this.desc) {
      if (this.desc.length > this.descMaxLength) {
        descNode = (
          <a-tooltip title={this.desc}>
            <a-typography-text class={`${this.prefixClsNew}-text`} type="secondary" size="small">
              {this.desc}
            </a-typography-text>
          </a-tooltip>
        );
      } else {
        descNode = (
          <a-typography-text class={`${this.prefixClsNew}-text`} type="secondary" size="small">
            {this.desc}
          </a-typography-text>
        );
      }
    }

    return (
      <div class={this.prefixClsNew}>
        <a-image
          width={this.imgSize}
          height={this.imgSize}
          src={this.imgUrl}
          class="voucher-list-img"
          preview={this.imgPreview}
          bordered={this.imgBorderd}
          fallback={this.imgErrorImage}
        ></a-image>
        <div
          class={`${this.prefixClsNew}-core`}
          style={this.desc ? '' : `line-height: ${this.imgSize}px`}
        >
          <div
            class={[
              `${this.prefixClsNew}-title`,
              {
                [`${this.prefixClsNew}-title-only`]: !this.desc,
              },
            ]}
          >
            {titleNode}
            {this.$slots.titleSuffix?.()}
          </div>
          {descNode}
        </div>
      </div>
    );
  },
});
