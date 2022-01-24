import type { ExtractPropTypes } from 'vue';
import PropTypes from '../_util/vue-types';
import { tuple } from '../_util/type';

// Carousel
export const carouselProps = {
  effect: PropTypes.oneOf(tuple('scrollx', 'fade')),
  dots: PropTypes.looseBool.def(true),
  vertical: PropTypes.looseBool,
  autoplay: PropTypes.looseBool,
  easing: PropTypes.string,
  beforeChange: PropTypes.func,
  afterChange: PropTypes.func,
  // style: PropTypes.React.CSSProperties,
  prefixCls: PropTypes.string,
  accessibility: PropTypes.looseBool,
  nextArrow: PropTypes.any,
  prevArrow: PropTypes.any,
  pauseOnHover: PropTypes.looseBool,
  // className: PropTypes.string,
  adaptiveHeight: PropTypes.looseBool,
  arrows: PropTypes.looseBool.def(false),
  autoplaySpeed: PropTypes.number,
  centerMode: PropTypes.looseBool,
  centerPadding: PropTypes.string,
  cssEase: PropTypes.string,
  dotsClass: PropTypes.string,
  draggable: PropTypes.looseBool.def(false),
  fade: PropTypes.looseBool,
  focusOnSelect: PropTypes.looseBool,
  infinite: PropTypes.looseBool,
  initialSlide: PropTypes.number,
  lazyLoad: PropTypes.looseBool,
  rtl: PropTypes.looseBool,
  slide: PropTypes.string,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  speed: PropTypes.number,
  swipe: PropTypes.looseBool,
  swipeToSlide: PropTypes.looseBool,
  touchMove: PropTypes.looseBool,
  touchThreshold: PropTypes.number,
  variableWidth: PropTypes.looseBool,
  useCSS: PropTypes.looseBool,
  slickGoTo: PropTypes.number,
  responsive: PropTypes.array,
  dotPosition: PropTypes.oneOf(tuple('top', 'bottom', 'left', 'right')),
  verticalSwiping: PropTypes.looseBool.def(false),
  imgList: PropTypes.array,
  preivewPageable: PropTypes.looseBool,
  preivewable: PropTypes.looseBool.def(true),
};
export type CarouselProps = Partial<ExtractPropTypes<typeof carouselProps>>;
