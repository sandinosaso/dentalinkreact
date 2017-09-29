import React from 'react';
import PropTypes from 'prop-types';
import Day from './day';
import { EventPropType } from '../lib/PropTypesValues';
import { groupEventsByDay } from '../utils/calendar';

const Calendar = (props) => {
  const { events } = props;
  const eventsByDay = groupEventsByDay(events);

  return (<div className="wrapper">
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
        <div className="column-day">{<Day events={eventsByDay[0]} />}</div>
      </div>
      <div className="steps">

      </div>
    </div>
  </div>);
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    EventPropType
  ).isRequired,
};

export default Calendar;
