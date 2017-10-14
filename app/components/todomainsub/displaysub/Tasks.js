import React, { Component } from 'react';
import Progcard from './taskssub/Progcard';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goalID: '0',
      goalTitle: '',
      goalBody: '',
      progress: 0,
      progList: [
        {
          id: '',
          mainGoalId: '',
          progressTitle: '',
          progressBody: '',
          dateCreate: ''
        }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.compileFormData = this.compileFormData.bind(this);
    this.getProgs = this.getProgs.bind(this);
    this.deleteGoals = this.deleteGoals.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { _id, goalTitle, goalBody, progress } = nextProps.data;
    if (this.props != nextProps) {
      this.setState({
        goalID: _id,
        goalTitle: goalTitle,
        goalBody: goalBody,
        progress: progress
      }, function () {
        console.log('New Props');
      });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, goalID: this.props.data._id });
  }

  compileFormData(event) {
    event.preventDefault();
    this.props.updateTask(this.state);
  }

  getProgs() {
    const { goalID } = this.state;
    fetch('/api/getProgs/', {
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
          progList: json.progs
        });
      })
      .catch(error => console.log(error));
  }

  deleteGoals() {
    fetch('/api/deleteGoals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goalID: this.state.goalID }),
      credentials: 'same-origin',
    })
      .then(data => {
        this.props.getTasks();
      })
      .catch(error => console.log(error));
  }

  render() {
    const { progress } = this.props.data;
    const x = progress + '%';
    const progStyle = {
      width: x
    }

    const hrefTarget = '#' + this.props.data._id;
    const hrefTarget2 = '#2' + this.props.data._id;
    const id2 = '2' + this.props.data._id;
    const hrefTarget3 = '#3' + this.props.data._id;
    const id3 = '3' + this.props.data._id;
    const dateToString = this.props.data.dateCreate + '';
    const dateReplace = dateToString.slice(0, 10);

    const inputStyle = {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color: '#000000',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #000000',
      fontFamily: 'Mallanna, sans-serif'
    };

    const selectStyle = {
      width: '75%',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color: '#000000',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #000000',
      fontFamily: 'Mallanna, sans-serif'
    };

    const buttonStyle = {
      border: '1px solid #FFFFFF',
      color: '#32CD32',
      padding: '2px 5px',
      fontSize: '12px',
      fontFamily: 'Mallanna, sans-serif',
      position: 'relative',
      left: '15px',
      border: '1px solid black'
    };

    const deleteButtonStyle = {
      border: '1px solid #FFFFFF',
      color: '#FFFFFF',
      padding: '0px 5px 0px 5px',
      fontSize: '12px',
      fontFamily: 'Mallanna, sans-serif',
      border: '1px solid black',
      float: 'right',
      margin: '10px',
    };

    const linkStyle = {
      color: '#000000'
    };

    const subLinkStyle = {
      color: 'white',
      fontFamily: 'Mallanna, sans-serif',
      fontSize: '15px'
    }

    const subLinkStyleGoal = {
      color: '#808080',
      fontFamily: 'Mallanna, sans-serif',
      fontSize: '15px'
    }
    const cardStyle = {
      backgroundColor: '#2ecc71',
    }

    return (
      <li className="list-group-item">
        <div role="tablist">

          <div className="card-header" role="tab" onClick={this.getProgs}>
            <a data-toggle="collapse" href={hrefTarget} aria-expanded="true" aria-controls={this.props.data._id} style={linkStyle}>
              <span className="row">
                <span className="col-sm-4 text-left">
                  {this.props.data.goalTitle}
                </span>
                <span className="col-sm-4 text-center">
                  {dateReplace}
                </span>
                <span className="col-sm-4 text-right">
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={progStyle}></div>
                  </div>
                </span>
              </span>
            </a>
          </div>

          <div id={this.props.data._id} className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">

            <div className="card-body"><strong>Goal Details:</strong> {this.props.data.goalBody}</div>

            <div className="card" style={cardStyle}>
              <div className="text-center" role="tab">
                <h5 className="mb-0">
                  <a data-toggle="collapse" href={hrefTarget2} aria-expanded="true" aria-controls={id2} style={subLinkStyle}><h4>
                    Progress
                  </h4>
                  </a>
                </h5>
              </div>
              <div id={id2} className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                <ul className="list-group">
                  {this.state.progList.map((e, i) => <Progcard key={i} data={e} getProgs={this.getProgs} />)}
                </ul>
              </div>
            </div>

            <div className="text-left" role="tab">
              <h5 className="mb-0">
                <a data-toggle="collapse" href={hrefTarget3} aria-expanded="true" aria-controls={id3} style={subLinkStyleGoal}>
                  Goal Settings <button className="btn btn-danger btn-sm" style={deleteButtonStyle} onClick={this.deleteGoals}>Delete Goal</button>
                </a>
              </h5>
            </div>
            <div id={id3} className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                <form>
                  <span className="row">
                    <span className="col-sm-4 text-left">
                      <input type="text" name="goalTitle" placeholder={this.props.data.goalTitle} value={this.state.goalTitle} onChange={this.handleInputChange} style={inputStyle} />
                    </span>
                    <span className="col-sm-4 text-center">
                      <input type="text" name="goalBody" placeholder={this.props.data.goalBody} value={this.state.goalBody} onChange={this.handleInputChange} style={inputStyle} />
                    </span>
                    <span className="col-sm-4 text-right">
                      <select name="progress" style={selectStyle} placeholder={this.state.progress} value={this.state.progress} onChange={this.handleInputChange}>
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
                      <button type="submit" className="btn btn-success btn-sm" onClick={this.compileFormData} style={buttonStyle}>&#x2713;</button>
                    </span>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>




      </li>
    );

  }

}





export default Tasks;
