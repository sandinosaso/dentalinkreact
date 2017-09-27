
const variables = {
  step: 30, //minutes
  step_height: 50, // Px
  start: '2016-05-16 00:00:00',
};

const groupEventsByDay = (events) => {
  const eventsByDay = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []};

  events.map((event) => {
    const startDate = moment(event.start_at);
    const endDate = moment(event.due_at);

    const dow = startDate.day();

    const duration = moment.duration(endDate.diff(startDate));
    const hours = duration.asHours();
    
    const height = hours * variables.step_height * 2; // 30 minutes equals to 0.5 hours
    // Convert start date to minutes, multiply for the step and divide by step height
    const top = ((startDate.hour() * 60 + startDate.minutes()) / variables.step) * variables.step_height;
    
    console.log('Dia de la semana y duracion:', dow, hours);

    let eventWithMoreInfo = Object.assign( { height, top } , event);
    eventsByDay[dow].push(eventWithMoreInfo);
  });

  return eventsByDay;
}

const getNumberOfOverlapingEvents = (event, events) => {
  const startDate = moment(event.start_at);
  const endDate = moment(event.due_at);

  const duration = moment.duration(endDate.diff(startDate));
  const hours = duration.asHours();
  const numberOfSteps = (hours * 60) / variables.step;

  let cantOverlaps = events.reduce((prevValue, currentEvent, index) => {
    // (StartA <= EndB) and (EndA >= StartB)
    if (moment(currentEvent.due_at).isAfter(event.start_at) && 
        moment(event.due_at).isAfter(currentEvent.start_at)) {
        prevValue = prevValue + 1;
    }
    return prevValue;
  }, 0);

  console.log('event, CantOverlaps:', event, cantOverlaps);

  return cantOverlaps;
}

const getDayTimeSlots = () => {
  const timeSlots = [];

  for (var i = 0; i < 24*60/variables.step; i++) {
    const time = moment(variables.start).add(i*variables.step,'minutes');
    timeSlots.push({ id: time.format("HH:mm")});
  }

  return timeSlots;
}

export {
  groupEventsByDay,
  getDayTimeSlots,
  getNumberOfOverlapingEvents,
};

