import React, { Component } from 'react';
import moment from 'moment';
import Day from './day';
import { groupEventsByDay, getDayTimeSlots } from '../utils/calendar';

class Calendar extends Component {
  render () {
    const { events } = this.props;
    const eventsByDay = groupEventsByDay(events);
    const slots = getDayTimeSlots();

    console.log('eventsByDay, slots:', eventsByDay, slots);

    
    return <div className="wrapper">
      <div className="columns-container week-header">
        <div className="column-day">Mon</div>
        <div className="column-day">Tue</div>
        <div className="column-day">Wed</div>
        <div className="column-day">Thu</div>
        <div className="column-day">Fri</div>
        <div className="column-day">Sat</div>
        <div className="column-day">Sun</div>
      </div>
      <div className="data">
        <div className="columns-container schedule-container">
          <div className="column-day">{<Day events={eventsByDay[1]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[2]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[3]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[4]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[5]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[6]} slots={slots} />}</div>
          <div className="column-day">{<Day events={eventsByDay[7]} slots={slots} />}</div>
        </div>
        <div className="steps">
          
        </div>
      </div>
    </div>
  }
}

export default Calendar;