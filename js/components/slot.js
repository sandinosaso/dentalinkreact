import React, { Component } from 'react';
import { getNumerOfColumnsForOverlapingEvents } from '../utils/calendar';
import moment from 'moment';
import Event from './event';

class Slot extends Component {
  render () {
    const { data, allEvents } = this.props;
    const numberOfEvents = data.events.length;
    // console.log('ON SLOT, data, numberOfEvents:', data, numberOfEvents);
    return <div className="slot" style={{ }}>
      {data.events.map((event) => {
        const columns = getNumerOfColumnsForOverlapingEvents(event, allEvents);
        console.log('columns:', columns);
        return <Event data={event} columns={columns} />
      })}
    </div>
  }
}

export default Slot;