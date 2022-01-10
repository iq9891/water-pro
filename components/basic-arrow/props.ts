import PropTypes from '../_util/vue-types';

export const basicArrowProps = {
  // Expand contract, expand by default
  expand: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  inset: PropTypes.bool,
  prefixCls: PropTypes.string,
  helpMessage: PropTypes.string,
  // FEAT 4.0+
  size: PropTypes.number.def(16),
  // FEAT 4.0+
  colors: PropTypes.stringArray,
};