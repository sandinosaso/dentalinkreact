import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Calendar from './components/calendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch('./js/data.json')
      .then((res) => res.json())
      .then((jsonResult) => {
        this.setState({ events: jsonResult.data });
      });
  }

  render() {
    return <Calendar events={this.state.events} />;
  }
}


ReactDom.render(<App />, document.getElementById('app'));
