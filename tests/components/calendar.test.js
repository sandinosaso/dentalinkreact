import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../js/components/calendar';

describe('<Calendar />', () => {
  it('renders an Calendar component', () => {
    const events = [
      { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' },
      { start_at: '2016-05-17 10:00:00', due_at: '2016-05-17 11:00:00', name: 'Event 8' },
      { start_at: '2016-05-17 08:30:00', due_at: '2016-05-17 09:30:00', name: 'Event 9' },
      { start_at: '2016-05-18 11:00:00', due_at: '2016-05-18 11:30:00', name: 'Event 10' }
    ];

    const wrapper = shallow(<Calendar events={events} />);
    expect(wrapper).toMatchSnapshot();
  });
});
