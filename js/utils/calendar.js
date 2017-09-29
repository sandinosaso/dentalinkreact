import moment from 'moment';
import variables from '../lib/variables';

/**
 * Groups events by Day
 * @param {Array} events List of events to group
 * @return {Object} An object with days numbers (from 0..6) as keys and array of events
 * as values.
 */
const groupEventsByDay = (events) => {
  const eventsByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  events.forEach((event) => {
    const startDate = moment(event.start_at);
    const endDate = moment(event.due_at);

    const dow = startDate.day();
    const duration = moment.duration(endDate.diff(startDate));
    const hours = duration.asHours();

    const height = hours * variables.step_height * 2; // 30 minutes equals to 0.5 hours
    // Convert start date to minutes, multiply for the step and divide by step height
    const top = (((startDate.hour() * 60) + startDate.minutes()) / variables.step) * variables.step_height;

    const eventWithMoreInfo = Object.assign({ height, top }, event);
    eventsByDay[dow].push(eventWithMoreInfo);
  });

  return eventsByDay;
};

/**
 * Given a eventGroupMatrix returns the events for that matrix with extra info: widht, left
 * @param {Array of Array} eventGroupMatrix A bidimensional array (matrix) of events
 * @return {Array} An array of events with extra information on it
 */
const calculateEventsPositionsInGroup = (eventGroupMatrix) => {
  const cantOfEventsColumns = getEventsMatrixMaxColumns(eventGroupMatrix);
  const width = cantOfEventsColumns === 1 ? 100 : (100 / cantOfEventsColumns);

  const eventsWithPositions = [];

  eventGroupMatrix.map((rowEvents) => {
    return rowEvents.map((event, column) => {
      const left = column * width;
      const eventWithMoreInfo = Object.assign({ left, width }, event);
      eventsWithPositions.push(eventWithMoreInfo);
      return eventWithMoreInfo;
    });
  });

  return eventsWithPositions;
};

/**
 * Given an event and an array of events returns a list of events (from the second param) 
 * that overlaps with the event passed as the first param
 * @param {Event} event The event we want to calculate its overlaps
 * @param {Array} events The list of events to look for a possible overlap
 * @return {Array} The array of overlapping events
 */
const getOverlapingEvents = (event, events) => {
  const overlapingEvents = events.filter((currentEvent) => currentEvent.name !== event.name).filter((currentEvent) => {
    // (StartA <= EndB) and (EndA >= StartB)
    if (moment(currentEvent.due_at).isAfter(event.start_at) &&
        moment(event.due_at).isAfter(currentEvent.start_at)) {
      return true;
    }
    return false;
  });

  return overlapingEvents;
};

/**
 * Given a list of Events calculates all the Overlapping Groups of events for that list
 * Those are groups of events that overlaps each others. On other words the groups are events
 * that we need to show on the same at same time in different columns on a calendar
 * @param {Array} events
 * @return {Array}
 */
const getOverlapingEventsGroups = (events) => {
  const overlapingEventsGroups = events.reduce((prevValue, currentEvent, index) => {
    const overlapingEvents = getOverlapingEvents(currentEvent, events);
    overlapingEvents.push(currentEvent);

    const alredyIncludedEvent = prevValue.filter((group) =>
      group.includes(currentEvent)
    );

    if (alredyIncludedEvent.length === 0) {
      prevValue.push(overlapingEvents);
    }
    return prevValue;
  }, []);

  return overlapingEventsGroups;
};

/**
 * Return the number of columns of the matrix. This is helpful for calculation
 * of events width on an overlaping event group
 * @param {Array of Array} matrix 
 * @returns {Integer} The max number of columns for a matrix
 */
const getEventsMatrixMaxColumns = (matrix) => {
  const maxNumberColumns = Math.max(...matrix.map((events) => events.length));
  return maxNumberColumns;
};

/**
 * Given 2 events it returns wheter or not they overlaps
 * @param {Event} event1 
 * @param {Event} event2 
 * @returns {Boolean} True if they overlap. False otherwise
 */
const eventsOverlaps = (event1, event2) => {
  if (moment(event1.due_at).isAfter(event2.start_at) &&
    moment(event2.due_at).isAfter(event1.start_at)) {
    return true;
  }
  return false;
};

/**
 * Returns the last row index that is filled actually on the matrix
 * @param {Array of Array} matrix A 2 dimensional array (matrix) of events
 * @param {Integer} col An integer that indicates on wich column to look for
 * @returns Row number or false if no more rows
 */
const getMatrixLastRowForColumn = (matrix, col) => {
  let row = matrix.length;
  while (row) {
    row -= 1;
    if (matrix[row][col] !== undefined) return row;
  }
  // No more rows
  return false;
};

/**
 * Given a list of events that overlaps each other calculates the position 
 * of each one in a matrix (2 dimensional array). The idea here is having rows
 * and cols so if 2 events fit in the same column we can keep them there as far
 * as they do not overlap any other event.
 * This function will be applied to each Overlapping group to calculate it matrix.
 * 
    --------------------
    Visual Explanation:
    --------------------
    -----
    | A |-----
    -----|   |
         | B |
         |   |-----
         -----| C |
              -----

    ---------------
    |      D      |
    ---------------

  Returns something like this:
    -----
    | A |-----
    -----|   |
         | B |
    -----|   |
    | C |-----
    -----

    ----------
    |    D   |
    ----------
 * @param {Array} events List of events
 */
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

  return groupPositionMatrix;
};

export {
  groupEventsByDay,
  getOverlapingEventsGroups,
  getOverlapingGroupPositionMatrix,
  getEventsMatrixMaxColumns,
  calculateEventsPositionsInGroup,
};

