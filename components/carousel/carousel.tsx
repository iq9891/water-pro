import { defineComponent, inject } from 'vue';
import debounce from 'lodash-es/debounce';
import hasProp, { getComponent } from '../_util/props-util';
import { defaultConfigProvider } from '../config-provider';
import warning from '../_util/warning';
import classNames from '../_util/classNames';
import AImage from '../image';
import SlickCarousel from '../vc-slick/src';
import { CarouselProps } from './props';

const Carousel = defineComponent({
  name: 'ACarousel',
  inheritAttrs: false,
  props: CarouselProps,
  setup() {
    return {
      configProvider: inject('configProvider', defaultConfigProvider),
      slick: undefined,
      innerSlider: undefined,
    };
  },
  beforeMount() {
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
  },
  mounted() {
    if (hasProp(this, 'vertical')) {
      warning(
        !this.vertical,
        'Carousel',
        '`vertical` is deprecated, please use `dotPosition` instead.',
      );
    }
    const { autoplay } = this;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    // https://github.com/ant-design/ant-design/issues/7191
    this.innerSlider = this.slick && this.slick.innerSlider;
  },
  beforeUnmount() {
    const { autoplay } = this;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      (this.onWindowResized as any).cancel();
    }
  },
  methods: {
    getDotPosition() {
      if (this.dotPosition) {
        return this.dotPosition;
      }
      if (hasProp(this, 'vertical')) {
        return this.vertical ? 'right' : 'bottom';
      }
      return 'bottom';
    },
    saveSlick(node: HTMLElement) {
      this.slick = node;
    },
    onWindowResized() {
      // Fix https://github.com/ant-design/ant-design/issues/2550
      const { autoplay } = this;
      if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
        this.slick.innerSlider.autoPlay();
      }
    },

    next() {
      this.slick.slickNext();
    },

    prev() {
      this.slick.slickPrev();
    },

    goTo(slide: number, dontAnimate = false) {
      this.slick.slickGoTo(slide, dontAnimate);
    },
  },

  render() {
    const props = { ...this.$props };
    const { $slots } = this;

    if (props.effect === 'fade') {
      props.fade = true;
    }
    const { class: cls, style, ...restAttrs } = this.$attrs as any;
    const getPrefixCls = this.configProvider.getPrefixCls;
    let className = getPrefixCls('carousel', props.prefixCls);
    const dotsClass = 'slick-dots';
    const dotPosition = this.getDotPosition();
    props.vertical = dotPosition === 'left' || dotPosition === 'right';
    props.dotsClass = classNames(`${dotsClass}`, `${dotsClass}-${dotPosition || 'bottom'}`, {
      [`${props.dotsClass}`]: !!props.dotsClass,
    });
    className = classNames({
      [cls]: !!cls,
      [className]: !!className,
      [`${className}-vertical`]: props.vertical,
    });
    const SlickCarouselProps = {
      ...props,
      ...restAttrs,
      nextArrow: getComponent(this, 'nextArrow'),
      prevArrow: getComponent(this, 'prevArrow'),
    };

    const muSlots = {
      ...$slots,
    };

    if (this.imgList && this.imgList.length > 0) {
      const defNode = [];
      const pageNode = [];
      const imgList = this.imgList as any[];
      imgList.forEach((imgUrl: string, imgIdx: number) => {
        defNode.push(
          <div class={`${className}-diy`} key={imgIdx}>
            <AImage src={imgUrl} preview={this.preivewable} class={`${className}-diy-img`} />
          </div>,
        );
        pageNode.push(
          <a class={`${className}-diy-page`}>
            <img src={imgUrl} />
          </a>,
        );
      });
      muSlots.default = () => defNode;
      if (this.preivewPageable) {
        muSlots.customPaging = props => pageNode[props.i];
      }
    }

    return (
      <div class={className} style={style}>
        <SlickCarousel
          ref={this.saveSlick}
          {...SlickCarouselProps}
          v-slots={muSlots}
        ></SlickCarousel>
      </div>
    );
  },
});

export default Carousel;
