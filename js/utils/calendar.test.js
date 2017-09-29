import {
  groupEventsByDay,
  getOverlapingEventsGroups,
  getOverlapingGroupPositionMatrix,
  getEventsGroupTopValue,
  getEventsMatrixMaxColumns,
} from './calendar';

describe('utils/calendar', () => {
  it('groupEventsByDay: should group events by day (all events same day', () => {
    const events = [
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' }];
    const eventsGrouped = groupEventsByDay(events);
    const expectedResult = {
      0: [],
      1: [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1', height: 200, top: 800 },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2', height: 100, top: 800 },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3', height: 100, top: 850 },
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4', height: 50, top: 900 },
        { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5', height: 100, top: 1000 },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6', height: 100, top: 1100 },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7', height: 50, top: 1100 },
      ],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    expect(eventsGrouped).toEqual(expectedResult);
  });

  it('groupEventsByDay: should group events by day (all events differents days)', () => {
    const events = [
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-17 08:00:00', due_at: '2016-05-17 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-18 08:30:00', due_at: '2016-05-18 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-19 09:00:00', due_at: '2016-05-19 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-20 10:00:00', due_at: '2016-05-20 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-21 11:00:00', due_at: '2016-05-21 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-22 11:00:00', due_at: '2016-05-22 11:30:00', name: 'Event 7' }];

    const eventsGrouped = groupEventsByDay(events);

    const expectedResult = {
      1: [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1', height: 200, top: 800 },
      ],
      2: [
        { start_at: '2016-05-17 08:00:00', due_at: '2016-05-17 09:00:00', name: 'Event 2', height: 100, top: 800 },
      ],
      3: [
        { start_at: '2016-05-18 08:30:00', due_at: '2016-05-18 09:30:00', name: 'Event 3', height: 100, top: 850 },
      ],
      4: [
        { start_at: '2016-05-19 09:00:00', due_at: '2016-05-19 09:30:00', name: 'Event 4', height: 50, top: 900 },
      ],
      5: [
        { start_at: '2016-05-20 10:00:00', due_at: '2016-05-20 11:00:00', name: 'Event 5', height: 100, top: 1000 },
      ],
      6: [
        { start_at: '2016-05-21 11:00:00', due_at: '2016-05-21 12:00:00', name: 'Event 6', height: 100, top: 1100 },
      ],
      0: [
        { start_at: '2016-05-22 11:00:00', due_at: '2016-05-22 11:30:00', name: 'Event 7', height: 50, top: 1100 },
      ],
    };

    expect(eventsGrouped).toEqual(expectedResult);
  });

  it('groupEventsByDay: should group events by day (mixed events days)', () => {
    const events = [
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-18 08:30:00', due_at: '2016-05-18 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-18 09:00:00', due_at: '2016-05-18 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-20 10:00:00', due_at: '2016-05-20 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-20 11:00:00', due_at: '2016-05-20 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-22 11:00:00', due_at: '2016-05-22 11:30:00', name: 'Event 7' }];

    const eventsGrouped = groupEventsByDay(events);

    const expectedResult = {
      1: [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1', height: 200, top: 800 },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2', height: 100, top: 800 },
      ],
      2: [],
      3: [
        { start_at: '2016-05-18 08:30:00', due_at: '2016-05-18 09:30:00', name: 'Event 3', height: 100, top: 850 },
        { start_at: '2016-05-18 09:00:00', due_at: '2016-05-18 09:30:00', name: 'Event 4', height: 50, top: 900 },
      ],
      4: [],
      5: [
        { start_at: '2016-05-20 10:00:00', due_at: '2016-05-20 11:00:00', name: 'Event 5', height: 100, top: 1000 },
        { start_at: '2016-05-20 11:00:00', due_at: '2016-05-20 12:00:00', name: 'Event 6', height: 100, top: 1100 },
      ],
      6: [],
      0: [
        { start_at: '2016-05-22 11:00:00', due_at: '2016-05-22 11:30:00', name: 'Event 7', height: 50, top: 1100 },
      ],
    };

    expect(eventsGrouped).toEqual(expectedResult);
  });

  it('Testing getOverlapingEventsGroups: should return correct groups of overlaps (all events same day)', () => {
    const events = [
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' }];

    const expectedResult = [
      [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      ],
      [
        { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      ],
      [
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' },
      ],
    ];

    const sortMultidimensional = (group) => group.sort((a, b) => a.name > b.name);
    const OverlapGroupsResultSorted = getOverlapingEventsGroups(events).map(sortMultidimensional);
    const expectedResultSorted = expectedResult.map(sortMultidimensional);

    expect(OverlapGroupsResultSorted).toEqual(expectedResultSorted);
  });

  it('Testing getOverlapingEventsGroups: should return correct groups of overlaps (all events same day but changed positions ie. does not depend on order)', () => {
    const events = [
      { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' }];

    const expectedResult = [
      [
        { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      ],
      [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      ],
      [
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' },
      ],
    ];

    const sortMultidimensional = (group) => group.sort((a, b) => a.name > b.name);
    const OverlapGroupsResultSorted = getOverlapingEventsGroups(events).map(sortMultidimensional);
    const expectedResultSorted = expectedResult.map(sortMultidimensional);

    expect(OverlapGroupsResultSorted).toEqual(expectedResultSorted);
  });

  it('Testing getEventsGroupTopValue: should return correct topValue for each group', () => {
    const groups = [
      [
        { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5', top: 1000 },
      ],
      [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1', top: 800 },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2', top: 800 },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3', top: 850 },
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4', top: 900 },
      ],
      [
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6', top: 1100 },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7', top: 1100 },
      ],
    ];


    const expectedResult = [1000, 800, 1100];

    const topValues = groups.map((group) => getEventsGroupTopValue(group));

    expect(topValues).toEqual(expectedResult);
  });

  it('Testing getEventsMatrixMaxColumns: should return correct max number of columns of all rows for each group', () => {
    const groups = [
      [
        { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      ],
      [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      ],
      [
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
        { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' },
      ],
    ];

    const positionsMatrix = groups.map((group) => getOverlapingGroupPositionMatrix(group));
    const expectedResult = [1, 3, 2];

    const numberOfColumns = positionsMatrix.map((matrix) => getEventsMatrixMaxColumns(matrix));

    expect(numberOfColumns).toEqual(expectedResult);
  });
});

