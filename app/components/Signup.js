import React, { Component } from 'react';
import Main from './Main';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confpassword: ''
    };

    this.compileFormData = this.compileFormData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { password, confpassword } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value });
   }

  compileFormData(event) {
    event.preventDefault();
    const { password, confpassword } = this.state;
    const formData = this.state;
    if (password === confpassword) {
      this.signUpUser(formData);
    } else {
      alert('Passwords must match!');
    }

  }

  signUpUser(userData) {

    const { loginFunction } = this.props;
    const formData = this.state;

    fetch('/api/register', {
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
        loginFunction(formData);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    const mainLogo = {
      width: '100%',
      margin: '40px auto 20px auto'
    };

    const containerStyle = {
      margin: '0px auto',
      width: '80%'
    };

    const labelStyle = {
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: 'Mallanna, sans-serif'
    };

    const inputStyle = {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color: '#FFFFFF',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #FFFFFF',
      fontFamily: 'Mallanna, sans-serif'
    };

    const buttonStyle = {
      width: '100%',
      border: '1px solid #FFFFFF',
      padding: '15px',
      fontSize: '20px',
      fontFamily: 'Mallanna, sans-serif',
      boxShadow: '3px 3px 15px black'
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5"></div>
          <div className="col-sm-2 text-center">
            <img className="text-center" src="./images/logo.png" style={mainLogo} />
          </div>
          <div className="col-sm-5"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
          <div style={containerStyle}>
          <form>
            <div className="form-group">
              <label htmlFor="firstName" style={labelStyle}>First Name</label>
              <input type="text" id="firstName" name="firstName" placeholder="First Name" style={inputStyle} onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={labelStyle}>Last Name</label>
              <input type="text" id="lastName" name="lastName" placeholder="Last Name" style={inputStyle} onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="username" style={labelStyle}>Email</label>
              <input type="email" id="username" name="username" aria-describedby="username" placeholder="Enter email" style={inputStyle} onChange={this.handleInputChange} required />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password" style={labelStyle}>Password</label>
              <input type="password" id="password" name="password" placeholder="Password" style={inputStyle} onChange={this.handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="confpassword" style={labelStyle}>Confirm Password</label>
              <input type="password" id="confpassword" name="confpassword" placeholder="Confirm Password" style={inputStyle} onChange={this.handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-success" style={buttonStyle} onClick={this.compileFormData}>Submit</button>
          </form>
          </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">

          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    );

  }
}

export default Signup;
