import React, { Component } from 'react';
import moment from 'moment';
import Event from './event';
import { getEventsGroupTopValue } from '../utils/calendar';

class EventGroup extends Component {
  render () {
    const { events } = this.props;
    const topValue = getEventsGroupTopValue(events);
    const cantOfEvents = events.length;

    return <div className="event-group" style={{ top: topValue }}>
      {events.map((event) => (
        <Event data={event} cantOfEvents={cantOfEvents} topValue={topValue} /> 
      ))}
    </div>
  }
}

export default EventGroup;