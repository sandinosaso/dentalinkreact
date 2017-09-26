import React, { Component } from 'react';

import Event from './event.js';

class Day extends Component {
  render () {
    const { events } = this.props;
    return <div className="day">
    {events.map((event) => (
      <Event data={event} /> 
    ))}
  </div>
  }
}

export default Day;