import React, { Component } from 'react';
import { getNumberOfOverlapingEvents } from '../utils/calendar';
import moment from 'moment';
import Event from './event';

class Slot extends Component {
  render () {
    const { data, allEvents } = this.props;
    const numberOfEvents = data.events.length;
    // console.log('ON SLOT, data, numberOfEvents:', data, numberOfEvents);
    return <div className="slot" style={{ 'height': 50 }}>
      {data.events.map((event) => {
        const numberOfOverlaps = getNumberOfOverlapingEvents(event, allEvents);
        return <Event data={event} numberOfOverlaps={numberOfOverlaps} />
      })}
    </div>
  }
}

export default Slot;