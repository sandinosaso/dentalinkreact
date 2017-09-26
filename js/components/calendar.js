import React, { Component } from 'react';
import moment from 'moment';
import Day from './day';

class Calendar extends Component {
  render () {
    const { events } = this.props;
    console.log('On Calendar component this.props.events', this.props);
    const eventsByDay = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []};
    
    events.map((event) => {
      const startDate = moment(event.start_at);
      const endDate = moment(event.due_at);

      const dow = startDate.day();

      const duration = moment.duration(endDate.diff(startDate));
      const hours = duration.asHours();

      const height = hours * 100; // 1 hr equals to 100 px

      console.log('Dia de la semana y duracion:', dow, hours);

      let eventWithMoreInfo = Object.assign( { height } , event);
      eventsByDay[dow].push(eventWithMoreInfo);
    });

    console.log('eventsByDay:', eventsByDay);

    
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
          <div className="column-day">{<Day events={eventsByDay[1]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[2]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[3]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[4]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[5]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[6]} />}</div>
          <div className="column-day">{<Day events={eventsByDay[7]} />}</div>
        </div>
        <div className="steps">
          
        </div>
      </div>
    </div>
  }
}

export default Calendar;