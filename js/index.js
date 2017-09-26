import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <div className="wrapper">
    <div className="columns-container week-header">
      <div className="column-day">Mon</div>
      <div className="column-day">Tue</div>
      <div className="column-day">Wed</div>
      <div className="column-day">Thu</div>
      <div className="column-day">Fri</div>
      <div className="column-day">Sat</div>
      <div className="column-day">Sun</div>
    </div>
    <div className="data">
      <div className="columns-container schedule-container">
        <div className="column-day"></div>
        <div className="column-day"></div>
        <div className="column-day"></div>
        <div className="column-day"></div>
        <div className="column-day"></div>
        <div className="column-day"></div>
        <div className="column-day"></div>
      </div>
      <div className="steps">
        
      </div>
    </div>
  </div>
  }
}

render(<App/>, document.getElementById('app'));