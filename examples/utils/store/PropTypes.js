import PropTypes from '@@_util/vue-types';

export const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});
