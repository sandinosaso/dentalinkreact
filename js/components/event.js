import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  render () {
    const date = moment(this.props.data.name.start_at);
    const dow = date.day();

    return <div className="event">
      {this.props.data.name}
    </div>
  }
}

export default Event;