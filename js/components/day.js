import React, { Component } from 'react';

import Event from './event.js';
import EventGroup from './eventgroup.js';
import Slot from './slot.js';
import { getOverlapingEventsGroups } from '../utils/calendar';

class Day extends Component {
  render () {
    const { events, slots } = this.props;

    const slotsWithEvents = slots.map((slot) => {
        const eventsAtSlot = events.filter((event) => {
          const startDate = moment(event.start_at).format('YYYY-MM-DD');
          const startHour = moment(event.start_at).format('hh:mm');
          const endHour = moment(event.due_at).format('hh:mm');
          const isBetween = moment(`${startDate} ${slot.id}`).add(1, 'seconds').isBetween(`${startDate} ${startHour}`, `${startDate} ${endHour}`, null, '[]');
          
          if (isBetween) {
            console.log('isBetween:', isBetween, event, slot.id, event.start_at, event.due_at);
          }
          return isBetween;
        });

        if (eventsAtSlot.length > 0) {
          console.log('Slot with events slot.id', slot.id, eventsAtSlot);
        }
        return {
          time: slot.id,
          events: eventsAtSlot
        }
    });

    const eventsGroups = getOverlapingEventsGroups(events);
    
    return <div className="day">
    {eventsGroups.map((events) => (
      <EventGroup events={events} /> 
    ))}
    </div>
  }
}

export default Day;