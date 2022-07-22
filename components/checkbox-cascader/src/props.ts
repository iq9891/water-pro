import { clone } from '@fe6/shared';
import PropTypes from '../../_util/vue-types';
import { defaultFields } from './utils';

export const boxProps = {
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  preWidth: PropTypes.number.def(160),
  preHeight: PropTypes.number.def(270),
  fieldNames: PropTypes.object.def(clone(defaultFields)),
  value: PropTypes.object,
};
