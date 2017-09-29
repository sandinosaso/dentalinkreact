import moment from 'moment';

const variables = {
  step: 30, // minutes
  step_height: 50, // Px
  start: '2016-05-16 00:00:00',
};

const groupEventsByDay = (events) => {
  const eventsByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

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

    const eventWithMoreInfo = Object.assign({ height, top }, event);
    eventsByDay[dow].push(eventWithMoreInfo);
  });

  return eventsByDay;
};

const getDayTimeSlots = () => {
  const timeSlots = [];

  for (let i = 0; i < (24 * 60) / variables.step; i++) {
    const time = moment(variables.start).add(i * variables.step, 'minutes');
    timeSlots.push({ id: time.format('HH:mm') });
  }

  return timeSlots;
};

const _getOverlapingEvents = (event, events) => {
  const overlapingEvents = events.filter((currentEvent) => currentEvent.name !== event.name).filter((currentEvent) => {
    // (StartA <= EndB) and (EndA >= StartB)
    if (moment(currentEvent.due_at).isAfter(event.start_at) &&
        moment(event.due_at).isAfter(currentEvent.start_at)) {
      return true;
    }
    return false;
  });

  // console.log('event, overlapingEvents:', event, overlapingEvents);

  return overlapingEvents;
};

const getOverlapingEventsGroups = (events) => {
  const overlapingEventsGroups = events.reduce((prevValue, currentEvent, index) => {
    const overlapingEvents = _getOverlapingEvents(currentEvent, events);
    overlapingEvents.push(currentEvent);

    const alredyIncludedEvent = prevValue.filter((group) =>
      // console.log('GROUUUUUUUUUUU', group);
      group.includes(currentEvent)
    );

    if (alredyIncludedEvent.length === 0) {
      if (overlapingEvents.length > 0) {
        prevValue.push(overlapingEvents);
      } else {
        prevValue.push([currentEvent]);
      }
    }
    return prevValue;
  }, []);

  return overlapingEventsGroups;
};

const getEventsGroupTopValue = (events) => {
  const minTop = Math.min(...events.map((event) => event.top));
  return minTop;
};

const getEventsMatrixMaxColumns = (matrix) => {
  const maxNumberColumns = Math.max(...matrix.map((events) => events.length));
  return maxNumberColumns;
};

const eventsOverlaps = (event1, event2) => {
  if (moment(event1.due_at).isAfter(event2.start_at) &&
    moment(event2.due_at).isAfter(event1.start_at)) {
    return true;
  }
  return false;
};


const getMatrixLastRowForColumn = (matrix, col) => {
  let row = matrix.length;
  while (row) {
    row -= 1;
    if (matrix[row][col] !== undefined) return row;
  }
  // No more rows
  return false;
};

const getOverlapingGroupPositionMatrix = (events) => {
  const groupPositionMatrix = [];

  events.map((event) => {
    let col = 0;
    let found = false;

    while (!found) {
      const row = getMatrixLastRowForColumn(groupPositionMatrix, col);

      if (row === false) {
        // No last event in row and no index so create index and place here
        groupPositionMatrix[0] = groupPositionMatrix[0] || [];
        groupPositionMatrix[0].push(event);
        found = true;
      } else {
        const foundEvent = groupPositionMatrix[row][col];
        if (!eventsOverlaps(event, foundEvent)) {
          // Place the current event in the next row of the current column
          groupPositionMatrix[row + 1] = groupPositionMatrix[row + 1] || [];
          groupPositionMatrix[row + 1][col] = event;
          found = true;
        }
      }

      col += 1;
    }
    return event;
  });

  console.log('groupPositionMatrix: ', groupPositionMatrix);
  return groupPositionMatrix;
};

const getNumberOfOverlapingEvents = (event, events) => {
  const startDate = moment(event.start_at);
  const endDate = moment(event.due_at);

  const duration = moment.duration(endDate.diff(startDate));
  const hours = duration.asHours();
  const numberOfSteps = (hours * 60) / variables.step;

  const cantOverlaps = events.filter((currentEvent) => currentEvent.name !== event.name).reduce((prevValue, currentEvent, index) => {
    // (StartA <= EndB) and (EndA >= StartB)
    if (moment(currentEvent.due_at).isAfter(event.start_at) &&
        moment(event.due_at).isAfter(currentEvent.start_at)) {
      prevValue += 1;
    }
    return prevValue;
  }, 0);

  console.log('event, CantOverlaps:', event, cantOverlaps);

  return cantOverlaps;
};

const getNumerOfColumnsForOverlapingEvents = (event, events) => {
  const overlapingEvents = getOverlapingEventsGroups(event, events);

  const numberOfColumns = overlapingEvents.reduce((prevValue, currentEvent, index) => {
    const numberOfOverlaps = overlapingEvents.length;
    return Math.max(prevValue, numberOfOverlaps);
  }, 0);

  return numberOfColumns;
};


export {
  groupEventsByDay,
  getDayTimeSlots,
  getOverlapingEventsGroups,
  getOverlapingGroupPositionMatrix,
  getEventsGroupTopValue,
  getEventsMatrixMaxColumns,
  getNumerOfColumnsForOverlapingEvents,
};

