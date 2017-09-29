import React from 'react';
import { shallow } from 'enzyme';

import Day from '../../js/components/day';

describe('<Day />', () => {
  it('renders an Day component', () => {
    const events = [
      { start_at: '2016-05-16 10:00:00', due_at: '2016-05-16 11:00:00', name: 'Event 5' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 12:00:00', name: 'Event 6' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      { start_at: '2016-05-16 11:00:00', due_at: '2016-05-16 11:30:00', name: 'Event 7' }];

    const wrapper = shallow(<Day events={events} />);
    expect(wrapper).toMatchSnapshot();
  });
});
