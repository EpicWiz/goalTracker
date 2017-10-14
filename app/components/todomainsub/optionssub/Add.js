import React, { Component } from 'react';

class AddGoal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      goalTitle: '',
      goalBody: '',
      progress: 0
    }

    this.compileFormData = this.compileFormData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let x = this.props.id;
    this.setState({ userID: x });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  compileFormData(event) {
    event.preventDefault();
    fetch('/api/newGoal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
      credentials: 'same-origin',
    })
    .then(data => this.clearForm())
    .catch(error => console.log(error));
  }

  clearForm() {
    this.setState({goalTitle: '', goalBody: '', progress: 0});
    this.props.getTasks();
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
    const textAreaStyle = {
      width: '100%',
      backgroundColor: 'white',
      color: 'black',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #FFFFFF',
      borderRadius: '3px',
      fontFamily: 'Mallanna, sans-serif'
    }

    const buttonStyle = {
      display: 'block',
      width: '80%',
      margin: '15px auto',
      border: '1px solid #FFFFFF',
      padding: '15px',
      fontSize: '20px',
      fontFamily: 'Mallanna, sans-serif',
      boxShadow: '3px 3px 15px black'
    };

    return (
      <div style={containerStyle}>
      <form id="goalForm">
        <div className="form-group">
          <label htmlFor="goalTitle" style={labelStyle}>Title</label>
          <input type="text" id="goalTitle" name="goalTitle" placeholder="Goal Title" style={inputStyle} value={this.state.goalTitle} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="goalBody" style={labelStyle}>Goal Info</label>
          <textarea type="text" id="goalBody" name="goalBody" placeholder="Goal Info" style={textAreaStyle} value={this.state.goalBody} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="progress" style={labelStyle}>Progress</label>
          <select className="form-control" name="progress" id="progress" style={inputStyle} value={this.state.progress} onChange={this.handleInputChange}>
            <option>Select one</option>
            <option value="0">0%</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" style={buttonStyle} onClick={this.compileFormData}>Submit</button>
      </form>
      </div>
    );
  }
}

export default AddGoal;
