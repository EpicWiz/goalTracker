import React, { Component } from 'react';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.compileFormData = this.compileFormData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  compileFormData(event) {
    event.preventDefault();
    const { loginFunction } = this.props;
    const formData = this.state;
    this.props.loginFunction(formData);
  }

  render() {

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
      padding: '10px',
      fontSize: '20px',
      marginTop: '15px',
      color: '#FFFFFF',
      fontFamily: 'Mallanna, sans-serif',
      boxShadow: '3px 3px 15px black'
    };

    return (
      <div style={containerStyle}>
        <form>
          <div className="form-group text-left">
            <label htmlFor="username" style={labelStyle}>Email</label><br />
            <input type="email" id="username" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="email@email.com" style={inputStyle} />
          </div>
          <div className="form-group text-left">
            <label htmlFor="password" style={labelStyle}>Password</label><br />
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="password" style={inputStyle} />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-success" onClick={this.compileFormData} style={buttonStyle}>login</button>
          </div>
        </form>
      </div>
    );
  }

}

export default Login;
