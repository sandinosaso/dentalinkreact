import React from 'react';
import moment from 'moment';
import { EventPropType } from '../lib/PropTypesValues';

const Event = (props) => {
  const { data } = props;
  const startTime = moment(data.start_at).format('hh:mm');
  const endTime = moment(data.due_at).format('hh:mm');

  const eventStyle = {
    width: `${data.width}%`,
    height: `${data.height}px`,
    left: `${data.left}%`,
    top: data.top,
  };

  return (
    <div
      className="event"
      style={eventStyle}
    >{startTime}-{endTime}
    </div>);
};

Event.propTypes = {
  data: EventPropType.isRequired,
};

export default Event;
