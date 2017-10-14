import React, { Component } from 'react';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      progressTitle: '',
      progressBody: '',
      goalID: '',
      tasks: [
        {
          id: 0,
          userID: 0,
          goalTitle: '',
          goalBody: ''
        }
      ]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProgress = this.addProgress.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount() {
    let x = this.props.id;
    let y = this.props.tasks;
    this.setState({ userID: x, tasks: y });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addProgress(event) {
    event.preventDefault();
    fetch('/api/addProgress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
      credentials: 'same-origin',
    })
    .then(data => {
      this.clearForm();
    })
    .catch(error => console.log(error));
  }

  clearForm() {
    this.setState({progressTitle: '', progressBody: '', goalID: 0});
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
          display: 'block',
          margin: '15px auto',
          width: '80%',
          border: '1px solid #FFFFFF',
          padding: '15px',
          fontSize: '20px',
          fontFamily: 'Mallanna, sans-serif',
          boxShadow: '3px 3px 15px black'
        };
    return (
      <div style={containerStyle}>
      <form id="progressForm">
        <div className="form-group">
          <label htmlFor="goalID" style={labelStyle}>Select Goal:</label>
          <select className="form-control" name="goalID" id="goalID" style={inputStyle} value={this.state.goalID} onChange={this.handleInputChange}>
            <option value="0">Select One</option>
            {this.props.tasks.map((e, i) => <option key={i} value={e._id}>{e.goalTitle}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="progressTitle" style={labelStyle}>Title</label>
          <input type="text" id="progressTitle" name="progressTitle" placeholder="Title" style={inputStyle} value={this.state.progressTitle} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="progressBody" style={labelStyle}>Entry</label>
          <input type="text" id="progressBody" name="progressBody" placeholder="Details" style={inputStyle} value={this.state.progressBody} onChange={this.handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-success" style={buttonStyle} onClick={this.addProgress}>Submit</button>
      </form>
      </div>
    );
  }
}

export default Progress;
