import React from 'react';
import PropTypes from 'prop-types';
import Event from './event';
import { calculateEventsPositionsInGroup } from '../utils/calendar';

const EventGroup = (props) => {
  const { eventGroupMatrix } = props;
  const eventsWithPositions = calculateEventsPositionsInGroup(eventGroupMatrix);

  return (<div className="event-group">
    {eventsWithPositions.map((event) => (
      <Event key={event.name} data={event} />
    ))}
  </div>);
};

EventGroup.propTypes = {
  eventGroupMatrix: PropTypes.array.isRequired,
};

export default EventGroup;
