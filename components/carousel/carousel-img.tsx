import { defineComponent, inject, computed, ref } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { isFunction } from 'lodash-es';
import omit from 'omit.js';
import { defaultConfigProvider } from '../config-provider';
import useConfigInject from '../_util/hooks/useConfigInject';
import { CarouselProps } from './props';
import Carousel from './carousel';

export default defineComponent({
  name: 'ACarouselImg',
  inheritAttrs: false,
  props: CarouselProps,
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('carousel', props);
    const imgMove = ref(0);
    const imgUrlBoxNode = ref(null);
    const boxTrueWidth =
      props.imgList && props.imgList.length ? (props.imgList.length - 1) * 88 : 0;

    const afterChange = (afterIdx: number) => {
      const boxWidth = imgUrlBoxNode.value.offsetWidth;
      const newImgMove = afterIdx * 80;
      const maxMove = boxTrueWidth - boxWidth;
      imgMove.value = newImgMove >= maxMove ? maxMove : newImgMove;
      if (isFunction(props.afterChange)) {
        props.afterChange();
      }
    };

    const getProps = computed((): any => {
      return {
        ...omit(props, [props.dotsClass, props.afterChange]),
        afterChange,
        dotsClass: `${prefixClsNew.value}-diy-dots ${prefixClsNew.value}-diy-thumb${
          props.dotsClass ? ` ${props.dotsClass}` : ''
        }`,
      };
    });

    return {
      configProvider: inject('configProvider', defaultConfigProvider),
      slick: undefined,
      imgUrlBoxNode,
      getProps,
      prefixClsNew,
      imgMove,
      boxTrueWidth,
    };
  },
  methods: {
    saveSlick(node: HTMLElement) {
      this.slick = node;
    },
    next() {
      this.slick.next();
    },
    prev() {
      this.slick.prev();
    },
  },
  render() {
    const appendDots = ({ dots }) => {
      let isMoreImg = false;
      if (this.imgUrlBoxNode) {
        isMoreImg = this.boxTrueWidth > this.imgUrlBoxNode.offsetWidth;
      }

      let prevNode = null;
      let nextNode = null;

      if (isMoreImg) {
        prevNode = (
          <a class={`${this.prefixClsNew}-diy-left`} onClick={this.prev}>
            <LeftOutlined />
          </a>
        );
        nextNode = (
          <a class={`${this.prefixClsNew}-diy-right`} onClick={this.next}>
            <RightOutlined />
          </a>
        );
      }

      const previewStyle: any = {
        width: `${this.boxTrueWidth}px`,
        transform: `translateX(-${this.imgMove}px)`,
      };

      if (!isMoreImg) {
        previewStyle.margin = '0 auto';
      }

      return (
        <div>
          {prevNode}
          <div class={`${this.prefixClsNew}-diy-preview`} ref="imgUrlBoxNode">
            <ul class={`${this.prefixClsNew}-diy-preview-inner`} style={previewStyle}>
              {dots}
            </ul>
          </div>
          {nextNode}
        </div>
      );
    };

    return (
      <Carousel
        {...this.getProps}
        ref={this.saveSlick}
        v-slots={{
          ...this.$slots,
          appendDots,
        }}
      />
    );
  },
});
