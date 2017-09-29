import React from 'react';
import PropTypes from 'prop-types';
import Event from './event';
import { EventPropType } from '../lib/PropTypesValues';
import { getEventsGroupTopValue, getEventsMatrixMaxColumns } from '../utils/calendar';

const EventGroup = (props) => {
  const { events, eventGroupMatrix } = props;
  // const topValue = getEventsGroupTopValue(events);
  const cantOfEventsColumns = getEventsMatrixMaxColumns(eventGroupMatrix);
  const width = cantOfEventsColumns === 1 ? 100 : (100 / cantOfEventsColumns) - 2;

  const eventsWithPositions = [];

  eventGroupMatrix.map((rowEvents) => {
    return rowEvents.map((event, column) => {
      const left = column * width;
      const eventWithMoreInfo = Object.assign({ left, width }, event);
      eventsWithPositions.push(eventWithMoreInfo);
      return eventWithMoreInfo;
    });
  });

  // return (<div className="event-group">
  //   {events.map((event) => (
  //     <Event data={event} cantOfEvents={cantOfEventsColumns} />
  //   ))}
  // </div>);

  return (<div className="event-group">
    {eventsWithPositions.map((event) => (
      <Event data={event} />
    ))}
  </div>);
};

EventGroup.propTypes = {
  events: PropTypes.array.isRequired,
  eventGroupMatrix: PropTypes.array.isRequired,
};

export default EventGroup;
