import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  render () {
    const { data, numberOfOverlaps } = this.props;
    const startTime = moment(data.start_at).format('hh:mm');
    const endTime = moment(data.due_at).format('hh:mm');
    return <div className="event" style={{ flexGrow: numberOfOverlaps }}>{startTime}-{endTime}
    </div>
  }
}

export default Event;