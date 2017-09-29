// File lib/PropTypeValues.js
import PropTypes from 'prop-types';

const EventPropType = PropTypes.shape({
  height: PropTypes.number,
  top: PropTypes.number,
  start_at: PropTypes.string,
  due_at: PropTypes.string,
  name: PropTypes.string,
});

export {
  EventPropType,
};
