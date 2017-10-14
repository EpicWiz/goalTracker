import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';

import AddGoal from './optionssub/Add';
import AddProgress from './optionssub/Progress';
import Default from './optionssub/Default';


class Options extends Component {
  render() {

    const cardStyle = {
      backgroundColor: 'rgba(44, 44, 44, 0.9)',
      minHeight: '70vh'
    };

    const linkStyle = {
      color: '#FFFFFF'
    };

    const AddGoalsComp = props => <AddGoal id={this.props.id} getTasks={this.props.getTasks}/>;
    const AddProgressComp = props => <AddProgress id={this.props.id} tasks={this.props.tasks} getTasks={this.props.getTasks} />;
    const DefaultProps = props => <Default details={this.props} />

    return (
      <Router>
        <div className="card" style={cardStyle}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={linkStyle}>Me</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link" style={linkStyle}>Add</Link>
            </li>
            <li className="nav-item">
              <Link to="/progress" className="nav-link" style={linkStyle}>Progress</Link>
            </li>
          </ul>
        <div className="card-body">
          <Switch>
            <Route exact path="/add" render={AddGoalsComp} />
            <Route exact path="/progress" render={AddProgressComp} />
            <Route exact path="/" render={DefaultProps} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }

}

export default Options;
