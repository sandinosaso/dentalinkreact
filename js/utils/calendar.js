import moment from 'moment';

const variables = {
  step: 30, //minutes
  step_height: 50, // Px
  start: '2016-05-16 00:00:00',
};

const groupEventsByDay = (events) => {
  const eventsByDay = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};

  events.map((event) => {
    const startDate = moment(event.start_at);
    const endDate = moment(event.due_at);

    const dow = startDate.day();
    const duration = moment.duration(endDate.diff(startDate));
    const hours = duration.asHours();
    
    const height = hours * variables.step_height * 2; // 30 minutes equals to 0.5 hours
    // Convert start date to minutes, multiply for the step and divide by step height
    const top = ((startDate.hour() * 60 + startDate.minutes()) / variables.step) * variables.step_height;
    
    // console.log('Dia de la semana y duracion:', dow, hours);

    let eventWithMoreInfo = Object.assign( { height, top } , event);
    eventsByDay[dow].push(eventWithMoreInfo);
  });

  return eventsByDay;
}

const getDayTimeSlots = () => {
  const timeSlots = [];

  for (var i = 0; i < 24*60/variables.step; i++) {
    const time = moment(variables.start).add(i*variables.step,'minutes');
    timeSlots.push({ id: time.format("HH:mm")});
  }

  return timeSlots;
}

const _getOverlapingEvents = (event, events) => {

  let overlapingEvents = events.filter((currentEvent) => {
    return currentEvent.name !== event.name;
  }).filter((currentEvent) => {
    // (StartA <= EndB) and (EndA >= StartB)
    if (moment(currentEvent.due_at).isAfter(event.start_at) && 
        moment(event.due_at).isAfter(currentEvent.start_at)) {
        return true;
    }
    return false;
  });

  // console.log('event, overlapingEvents:', event, overlapingEvents);

  return overlapingEvents;
}

const getOverlapingEventsGroups = (events) => {

  let overlapingEventsGroups = events.reduce((prevValue, currentEvent, index) => {
    const overlapingEvents = _getOverlapingEvents(currentEvent, events);
    overlapingEvents.push(currentEvent);
    
    const alredyIncludedEvent = prevValue.filter((group) => {
      // console.log('GROUUUUUUUUUUU', group);
      return group.includes(currentEvent);
    });

    if (alredyIncludedEvent.length === 0) {
      if (overlapingEvents.length > 0) {
        prevValue.push(overlapingEvents);
      } else {
        prevValue.push([currentEvent]);
      }
    }
    return prevValue;
  }, []);

  console.log('overlapingEventsGroups:', overlapingEventsGroups);

  return overlapingEventsGroups;
}

const getEventsGroupTopValue = (events) => {
    const minTop = Math.min(...events.map(event => event.top));
    return minTop;
}



const getNumerOfColumnsForOverlapingEvents = (event, events) => {
  const overlapingEvents = getOverlapingEvents(event, events);
  
  const numberOfColumns = overlapingEvents.reduce((prevValue, currentEvent, index) => {   
    const numberOfOverlaps = overlapingEvents.length;
    return Math.max(prevValue, numberOfOverlaps);
  }, 0);

  return numberOfColumns;
}



export {
  groupEventsByDay,
  getDayTimeSlots,
  getOverlapingEventsGroups,
  getEventsGroupTopValue,
  getNumerOfColumnsForOverlapingEvents,
};

