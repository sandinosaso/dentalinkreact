import React from 'react';
import { shallow } from 'enzyme';

import EventGroup from '../../js/components/eventgroup';

describe('<EventGroup />', () => {
  it('renders an EventGroup component', () => {
    const group = [
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
      { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
      { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
    ];

    const eventGroupMatrix = [
      [
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' },
        { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 09:00:00', name: 'Event 2' },
        { start_at: '2016-05-16 08:30:00', due_at: '2016-05-16 09:30:00', name: 'Event 3' },
      ],
      [
        undefined,
        { start_at: '2016-05-16 09:00:00', due_at: '2016-05-16 09:30:00', name: 'Event 4' },
      ],
    ];

    const wrapper = shallow(<EventGroup events={group} eventGroupMatrix={eventGroupMatrix} />);
    expect(wrapper).toMatchSnapshot();
  });
});
