import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { EventPropType } from '../lib/PropTypesValues';

const Event = (props) => {
  const { data } = props;
  const startTime = moment(data.start_at).format('hh:mm');
  const endTime = moment(data.due_at).format('hh:mm');

  return (<div className="event" style={{ width: `${data.width}%`, left: `${data.left}%`, top: data.top, height: data.height }}>{startTime}-{endTime}
  </div>);
};

Event.propTypes = {
  data: EventPropType.isRequired,
  cantOfEvents: PropTypes.number.isRequired,
  topValue: PropTypes.number.isRequired,
};

export default Event;
