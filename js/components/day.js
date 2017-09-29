import React from 'react';
import PropTypes from 'prop-types';
import EventGroup from './eventgroup';
import { EventPropType } from '../lib/PropTypesValues';
import { getOverlapingEventsGroups, getOverlapingGroupPositionMatrix } from '../utils/calendar';

const Day = (props) => {
  const { events } = props;
  const eventsGroups = getOverlapingEventsGroups(events);

  return (<div className="day">
    {eventsGroups.map((group, i) => {
      const eventGroupMatrix = getOverlapingGroupPositionMatrix(group);
      return <EventGroup key={i} events={group} eventGroupMatrix={eventGroupMatrix} />;
    })}
  </div>);
};

Day.propTypes = {
  events: PropTypes.arrayOf(EventPropType).isRequired,
};

export default Day;
