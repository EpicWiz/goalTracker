import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Tasks from './displaysub/Tasks';

class Display extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 0,
          userID: 0,
          goalTitle: '',
          goalBody: ''
        }
      ]
    };
  }

componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        tasks: nextProps.tasks
      }, function() {
        console.log('Goals Updated');
      });
    }
  }

  render() {

    const cardStyle = {
      backgroundColor: 'rgba(44, 44, 44, 0.9)',
      minHeight: '70vh'
    };

    const linkStyle = {
      color: 'pink'
    };

    return (
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="row">
                <span className="col-sm-4 text-center">
                  <strong>Title</strong>
                </span>
                <span className="col-sm-4 text-center">
                  <strong>Date Created</strong>
                </span>
                <span className="col-sm-4 text-center">
                  <strong>Progress</strong>
                </span>
              </span>
            </li>
            {this.state.tasks.map((e, i) => <Tasks key={i} data={e} updateTask={this.props.updateTask} />)}
          </ul>
        </div>
      </div>
    );
  }

}

export default Display;
