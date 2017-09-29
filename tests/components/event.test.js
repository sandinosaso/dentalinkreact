import React from 'react';
import { shallow } from 'enzyme';

import Event from '../../js/components/event';

describe('<Event />', () => {
  it('renders an Event component', () => {
    const event = { start_at: '2016-05-16 08:00:00', due_at: '2016-05-16 10:00:00', name: 'Event 1' };
    const wrapper = shallow(<Event data={event} />);
    expect(wrapper).toMatchSnapshot();
  });
});
