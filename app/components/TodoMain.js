import React, { Component } from 'react';
import 'whatwg-fetch';

import Options from './todomainsub/Options';
import Display from './todomainsub/Display';

export default class TodoMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      firstName: '',
      lastName: '',
      username: '',
      id: '',
      tasks: [
        {
          id: 0,
          userID: 0,
          goalTitle: 'None',
          goalBody: 'None'
        }
      ]
    };

    this.getTasks = this.getTasks.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  updateTask(taskData) {
    fetch('/api/updateGoal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData),
      credentials: 'same-origin',
    })
    .then(data => {
      this.getTasks();
    })
    .catch(error => console.log(error));
  }

  getTasks() {
    fetch('/api/getUserGoals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
      credentials: 'same-origin',
    })
    .then(data => {
      return data.json();
    })
    .then(json => {
      this.setState({
        tasks: json.tasks
      });
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    fetch('/api/getUser/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {},
      credentials: 'same-origin',
    })
    .then(data => {
      return data.json();
    })
    .then(json => {
      this.setState({
        firstName: json.firstName,
        lastName: json.lastName,
        username: json.username,
        id: json._id
      });
      setTimeout(this.getTasks, 500);
    })
    .catch(error => console.log(error));
  }

  logOut() {
      fetch('/api/logout/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {},
        credentials: 'same-origin',
      })
      .then(() => {
        let x = this.state.logout;
        this.setState({ logout: !x });
      })
      .catch(error => console.error(error));
    }

  render() {

    const mainCont = {
      paddingLeft: '0',
      paddingRight: '0'
    };

    const navBar = {
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: '100px',
    };

    const navLogo = {
      maxWidth: '100px',
      padding: '0'
    };

    const navLogoBox = {
      backgroundColor: '#FFFFFF',
      maxWidth: '150px',
      padding: '15px',
      borderRadius: '50%',
      position: 'relative',
      top: '20px',
      margin: '0 auto'
    };

    const needGap = {
      marginTop: '75px'
    };

    const optionStyle = {
      maxWidth: '300px',
      margin: '0 auto'
    };

    const displayStyle = {
      margin: '0 auto',
      marginLeft: '-20px',
      maxWidth: '800px'
    };

    const logoutStyle = {
      marginTop: '10px',
      fontFamily: 'Mallanna, sans-serif',
      boxShadow: '3px 3px 15px black'
    };

    return (
      <div className="container-fluid" style={mainCont}>
        <div className="col-sm-12 text-center" style={navBar}>
          <div style={navLogoBox}>
            <img src="./images/logo.png" style={navLogo} />
          </div>
        </div>
        <div className="row" style={needGap}>
          <div className="col-sm-4" style={optionStyle}>
            <Options id={this.state.id} getTasks={this.getTasks} tasks={this.state.tasks} details={this.state} />
          </div>
          <div className="col-sm-8" style={displayStyle}>
            <Display id={this.state.id} getTasks={this.getTasks} tasks={this.state.tasks} updateTask={this.updateTask} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">

          </div>
          <div className="col-sm-4 text-center">

          </div>
          <div className="col-sm-4">

          </div>
        </div>
        <div className="row"><div className="col-sm-12 text-center">
        <form>
          <button className="btn btn-success btn-sm" type="submit" style={logoutStyle} onClick={this.logOut}>Logout</button>
        </form>
        </div>
        </div>
      </div>
    );
  }

}
