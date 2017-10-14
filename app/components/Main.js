import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import Login from './landing/Login';
import TodoMain from './TodoMain';
import Signup from './Signup';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      signup: false
    };
    this.attemptLogIn = this.attemptLogIn.bind(this);
    this.newUser = this.newUser.bind(this);
  }
// CHECK FOR SESSION
  componentDidMount() {
    fetch('/api/checkLogin/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {},
      credentials: 'same-origin',
    })
    .then(data => {
      console.log('SOME DATA', data);
      (data.status === 200) ? this.setState({redirect: true}) : this.setState({redirect: false});
    })
    .catch(error => console.log(error));
  }

// GO TO SIGN UP PAGE
  newUser() {
    this.setState({ signup: true });
  }

// LOG IN USER
  attemptLogIn(userData) {
    let { loginAttempt, loginSuccess, loginFailure } = this.props || {};
    loginAttempt();

  fetch('/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
    credentials: 'same-origin',
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
      return null;
      }
    })
      .then(json => {
        console.log(json);
        if (json) {
          loginSuccess(json);
          this.setState({ redirect: true, signup: false });
        } else {
          loginFailure(new Error('Authentication Failed'));
        }
      })
      .catch(error => {
        loginFailure(new Error('error'));
      });

 }

  render() {

    const mainCont = {
      paddingLeft: '0',
      paddingRight: '0'
    };

    const headStyle = {
      color: '#FFFFFF',
      margin: '15px auto',
      fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#17a2b8',
      borderRadius: '10px'
    };

    const suStyle = {
      color: '#FFFFFF',
      fontFamily: 'Mallanna, sans-serif'
    };

    const mainLogo = {
      width: '100%',
      margin: '80px auto 60px auto'
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

    const { redirect, signup } = this.state;

    if (signup) {
      return (
        <Signup loginFunction={this.attemptLogIn} />
      );
    } else if (redirect) {
      return (
        <TodoMain />
      );
    } else {
    return (
      <div className="container-fluid" style={mainCont}>
          <div className="col-sm-12 text-center" style={navBar}>
            <div style={navLogoBox}>
              <img src="./images/logo.png" style={navLogo} />
              </div>
        </div>
        <div className="row">
          <div className="col-sm-5"></div>
          <div className="col-sm-2">
            <img className="text-center" src="./images/logo.png" style={mainLogo} />
          </div>
          <div className="col-sm-5"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <Login loginFunction={this.attemptLogIn} />
          </div>
          <div className="col-sm-4"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 text-center">
            <button className="btn btn-link" onClick={this.newUser} style={suStyle}>Register Here</button>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    );
    }
  }

};

export default Main;
