import React, { Component } from 'react';
import moment from 'moment';
import { getNumerOfColumnsForOverlapingEvents } from '../utils/calendar';

class Event extends Component {
  render () {
    const { data, cantOfEvents, topValue } = this.props;
    const startTime = moment(data.start_at).format('hh:mm');
    const endTime = moment(data.due_at).format('hh:mm');
    
    const width = cantOfEvents === 1 ? 100 : (100/cantOfEvents) - 2;
    return <div className="event" style={{ width: `${width}%`, top: data.top-topValue, height: data.height }}>{startTime}-{endTime}
    </div>
  }
}

export default Event;